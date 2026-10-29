const fs=require('fs'),cr=require('crypto');
const isVercel=Boolean(process.env.VERCEL);
const P=isVercel?'/tmp/data.json':require('path').join(__dirname,'data.json');
const db={customers:[],orders:[],users:[],runs:[],events:[],planted:[]};
const load=()=>{
  if(isVercel&&!fs.existsSync(P)){
    const bundledPath=require('path').join(__dirname,'data.json');
    if(fs.existsSync(bundledPath)){
      try{fs.copyFileSync(bundledPath,P);}catch(e){}
    }
  }
  if(fs.existsSync(P)){
    try{Object.assign(db,JSON.parse(fs.readFileSync(P,'utf8')));}catch(e){}
  }
  if(!db.users||!db.users.length){
    try{require('./seed');}catch(e){}
  }
  return db;
};
const save=()=>{
  try{
    const tmp=P+'.tmp';
    fs.writeFileSync(tmp,JSON.stringify(db));
    fs.renameSync(tmp,P);
  }catch(e){
    console.error('Save failed:',e.message);
  }
};
const sha=s=>cr.createHash('sha256').update(s).digest('hex');
const body=e=>JSON.stringify([e.id,e.ts,e.type,e.run,e.order,e.customer,e.by,e.p]);
// Append-only event ledger with a hash chain. No update or delete exists: corrections are REVERSE events.
function add(x){
  if(x.id&&db.events.some(e=>e.id===x.id))return{dup:true};
  const prev=db.events.length?db.events[db.events.length-1].hash:'GENESIS';
  const e={id:x.id||cr.randomUUID(),ts:x.ts||new Date().toISOString(),type:x.type,run:x.run,order:x.order,customer:x.customer,by:x.by,p:x.p||{}};
  e.prev=prev;e.hash=sha(prev+body(e));db.events.push(e);return{ev:e};
}
function verify(){
  let prev='GENESIS';
  for(const e of db.events){if(e.prev!==prev||e.hash!==sha(prev+body(e)))return{ok:false,at:e.id,count:db.events.length};prev=e.hash}
  return{ok:true,count:db.events.length};
}
const sum=(a,f)=>a.reduce((s,e)=>s+(+f(e)||0),0);
function reconcile(){
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>e.type!=='REVERSE'&&!rv.has(e.id)),X=[];
  const fl=(code,kind,key,msg,evd,amount)=>X.push({code,kind,key,msg,evidence:evd.map(e=>e.id||e),amount});
  const ord=Object.fromEntries(db.orders.map(o=>[o.id,o])),cus=Object.fromEntries(db.customers.map(c=>[c.id,c]));
  for(const r of db.runs){
    const E=ev.filter(e=>e.run===r.id),D=E.filter(e=>e.type==='DELIVER'&&!e.p.failed),Pm=E.filter(e=>e.type==='PAY');
    const C=E.find(e=>e.type==='CLOSE'),DP=E.filter(e=>e.type==='DEPOSIT'),seen={};
    D.forEach(d=>{
      if(seen[d.order])fl('DUP_DELIVERY','Subsidy',d.order,`Order ${d.order} delivered twice`,[seen[d.order],d]);
      seen[d.order]=d;const o=ord[d.order];
      if(!o)fl('NO_BOOKING','Cylinder',d.order,`Delivery ${d.order} has no matching booking`,[d]);
      if(d.p.full!==d.p.empty)fl('CYL_SWAP','Cylinder',d.order,`Order ${d.order}: ${d.p.full} full out, ${d.p.empty} empty in`,[d]);
      const pay=Pm.filter(p=>p.order===d.order),got=sum(pay,p=>p.p.amount);
      if(!pay.length)fl('NO_PAYMENT','Cash',d.order,`Order ${d.order} delivered but no payment recorded`,[d]);
      else if(o&&got!==o.price*d.p.full)fl('AMOUNT_MISMATCH','Cash',d.order,`Order ${d.order}: collected ₹${got}, expected ₹${o.price*d.p.full}`,pay,o.price*d.p.full-got);
    });
    const refs={};Pm.filter(p=>p.p.mode==='UPI').forEach(p=>(refs[p.p.ref]=refs[p.p.ref]||[]).push(p));
    Object.entries(refs).forEach(([k,v])=>v.length>1&&fl('DUP_UPI','Cash',k,`UPI reference ${k} used on ${v.length} payments`,v));
    Pm.filter(p=>!D.some(d=>d.order===p.order)).forEach(p=>fl('ORPHAN_PAY','Cash',p.order,`Payment for ${p.order} with no delivery`,[p]));
    if(C){
      const full=sum(D,d=>d.p.full),emp=sum(D,d=>d.p.empty),def=sum(D,d=>d.p.defective);
      const cash=sum(Pm.filter(p=>p.p.mode==='CASH'),p=>p.p.amount),dep=sum(DP,d=>d.p.amount);
      if(r.loaded!==full+C.p.unsold+(C.p.transit||0))fl('CYL_FULL','Cylinder',r.id,`Loaded ${r.loaded}, but delivered ${full} + unsold ${C.p.unsold}`,[C]);
      if(C.p.empties!==emp)fl('CYL_EMPTY_COUNT','Cylinder',r.id,`Empties expected ${emp}, counted ${C.p.empties}`,[C]);
      if(C.p.defective!==def)fl('CYL_DEFECT','Cylinder',r.id,`Defective reported ${def}, returned ${C.p.defective}`,[C]);
      if(C.p.cash!==cash)fl('CASH_COUNT','Cash',r.id,`Cash recorded ₹${cash}, counted ₹${C.p.cash}`,[C]);
      if(dep!==cash)fl('CASH_DEPOSIT','Cash',r.id,`Cash collected ₹${cash}, deposited ₹${dep}`,[C,...DP],cash-dep);
    }
  }
  const cnt={};ev.filter(e=>e.type==='DELIVER'&&!e.p.failed).forEach(d=>cnt[d.customer]=(cnt[d.customer]||0)+1);
  for(const[c,n]of Object.entries(cnt)){
    const u=cus[c];
    if(u){
      if(u.entitlement===0||u.eligible===false){
        fl('SUBSIDY_NO_ENTITLEMENT','Subsidy',c,`Delivery has subsidy but customer ${u.name} is not entitled`,ev.filter(e=>e.customer===c&&e.type==='DELIVER'));
      }else if(u.ytd+n>u.entitlement){
        fl('SUBSIDY_EXCEEDED','Subsidy',c,`Customer ${u.name} has used ${u.ytd+n} of ${u.entitlement} subsidised refills`,ev.filter(e=>e.customer===c&&e.type==='DELIVER'));
      }
    }
  }
  ev.filter(e=>e.type==='SUBCREDIT').forEach(s=>{
    const n=cnt[s.customer]||0;
    const u=cus[s.customer];
    const expectedRate=u?.subsidy_amount||175;
    const appliedRate=s.p.amount_per_refill||s.p.amount;
    if(appliedRate&&expectedRate&&appliedRate!==expectedRate){
      fl('SUBSIDY_MISMATCH','Subsidy',s.customer,`Subsidy applied ₹${appliedRate}, expected ₹${expectedRate}`,[s],Math.abs(appliedRate-expectedRate));
    }else if(s.p.refills!==n){
      fl('SUBSIDY_MISMATCH','Subsidy',s.customer,`Portal credited ${s.p.refills} refill(s), deliveries show ${n}`,[s]);
    }
  });
  const score=db.planted.map(p=>({
    ...p,
    found:X.some(x=>(x.code===p.code||(p.code==='SUB_OVER'&&x.code==='SUBSIDY_EXCEEDED')||(p.code==='SUB_MISMATCH'&&x.code==='SUBSIDY_MISMATCH'))&&x.key===p.key)
  }));
  const subFlags=X.filter(x=>x.kind==='Subsidy');
  return{
    items:X,
    score,
    found:score.filter(s=>s.found).length,
    total:score.length,
    subsidy:{
      deliveriesCount:Object.values(cnt).reduce((a,b)=>a+b,0),
      customersCount:Object.keys(cnt).length,
      flagsCount:subFlags.length,
      exceededCount:X.filter(x=>x.code==='SUBSIDY_EXCEEDED').length,
      mismatchCount:X.filter(x=>x.code==='SUBSIDY_MISMATCH').length,
      noEntitlementCount:X.filter(x=>x.code==='SUBSIDY_NO_ENTITLEMENT').length
    }
  };
}
module.exports={db,load,save,add,verify,reconcile};
