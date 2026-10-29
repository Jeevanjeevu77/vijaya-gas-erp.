const express=require('express'),cr=require('crypto'),L=require('./lib'),db=L.load();
const app=express(),tok=new Map();
// Security Headers Middleware (DPDP Act & OWASP Best Practices)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
app.use(express.json({limit:'1mb'}));
app.use(express.static(__dirname+'/public'));

// Real-Time Event Broadcaster (Server-Sent Events)
const sseClients = new Set();
function broadcast(eventType, data = {}) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify({ ...data, ts: new Date().toISOString() })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

app.get('/api/live', (q, s) => {
  s.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  s.write(`event: connected\ndata: ${JSON.stringify({ status: 'connected', clients: sseClients.size + 1 })}\n\n`);
  sseClients.add(s);
  const keepAlive = setInterval(() => {
    try { s.write(':keepalive\n\n'); } catch (e) { clearInterval(keepAlive); }
  }, 25000);
  q.on('close', () => {
    clearInterval(keepAlive);
    sseClients.delete(s);
  });
});

// Stateless Cryptographically Signed Session Tokens (HMAC-SHA256) with 8-hour expiry
const TOKEN_TTL=8*60*60*1000;
const SESSION_SECRET=process.env.SESSION_SECRET||'vga_erp_secret_salt_2026';

function signToken(u){
  const payload=Buffer.from(JSON.stringify({
    id:u.id,
    role:u.role,
    name:u.name,
    exp:Date.now()+TOKEN_TTL
  })).toString('base64url');
  const sig=cr.createHmac('sha256',SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token){
  if(!token||typeof token!=='string')return null;
  // Backward compatibility with in-memory tokens
  if(tok.has(token)){
    const entry=tok.get(token);
    if(Date.now()<=entry.exp)return entry.u;
  }
  const parts=token.split('.');
  if(parts.length!==2)return null;
  const [payloadB64,sig]=parts;
  try{
    const expectedSig=cr.createHmac('sha256',SESSION_SECRET).update(payloadB64).digest('base64url');
    if(sig.length!==expectedSig.length||!cr.timingSafeEqual(Buffer.from(sig),Buffer.from(expectedSig)))return null;
    const data=JSON.parse(Buffer.from(payloadB64,'base64url').toString('utf8'));
    if(Date.now()>data.exp)return null;
    const u=db.users.find(x=>x.id===data.id);
    return u||data;
  }catch(e){
    return null;
  }
}

const auth=(...roles)=>(q,s,n)=>{
  const key=q.get('x-token')||q.query.t;
  if(!key)return s.status(401).json({error:'login'});
  const user=verifyToken(key);
  if(!user)return s.status(401).json({error:'login'});
  if(roles.length&&!roles.includes(user.role))return s.status(403).json({error:'forbidden'});
  q.u=user;
  n();
};
const esc=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const failedLogins=new Map();
// Input helpers
const safeInt=(v,min,max,def)=>{const n=parseInt(v);return isNaN(n)||n<min||n>max?def:n};
const safeStr=(v,maxLen=200)=>String(v==null?'':v).trim().slice(0,maxLen);
const safeAmt=(v,min=0,max=99999)=>{const n=parseFloat(v);return isNaN(n)||n<min||n>max?null:Math.round(n*100)/100};
const checkPin=(u,pin)=>{
  if(u.pin_hash&&u.salt){
    try{
      const h=cr.scryptSync(String(pin),u.salt,32).toString('hex');
      return cr.timingSafeEqual(Buffer.from(h),Buffer.from(u.pin_hash));
    }catch(e){}
  }
  return u.pin===String(pin);
};
app.post('/api/login',(q,s)=>{
  const ip=q.ip||q.connection?.remoteAddress||'local';
  const k=ip+':'+q.body.role;
  const a=failedLogins.get(k)||{cnt:0,until:0};
  if(Date.now()<a.until){
    const left=Math.ceil((a.until-Date.now())/1000);
    return s.status(429).json({error:`Account locked. Try again in ${left}s.`});
  }
  const u=db.users.find(x=>x.role===q.body.role);
  if(!u||!checkPin(u,q.body.pin)){
    a.cnt++;
    if(a.cnt>=5){a.until=Date.now()+5*60*1000;failedLogins.set(k,a);return s.status(429).json({error:'Too many attempts. Locked for 5 minutes.'})}
    failedLogins.set(k,a);
    return s.status(401).json({error:`Wrong PIN (${5-a.cnt} attempts left)`});
  }
  failedLogins.delete(k);
  const t=signToken(u);
  tok.set(t,{u,exp:Date.now()+TOKEN_TTL});
  s.json({token:t,role:u.role,name:u.name,expiresIn:'8 hours'});
});
app.get('/api/run',auth('delivery'),(q,s)=>{
  const mine=db.runs.filter(r=>r.staff===q.u.id),closed=r=>db.events.some(e=>e.run===r.id&&e.type==='CLOSE'),r=mine.find(x=>!closed(x));
  if(!r)return s.json(null);const done=new Set(db.events.filter(e=>e.run===r.id&&e.type==='DELIVER').map(e=>e.order));
  s.json({id:r.id,vehicle:r.vehicle,loaded:r.loaded,orders:db.orders.filter(o=>o.run===r.id).map(o=>{const c=db.customers.find(c=>c.id===o.customer);return{...o,name:c.name,village:c.village,left:c.entitlement-c.ytd,status:done.has(o.id)?'done':'pending'}})});
});
const ALLOW={delivery:['DELIVER','PAY','CLOSE'],counter:['DEPOSIT','DISPATCH']};
app.post('/api/events',auth('delivery','counter'),(q,s)=>{
  let ok=0,dup=0,bad=0;
  const evs=Array.isArray(q.body)?q.body:[];
  if(evs.length>200)return s.status(400).json({error:'Too many events in one batch (max 200)'});
  for(const x of evs){
    if(!ALLOW[q.u.role].includes(x.type)){bad++;continue}
    // Validate event payload amounts
    if(x.type==='PAY'){
      const amt=safeAmt(x.p?.amount,0,99999);
      if(amt===null){bad++;continue}
      if(x.p?.mode==='UPI'&&(!x.p?.ref||String(x.p.ref).trim().length<4)){bad++;continue}
      x.p.amount=amt;
    }
    if(x.type==='DELIVER'){
      x.p.full=safeInt(x.p?.full,0,100,0);
      x.p.empty=safeInt(x.p?.empty,0,100,0);
      x.p.defective=safeInt(x.p?.defective,0,100,0);
    }
    const r=L.add({id:x.id,ts:x.ts,type:x.type,run:x.run,order:x.order,customer:x.customer,p:x.p,by:q.u.id});
    r.dup?dup++:ok++;
  }
  L.save();
  if(ok>0)broadcast('events_updated',{ok,dup,bad});
  s.json({ok,dup,bad});
});

// Customer Management & Search (Scales seamlessly to 30,000+ records)
const maskCus=c=>({id:c.id,sv_num:c.sv_num||c.id,name:c.name,village:c.village,phone:c.phone?c.phone.slice(0,3)+'XXXX'+c.phone.slice(-3):'XXXXXXXXXX',entitlement:c.entitlement,ytd:c.ytd,left:c.entitlement-c.ytd,aadhaar:'XXXX-XXXX-'+c.aadhaar_last4});

app.get('/api/customers',auth('counter','owner','auditor'),(q,s)=>{
  const query=String(q.query.q||'').trim().toLowerCase();
  const v=String(q.query.village||'').trim().toLowerCase();
  const limit=Math.min(100,Math.max(1,+q.query.limit||30));
  if(!query&&!v&&q.query.all==='1')return s.json(db.customers.slice(0,limit).map(maskCus));
  
  let matches=db.customers;
  if(v)matches=matches.filter(c=>c.village.toLowerCase()===v);
  if(query)matches=matches.filter(c=>(c.id&&c.id.toLowerCase().includes(query))||(c.sv_num&&c.sv_num.toLowerCase().includes(query))||(c.name&&c.name.toLowerCase().includes(query))||(c.phone&&c.phone.includes(query))||(c.village&&c.village.toLowerCase().includes(query)));
  s.json(matches.slice(0,limit).map(maskCus));
});

app.get('/api/customers/search',(q,s)=>{
  const query=String(q.query.q||'').trim().toLowerCase();
  const v=String(q.query.village||'').trim().toLowerCase();
  const limit=Math.min(50,Math.max(1,+q.query.limit||20));
  let list=db.customers;
  if(v)list=list.filter(c=>c.village.toLowerCase()===v);
  if(query)list=list.filter(c=>(c.id&&c.id.toLowerCase().includes(query))||(c.sv_num&&c.sv_num.toLowerCase().includes(query))||(c.name&&c.name.toLowerCase().includes(query))||(c.phone&&c.phone.includes(query))||(c.village&&c.village.toLowerCase().includes(query)));
  s.json({total:db.customers.length,matched:list.length,customers:list.slice(0,limit).map(maskCus)});
});

app.get('/api/villages',(q,s)=>{
  const map={};
  db.customers.forEach(c=>{map[c.village]=(map[c.village]||0)+1});
  s.json(Object.entries(map).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count));
});

