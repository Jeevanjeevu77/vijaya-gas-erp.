const L=require('./lib'),db=L.db,pad=i=>String(i).padStart(3,'0');
const N=['Lakshmi','Mahesh','Anitha','Govinda','Kavya','Ramesh','Suma','Prakash','Shobha','Manju','Roopa','Naveen','Vani','Chandru','Deepa','Harish','Geetha','Kiran','Latha','Mohan'];
const V=['Rampur','Kalale','Hunsur','Bilikere','Nanjangud'];
const V30=['Rampur','Kalale','Hunsur','Bilikere','Nanjangud','Sargur','T.Narsipur','Gundlupet','HD Kote','Begur','Tagadur','Hadinaru','Suttur','Bannur','Sosale','Mugur','Aloka','Kowlande','Chamarajanagar','Yelandur','Santhemarahalli','Terakanambi','Kollegal','Hanur','Mamballi','Saligrama','K.R.Nagar','Mirle','Bettadapura','Periyapatna'];
const FN=['Lakshmi','Mahesh','Anitha','Govinda','Kavya','Ramesh','Suma','Prakash','Shobha','Manju','Roopa','Naveen','Vani','Chandru','Deepa','Harish','Geetha','Kiran','Latha','Mohan','Shivanna','Parvathi','Devendra','Radha','Somesh','Basavaraj','Shanthamma','Ningappa','Puttamma','Suresh'];
const LN=['Gowda','Kumar','Patil','Shetty','Bhat','Naik','Acharya','Poojary','Hegde','Rao'];
for(let i=1;i<=20;i++)db.customers.push({id:'C'+pad(i),sv_num:'SV-'+(100000+i),name:N[i-1],village:V[i%5],phone:'98450'+String(10000+i),entitlement:12,ytd:i===7?12:(i%6)+2,aadhaar_last4:String(1000+i*37).slice(-4)});
for(let i=21;i<=30000;i++){
  const pad5=String(i).padStart(5,'0'),sv='SV-'+(100000+i),fn=FN[i%FN.length],ln=LN[Math.floor(i/7)%LN.length],v=V30[i%V30.length];
  db.customers.push({id:'C'+pad5,sv_num:sv,name:fn+' '+ln,village:v,phone:'9'+String(800000000+(i*31337)%199999999),entitlement:12,ytd:(i%7)+1,aadhaar_last4:String(1000+(i*37)%9000).slice(-4)});
}
const cr=require('crypto'),salt='vga_secure_salt_2026';
const hashPin=p=>cr.scryptSync(p,salt,32).toString('hex');
db.users.push(
  {id:'U1',name:'Ravi',role:'delivery',salt,pin_hash:hashPin('1111'),pin:'1111'},
  {id:'U2',name:'Meena',role:'counter',salt,pin_hash:hashPin('2222'),pin:'2222'},
  {id:'U3',name:'Suresh',role:'owner',salt,pin_hash:hashPin('3333'),pin:'3333'},
  {id:'U4',name:'Anil',role:'auditor',salt,pin_hash:hashPin('4444'),pin:'4444'}
);
db.runs.push({id:'R1',vehicle:'VH-03',staff:'U1',loaded:12},{id:'R2',vehicle:'VH-01',staff:'U1',loaded:3});
for(let i=1;i<=12;i++)if(i!==10)db.orders.push({id:'O'+pad(i),customer:'C'+pad(i===15?7:i),type:'14.2kg',qty:1,price:900,run:'R1'});
for(let i=13;i<=15;i++)db.orders.push({id:'O'+pad(i+88),customer:'C'+pad(i),type:'14.2kg',qty:1,price:900,run:'R2'});
let cash=0;const by='U1',run='R1';
for(let i=1;i<=12;i++){
  const order='O'+pad(i),customer='C'+pad(i);
  L.add({type:'DELIVER',run,order,customer,by,p:{full:1,empty:i===3?0:1,defective:i===12?1:0}});
  if(i===5)continue;
  const upi=i===8||i===9,amount=i===6?800:900;
  L.add({type:'PAY',run,order,customer,by,p:{mode:upi?'UPI':'CASH',amount,ref:upi?'UPI778':undefined}});
  if(!upi)cash+=amount;
}
for(let i=1;i<=12;i++)L.add({type:'SUBCREDIT',customer:'C'+pad(i),by:'PORTAL',p:{refills:i===2?2:1}});
L.add({type:'CLOSE',run,by,p:{unsold:1,empties:10,defective:0,cash}});
L.add({type:'DEPOSIT',run,by:'U2',p:{amount:cash-900}});
db.planted=[['CYL_SWAP','O003'],['CYL_FULL','R1'],['CYL_EMPTY_COUNT','R1'],['CYL_DEFECT','R1'],['NO_PAYMENT','O005'],['AMOUNT_MISMATCH','O006'],['DUP_UPI','UPI778'],['NO_BOOKING','O010'],['SUB_OVER','C007'],['SUB_MISMATCH','C002'],['CASH_DEPOSIT','R1']].map(([code,key])=>({code,key}));
L.save();console.log('Seeded:',db.customers.length,'customers,',db.events.length,'ledger entries,',db.planted.length,'planted errors');