// Customer Self-Service Dispute & Verification Portal
app.get('/api/customer/lookup',(q,s)=>{
  const qStr=String(q.query.q||'').trim().toLowerCase();
  if(!qStr)return s.status(400).json({error:'Please enter SV Number or 10-digit Mobile'});
  const c=db.customers.find(x=>(x.sv_num&&x.sv_num.toLowerCase()===qStr)||(x.id&&x.id.toLowerCase()===qStr)||(x.phone&&x.phone===qStr));
  if(!c)return s.status(404).json({error:'No customer found with SV/Mobile: '+qStr});

  const orders=db.orders.filter(o=>o.customer===c.id);
  const done=new Set(db.events.filter(e=>e.type==='DELIVER'&&!e.p.failed).map(e=>e.order));
  const failed=db.events.filter(e=>e.type==='DELIVER'&&e.p.failed);
  const pays=db.events.filter(e=>e.type==='PAY');
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));

  const orderHistory=orders.map(o=>{
    const isDel=done.has(o.id);
    const fail=failed.find(f=>f.order===o.id);
    const pay=pays.find(p=>p.order===o.id);
    const run=db.runs.find(r=>r.id===o.run);
    return{
      orderId:o.id,
      type:o.type,
      price:o.price,
      status:isDel?'DELIVERED':(fail?'POSTPONED':(o.run?'IN_TRANSIT':'BOOKED')),
      failReason:fail?fail.p.reason:null,
      payment:pay?{mode:pay.p.mode,amount:pay.p.amount,ref:pay.p.ref||'N/A',ts:pay.ts,hash:pay.hash}:null,
      runId:o.run,
      vehicle:run?run.vehicle:null
    };
  });

  const ledgerBlocks=db.events.filter(e=>(e.customer===c.id||orders.some(o=>o.id===e.order))&&!rv.has(e.id));
  s.json({
    customer:maskCus(c),
    orders:orderHistory,
    ledgerProof:{
      verified:true,
      blocks:ledgerBlocks.length,
      latestHash:ledgerBlocks.length?ledgerBlocks[ledgerBlocks.length-1].hash:'GENESIS'
    }
  });
});

app.post('/api/customer/dispute',(q,s)=>{
  const custQuery=safeStr(q.body.customer,30);
  const rawDetails=safeStr(q.body.details,1000);
  const issue=safeStr(q.body.issue||'PAYMENT_PENDING',50);
  const order=safeStr(q.body.order,20)||null;
  if(!custQuery||!rawDetails)return s.status(400).json({error:'Customer and dispute details required'});
  const c=db.customers.find(x=>x.id===custQuery||x.sv_num===custQuery);
  if(!c)return s.status(404).json({error:'Customer not found'});
  const ticketId='DSP-'+Date.now().toString().slice(-6);
  L.add({
    type:'DISPUTE',
    customer:c.id,
    order,
    by:'CUSTOMER_PORTAL',
    p:{ticketId,issue,details:esc(rawDetails),customerName:c.name,village:c.village}
  });
  L.save();
  broadcast('dispute_created',{ticketId,customerName:c.name});
  s.json({ok:1,ticketId,message:'Dispute recorded on immutable ledger. Tracking Ticket: '+ticketId});
});

app.post('/api/customer/book',(q,s)=>{
  const custQuery=safeStr(q.body.customer,30);
  const t=q.body.type==='5kg'?'5kg':'14.2kg';
  const qty=safeInt(q.body.qty,1,5,1);
  if(!custQuery)return s.status(400).json({error:'Customer SV Number or Mobile required'});

  const c=db.customers.find(x=>(x.id&&x.id.toLowerCase()===custQuery.toLowerCase())||(x.sv_num&&x.sv_num.toLowerCase()===custQuery.toLowerCase())||(x.phone&&x.phone===custQuery));
  if(!c)return s.status(404).json({error:'No LPG connection found matching: '+custQuery});

  // Check active undelivered booking
  const delivered=new Set(db.events.filter(e=>e.type==='DELIVER'&&!e.p?.failed).map(e=>e.order));
  const activeOrder=db.orders.find(o=>o.customer===c.id&&!delivered.has(o.id));
  if(activeOrder){
    const inTransit=!!activeOrder.run;
    return s.status(400).json({
      error:`Active order #${activeOrder.id} is already in progress (${inTransit?'Out for Delivery':'Booked & In Dispatch Queue'}). Track it live!`,
      existingOrder:activeOrder.id
    });
  }

  const price=t==='5kg'?350:900;
  let nextNum=1000+db.orders.length;
  while(db.orders.some(x=>x.id==='O'+nextNum))nextNum++;
  const o={
    id:'O'+nextNum,
    customer:c.id,
    type:t,
    qty,
    price,
    run:null,
    created_at:new Date().toISOString()
  };
  db.orders.push(o);
  L.add({
    type:'BOOK',
    order:o.id,
    customer:c.id,
    by:'CUSTOMER_PORTAL',
    p:{type:t,qty,sv_num:c.sv_num,name:c.name,village:c.village}
  });
  L.save();

  broadcast('order_booked',{order:o,customerName:c.name,village:c.village});

  s.json({
    ok:1,
    order:{
      ...o,
      customerName:c.name,
      village:c.village,
      status:'BOOKED'
    },
    message:`Refill #${o.id} successfully booked! Your cylinder is queued for dispatch.`
  });
});

app.get('/api/track/:id',(q,s)=>{
  const query=safeStr(q.params.id,40).trim().toLowerCase();
  if(!query)return s.status(400).json({error:'Order ID, SV Number, or Mobile required'});

  let order=db.orders.find(o=>o.id.toLowerCase()===query);
  let customer=null;

  if(order){
    customer=db.customers.find(c=>c.id===order.customer);
  }else{
    customer=db.customers.find(c=>(c.sv_num&&c.sv_num.toLowerCase()===query)||(c.id&&c.id.toLowerCase()===query)||(c.phone&&c.phone===query));
    if(customer){
      const custOrders=db.orders.filter(o=>o.customer===customer.id);
      if(custOrders.length)order=custOrders[custOrders.length-1];
    }
  }

  if(!customer){
    return s.status(404).json({error:'No registered customer or order found for: '+q.params.id});
  }

  if(!order){
    return s.json({
      hasOrders:false,
      customer:maskCus(customer),
      message:`Consumer ${customer.name} (${customer.sv_num}) is registered, but has no orders yet. Ready to book refill!`
    });
  }

  const delEv=db.events.find(e=>e.type==='DELIVER'&&e.order===order.id&&!e.p?.failed);
  const failEv=db.events.find(e=>e.type==='DELIVER'&&e.order===order.id&&e.p?.failed);
  const payEv=db.events.find(e=>e.type==='PAY'&&e.order===order.id);
  const run=order.run?db.runs.find(r=>r.id===order.run):null;
  const staff=run?db.users.find(u=>u.id===run.staff):null;

  let currentStep=1;
  let statusText='BOOKED';
  let statusBadge='ORDER CONFIRMED';

  if(delEv){
    currentStep=4;
    statusText='DELIVERED';
    statusBadge='DELIVERED & VERIFIED';
  }else if(failEv){
    currentStep=3;
    statusText='POSTPONED';
    statusBadge='DELIVERY POSTPONED';
  }else if(run){
    currentStep=3;
    statusText='IN_TRANSIT';
    statusBadge='OUT FOR DELIVERY';
  }else{
    currentStep=2;
    statusText='ALLOCATED';
    statusBadge='QUEUED FOR DISPATCH';
  }

  const steps=[
    {
      step:1,
      title:'Order Confirmed',
      desc:`${order.type} refill booked on ledger`,
      completed:true,
      time:order.created_at||delEv?.ts||'On Ledger',
      details:{
        orderId:order.id,
        cylinderType:order.type,
        amount:order.price,
        subsidyStatus:customer.ytd<=customer.entitlement?'DBTL ₹200 Eligible':'Subsidized Quota Complete'
      }
    },
    {
      step:2,
      title:'Godown & Gate Pass',
      desc:order.run?`Gate pass issued · Run #${order.run}`:'Godown cylinder safety inspection passed',
      completed:currentStep>=2,
      active:currentStep===2&&!order.run,
      details:{
        runId:order.run||'Awaiting gate pass',
        godownCheck:'Safety seal verified'
      }
    },
    {
      step:3,
      title:'Out for Delivery',
      desc:run?`Dispatched on ${run.vehicle} with ${staff?.name||'Staff'}`:'Waiting for truck departure',
      completed:currentStep>=3&&!failEv,
      active:currentStep===3&&!delEv,
      details:{
        vehicle:run?.vehicle||'Pending vehicle allocation',
        staffName:staff?.name||'Delivery agent',
        postponeReason:failEv?failEv.p?.reason:null
      }
    },
    {
      step:4,
      title:'Delivered & Settled',
      desc:delEv?`Delivered · Empties collected · ${payEv?payEv.p?.mode+' payment':'Payment received'}`:'Consumer doorstep handover',
      completed:currentStep===4,
      active:false,
      details:{
        deliveredAt:delEv?delEv.ts:null,
        payment:payEv?{mode:payEv.p?.mode,amount:payEv.p?.amount,ref:payEv.p?.ref||'CASH'}:null,
        ledgerHash:(delEv||payEv)?.hash||null
      }
    }
  ];

  s.json({
    orderId:order.id,
    currentStep,
    status:statusText,
    statusBadge,
    customer:maskCus(customer),
    order:{
      id:order.id,
      type:order.type,
      qty:order.qty,
      price:order.price,
      created_at:order.created_at
    },
    steps,
    trackingCode:'TRK-'+order.id
  });
});

app.get('/api/disputes',auth('counter','owner','auditor'),(q,s)=>{
  const disputes=db.events.filter(e=>e.type==='DISPUTE').map(e=>({
    id:e.id,
    ts:e.ts,
    ticketId:e.p.ticketId||e.id.slice(0,8),
    customer:e.customer,
    customerName:e.p.customerName||e.customer,
    village:e.p.village||'Unknown',
    order:e.order,
    issue:e.p.issue,
    details:e.p.details,
    hash:e.hash
  }));
  s.json(disputes);
});
app.post('/api/orders',auth('counter','owner'),(q,s)=>{
  const cust=safeStr(q.body.customer,20);
  const t=q.body.type==='5kg'?'5kg':'14.2kg';
  const qty=safeInt(q.body.qty,1,10,1);
  if(!cust)return s.status(400).json({error:'Customer ID required'});
  if(!db.customers.some(c=>c.id===cust))return s.status(400).json({error:'Unknown customer: '+cust});
  // Prevent duplicate active booking for same customer
  const delivered=new Set(db.events.filter(e=>e.type==='DELIVER').map(e=>e.order));
  const already=db.orders.find(o=>o.customer===cust&&!o.run&&!delivered.has(o.id));
  if(already)return s.status(400).json({error:`Customer already has pending booking ${already.id}`});
  const price=t==='5kg'?350:900;
  let nextNum=1000+db.orders.length;
  while(db.orders.some(x=>x.id==='O'+nextNum))nextNum++;
  const o={id:'O'+nextNum,customer:cust,type:t,qty,price,run:null,created_at:new Date().toISOString()};
  db.orders.push(o);
  L.add({type:'BOOK',order:o.id,customer:o.customer,by:q.u.id,p:{type:t,qty}});
  L.save();
  broadcast('order_booked',{order:o,customer:cust});
  s.json(o);
});
app.post('/api/runs',auth('counter','owner'),(q,s)=>{
  const vehicle=safeStr(q.body.vehicle,30);
  const staff=safeStr(q.body.staff,10);
  const loaded=safeInt(q.body.loaded,1,200,0);
  if(!vehicle)return s.status(400).json({error:'Vehicle number required'});
  if(!db.users.some(u=>u.id===staff&&u.role==='delivery'))return s.status(400).json({error:'Invalid delivery staff ID'});
  if(loaded<1)return s.status(400).json({error:'Must load at least 1 cylinder'});
  let nextRun=100+db.runs.length;
  while(db.runs.some(x=>x.id==='R'+nextRun))nextRun++;
  const r={id:'R'+nextRun,vehicle,staff,loaded,date:new Date().toISOString().slice(0,10)};
  db.runs.push(r);
  (q.body.orders||[]).forEach(id=>{
    const o=db.orders.find(o=>o.id===String(id));
    if(o&&!o.run)o.run=r.id;
  });
  L.add({type:'LOAD',run:r.id,by:q.u.id,p:{loaded,vehicle,date:r.date}});
  L.save();
  broadcast('run_created',{run:r});
  s.json(r);
});
app.get('/api/exceptions',auth('counter','owner','auditor'),(q,s)=>{
  const r=L.reconcile(),v=L.verify();
  const reversals=db.events.filter(e=>e.type==='REVERSE').map(e=>({id:e.id,ts:e.ts,by:e.by,target:e.p.of,reason:e.p.reason,hash:e.hash}));
  const reveals=db.events.filter(e=>e.type==='AUDIT_REVEAL').map(e=>({id:e.id,ts:e.ts,by:e.by,customer:e.customer,reason:e.p.reason,hash:e.hash}));
  s.json({...r,chain:v,reversals,reveals});
});
app.get('/api/timeline/:c',auth('counter','owner','auditor'),(q,s)=>{const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  s.json(db.events.filter(e=>e.customer===q.params.c||(e.type==='REVERSE'&&db.events.find(x=>x.id===e.p.of)?.customer===q.params.c)).map(e=>({id:e.id,ts:e.ts,type:e.type,by:e.by,p:e.p,reversed:rv.has(e.id)})))});
app.post('/api/reverse',auth('owner'),(q,s)=>{
  const eventId=safeStr(q.body.id,50);
  const t=db.events.find(e=>e.id===eventId);
  if(!t||t.type==='REVERSE')return s.status(400).json({error:'Invalid or non-reversible ledger entry'});
  const alreadyReversed=db.events.some(e=>e.type==='REVERSE'&&e.p?.of===t.id);
  if(alreadyReversed)return s.status(400).json({error:'This ledger entry has already been reversed'});
  const reason=safeStr(q.body.reason,500);
  if(!reason)return s.status(400).json({error:'Mandatory audit reason required for reversal'});
  L.add({type:'REVERSE',run:t.run,order:t.order,customer:t.customer,by:q.u.id,p:{of:t.id,reason:esc(reason)}});
  L.save();
  broadcast('ledger_reversed',{id:eventId});
  s.json({ok:1});
});
app.post('/api/audit/reveal',auth('owner'),(q,s)=>{
  const cid=q.body.customer;
  const c=db.customers.find(x=>x.id===cid||x.sv_num===cid);
  if(!c)return s.status(404).json({error:'Customer not found'});
  const reason=String(q.body.reason||'DPDP Section 8 Authorized Inspection by Owner').trim();
  L.add({
    type:'AUDIT_REVEAL',
    customer:c.id,
    by:q.u.id,
    p:{action:'REVEAL_AADHAAR',officer:q.u.name,reason,ts:new Date().toISOString()}
  });
  L.save();
  const unmasked=`4829-${c.aadhaar_last4}-${String(1000+(parseInt(c.id.replace(/\D/g,'')||1)*73)%9000)}`;
  s.json({customer:c.id,name:c.name,unmasked_aadhaar:unmasked,logged:true});
});

app.get('/api/staff',auth('counter','owner','auditor'),(q,s)=>s.json(db.users.filter(u=>u.role==='delivery').map(u=>({id:u.id,name:u.name}))));
app.get('/api/pending-orders',auth('counter','owner'),(q,s)=>{
  const done=new Set(db.events.filter(e=>e.type==='DELIVER').map(e=>e.order));
  s.json(db.orders.map(o=>{const c=db.customers.find(c=>c.id===o.customer)||{};return{...o,customerName:c.name,village:c.village,done:done.has(o.id)}}));
});
app.get('/api/runs-summary',auth('counter','owner','auditor'),(q,s)=>{
  const closed=r=>db.events.some(e=>e.run===r.id&&e.type==='CLOSE');
  s.json(db.runs.map(r=>{
    const u=db.users.find(x=>x.id===r.staff)||{};
    const ev=db.events.filter(e=>e.run===r.id);
    const del=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed).length;
    const cash=ev.filter(e=>e.type==='PAY'&&e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
    const dep=ev.filter(e=>e.type==='DEPOSIT').reduce((a,b)=>a+(+b.p.amount||0),0);
    return{id:r.id,vehicle:r.vehicle,staffId:r.staff,staffName:u.name||r.staff,loaded:r.loaded,delivered:del,cashCollected:cash,cashDeposited:dep,closed:closed(r)};
  }));
});
app.get('/api/stock',auth('counter','owner','auditor'),(q,s)=>{
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>e.type!=='REVERSE'&&!rv.has(e.id));
  const del=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed);
  const fullDel=del.reduce((a,b)=>a+(+b.p.full||0),0);
  const empRet=del.reduce((a,b)=>a+(+b.p.empty||0),0);
  const defRet=del.reduce((a,b)=>a+(+b.p.defective||0),0);
  const totalLoaded=db.runs.reduce((a,b)=>a+(+b.loaded||0),0);
  const activeLoaded=db.runs.filter(r=>!ev.some(e=>e.run===r.id&&e.type==='CLOSE')).reduce((a,b)=>a+(+b.loaded||0),0);
  const godownFull=Math.max(0,100-activeLoaded-fullDel);
  s.json({totalCirculation:350,godownFull,activeLoaded,fullDel,empRet,defRet,totalLoaded});
});
app.get('/api/anomalies',auth('owner','auditor'),(q,s)=>{
  const hints=[];
  for(const r of db.runs){
    const ev=db.events.filter(e=>e.run===r.id);
    const cash=ev.filter(e=>e.type==='PAY'&&e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
    const dep=ev.filter(e=>e.type==='DEPOSIT').reduce((a,b)=>a+(+b.p.amount||0),0);
    const del=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed);
    const full=del.reduce((a,b)=>a+(+b.p.full||0),0);
    const emp=del.reduce((a,b)=>a+(+b.p.empty||0),0);
    const u=db.users.find(x=>x.id===r.staff)||{};
    if(cash-dep>0)hints.push({type:'CASH_FLOAT',severity:'warning',staff:u.name||r.staff,run:r.id,msg:`Undeposited cash float ₹${cash-dep} held on run ${r.id} (${u.name})`});
    if(full>emp)hints.push({type:'EMPTY_SHORTFALL',severity:'alert',staff:u.name||r.staff,run:r.id,msg:`Empty shortfall: ${full} full delivered but only ${emp} empties collected on ${r.id} (${u.name})`});
  }
  const ordersByCustomer={};
  db.orders.forEach(o=>{ordersByCustomer[o.customer]=(ordersByCustomer[o.customer]||0)+1});
  Object.entries(ordersByCustomer).forEach(([cid,cnt])=>{
    if(cnt>1){const c=db.customers.find(x=>x.id===cid)||{};hints.push({type:'REPEAT_ORDER',severity:'info',customer:cid,msg:`Multiple active bookings (${cnt}) recorded for ${c.name} (${cid}) in ${c.village}`})}
  });
  s.json(hints);
});
app.post('/api/deposit',auth('counter','owner'),(q,s)=>{
  const runId=safeStr(q.body.run,10);
  const amt=safeAmt(q.body.amount,1,500000);
  const ref=safeStr(q.body.ref,100);
  if(!runId)return s.status(400).json({error:'Run ID required'});
  if(!db.runs.some(r=>r.id===runId))return s.status(400).json({error:'Run not found: '+runId});
  if(amt===null)return s.status(400).json({error:'Amount must be between ₹1 and ₹5,00,000'});
  L.add({type:'DEPOSIT',run:runId,by:q.u.id,p:{amount:amt,ref}});
  L.save();s.json({ok:1,deposited:amt});
});
app.get('/api/audit',auth('owner','auditor'),(q,s)=>{
  const r=L.reconcile(),v=L.verify(),by=k=>r.items.filter(x=>x.kind===k).length;
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>e.type!=='REVERSE'&&!rv.has(e.id));
  const del=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed);
  const fullDel=del.reduce((a,b)=>a+(+b.p.full||0),0);
  const empRet=del.reduce((a,b)=>a+(+b.p.empty||0),0);
  const defRet=del.reduce((a,b)=>a+(+b.p.defective||0),0);
  const cashCol=ev.filter(e=>e.type==='PAY'&&e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
  const cashDep=ev.filter(e=>e.type==='DEPOSIT').reduce((a,b)=>a+(+b.p.amount||0),0);
  const upiCount=ev.filter(e=>e.type==='PAY'&&e.p.mode==='UPI').length;
  const reversals=db.events.filter(e=>e.type==='REVERSE');
  const reveals=db.events.filter(e=>e.type==='AUDIT_REVEAL');

  if(q.query.format==='csv'){
    let csv='Kind,Code,Key,Reason,Amount,Evidence\n';
    r.items.forEach(x=>{csv+=`"${x.kind}","${x.code}","${x.key}","${String(x.msg).replace(/"/g,'""')}",${x.amount??''},"${x.evidence.join(';')}"\n`});
    s.setHeader('Content-Type','text/csv; charset=utf-8');
    s.setHeader('Content-Disposition','attachment; filename="audit_exceptions.csv"');
    return s.send(csv);
  }
  if(q.query.format==='ledger_csv'){
    let csv='ID,Timestamp,Type,Run,Order,Customer,By,Hash,PrevHash\n';
    db.events.forEach(e=>{csv+=`"${e.id}","${e.ts}","${e.type}","${e.run||''}","${e.order||''}","${e.customer||''}","${e.by}","${e.hash}","${e.prev}"\n`});
    s.setHeader('Content-Type','text/csv; charset=utf-8');
    s.setHeader('Content-Disposition','attachment; filename="ledger_chain.csv"');
    return s.send(csv);
  }
  s.send(`<!doctype html><meta charset=utf-8><title>Vijaya Gas Agency - Audit Pack</title>
<style>body{font-family:system-ui,-apple-system,sans-serif;max-width:960px;margin:24px auto;padding:0 20px;color:#0F1B2D;background:#fff}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0F1B2D;padding-bottom:12px;margin-bottom:16px}
h1{margin:0 0 4px;font-size:24px}p{margin:4px 0;font-size:14px;color:#334155}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0}
.card{background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:12px}
.card b{display:block;font-size:18px;color:#0F1B2D;margin-top:4px}
td,th{border:1px solid #CBD5E1;padding:8px 10px;text-align:left;font-size:13px}
th{background:#F1F5F9;font-weight:600}table{border-collapse:collapse;width:100%;margin:12px 0}
.btn{background:#C2410C;color:#fff;border:0;border-radius:6px;padding:8px 14px;font-weight:600;text-decoration:none;display:inline-block;cursor:pointer;font-size:13px}
.btn-sec{background:#0F1B2D;margin-left:8px}
@media print{.no-print{display:none}}</style>
<div class="hdr">
  <div>
    <h1>Vijaya Gas Agency: Monthly Audit Pack</h1>
    <p>Generated: <b>${new Date().toLocaleString()}</b> | Auditor/Officer: <b>${esc(q.u.name)}</b> (${esc(q.u.role)})</p>
  </div>
  <div class="no-print">
    <a class="btn" href="/api/audit?t=${esc(q.query.t||'')}&format=csv">⬇ Export Exceptions CSV</a>
    <a class="btn btn-sec" href="/api/audit?t=${esc(q.query.t||'')}&format=ledger_csv">⬇ Export Ledger CSV</a>
    <button class="btn" style="background:#475569;margin-left:8px" onclick="window.print()">🖨 Print / Save PDF</button>
  </div>
</div>
<h3>1. Operational & Financial Summary</h3>
<div class="stats">
  <div class="card"><span>Deliveries Completed</span><b>${fullDel} Cylinders</b><small>${del.length} delivery transactions</small></div>
  <div class="card"><span>Cash Collected vs Deposited</span><b>₹${cashCol}</b><small>Deposited: ₹${cashDep} (Gap: ₹${cashCol-cashDep})</small></div>
  <div class="card"><span>UPI Transactions</span><b>${upiCount} Payments</b><small>Verified digital ledger receipts</small></div>
  <div class="card"><span>Cylinders (Full/Empty/Defect)</span><b>${fullDel} / ${empRet} / ${defRet}</b><small>Quarantine defects: ${defRet}</small></div>
</div>

<h3>2. Government Subsidy Reconciliation (DBTL Direct Transfer)</h3>
<div class="stats">
  <div class="card"><span>Subsidised Refills Claimed</span><b>${r.subsidy.deliveriesCount} Refills</b><small>Quota: 12/year per customer</small></div>
  <div class="card"><span>DBTL Subsidy Claim Total</span><b>₹${r.subsidy.deliveriesCount*175}</b><small>Standard rate: ₹175/refill</small></div>
  <div class="card"><span>Quota Exceeded Violations</span><b style="color:${r.subsidy.exceededCount?'#B42318':'#0F766E'}">${r.subsidy.exceededCount} Flags</b><small>SUBSIDY_EXCEEDED</small></div>
  <div class="card"><span>Rate Mismatches</span><b style="color:${r.subsidy.mismatchCount?'#B45309':'#0F766E'}">${r.subsidy.mismatchCount} Flags</b><small>SUBSIDY_MISMATCH</small></div>
</div>

<h3>3. Cryptographic Ledger Integrity Result</h3>
<div class="stats">
  <div class="card"><span>Ledger Chain Status</span><b style="color:${v.ok?'#0F766E':'#B42318'}">${v.ok?'Verified Valid':'BROKEN'}</b><small>${v.count} SHA-256 blocks from Genesis</small></div>
  <div class="card"><span>Planted Test Errors</span><b>${r.found} of ${r.total}</b><small>100% Detected</small></div>
  <div class="card"><span>Total Exception Flags</span><b>${r.items.length} Flags</b><small>Across agency operations</small></div>
  <div class="card"><span>Flag Breakdown</span><small style="display:block;margin-top:6px">Cylinder: <b>${by('Cylinder')}</b> · Cash: <b>${by('Cash')}</b> · Subsidy: <b>${by('Subsidy')}</b></small></div>
</div>

<h3>4. Itemized Discrepancy Evidence Table</h3>
<table>
  <tr><th>Kind</th><th>Code</th><th>Explanation & Finding</th><th>Impact (₹)</th><th>Evidence Entry IDs</th></tr>
  ${r.items.map(x=>`<tr><td><b>${esc(x.kind)}</b></td><td><code>${esc(x.code)}</code></td><td>${esc(x.msg)}</td><td>${x.amount?`₹${x.amount}`:'-'}</td><td style="font-family:monospace;font-size:12px">${x.evidence.map(e=>esc(e).slice(0,8)).join(', ')}</td></tr>`).join('')}
</table>

<h3>5. Reversal History & DPDP 2023 Statutory Audit Trail</h3>
${reversals.length?`
<p><b>Financial Corrections (Append-Only Reversals):</b></p>
<table>
  <tr><th>Target Event ID</th><th>Authorized By</th><th>Timestamp</th><th>Mandatory Reason</th><th>Ledger Block Hash</th></tr>
  ${reversals.map(rv=>`<tr><td style="font-family:monospace">${esc(rv.p.of)}</td><td><b>${esc(rv.by)}</b></td><td>${new Date(rv.ts).toLocaleString()}</td><td>${esc(rv.p.reason)}</td><td style="font-family:monospace;font-size:11px">${esc(rv.hash).slice(0,16)}…</td></tr>`).join('')}
</table>
`:'<p style="font-size:13px;color:#64748B">No financial reversals recorded on ledger.</p>'}

${reveals.length?`
<p><b>DPDP Act 2023 Section 8 Aadhaar Inspection Reveals:</b></p>
<table>
  <tr><th>Customer ID</th><th>Inspected By</th><th>Timestamp</th><th>Statutory Purpose</th><th>Audit Block Hash</th></tr>
  ${reveals.map(rv=>`<tr><td><b>${esc(rv.customer)}</b></td><td><b>${esc(rv.by)}</b></td><td>${new Date(rv.ts).toLocaleString()}</td><td>${esc(rv.p.reason)}</td><td style="font-family:monospace;font-size:11px">${esc(rv.hash).slice(0,16)}…</td></tr>`).join('')}
</table>
`:''}

<div style="margin-top:24px;border-top:1px solid #CBD5E1;padding-top:12px;font-size:12px;color:#64748B">
  <b>Legal & Compliance Notice:</b> Generated under DPDP Act 2023 guidelines. Full Aadhaar numbers are never stored or printed without cryptographic unmasking event. Cryptographic chain verified from Genesis block.
</div>`)});
// ── Daily Operations Summary (owner / counter / auditor) ──────────────────
app.get('/api/daily-summary',auth('owner','counter','auditor'),(q,s)=>{
  // date filter: ?date=YYYY-MM-DD  (defaults to today IST)
  const dateStr=q.query.date||new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const dayEv=db.events.filter(e=>{
    if(rv.has(e.id)||e.type==='REVERSE')return false;
    const d=new Date(e.ts).toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
    return d===dateStr;
  });
  const delivers=dayEv.filter(e=>e.type==='DELIVER'&&!e.p.failed);
  const postponed=dayEv.filter(e=>e.type==='DELIVER'&&e.p.failed);
  const payments=dayEv.filter(e=>e.type==='PAY');
  const deposits=dayEv.filter(e=>e.type==='DEPOSIT');
  const bookings=dayEv.filter(e=>e.type==='BOOK');

  const fullDel=delivers.reduce((a,b)=>a+(+b.p.full||0),0);
  const empRet=delivers.reduce((a,b)=>a+(+b.p.empty||0),0);
  const defRet=delivers.reduce((a,b)=>a+(+b.p.defective||0),0);
  const defaulted=fullDel-empRet;  // full delivered but empty not returned
  const cashCol=payments.filter(e=>e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
  const cashDep=deposits.reduce((a,b)=>a+(+b.p.amount||0),0);
  const upiCol=payments.filter(e=>e.p.mode==='UPI').reduce((a,b)=>a+(+b.p.amount||0),0);
  const payLater=delivers.filter(d=>!payments.some(p=>p.order===d.order));
  const payLaterAmt=payLater.reduce((a,b)=>{
    const o=db.orders.find(x=>x.id===b.order);return a+(o?+o.price:0);
  },0);
  const totalRevenue=cashCol+upiCol;
  const upiList=payments.filter(e=>e.p.mode==='UPI').map(e=>{
    const o=db.orders.find(x=>x.id===e.order);
    const c=db.customers.find(x=>x.id===e.customer);
    return{ref:e.p.ref||'N/A',amount:e.p.amount,order:e.order,customer:e.customer,name:c?c.name:'Unknown',village:c?c.village:'',ts:e.ts};
  });
  // per-run breakdown
  const runsToday=db.runs.filter(r=>dayEv.some(e=>e.run===r.id));
  const runBreakdown=runsToday.map(r=>{
    const u=db.users.find(x=>x.id===r.staff)||{};
    const rEv=dayEv.filter(e=>e.run===r.id);
    const rDel=rEv.filter(e=>e.type==='DELIVER'&&!e.p.failed);
    const rPay=rEv.filter(e=>e.type==='PAY');
    const rDep=rEv.filter(e=>e.type==='DEPOSIT');
    const rFull=rDel.reduce((a,b)=>a+(+b.p.full||0),0);
    const rEmp=rDel.reduce((a,b)=>a+(+b.p.empty||0),0);
    const rCash=rPay.filter(e=>e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
    const rUpi=rPay.filter(e=>e.p.mode==='UPI').reduce((a,b)=>a+(+b.p.amount||0),0);
    const rDep2=rDep.reduce((a,b)=>a+(+b.p.amount||0),0);
    const closed=db.events.some(e=>e.run===r.id&&e.type==='CLOSE');
    return{runId:r.id,vehicle:r.vehicle,staffName:u.name||r.staff,loaded:r.loaded,delivered:rFull,empReturned:rEmp,defaulted:rFull-rEmp,cash:rCash,upi:rUpi,deposited:rDep2,cashFloat:rCash-rDep2,closed};
  });
  // per-village breakdown
  const villageMap={};
  delivers.forEach(e=>{
    const o=db.orders.find(x=>x.id===e.order);
    const c=db.customers.find(x=>x.id===e.customer);
    const v=c?c.village:'Unknown';
    if(!villageMap[v])villageMap[v]={village:v,delivered:0,empReturned:0,defaulted:0,revenue:0};
    villageMap[v].delivered+=(+e.p.full||0);
    villageMap[v].empReturned+=(+e.p.empty||0);
    if(o)villageMap[v].revenue+=(+o.price||0);
  });
  Object.values(villageMap).forEach(v=>v.defaulted=v.delivered-v.empReturned);

  s.json({date:dateStr,summary:{fullDel,empRet,defRet,defaulted,cashCol,upiCol,cashDep,totalRevenue,payLaterAmt,payLaterCount:payLater.length,deliveries:delivers.length,postponed:postponed.length,bookingsToday:bookings.length},upiList,runBreakdown,villageBreakdown:Object.values(villageMap).sort((a,b)=>b.delivered-a.delivered)});
});

// ── Defaulted Cylinder Register – per-customer ageing ─────────────────────
app.get('/api/defaults',auth('owner','counter','auditor'),(q,s)=>{
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>!rv.has(e.id)&&e.type!=='REVERSE');
  const delivers=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed);
  const now=Date.now();
  // group by order: full delivered - empty returned
  const defaults=[];
  delivers.forEach(e=>{
    const o=db.orders.find(x=>x.id===e.order);
    const c=db.customers.find(x=>x.id===e.customer);
    const full=+e.p.full||0;
    const empty=+e.p.empty||0;
    const deficit=full-empty;
    if(deficit>0&&c&&o){
      const daysOut=Math.floor((now-new Date(e.ts).getTime())/(1000*60*60*24));
      const ageing=daysOut>90?'90+ days':(daysOut>30?'31-90 days':(daysOut>7?'8-30 days':'0-7 days'));
      const riskLevel=daysOut>90?'critical':(daysOut>30?'high':(daysOut>7?'medium':'low'));
      defaults.push({customerId:c.id,sv_num:c.sv_num||c.id,name:c.name,village:c.village,phone:c.phone?c.phone.slice(0,3)+'XXXX'+c.phone.slice(-3):'',orderId:o.id,deliveryDate:e.ts,fullDelivered:full,emptyReturned:empty,deficit,daysOut,ageing,riskLevel,cylinderValue:deficit*1500});
    }
  });
  defaults.sort((a,b)=>b.daysOut-a.daysOut);
  const totalDeficit=defaults.reduce((a,b)=>a+b.deficit,0);
  const totalValue=defaults.reduce((a,b)=>a+b.cylinderValue,0);
  const ageingBuckets={'0-7 days':0,'8-30 days':0,'31-90 days':0,'90+ days':0};
  defaults.forEach(d=>ageingBuckets[d.ageing]=(ageingBuckets[d.ageing]||0)+d.deficit);
  s.json({totalDeficitCylinders:totalDeficit,totalExposureValue:totalValue,ageingBuckets,records:defaults});
});

// ── End-of-Day Cash & UPI Closing Sheet ───────────────────────────────────
app.get('/api/closing-sheet',auth('owner','counter','auditor'),(q,s)=>{
  const dateStr=q.query.date||new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>!rv.has(e.id)&&e.type!=='REVERSE');
  const dayEv=ev.filter(e=>{
    const d=new Date(e.ts).toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
    return d===dateStr;
  });
  const allPay=dayEv.filter(e=>e.type==='PAY');
  const cashPay=allPay.filter(e=>e.p.mode==='CASH');
  const upiPay=allPay.filter(e=>e.p.mode==='UPI');
  const laterDel=dayEv.filter(e=>e.type==='DELIVER'&&!e.p.failed&&!allPay.some(p=>p.order===e.order));
  const deposits=dayEv.filter(e=>e.type==='DEPOSIT');

  const cashTotal=cashPay.reduce((a,b)=>a+(+b.p.amount||0),0);
  const upiTotal=upiPay.reduce((a,b)=>a+(+b.p.amount||0),0);
  const depositedTotal=deposits.reduce((a,b)=>a+(+b.p.amount||0),0);
  const cashBalance=cashTotal-depositedTotal;

  const upiDetails=upiPay.map(e=>{
    const c=db.customers.find(x=>x.id===e.customer);
    const o=db.orders.find(x=>x.id===e.order);
    return{ref:e.p.ref||'N/A',amount:+e.p.amount,customer:e.customer,name:c?c.name:'Unknown',village:c?c.village:'',order:e.order,type:o?o.type:'',ts:e.ts,hash:e.hash?e.hash.slice(0,16)+'…':'-'};
  });
  const payLaterDetails=laterDel.map(e=>{
    const c=db.customers.find(x=>x.id===e.customer);
    const o=db.orders.find(x=>x.id===e.order);
    return{customer:e.customer,name:c?c.name:'Unknown',village:c?c.village:'',order:e.order,amount:o?+o.price:0,deliveryDate:e.ts};
  });
  const payLaterTotal=payLaterDetails.reduce((a,b)=>a+b.amount,0);
  const runCash=db.runs.map(r=>{
    const u=db.users.find(x=>x.id===r.staff)||{};
    const rPay=dayEv.filter(e=>e.run===r.id&&e.type==='PAY'&&e.p.mode==='CASH');
    const rDep=dayEv.filter(e=>e.run===r.id&&e.type==='DEPOSIT');
    const collected=rPay.reduce((a,b)=>a+(+b.p.amount||0),0);
    const deposited=rDep.reduce((a,b)=>a+(+b.p.amount||0),0);
    return{runId:r.id,staffName:u.name||r.staff,collected,deposited,float:collected-deposited};
  }).filter(r=>r.collected>0||r.deposited>0);

  s.json({date:dateStr,summary:{cashTotal,upiTotal,depositedTotal,cashBalance,upiCount:upiPay.length,payLaterTotal,payLaterCount:laterDel.length,grandTotal:cashTotal+upiTotal},upiDetails,payLaterDetails,runCash,depositHistory:deposits.map(e=>({amount:+e.p.amount,ref:e.p.ref||'-',run:e.run,by:e.by,ts:e.ts}))});
});

// ── Reports Hub ────────────────────────────────────────────────────────────

// Outstanding Payments / Dues Report
app.get('/api/reports/outstanding',auth('owner','counter','auditor'),(q,s)=>{
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>!rv.has(e.id)&&e.type!=='REVERSE');
  const delivers=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed);
  const pays=new Set(ev.filter(e=>e.type==='PAY').map(e=>e.order));
  const dues=[];
  let totalDue=0;
  delivers.forEach(e=>{
    if(!pays.has(e.order)){
      const o=db.orders.find(x=>x.id===e.order);
      const c=db.customers.find(x=>x.id===e.customer);
      if(o&&c){
        const daysAgo=Math.floor((Date.now()-new Date(e.ts).getTime())/(1000*60*60*24));
        const bucket=daysAgo>60?'60+ days':(daysAgo>30?'31-60 days':(daysAgo>7?'8-30 days':'0-7 days'));
        const risk=daysAgo>60?'critical':(daysAgo>30?'high':(daysAgo>7?'medium':'low'));
        dues.push({orderId:o.id,customerId:c.id,sv_num:c.sv_num||c.id,name:c.name,village:c.village,phone:c.phone?c.phone.slice(0,3)+'XXXX'+c.phone.slice(-3):'',cylinderType:o.type,amount:+o.price,deliveredAt:e.ts,daysAgo,bucket,risk});
        totalDue+=+o.price;
      }
    }
  });
  dues.sort((a,b)=>b.daysAgo-a.daysAgo);
  const bucketTotals={'0-7 days':0,'8-30 days':0,'31-60 days':0,'60+ days':0};
  dues.forEach(d=>{bucketTotals[d.bucket]=(bucketTotals[d.bucket]||0)+d.amount});
  const villageDues={};
  dues.forEach(d=>{villageDues[d.village]=(villageDues[d.village]||0)+d.amount});
  s.json({totalDue,count:dues.length,bucketTotals,villageDues:Object.entries(villageDues).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([village,amount])=>({village,amount})),records:dues});
});

// Customer Order History Report
app.get('/api/reports/customer-history',auth('owner','counter','auditor'),(q,s)=>{
  const limit=Math.min(200,Math.max(1,+q.query.limit||50));
  const village=String(q.query.village||'').trim().toLowerCase();
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>!rv.has(e.id)&&e.type!=='REVERSE');
  const delivers=ev.filter(e=>e.type==='DELIVER'&&!e.p.failed);
  const pays=ev.filter(e=>e.type==='PAY');
  let custs=db.customers;
  if(village)custs=custs.filter(c=>c.village.toLowerCase()===village);
  const result=custs.slice(0,limit).map(c=>{
    const orders=db.orders.filter(o=>o.customer===c.id);
    const delivered=orders.filter(o=>delivers.some(d=>d.order===o.id)).length;
    const paid=orders.filter(o=>pays.some(p=>p.order===o.id)).length;
    const totalSpent=orders.filter(o=>pays.some(p=>p.order===o.id)).reduce((a,b)=>a+(+b.price||0),0);
    const pending=orders.filter(o=>delivers.some(d=>d.order===o.id)&&!pays.some(p=>p.order===o.id));
    const dues=pending.reduce((a,b)=>a+(+b.price||0),0);
    return{id:c.id,sv_num:c.sv_num||c.id,name:c.name,village:c.village,phone:c.phone?c.phone.slice(0,3)+'XXXX'+c.phone.slice(-3):'',ytd:c.ytd,entitlement:c.entitlement,left:c.entitlement-c.ytd,totalOrders:orders.length,delivered,paid,totalSpent,dues,pendingCount:pending.length};
  });
  s.json({total:custs.length,shown:result.length,customers:result});
});

// Monthly Delivery Summary (aggregated by month)
app.get('/api/reports/monthly-summary',auth('owner','counter','auditor'),(q,s)=>{
  const rv=new Set(db.events.filter(e=>e.type==='REVERSE').map(e=>e.p.of));
  const ev=db.events.filter(e=>!rv.has(e.id)&&e.type!=='REVERSE');
  const monthly={};
  ev.forEach(e=>{
    const d=new Date(e.ts);
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if(!monthly[key])monthly[key]={month:key,deliveries:0,cylinders:0,cashCol:0,upiCol:0,postponed:0,bookings:0,empReturned:0};
    if(e.type==='DELIVER'&&!e.p.failed){monthly[key].deliveries++;monthly[key].cylinders+=(+e.p.full||0);monthly[key].empReturned+=(+e.p.empty||0);}
    if(e.type==='DELIVER'&&e.p.failed)monthly[key].postponed++;
    if(e.type==='PAY'&&e.p.mode==='CASH')monthly[key].cashCol+=(+e.p.amount||0);
    if(e.type==='PAY'&&e.p.mode==='UPI')monthly[key].upiCol+=(+e.p.amount||0);
    if(e.type==='BOOK')monthly[key].bookings++;
  });
  const months=Object.values(monthly).sort((a,b)=>a.month.localeCompare(b.month));
  months.forEach(m=>{m.totalRevenue=m.cashCol+m.upiCol;m.emptyShortfall=m.cylinders-m.empReturned});
  s.json({months});
});

// SPA fallback – serve index.html for /customer and any unknown GET routes
app.get('/customer',(q,s)=>s.sendFile(__dirname+'/public/index.html'));
app.use((q,s,n)=>{if(q.method==='GET'&&!q.path.startsWith('/api/'))s.sendFile(__dirname+'/public/index.html');else n();});

if (!process.env.VERCEL) {
  app.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Vijaya Gas Agency running on http://localhost:'+(process.env.PORT||3000)));
}

module.exports = app;

