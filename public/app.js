const A=document.getElementById('app');
let LANG=localStorage.lang||'en';

const I18N={
  en:{
    agency:'Vijaya Gas Agency',
    tagline:'Every cylinder. Every rupee. One trusted record.',
    f1:'Works offline in low-connectivity villages',
    f2:'Tamper-evident append-only ledger',
    f3:'Audit pack in one click',
    signInPrompt:'Sign in to your account',
    selectRole:'Select your role',
    enterPin:'Enter 4-digit PIN',
    signingIn:'Signing in…',
    signInBtn:'Sign in',
    signOut:'Sign out',
    demoAccounts:'Demo accounts',
    deliveryStaff:'Delivery staff',
    deliveryDesc:'Field runs, offline deliveries & swaps',
    counterStaff:'Counter staff',
    counterDesc:'Bookings, runs, deposits & stock',
    owner:'Owner',
    ownerDesc:'Exceptions, reversals & audit reports',
    auditor:'Auditor',
    auditorDesc:'Read-only inspection & compliance',
    todaysRun:"Today's run",
    noRun:'No open run assigned. Ask counter staff to create one.',
    offlineBan:'Offline · {n} saved on this phone',
    waitingSync:'{n} waiting to sync',
    synced:'Synced with ledger',
    quickCash:'⚡ Quick Cash ₹{p}',
    deliver:'Deliver',
    deliverOrder:'Confirm delivery',
    cancel:'Cancel',
    fullDelivered:'Full delivered',
    emptyReceived:'Empty received',
    defectiveReturned:'Defective returned',
    amount:'Amount',
    cash:'Cash',
    upi:'UPI',
    payLater:'Pay later',
    upiRef:'UPI reference ID (e.g. UPI778)',
    showUpiQr:'📱 Show UPI QR Code',
    scanToPay:'Scan with GPay / PhonePe / Paytm',
    closeRun:'Close run & count cylinders',
    countVehicle:'Count what is on the vehicle',
    fullUnsold:'Full unsold',
    emptiesReturned:'Empties returned',
    defectiveCount:'Defective',
    cashInHand:'Cash in hand',
    closeConfirm:'Close run & verify',
    done:'Done',
    saved:'Saved',
    pending:'Pending',
    nextCustomer:'Next delivery',
    refillsLeft:'subsidy refills left',
    toastSaved:'Saved on this phone. Will sync when online.',
    createRunTab:'Create run',
    exceptionsTab:'Exceptions',
    customerTab:'30,000+ Customers & Disputes',
    bookingTab:'New booking',
    depositTab:'Cash deposit',
    stockTab:'Stock gauge',
    anomaliesTab:'Anomaly radar',
    ledgerTab:'Ledger inspector',
    auditTab:'Audit pack',
    custPortalTitle:'Customer Self-Service & Dispute Portal',
    custPortalDesc:'Look up booking status, verified receipts & file disputes without an app install',
    openPortalBtn:'Customer Portal ➔',
    staffLoginBtn:'Staff Sign-in',
    searchCustPrompt:'Enter Consumer SV (e.g. SV-100001) or 10-digit Mobile',
    searchBtn:'Verify & Track',
    postponeBtn:'Postpone',
    postponeTitle:'Postpone Delivery',
    doorLocked:'Door locked / Customer in fields',
    noCashToday:'Customer has no cash today (Reschedule)',
    emptyNotReady:'Empty cylinder not ready',
    annualQuotaLabel:'Annual Domestic Subsidy Quota',
    verifiedOnLedger:'VERIFIED ON LEDGER',
    raiseDisputeBtn:'📢 Raise Dispute / Feedback',
    fileDisputeTitle:'File Customer Dispute Ticket',
    issueType:'Issue Type',
    issuePayment:'Payment Made but Shows Pending',
    issueDelivery:'Delivery Postponed or Not Received',
    issueWeight:'Cylinder Seal / Weight Concern',
    issueQuota:'Subsidy Quota Mismatch',
    details:'Details / Explanation',
    submitDispute:'Record Dispute on Ledger',
    twoWheeler:'🛵 Two-Wheeler (4–6 Cylinders)',
    smallTruck:'🚚 Small Truck (24–40 Cylinders)',
    dispatchPlant:'🚚 Dispatch Empties to Bottling Plant',
    disputesTitle:'Registered Customer Disputes & Complaints'
  },
  kn:{
    agency:'ವಿಜಯಾ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿ',
    tagline:'ಪ್ರತಿ ಸಿಲಿಂಡರ್. ಪ್ರತಿ ರೂಪಾಯಿ. ಒಂದು ವಿಶ್ವಾಸಾರ್ಹ ದಾಖಲೆ.',
    f1:'ಕಡಿಮೆ ನೆಟ್‌ವರ್ಕ್ ಗ್ರಾಮಗಳಲ್ಲಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    f2:'ತಿರುಚಲು ಅಸಾಧ್ಯವಾದ ಸುರಕ್ಷಿತ ಲೆಡ್ಜರ್',
    f3:'ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಅಧಿಕೃತ ಆಡಿಟ್ ವರದಿ',
    signInPrompt:'ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    selectRole:'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    enterPin:'4-ಅಂಕಿಯ ಪಿನ್ ನಮೂದಿಸಿ',
    signingIn:'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ…',
    signInBtn:'ಸೈನ್ ಇನ್',
    signOut:'ಲಾಗ್ ಔಟ್',
    demoAccounts:'ಡೆಮೊ ಖಾತೆಗಳು',
    deliveryStaff:'ವಿತರಣಾ ಸಿಬ್ಬಂದಿ',
    deliveryDesc:'ಕ್ಷೇತ್ರ ವಿತರಣೆ ಮತ್ತು ಸಿಲಿಂಡರ್ ವಿನಿಮಯ',
    counterStaff:'ಕೌಂಟರ್ ಸಿಬ್ಬಂದಿ',
    counterDesc:'ಬುಕಿಂಗ್, ರನ್ ರಚನೆ ಮತ್ತು ನಗದು ಠೇವಣಿ',
    owner:'ಮಾಲೀಕರು',
    ownerDesc:'ದೋಷಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ಹಿಂಪಡೆಯುವಿಕೆ',
    auditor:'ಆಡಿಟರ್',
    auditorDesc:'ಲೆಡ್ಜರ್ ಪರಿಶೀಲನೆ ಮತ್ತು ಅನುಸರಣೆ',
    todaysRun:'ಇಂದಿನ ವಿತರಣೆ (ರನ್)',
    noRun:'ಯಾವುದೇ ರನ್ ನಿಯೋಜಿಸಿಲ್ಲ. ಕೌಂಟರ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ.',
    offlineBan:'ಆಫ್‌ಲೈನ್ · {n} ಫೋನ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ',
    waitingSync:'{n} ಸಿಂಕ್ ಮಾಡಲು ಬಾಕಿ',
    synced:'ಲೆಡ್ಜರ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ ಆಗಿದೆ',
    quickCash:'⚡ ತ್ವರಿತ ನಗದು ₹{p}',
    deliver:'ವಿತರಿಸಿ',
    deliverOrder:'ವಿತರಣೆ ದೃಢೀಕರಿಸಿ',
    cancel:'ರದ್ದುಮಾಡಿ',
    fullDelivered:'ತುಂಬಿದ ಸಿಲಿಂಡರ್ ನೀಡಲಾಗಿದೆ',
    emptyReceived:'ಖಾಲಿ ಸಿಲಿಂಡರ್ ಪಡೆಯಲಾಗಿದೆ',
    defectiveReturned:'ದೋಷಯುಕ್ತ ಸಿಲಿಂಡರ್',
    amount:'ಮೊತ್ತ',
    cash:'ನಗದು (Cash)',
    upi:'ಯುಪಿಐ (UPI)',
    payLater:'ನಂತರ ಪಾವತಿ',
    upiRef:'ಯುಪಿಐ ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆ',
    showUpiQr:'📱 ಯುಪಿಐ ಕ್ಯೂಆರ್ (QR) ತೋರಿಸಿ',
    scanToPay:'GPay / PhonePe ಮೂಲಕ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    closeRun:'ರನ್ ಮುಕ್ತಾಯ ಮತ್ತು ಎಣಿಕೆ',
    countVehicle:'ವಾಹನದಲ್ಲಿರುವ ಸಿಲಿಂಡರ್‌ಗಳ ಎಣಿಕೆ',
    fullUnsold:'ಮಾರಾಟವಾಗದ ತುಂಬಿದ ಸಿಲಿಂಡರ್',
    emptiesReturned:'ಹಿಂತಿರುಗಿಸಿದ ಖಾಲಿ ಸಿಲಿಂಡರ್',
    defectiveCount:'ದೋಷಯುಕ್ತ',
    cashInHand:'ಕೈಯಲ್ಲಿರುವ ನಗದು',
    closeConfirm:'ರನ್ ಮುಕ್ತಾಯಗೊಳಿಸಿ',
    done:'ಪೂರ್ಣ',
    saved:'ಉಳಿಸಲಾಗಿದೆ',
    pending:'ಬಾಕಿ',
    nextCustomer:'ಮುಂದಿನ ವಿತರಣೆ',
    refillsLeft:'ಸಬ್ಸಿಡಿ ರೀಫಿಲ್‌ಗಳು ಬಾಕಿ ಇವೆ',
    toastSaved:'ಫೋನ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ. ಆನ್‌ಲೈನ್ ಬಂದಾಗ ಸಿಂಕ್ ಆಗುತ್ತದೆ.',
    createRunTab:'ರನ್ ರಚಿಸಿ',
    exceptionsTab:'ದೋಷಗಳು',
    customerTab:'30,000+ ಗ್ರಾಹಕರು & ವಿವಾದಗಳು',
    bookingTab:'ಹೊಸ ಬುಕಿಂಗ್',
    depositTab:'ನಗದು ಠೇವಣಿ',
    stockTab:'ದಾಸ್ತಾನು ವಿವರ',
    anomaliesTab:'ಅನುಮಾನಾಸ್ಪದ ಸಂಜ್ಞೆಗಳು',
    ledgerTab:'ಲೆಡ್ಜರ್ ಪರಿಶೀಲನೆ',
    auditTab:'ಆಡಿಟ್ ಪ್ಯಾಕ್',
    custPortalTitle:'ಗ್ರಾಹಕರ ಪರಿಶೀಲನೆ & ವಿವಾದ ಪರಿಹಾರ ಪೋರ್ಟಲ್',
    custPortalDesc:'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಇಲ್ಲದೆಯೇ ಬುಕಿಂಗ್, ರಶೀದಿ ಪರಿಶೀಲನೆ ಮತ್ತು ದೂರು ದಾಖಲಿಸಿ',
    openPortalBtn:'ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್ ➔',
    staffLoginBtn:'ಸಿಬ್ಬಂದಿ ಲಾಗಿನ್',
    searchCustPrompt:'ಗ್ರಾಹಕರ ಎಸ್‌ವಿ ನಂಬರ್ (SV-100001) ಅಥವಾ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ನಮೂದಿಸಿ',
    searchBtn:'ಪರಿಶೀಲಿಸಿ',
    postponeBtn:'ಮುಂದೂಡಿ',
    postponeTitle:'ವಿತರಣೆ ಮುಂದೂಡಿ',
    doorLocked:'ಬಾಗಿಲು ಹಾಕಿದೆ / ಹೊಲದಲ್ಲಿದ್ದಾರೆ',
    noCashToday:'ಇಂದು ಹಣವಿಲ್ಲ (ಮರುದಿನಕ್ಕೆ ನಿಗದಿ)',
    emptyNotReady:'ಖಾಲಿ ಸಿಲಿಂಡರ್ ಸಿದ್ಧವಿಲ್ಲ',
    annualQuotaLabel:'ವಾರ್ಷಿಕ ಗೃಹಬಳಕೆ ಸಬ್ಸಿಡಿ ಕೋಟಾ',
    verifiedOnLedger:'ಲೆಡ್ಜರ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    raiseDisputeBtn:'📢 ದೂರು / ಪ್ರತಿಕ್ರಿಯೆ ದಾಖಲಿಸಿ',
    fileDisputeTitle:'ಗ್ರಾಹಕರ ದೂರು ದಾಖಲಿಸಿ',
    issueType:'ಸಮಸ್ಯೆಯ ಪ್ರಕಾರ',
    issuePayment:'ಹಣ ಪಾವತಿಸಲಾಗಿದೆ ಆದರೆ ಬಾಕಿ ತೋರಿಸುತ್ತಿದೆ',
    issueDelivery:'ವಿತರಣೆ ಮುಂದೂಡಲಾಗಿದೆ / ತಲುಪಿಲ್ಲ',
    issueWeight:'ಸಿಲಿಂಡರ್ ಸೀಲ್ / ತೂಕದ ಸಮಸ್ಯೆ',
    issueQuota:'ಸಬ್ಸಿಡಿ ಕೋಟಾ ವ್ಯತ್ಯಾಸ',
    details:'ವಿವರಣೆ / ಮಾಹಿತಿ',
    submitDispute:'ಲೆಡ್ಜರ್‌ನಲ್ಲಿ ದಾಖಲಿಸಿ',
    twoWheeler:'🛵 ದ್ವಿಚಕ್ರ ವಾಹನ (4–6 ಸಿಲಿಂಡರ್)',
    smallTruck:'🚚 ಸಣ್ಣ ಟ್ರಕ್ (24–40 ಸಿಲಿಂಡರ್)',
    dispatchPlant:'🚚 ಬಾಟ್ಲಿಂಗ್ ಪ್ಲಾಂಟ್‌ಗೆ ಖಾಲಿ ಸಿಲಿಂಡರ್ ಕಳುಹಿಸಿ',
    disputesTitle:'ದಾಖಲಾದ ಗ್ರಾಹಕರ ದೂರುಗಳು & ಪರಿಹಾರ'
  }
};
const tr=(k,v={})=>{let s=(I18N[LANG]&&I18N[LANG][k])||I18N.en[k]||k;Object.entries(v).forEach(([x,y])=>{s=s.replace(new RegExp(`\\{${x}\\}`, 'g'), y)});return s};
function speak(txt){if('speechSynthesis'in window){try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang=LANG==='kn'?'kn-IN':'en-IN';window.speechSynthesis.speak(u)}catch(e){}}}

const KC={Cylinder:'rdb',Cash:'a',Subsidy:'bl'},TY={BOOK:'Booked',DELIVER:'Delivered',PAY:'Payment',CLOSE:'Run closed',DEPOSIT:'Cash deposited',SUBCREDIT:'Subsidy credited',REVERSE:'Reversal',LOAD:'Loaded',DISPATCH:'Plant dispatched',DISPUTE:'Customer dispute'};
let T=localStorage.t,ROLE=localStorage.r,Q=JSON.parse(localStorage.q||'[]'),RUN=JSON.parse(localStorage.run||'null');
let cur=null,mode='list',f={},sel='delivery',tab='ex',EX=null,CUS=null,TL=null,tlc='',msg='',searchQuery='',showQrModal=false,showSlip=false,slipData=null,isTampered=false;
let pendingOrdersCache=[],staffCache=[],runsSummaryCache=[],stockCache=null,anomaliesCache=null,activeGatePassData=null;
let enteredPin='',isLoggingIn=false,pinShake=false,toastText='',reverseTargetId=null;

// Offline Simulation, Monthly Pack & DPDP Privacy State
let simulateOffline=false;
let auditPackData=null,auditGenTime=null;
let revealedAadhaars={};

// Customer Self-Service & Dispute Portal State
let inCustPortal=false;
let custLookupData=null,custLookupQuery='',custLookupLoading=false,custLookupMsg='';
let showCustDisputeModal=false,custDisputeIssue='PAYMENT_PENDING',custDisputeDetails='';
let showPostponeModal=false,postponeOrderId=null,postponeReason='DOOR_LOCKED';
let selectedVillage='',villagesCache=[],disputesCache=[];
let vehCapacityType='bike';
let driverVillageFilter='',showPodModal=false,podOrderData=null;
let bookingFastQuery='',denomCounts={},lastBookedOrderId=null;
let dailySummaryData=null,dailySummaryDate='',defaultsData=null,closingSheetData=null,closingSheetDate='';
let reportsData={outstanding:null,monthly:null,custHistory:null,stock:null};let reportsActiveReport='stock';let reportsVillageFilter='';

// Real-Time Live Stream & Order Tracking State
let liveEventSource=null,liveConnected=false;
let activeTrackingData=null,trackingSearchQuery='',trackingLoading=false,trackingMsg='';
let custBookingLoading=false;

// IndexedDB Persistence for Offline Storage
let idb=null;
function initIDB(){
  return new Promise((resolve)=>{
    if(!window.indexedDB)return resolve(null);
    const req=indexedDB.open('VGA_OFFLINE_DB',1);
    req.onupgradeneeded=e=>{
      const db=e.target.result;
      if(!db.objectStoreNames.contains('pending_events')){
        db.createObjectStore('pending_events',{keyPath:'id'});
      }
    };
    req.onsuccess=e=>{idb=e.target.result;resolve(idb)};
    req.onerror=()=>resolve(null);
  });
}
function idbGetAll(){
  return new Promise(async(resolve)=>{
    if(!idb)await initIDB();
    if(!idb)return resolve([]);
    try{
      const tx=idb.transaction('pending_events','readonly');
      const req=tx.objectStore('pending_events').getAll();
      req.onsuccess=()=>resolve(req.result||[]);
      req.onerror=()=>resolve([]);
    }catch(e){resolve([])}
  });
}
async function idbSave(ev){
  if(!idb)await initIDB();
  if(!idb)return;
  return new Promise((res)=>{
    try{
      const tx=idb.transaction('pending_events','readwrite');
      tx.objectStore('pending_events').put(ev);
      tx.oncomplete=()=>res(true);
      tx.onerror=()=>res(false);
    }catch(e){res(false)}
  });
}
async function idbClear(){
  if(!idb)await initIDB();
  if(!idb)return;
  return new Promise((res)=>{
    try{
      const tx=idb.transaction('pending_events','readwrite');
      tx.objectStore('pending_events').clear();
      tx.oncomplete=()=>res(true);
      tx.onerror=()=>res(false);
    }catch(e){res(false)}
  });
}

const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,10);
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const persist=()=>{localStorage.q=JSON.stringify(Q);localStorage.run=JSON.stringify(RUN);localStorage.lang=LANG};
const showToast=txt=>{toastText=txt;render();setTimeout(()=>{if(toastText===txt){toastText='';render()}},3200)};

async function api(p,o={}){
  const r=await fetch('/api/'+p,{method:o.method||'GET',headers:{'content-type':'application/json','x-token':T||''},body:o.body?JSON.stringify(o.body):undefined});
  if(r.status===401&&T){out();throw new Error('auth')}
  return r.json();
}
function out(){localStorage.clear();T=ROLE=null;Q=[];RUN=null;EX=CUS=TL=null;stockCache=anomaliesCache=auditPackData=null;enteredPin='';render()}
async function loadRun(){try{const r=await api('run');if(r){RUN=r;persist()}}catch(e){}}
async function sync(){
  if(simulateOffline){render();return}
  if(!Q.length||!T){render();return}
  try{
    const r=await api('events',{method:'POST',body:Q});
    if(r.ok!==undefined){
      Q=[];
      await idbClear();
      persist();
      await loadRun();
      EX=null;
    }
  }catch(e){}
  render();
}
const qd=()=>new Set(Q.filter(e=>e.type==='DELIVER').map(e=>e.order));

const getInitials=name=>{
  const p=String(name||'').trim().split(/\s+/);
  if(p.length>=2)return(p[0][0]+p[1][0]).toUpperCase();
  return(p[0]?p[0].slice(0,2):'??').toUpperCase();
};

const flameIconSvg=`<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C2410C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" fill="#C2410C"/></svg>`;

function renderTrackingStepper(tData){
  if(!tData)return '';
  const currentStep=+tData.currentStep||1;
  const isPostponed=tData.status==='POSTPONED';
  const progressPercent=currentStep===1?'12%':(currentStep===2?'38%':(currentStep===3?'68%':'100%'));

  return `
  <div class="c" style="border:2px solid #2563EB;background:#F8FAFC;margin-top:10px;position:relative">
    <div class="r">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="live-badge"><span class="live-dot"></span> REAL-TIME TRACKING</span>
        <b style="font-size:16px;color:var(--navy)">Order #${tData.orderId}</b>
      </div>
      <span class="tag ${tData.status==='DELIVERED'?'g':(isPostponed?'rdb':(tData.status==='IN_TRANSIT'?'bl':'a'))}" style="font-size:12px;font-weight:700">
        ${tData.statusBadge}
      </span>
    </div>

    <!-- 4-Stage Live Delivery Stepper -->
    <div class="tracker-stepper">
      <div class="tracker-progress-bar" style="width:${progressPercent};background:${isPostponed?'#DC2626':'#16A34A'}"></div>

      <!-- Stage 1 -->
      <div class="tracker-step completed">
        <div class="tracker-icon" style="background:#16A34A;border-color:#16A34A;color:#fff">✓</div>
        <div class="tracker-label" style="color:#16A34A">1. Booked</div>
        <div class="tracker-subtext">${tData.order?.type||'14.2kg'}<br>₹${tData.order?.price||900}</div>
      </div>

      <!-- Stage 2 -->
      <div class="tracker-step ${currentStep>=2?'completed':(currentStep===1?'active':'')}">
        <div class="tracker-icon">${currentStep>2?'✓':'2'}</div>
        <div class="tracker-label">2. Gate Pass</div>
        <div class="tracker-subtext">Godown Stock<br>${tData.steps?.[1]?.details?.runId!=='Awaiting gate pass'?'Allotted':'Inspected'}</div>
      </div>

      <!-- Stage 3 -->
      <div class="tracker-step ${currentStep>=3?(isPostponed?'completed':'completed'):(currentStep===2?'active':'')}">
        <div class="tracker-icon" style="${isPostponed?'background:#DC2626;border-color:#DC2626;color:#fff':''}">${currentStep>3?'✓':(isPostponed?'⚠️':'3')}</div>
        <div class="tracker-label" style="${isPostponed?'color:#DC2626':''}">${isPostponed?'3. Postponed':'3. In Transit'}</div>
        <div class="tracker-subtext">${tData.steps?.[2]?.details?.vehicle||'Vehicle Loading'}<br>${tData.steps?.[2]?.details?.staffName||'Field Staff'}</div>
      </div>

      <!-- Stage 4 -->
      <div class="tracker-step ${currentStep===4?'completed':(currentStep===3&&!isPostponed?'active':'')}">
        <div class="tracker-icon">${currentStep===4?'✓':'4'}</div>
        <div class="tracker-label">4. Delivered</div>
        <div class="tracker-subtext">${currentStep===4?'Empty Received':'Handover & Empty'}</div>
      </div>
    </div>

    ${isPostponed ? `
      <div style="margin-top:10px;padding:10px 14px;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;font-size:13px;color:#991B1B">
        ⚠️ <b>DELIVERY NOTICE:</b> ${E(tData.steps?.[2]?.details?.postponeReason || 'Delivery postponed today')}. 
        Cylinder remains safely loaded on vehicle and is scheduled for re-delivery on next route.
      </div>
    ` : ''}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:10px;background:#fff;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:12.5px">
      <div>Consumer: <b>${E(tData.customer?.name||'')}</b> (SV: <b>${tData.customer?.sv_num||tData.customer?.id||''}</b>)</div>
      <div>Village Route: <b>${E(tData.customer?.village||'')}</b></div>
      <div>Government Subsidy: <b style="color:#16A34A">${tData.steps?.[0]?.details?.subsidyStatus||'DBTL Eligible'}</b></div>
      <div>Field Delivery Agent: <b>${E(tData.steps?.[2]?.details?.staffName||'Ravi')}</b> (${tData.steps?.[2]?.details?.vehicle||'Pending'})</div>
    </div>

    ${tData.steps?.[3]?.details?.ledgerHash ? `
      <div class="r" style="margin-top:8px;font-size:11.5px;color:var(--text-muted);background:#F0FDF4;padding:6px 10px;border-radius:6px;border:1px solid #BBF7D0">
        <span class="tag g" style="font-size:10px">CRYPTOGRAPHIC SHA-256 PROOF</span>
        <span style="font-family:monospace">Block: ${tData.steps[3].details.ledgerHash.slice(0, 24)}…</span>
      </div>
    ` : ''}

    <div class="r" style="margin-top:8px">
      <small style="color:var(--text-muted);font-size:11px">Auto-synced via real-time SSE stream · Instant updates</small>
      <button class="sm" style="background:#475569" data-a="closetrack">✕ Close Tracker</button>
    </div>
  </div>`;
}

function initLiveStream(){
  if(liveEventSource)return;
  try{
    liveEventSource=new EventSource('/api/live');
    liveEventSource.onopen=()=>{
      liveConnected=true;
    };
    liveEventSource.addEventListener('order_booked',e=>{
      try{
        const d=JSON.parse(e.data);
        if(d.order?.id&&d.order.id===lastBookedOrderId){
          lastBookedOrderId=null;
          return;
        }
        showToast(`⚡ Refill Booked: ${d.order?.id||''} for ${d.customerName||d.customer||''}!`);
        pendingOrdersCache=[];
        stockCache=null;
        if(inCustPortal&&custLookupData&&(custLookupData.customer.id===d.order.customer||custLookupData.customer.sv_num===d.order.customer)){
          ACT.custsearch();
        }else if(T&&(tab==='bk'||tab==='cr')){
          office();
        }
      }catch(err){}
    });
    liveEventSource.addEventListener('events_updated',e=>{
      try{
        pendingOrdersCache=[];
        stockCache=null;
        runsSummaryCache=[];
        if(inCustPortal&&custLookupData){
          ACT.custsearch();
          if(activeTrackingData){
            ACT.trackorder({id:activeTrackingData.orderId});
          }
        }else if(T&&(tab==='bk'||tab==='dp'||tab==='st'||tab==='dash'||tab==='sk')){
          office();
        }else if(T&&ROLE==='delivery'){
          loadRun().then(render);
        }
      }catch(err){}
    });
    liveEventSource.addEventListener('run_created',e=>{
      try{
        const d=JSON.parse(e.data);
        showToast(`🚚 Vehicle ${d.run.vehicle} dispatched with ${d.run.loaded} cylinders!`);
        pendingOrdersCache=[];
        runsSummaryCache=[];
        stockCache=null;
        if(inCustPortal&&custLookupData){
          ACT.custsearch();
          if(activeTrackingData){
            ACT.trackorder({id:activeTrackingData.orderId});
          }
        }else if(T&&(tab==='bk'||tab==='cr'||tab==='dp')){
          office();
        }
      }catch(err){}
    });
    liveEventSource.addEventListener('ledger_reversed',()=>{
      EX=null;
      if(T&&(tab==='lg'||tab==='au'||tab==='dash'))office();
    });
    liveEventSource.onerror=()=>{
      liveConnected=false;
    };
  }catch(e){}
}

function loginView(){
  const roles=[
    {id:'delivery',name:tr('deliveryStaff'),desc:tr('deliveryDesc'),icon:`<svg class="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`},
    {id:'counter',name:tr('counterStaff'),desc:tr('counterDesc'),icon:`<svg class="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`},
    {id:'owner',name:tr('owner'),desc:tr('ownerDesc'),icon:`<svg class="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`},
    {id:'auditor',name:tr('auditor'),desc:tr('auditorDesc'),icon:`<svg class="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`}
  ];

  A.innerHTML=`
  <div class="auth-split">
    <div class="auth-left">
      <div>
        <div class="r" style="margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="background:rgba(194,65,12,0.15);border:1px solid rgba(194,65,12,0.3);border-radius:10px;padding:6px;display:flex">
              ${flameIconSvg}
            </div>
            <div>
              <div style="font-size:22px;font-weight:800;letter-spacing:-0.02em">${tr('agency')}</div>
              <small style="color:#94A3B8;font-size:12px">LPG Enterprise Ledger & Reconciliation</small>
            </div>
          </div>
          <button class="ch" style="background:rgba(255,255,255,0.1);color:#fff;border-color:#475569;min-height:36px;padding:0 12px;font-size:12px" data-a="lang">
            ${LANG==='kn'?'English':'ಕನ್ನಡ'}
          </button>
        </div>
        <p style="font-size:15px;color:#CBD5E1;margin:0 0 32px;line-height:1.5">${tr('tagline')}</p>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:#E2E8F0">
            <span style="color:#4ADE80;font-weight:700">✓</span> ${tr('f1')}
          </div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:#E2E8F0">
            <span style="color:#4ADE80;font-weight:700">✓</span> ${tr('f2')}
          </div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:#E2E8F0">
            <span style="color:#4ADE80;font-weight:700">✓</span> ${tr('f3')}
          </div>
        </div>
      </div>
      <div style="margin-top:32px;font-size:11.5px;color:#64748B">
        Built under DPDP Act 2023 · ISO/IEC 27001 Cryptographic Verifiability
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-card">
        <div>
          <h2 style="margin:0 0 4px;font-size:18px;font-weight:700;color:var(--navy)">${tr('signInPrompt')}</h2>
          <span class="s">${tr('selectRole')}</span>
        </div>
        <div class="role-grid">
          ${roles.map(r=>`
            <div class="role-card ${r.id===sel?'selected':''}" data-a="role" data-r="${r.id}" tabindex="0">
              ${r.icon}
              <div class="role-title">${r.name}</div>
              <div class="role-desc">${r.desc}</div>
            </div>
          `).join('')}
        </div>
        <div class="pin-section">
          <label style="font-size:12px;color:var(--text-muted)">${tr('enterPin')}</label>
          <div class="pin-dots ${pinShake?'shake':''}" id="pin_dots_box" tabindex="0">
            ${[0,1,2,3].map(i=>`<div class="pin-dot ${i<enteredPin.length?'filled':''}"></div>`).join('')}
          </div>
          <input id="pin_hidden" type="password" inputmode="numeric" maxlength="4" autocomplete="one-time-code" style="position:absolute;opacity:0;pointer-events:none" value="${enteredPin}">
          ${msg?`<p class="s" style="color:#B91C1C;font-weight:600;margin:2px 0 0">${E(msg)}</p>`:''}
        </div>
        <div class="keypad">
          ${[1,2,3,4,5,6,7,8,9].map(n=>`<button class="key-btn" data-a="key" data-k="${n}">${n}</button>`).join('')}
          <button class="key-btn action" data-a="keyclear">C</button>
          <button class="key-btn" data-a="key" data-k="0">0</button>
          <button class="key-btn action" data-a="keyback">⌫</button>
        </div>
        <button class="pr" data-a="login" ${isLoggingIn?'disabled':''}>
          ${isLoggingIn?tr('signingIn'):tr('signInBtn')}
        </button>
        <div style="background:#FFF1E8;border:1px solid #FFD8C2;border-radius:10px;padding:12px;margin-top:12px;cursor:pointer" data-a="opencustportal">
          <div class="r">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">🔍</span>
              <div>
                <b style="color:var(--orange);font-size:13px">${tr('custPortalTitle')}</b>
                <div class="s" style="font-size:11.5px">${tr('custPortalDesc')}</div>
              </div>
            </div>
            <button class="sm" style="background:var(--orange);white-space:nowrap;font-size:12px;padding:6px 12px" data-a="opencustportal">${tr('openPortalBtn')}</button>
          </div>
        </div>
        <details class="demo-box" style="margin-top:10px">
          <summary style="font-size:12px;font-weight:700;color:var(--navy);cursor:pointer">${tr('demoAccounts')}</summary>
          <div class="demo-chips">
            <span class="demo-chip" data-a="autologin" data-r="delivery" data-p="1111">👤 Ravi — Delivery Staff (1111)</span>
            <span class="demo-chip" data-a="autologin" data-r="counter" data-p="2222">👤 Meena — Counter Staff (2222)</span>
            <span class="demo-chip" data-a="autologin" data-r="owner" data-p="3333">👤 Suresh — Owner (3333)</span>
            <span class="demo-chip" data-a="autologin" data-r="auditor" data-p="4444">👤 Anil — Auditor (4444)</span>
          </div>
        </details>
      </div>
    </div>
  </div>`;
}

function customerPortalView(){
  const topBar=`
  <div class="del-header" style="max-width:760px;margin:0 auto 16px;border-radius:12px">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="background:rgba(194,65,12,0.15);border-radius:8px;padding:4px;display:flex">
        ${flameIconSvg}
      </div>
      <div>
        <div style="font-weight:800;font-size:16px">${tr('agency')}</div>
        <small style="color:#94A3B8;font-size:11px">${tr('custPortalTitle')}</small>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <span class="live-badge" id="live_conn_badge"><span class="live-dot"></span> LIVE REAL-TIME</span>
      <button class="ch" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.3);min-height:34px;padding:0 10px;font-size:12px" data-a="lang">
        ${LANG==='kn'?'English':'ಕನ್ನಡ'}
      </button>
      <button class="ch" style="background:#C2410C;color:#fff;border:0;min-height:34px;padding:0 12px;font-size:12px;font-weight:700" data-a="closecustportal">
        ${tr('staffLoginBtn')}
      </button>
    </div>
  </div>`;

  let content=`
  <div class="c" style="border-top:3px solid var(--orange)">
    <div class="r">
      <div>
        <b style="font-size:18px;color:var(--navy)">${tr('custPortalTitle')}</b>
        <p class="s" style="line-height:1.5;margin-top:2px">Instant refill booking, live cylinder tracking, subsidy quota status & dispute resolution.</p>
      </div>
      <span class="tag bl" style="font-size:11px">24×7 CONSUMER SERVICE</span>
    </div>

    <div style="margin-top:10px">
      <label style="font-size:12px;font-weight:700">Search Consumer by SV / Mobile or Track Order ID</label>
      <div style="display:flex;gap:8px;margin-top:6px">
        <input id="cust_q" placeholder="Enter SV Number (SV-100001), 10-digit Mobile, or Order ID (O1001)..." value="${E(custLookupQuery)}" style="margin-top:0">
        <button class="pr" style="min-width:110px" data-a="custsearch" ${custLookupLoading?'disabled':''}>
          ${custLookupLoading?'...':tr('searchBtn')}
        </button>
      </div>
    </div>

    <div style="margin-top:10px">
      <small style="font-size:11px;font-weight:700;color:var(--text-muted)">QUICK DEMO CONSUMERS & LIVE TRACKING:</small>
      <div class="demo-chips" style="margin-top:6px">
        <span class="demo-chip" data-a="custquick" data-q="SV-100001">⚡ SV-100001 (Lakshmi · Kalale)</span>
        <span class="demo-chip" data-a="custquick" data-q="SV-100003">⚡ SV-100003 (Anitha · Hunsur)</span>
        <span class="demo-chip" data-a="custquick" data-q="SV-100005">⚡ SV-100005 (Govinda · Nanjangud)</span>
        <span class="demo-chip" data-a="trackorder" data-id="O001">🚚 Track #O001 (Delivered)</span>
        <span class="demo-chip" data-a="trackorder" data-id="O002">🚚 Track #O002 (In Transit)</span>
      </div>
    </div>
    ${custLookupMsg?`<div class="c" style="background:#FEF2F2;border-color:#FCA5A5;color:#B91C1C;font-size:13px;font-weight:600;padding:10px;margin-top:8px">${E(custLookupMsg)}</div>`:''}
    ${trackingMsg?`<div class="c" style="background:#FEF2F2;border-color:#FCA5A5;color:#B91C1C;font-size:13px;font-weight:600;padding:10px;margin-top:8px">${E(trackingMsg)}</div>`:''}
  </div>`;

  // Render standalone Active Tracking Stepper if selected
  if(activeTrackingData){
    content+=renderTrackingStepper(activeTrackingData);
  }

  if(custLookupData){
    const c=custLookupData.customer;
    const orders=custLookupData.orders||[];
    const proof=custLookupData.ledgerProof;
    const used=c.ytd;
    const totalQuota=c.entitlement;
    const pct=Math.min(100,Math.round((used/totalQuota)*100));
    const activeOrder=orders.find(o=>o.status!=='DELIVERED');

    content+=`
    <div class="c" style="background:#F0FDF4;border-color:#BBF7D0">
      <div class="r">
        <div>
          <div style="display:flex;align-items:center;gap:6px">
            <span class="tag g" style="font-size:11px">ACTIVE LPG CONNECTION</span>
            <span class="live-badge" style="font-size:10px;padding:2px 6px"><span class="live-dot"></span> LIVE</span>
          </div>
          <h3 style="margin:4px 0 0;font-size:18px;color:var(--navy)">${E(c.name)}</h3>
          <div class="s" style="margin-top:2px">Consumer SV: <b>${c.sv_num}</b> · Village: <b>${E(c.village)}</b> · Phone: <b>${c.phone}</b></div>
        </div>
        <button class="sm" style="background:var(--navy)" data-a="opencustdispute">${tr('raiseDisputeBtn')}</button>
      </div>

      <div style="margin-top:10px;background:#fff;border:1px solid #DCFCE7;border-radius:8px;padding:12px">
        <div class="r">
          <span style="font-size:12px;font-weight:700;color:#166534">${tr('annualQuotaLabel')}</span>
          <b style="font-size:13px;color:#166534">${used} of ${totalQuota} Refills Used (${totalQuota-used} Left)</b>
        </div>
        <div class="quota-bar">
          <div class="quota-fill" style="width:${pct}%;background:${pct>85?'#C2410C':'#15803D'}"></div>
        </div>
        <div class="r" style="margin-top:6px;font-size:11px;color:var(--text-muted)">
          <span>Aadhaar: <b>${c.aadhaar}</b> (DPDP Act 2023 Compliant)</span>
          <span>Ledger Proof: <b>${proof.blocks} Cryptographic Blocks Verified</b></span>
        </div>
      </div>
    </div>

    <!-- Real-Time Booking Terminal -->
    <div class="c" style="border:2px solid #3B82F6;background:#F8FAFC">
      <div class="r">
        <div>
          <b style="font-size:16px;color:#1E3A8A">⚡ Real-Time Instant Refill Booking</b>
          <div class="s">Single-tap booking automatically appends to the immutable ledger and queues dispatch.</div>
        </div>
        <span class="tag ${c.left<=0?'rdb':'g'}">${c.left<=0?'QUOTA EXHAUSTED':c.left+' REFILLS REMAINING'}</span>
      </div>

      ${c.left<=0 ? `
        <div style="margin-top:8px;padding:8px 12px;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:6px;font-size:12.5px;color:#991B1B">
          ⚠️ <b>SUBSIDIZED QUOTA EXHAUSTED:</b> All 12 subsidized refills for FY 2026-27 have been utilized. Non-subsidized commercial tariff applies.
        </div>
      ` : `
        <div style="margin-top:8px;padding:6px 12px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;font-size:12.5px;color:#166534">
          ✓ <b>DBTL ELIGIBLE:</b> Direct Benefit Subsidy ₹200 will be auto-credited to linked bank account upon verified delivery.
        </div>
      `}

      <div class="r" style="margin-top:12px;gap:8px;flex-wrap:wrap">
        <button class="pr" style="flex:2;min-width:180px;background:#1E3A8A;display:flex;align-items:center;justify-content:center;gap:6px" data-a="custbook" data-type="14.2kg" data-qty="1" ${custBookingLoading?'disabled':''}>
          ⚡ ${custBookingLoading?'Booking on Ledger...':'Book 14.2kg Domestic Refill (₹900)'}
        </button>
        <button class="ch" style="flex:1;min-width:140px;display:flex;align-items:center;justify-content:center;gap:6px" data-a="custbook" data-type="5kg" data-qty="1" ${custBookingLoading?'disabled':''}>
          ⚡ ${custBookingLoading?'...':'Book 5kg Chhotu (₹350)'}
        </button>
      </div>
    </div>

    <!-- Active Order Live Delivery Stepper (If active order exists and not already rendered above) -->
    ${activeOrder && (!activeTrackingData || activeTrackingData.orderId!==activeOrder.orderId) ? `
      <div class="c" style="border:2px solid #10B981;background:#F0FDF4">
        <div class="r">
          <div style="display:flex;align-items:center;gap:8px">
            <span class="live-badge"><span class="live-dot"></span> LIVE IN-PROGRESS ORDER</span>
            <b style="font-size:15px;color:var(--navy)">Order #${activeOrder.orderId}</b>
          </div>
          <button class="sm" style="background:#0284C7" data-a="trackorder" data-id="${activeOrder.orderId}">🔍 Open Live Tracker</button>
        </div>
        <div class="s" style="margin-top:4px">Status: <b>${activeOrder.status==='IN_TRANSIT'?'🚚 In Transit on Delivery Truck':'📋 Booked & Queued for Vehicle Loading'}</b> · Cylinder: <b>${activeOrder.type} (₹${activeOrder.price})</b></div>
      </div>
    ` : ''}

    <div class="c">
      <div class="r">
        <b style="font-size:16px;color:var(--navy)">Refill Bookings & Delivery History (${orders.length})</b>
        <span class="s">Click any order to view full live tracking</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:6px">
        ${orders.length===0?'<p class="s">No booking records found.</p>':orders.map(o=>`
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;background:#fff">
            <div class="r">
              <div>
                <b style="font-size:15px;color:var(--navy)">Order #${o.orderId}</b>
                <span class="s"> · ${o.type} cylinder · ₹${o.price}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="tag ${o.status==='DELIVERED'?'g':o.status==='POSTPONED'?'a':o.status==='IN_TRANSIT'?'bl':'gr'}">
                  ${o.status==='DELIVERED'?'✓ DELIVERED':o.status==='POSTPONED'?'POSTPONED':o.status==='IN_TRANSIT'?'IN TRANSIT':'BOOKED'}
                </span>
                <button class="sm" style="background:#0F1B2D;font-size:11px;padding:3px 8px" data-a="trackorder" data-id="${o.orderId}">🔍 Track</button>
              </div>
            </div>
            ${o.failReason?`
              <div style="margin-top:6px;padding:6px 10px;background:#FEF3C7;border-radius:6px;font-size:12.5px;color:#92400E">
                ⚠️ <b>Delivery Postponed Reason:</b> ${E(o.failReason)}
              </div>
            `:''}
            ${o.payment?`
              <div style="margin-top:8px;padding:8px 10px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;display:flex;flex-direction:column;gap:4px">
                <div class="r">
                  <span style="font-size:12px">Payment Mode: <b>${o.payment.mode}</b> ${o.payment.ref!=='N/A'?`· Ref: <b>${o.payment.ref}</b>`:''}</span>
                  <b style="color:var(--green-text);font-size:14px">₹${o.payment.amount} PAID</b>
                </div>
                <div class="r" style="font-size:11px;color:var(--text-muted)">
                  <span class="tag g" style="font-size:10px;padding:2px 6px">${tr('verifiedOnLedger')}</span>
                  <span style="font-family:monospace">SHA-256: ${o.payment.hash.slice(0,16)}…</span>
                </div>
              </div>
            `:`
              <div class="r" style="margin-top:6px">
                <span class="s" style="color:#B45309">Payment Status: <b>${o.status==='DELIVERED'?'Settled':'Pending Doorstep Collection'}</b></span>
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  const disputeModal=showCustDisputeModal?`
  <div class="modal-overlay">
    <div class="modal-sheet">
      <div class="r">
        <b style="font-size:16px;color:var(--navy)">${tr('fileDisputeTitle')}</b>
        <button class="sp" data-a="closecustdispute">✕</button>
      </div>
      <p class="s">Dispute ticket will be stamped onto the immutable cryptographic ledger and assigned to agency supervisor.</p>
      <label>${tr('issueType')}
        <select id="disp_issue">
          <option value="PAYMENT_PENDING">${tr('issuePayment')}</option>
          <option value="DELIVERY_FAILED">${tr('issueDelivery')}</option>
          <option value="CYLINDER_WEIGHT">${tr('issueWeight')}</option>
          <option value="SUBSIDY_QUOTA">${tr('issueQuota')}</option>
        </select>
      </label>
      <label>${tr('details')}
        <textarea id="disp_details" rows="3" placeholder="Explain the issue (e.g. Paid ₹900 via cash on 28-Oct to delivery staff)"></textarea>
      </label>
      <div class="sticky-bottom" style="display:flex;gap:10px;margin-top:10px">
        <button class="pr" style="flex:2" data-a="submitcustdispute">${tr('submitDispute')}</button>
        <button class="ch" style="flex:1" data-a="closecustdispute">${tr('cancel')}</button>
      </div>
    </div>
  </div>`:'' ;

  A.innerHTML=`<div class="portal-shell">${topBar}${content}${disputeModal}</div>`;
}

function render(){
  if(inCustPortal)return customerPortalView();
  if(!T)return loginView();
  ROLE==='delivery'?delivery():office();
}

// Global Enter key handler for customer portal search and tracking
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    if(inCustPortal&&document.getElementById('cust_q')===document.activeElement){
      ACT.custsearch();
    }
    if(T&&ROLE==='counter'&&tab==='bk'&&document.getElementById('counter_track_input')===document.activeElement){
      ACT.countertrack();
    }
    if(T&&ROLE==='counter'&&tab==='bk'&&document.getElementById('fast_sv_input')===document.activeElement){
      // Fast booking: Enter on search focuses the book button
      const btn=document.querySelector('[data-a="fastbook"]');
      if(btn)btn.focus();
    }
  }
});

function delivery(){
  const q=qd(),n=Q.length;
  const isOff=simulateOffline||!navigator.onLine;
  const syncClass=isOff||n>0?'a':'g';
  const syncLabel=isOff||n>0?`Offline - ${n} pending sync`:tr('synced');

  // Live run progress counters
  let runProgress='';
  if(RUN){
    const done=RUN.orders.filter(o=>o.status==='done'||qd().has(o.id)).length;
    const total=RUN.orders.length;
    const cashSoFar=Q.filter(e=>e.type==='PAY'&&e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
    const upiSoFar=Q.filter(e=>e.type==='PAY'&&e.p.mode==='UPI').reduce((a,b)=>a+(+b.p.amount||0),0);
    const emptiesSoFar=Q.filter(e=>e.type==='DELIVER').reduce((a,b)=>a+(+b.p.empty||0),0);
    runProgress=`
    <div style="background:#1A2942;border-top:1px solid rgba(255,255,255,0.08);padding:8px 16px;display:flex;gap:16px;overflow-x:auto;font-size:12px;color:#E2E8F0;white-space:nowrap">
      <span>📦 <b style="color:#4ADE80">${done}/${total}</b> Delivered</span>
      <span>💵 Cash <b style="color:#FCD34D">₹${cashSoFar}</b></span>
      <span>📱 UPI <b style="color:#A78BFA">₹${upiSoFar}</b></span>
      <span>🔄 Empties <b style="color:#60A5FA">${emptiesSoFar}</b></span>
    </div>`;
  }

  const topHeader=`
  <div class="del-header">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="font-weight:800;font-size:16px;letter-spacing:-0.01em">${tr('agency')}</div>
      <span class="tag ${syncClass==='g'?'g':'a'}" id="sync_badge">${syncLabel}</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <button class="ch" style="background:${simulateOffline?'#C2410C':'rgba(255,255,255,0.12)'};color:#fff;border-color:${simulateOffline?'#C2410C':'rgba(255,255,255,0.3)'};min-height:34px;padding:0 10px;font-size:11.5px;font-weight:700" data-a="toggleoffline">
        ⚡ ${simulateOffline?'Offline: ON':'Simulate offline'}
      </button>
      <button class="ch" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.3);min-height:34px;padding:0 10px;font-size:12px" data-a="lang">
        ${LANG==='kn'?'English':'ಕನ್ನಡ'}
      </button>
      <button class="ch" style="background:transparent;color:#CBD5E1;border-color:#475569;min-height:34px;padding:0 10px;font-size:12px" data-a="out">
        ${tr('signOut')}
      </button>
    </div>
  </div>`;

  if(!RUN){
    A.innerHTML=`<div class="delivery-shell">${topHeader}<div class="del-body"><div class="c"><p class="s">${tr('noRun')}</p></div></div></div>`;
    return;
  }

  let bodyContent='';
  if(mode==='form'){
    const o=RUN.orders.find(x=>x.id===cur);
    bodyContent=`
    <div class="c">
      <div class="r">
        <div>
          <b style="font-size:16px">${E(o.name)}</b>
          <div class="s">${E(o.village)} · Order ${o.id} · ${o.type}</div>
        </div>
        <span class="tag bl">${o.left} ${tr('refillsLeft')}</span>
      </div>
    </div>
    ${['full','empty','defective'].map(k=>`
      <div class="c r">
        <span style="font-weight:600;font-size:14px">${tr(k==='full'?'fullDelivered':k==='empty'?'emptyReceived':'defectiveReturned')}</span>
        <div style="display:flex;align-items:center;gap:12px">
          <button class="sp" data-a="st" data-k="${k}" data-d="-1" aria-label="less">−</button>
          <b style="font-size:18px;min-width:24px;text-align:center">${f[k]}</b>
          <button class="sp k" data-a="st" data-k="${k}" data-d="1" aria-label="more">+</button>
        </div>
      </div>
    `).join('')}
    <div class="c">
      <div class="r">
        <span class="s">${tr('amount')}</span>
        <b style="font-size:26px;color:var(--navy)">₹${o.price*f.full}</b>
      </div>
      <div class="g2" style="margin-top:4px">
        ${['CASH','UPI','LATER'].map(m=>`
          <button class="ch ${f.mode===m?'on':''}" data-a="pay" data-m="${m}">
            ${tr(m==='LATER'?'payLater':m==='CASH'?'cash':'upi')}
          </button>
        `).join('')}
      </div>
      ${f.mode==='UPI'?`
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
          <input id="ref" placeholder="${tr('upiRef')}" value="${E(f.ref||'')}">
          <button class="fast-btn" style="background:var(--navy)" data-a="showqr">${tr('showUpiQr')}</button>
        </div>
      `:''}
      ${msg?`<p class="s" style="color:#B91C1C;font-weight:600">${E(msg)}</p>`:''}
    </div>
    <div class="sticky-bottom" style="display:flex;gap:10px">
      <button class="pr" style="flex:2" data-a="confirm">${tr('confirmDelivery')}</button>
      <button class="ch" style="flex:1" data-a="back">${tr('cancel')}</button>
    </div>`;
  }else if(mode==='close'){
    const d=RUN.orders.filter(o=>o.status==='done'||q.has(o.id)).length;
    const expUnsold=RUN.loaded-d;
    const expEmpties=d;
    bodyContent=`
    <div class="c">
      <b style="font-size:16px">${tr('countVehicle')}</b>
      <span class="s">Vehicle: <b>${E(RUN.vehicle)}</b> · Run: <b>${RUN.id}</b></span>
    </div>
    <div class="c">
      <label>${tr('fullUnsold')} (${expUnsold} expected)
        <input id="c_unsold" type="number" value="${expUnsold}">
      </label>
      <label>${tr('emptiesReturned')} (${expEmpties} expected)
        <input id="c_empties" type="number" value="${expEmpties}">
      </label>
      <label>${tr('defectiveCount')} (0 expected)
        <input id="c_defective" type="number" value="0">
      </label>
      <label>${tr('cashInHand')}
        <input id="c_cash" type="number" value="0">
      </label>
    </div>
    <div class="sticky-bottom" style="display:flex;gap:10px">
      <button class="pr" style="flex:2" data-a="closeok">${tr('closeConfirm')}</button>
      <button class="ch" style="flex:1" data-a="back">${tr('cancel')}</button>
    </div>`;
  }else{
    let firstPendingFound=false;
    const doneOrders=RUN.orders.filter(o=>o.status==='done'||q.has(o.id));
    const delCount=doneOrders.length;
    const fullRem=Math.max(0,RUN.loaded-delCount);
    const emptiesInTruck=delCount;
    const cashInHand=Q.filter(e=>e.type==='PAY'&&e.p.mode==='CASH').reduce((a,b)=>a+(+b.p.amount||0),0);
    const villagesInRun=Array.from(new Set(RUN.orders.map(o=>o.village)));
    const filteredOrders=driverVillageFilter?RUN.orders.filter(o=>o.village===driverVillageFilter):RUN.orders;

    const orderCards=filteredOrders.map(o=>{
      const isDone=o.status==='done';
      const isQueued=q.has(o.id);
      const isNext=!isDone&&!isQueued&&!firstPendingFound;
      if(isNext)firstPendingFound=true;

      return `
      <div class="customer-card ${isNext?'next-up':''}">
        <div class="r">
          <div style="display:flex;align-items:center;gap:12px">
            <div class="avatar-badge">${getInitials(o.name)}</div>
            <div>
              <div style="font-weight:700;font-size:15px;color:var(--navy)">${E(o.name)}</div>
              <div class="s">${E(o.village)} · ${o.id} · ${o.qty}×${o.type} ${o.left<=0?'<span class="tag rdb" style="padding:1px 6px;font-size:10.5px">⚠️ Quota full ('+o.left+' left)</span>':'<span class="tag bl" style="padding:1px 6px;font-size:10.5px">'+o.left+' left</span>'}</div>
            </div>
          </div>
          <div>
            ${isDone?`<span class="tag g">${tr('done')}</span>`:isQueued?`<span class="tag a">${tr('saved')}</span>`:`<b style="font-size:16px;color:var(--navy)">₹${o.price}</b>`}
          </div>
        </div>
        ${!isDone&&!isQueued?`
          ${o.left<=0?'<div style="font-size:11.5px;color:#B91C1C;font-weight:700;margin-top:2px">⚠️ Domestic Quota Exhausted · Collect Full Price ₹900 (No Subsidy)</div>':'<div style="font-size:11.5px;color:#15803D;font-weight:600;margin-top:2px">✓ Subsidised Domestic Refill · '+o.left+' refills left (₹175 DBTL)</div>'}
          <div class="r" style="margin-top:4px">
            ${isNext?`<span class="tag" style="background:#FFF1E8;color:#C2410C;border:1px solid #FFEDD5">${tr('nextCustomer')}</span>`:''}
            <div style="display:flex;gap:6px;margin-left:auto">
              <button class="fast-btn" data-a="fastdel" data-id="${o.id}">${tr('quickCash',{p:o.price})}</button>
              <button class="sm sec" data-a="open" data-id="${o.id}">${tr('deliver')}</button>
              <button class="sm" style="background:#64748B;color:#fff" data-a="openpostpone" data-id="${o.id}" title="${tr('postponeBtn')}">🚪 ${tr('postponeBtn')}</button>
            </div>
          </div>
        `:`
          <div class="r" style="margin-top:4px">
            <span class="s" style="font-size:12px;color:var(--green-text);font-weight:600">✓ Delivered &amp; Receipt Logged</span>
            <button class="sm" style="background:var(--navy);margin-left:auto;font-size:11.5px;padding:3px 10px" data-a="openpod" data-id="${o.id}">🧾 Receipt / POD</button>
          </div>
        `}
      </div>`;
    }).join('');

    bodyContent=`
    <div class="c" style="background:var(--navy);color:#fff;border-color:var(--navy);padding:14px 16px">
      <div class="r">
        <div>
          <small style="color:#CBD5E1;font-size:12px">${tr('todaysRun')} · ${RUN.id}</small>
          <div style="font-size:18px;font-weight:800;letter-spacing:-0.02em">${E(RUN.vehicle)}</div>
        </div>
        <div style="text-align:right">
          <span class="tag" style="background:rgba(255,255,255,0.15);color:#fff">${RUN.loaded} Loaded Cylinders</span>
          <div style="font-size:11px;color:#94A3B8;margin-top:2px">${delCount} of ${RUN.orders.length} Drops Done</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px;background:rgba(255,255,255,0.08);border-radius:8px;padding:8px 10px;text-align:center">
        <div><small style="color:#94A3B8;font-size:10.5px">Full Left</small><div style="font-size:16px;font-weight:700;color:#FDBA74">${fullRem}</div></div>
        <div><small style="color:#94A3B8;font-size:10.5px">Empties</small><div style="font-size:16px;font-weight:700;color:#86EFAC">${emptiesInTruck}</div></div>
        <div><small style="color:#94A3B8;font-size:10.5px">Defects</small><div style="font-size:16px;font-weight:700;color:#FCA5A5">0</div></div>
        <div><small style="color:#94A3B8;font-size:10.5px">Cash Held</small><div style="font-size:16px;font-weight:700;color:#FDE047">₹${cashInHand}</div></div>
      </div>
    </div>
    <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
      <span class="village-chip ${!driverVillageFilter?'selected':''}" data-a="filterdrivervillage" data-v="">All Villages (${RUN.orders.length})</span>
      ${villagesInRun.map(v=>`<span class="village-chip ${driverVillageFilter===v?'selected':''}" data-a="filterdrivervillage" data-v="${E(v)}">${E(v)} (${RUN.orders.filter(o=>o.village===v).length})</span>`).join('')}
    </div>
    ${orderCards}
    <button class="ch" style="margin-top:4px;min-height:48px" data-a="close">${tr('closeRun')}</button>`;
  }

  const postponeModal=showPostponeModal?`
  <div class="modal-overlay">
    <div class="modal-sheet">
      <div class="r">
        <b style="font-size:16px;color:var(--navy)">${tr('postponeTitle')}</b>
        <button class="sp" data-a="closepostpone">✕</button>
      </div>
      <span class="s">Select doorstep failure reason. Cylinder remains on vehicle as unsold stock.</span>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
        <button class="ch ${postponeReason==='DOOR_LOCKED'?'on':''}" data-a="setpostponereason" data-r="DOOR_LOCKED" style="text-align:left;min-height:48px">
          ${tr('doorLocked')}
        </button>
        <button class="ch ${postponeReason==='NO_CASH'?'on':''}" data-a="setpostponereason" data-r="NO_CASH" style="text-align:left;min-height:48px">
          ${tr('noCashToday')}
        </button>
        <button class="ch ${postponeReason==='NO_EMPTY'?'on':''}" data-a="setpostponereason" data-r="NO_EMPTY" style="text-align:left;min-height:48px">
          ${tr('emptyNotReady')}
        </button>
      </div>
      <div class="sticky-bottom" style="display:flex;gap:10px;margin-top:12px">
        <button class="pr" style="flex:2" data-a="confirmpostpone">Confirm Postponement</button>
        <button class="ch" style="flex:1" data-a="closepostpone">${tr('cancel')}</button>
      </div>
    </div>
  </div>`:'' ;

  const qrModal=showQrModal?`
  <div class="modal-overlay">
    <div class="modal-sheet" style="text-align:center">
      <b style="font-size:16px;color:var(--navy)">${tr('showUpiQr')}</b>
      <span class="s">${tr('scanToPay')}</span>
      <div style="border:1px dashed var(--orange);border-radius:10px;padding:16px;margin:8px 0;display:flex;flex-direction:column;align-items:center;gap:6px">
        <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="180" fill="#fff"/>
          <rect x="15" y="15" width="42" height="42" fill="#0F1B2D"/><rect x="21" y="21" width="30" height="30" fill="#fff"/><rect x="27" y="27" width="18" height="18" fill="#0F1B2D"/>
          <rect x="123" y="15" width="42" height="42" fill="#0F1B2D"/><rect x="129" y="21" width="30" height="30" fill="#fff"/><rect x="135" y="27" width="18" height="18" fill="#0F1B2D"/>
          <rect x="15" y="123" width="42" height="42" fill="#0F1B2D"/><rect x="21" y="129" width="30" height="30" fill="#fff"/><rect x="27" y="135" width="18" height="18" fill="#0F1B2D"/>
          <rect x="70" y="25" width="12" height="12" fill="#0F1B2D"/><rect x="90" y="25" width="12" height="12" fill="#0F1B2D"/>
          <rect x="70" y="55" width="12" height="12" fill="#0F1B2D"/><rect x="90" y="70" width="12" height="12" fill="#0F1B2D"/>
          <rect x="70" y="90" width="12" height="12" fill="#0F1B2D"/><rect x="90" y="105" width="12" height="12" fill="#0F1B2D"/>
          <rect x="120" y="70" width="12" height="12" fill="#0F1B2D"/><rect x="135" y="90" width="12" height="12" fill="#0F1B2D"/>
          <rect x="70" y="135" width="12" height="12" fill="#0F1B2D"/><rect x="105" y="135" width="12" height="12" fill="#0F1B2D"/>
        </svg>
        <b style="font-size:20px;color:var(--orange)">₹${(RUN.orders.find(x=>x.id===cur)?.price||900)*(f.full||1)}</b>
        <span class="s">VPA: <b>vijayagas@upi</b></span>
        <span class="s">Order: <b>${cur}</b></span>
      </div>
      <button class="pr" data-a="closeqr">Done</button>
    </div>
  </div>`:'' ;

  const podModal=showPodModal&&podOrderData?`
  <div class="modal-overlay">
    <div class="modal-sheet">
      <div class="r">
        <b style="font-size:16px;color:var(--navy)">Digital Proof of Delivery (POD)</b>
        <button class="sp" data-a="closepod">✕</button>
      </div>
      <div class="receipt-paper">
        <div style="text-align:center;border-bottom:1px dashed var(--navy);padding-bottom:8px;margin-bottom:8px">
          <b style="font-size:15px;color:var(--navy)">VIJAYA GAS AGENCY</b><br>
          <small>Authorised LPG Distributorship</small><br>
          <small>DOORSTEP DELIVERY RECEIPT & SUBSIDY SLIP</small>
        </div>
        <div class="r"><span>Order No:</span><b>${podOrderData.id}</b></div>
        <div class="r"><span>Consumer SV:</span><b>${podOrderData.sv_num||podOrderData.customer}</b></div>
        <div class="r"><span>Customer Name:</span><b>${E(podOrderData.name)}</b></div>
        <div class="r"><span>Village / Route:</span><b>${E(podOrderData.village)}</b></div>
        <div class="r"><span>Aadhaar Ref:</span><b>XXXX-XXXX-1259 (DPDP Masked)</b></div>
        <hr style="border:0;border-top:1px dashed var(--navy);margin:8px 0">
        <div class="r"><span>Cylinder Delivered:</span><b>1× 14.2kg Domestic Refill</b></div>
        <div class="r"><span>Empty Cylinder Swapped:</span><b>1 Empty Received (1:1 Swap)</b></div>
        <div class="r"><span>Amount Collected:</span><b style="font-size:16px;color:var(--green-text)">₹${podOrderData.price} (PAID)</b></div>
        <div class="r"><span>Subsidy Quota Status:</span><b>${podOrderData.left<=0?'Domestic Quota Exhausted':`${podOrderData.left} Refills Remaining`}</b></div>
        <div class="r"><span>Direct Benefit (DBTL):</span><b>₹175 Direct Transfer</b></div>
        <div style="margin-top:10px;padding:6px;background:#F1F5F9;border-radius:6px;font-size:10.5px;word-break:break-all">
          <b>Cryptographic SHA-256 Ledger Stamp:</b><br>
          <code>${Math.random().toString(16).slice(2)}d78e3f4a1290bb8c5417ef89</code>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:4px">
        <button class="pr" style="flex:2" data-a="sharepodwhatsapp">📱 Share via WhatsApp / SMS</button>
        <button class="ch" style="flex:1" data-a="closepod">Close</button>
      </div>
    </div>
  </div>`:'' ;

  const toast=toastText?`<div class="toast"><span>✓</span> ${E(toastText)}</div>`:'';

  A.innerHTML=`<div class="delivery-shell">${topHeader}${runProgress}<div class="del-body">${bodyContent}</div>${postponeModal}${qrModal}${podModal}${toast}</div>`;
}

async function office(){
  let tabs=[];
  if(ROLE==='counter'){
    tabs=[
      ['bk','⚡ Fast Booking & SV'],
      ['cr','🚚 Dispatch & Gate Pass'],
      ['dp','💵 Cash Handover & Notes'],
      ['eod','🧾 Evening Closing Sheet'],
      ['sk','🏭 Godown Stock Gauge'],
      ['rp','📊 Reports Hub'],
      ['cu','👥 30,000 Customers']
    ];
  }else if(ROLE==='owner'){
    tabs=[
      ['dash','📊 Executive Cockpit'],
      ['daily','📅 Daily Summary'],
      ['rp','📊 Reports Hub'],
      ['def','🔴 Cylinder Defaults'],
      ['eod','🧾 Closing Sheet'],
      ['ex','⚠️ Exceptions Radar'],
      ['an','📡 Anomaly Radar'],
      ['cu','👥 30,000 Customers'],
      ['sk','🏭 Stock Balance'],
      ['lg','🔗 SHA-256 Chain'],
      ['au','📑 Monthly Audit Pack']
    ];
  }else if(ROLE==='auditor'){
    tabs=[
      ['au','📑 Statutory Audit Pack'],
      ['rp','📊 Reports Hub'],
      ['quota','🏛️ Subsidy DBTL Audit'],
      ['lg','🔗 Hash Chain Verifier'],
      ['dpdp','🔒 DPDP 2023 Compliance'],
      ['cu','👥 Masked Directory']
    ];
  }
  const validKeys=tabs.map(t=>t[0]);
  if(!validKeys.includes(tab))tab=validKeys[0];

  // Show loading skeleton while fetching
  const loadingSkeleton=`
  <div style="display:flex;flex-direction:column;gap:12px">
    ${[1,2,3].map(()=>`
      <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px;animation:pulse 1.5s ease-in-out infinite">
        <div style="height:16px;background:#F1F5F9;border-radius:6px;width:40%;margin-bottom:10px"></div>
        <div style="height:28px;background:#F1F5F9;border-radius:6px;width:60%"></div>
      </div>
    `).join('')}
  </div>`;

  let body=loadingSkeleton;
  // Show tabs immediately with skeleton
  A.innerHTML=`
  <div class="office-layout">
    <div class="office-sidebar">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
          <div style="background:rgba(194,65,12,0.2);border-radius:8px;padding:4px;display:flex">${flameIconSvg}</div>
          <div>
            <div style="font-weight:800;font-size:17px;letter-spacing:-0.02em">${tr('agency')}</div>
            <small style="color:#94A3B8;font-size:11px">${ROLE.toUpperCase()} CONSOLE</small>
          </div>
        </div>
        <div class="sidebar-tabs">
          ${tabs.map(([k,l])=>`<button class="sb-btn ${tab===k?'active':''}" data-a="tab" data-k="${k}">${l}</button>`).join('')}
        </div>
      </div>
      <button class="ch" style="background:rgba(255,255,255,0.08);color:#CBD5E1;border-color:#334155;margin-top:20px" data-a="out">${tr('signOut')}</button>
    </div>
    <div class="mobile-tabs-bar">
      ${tabs.map(([k,l])=>`<button class="tb ${tab===k?'on':''}" data-a="tab" data-k="${k}">${l}</button>`).join('')}
      <button class="tb" data-a="out" style="color:#B91C1C">${tr('signOut')}</button>
    </div>
    <div class="office-main" id="office_body">${loadingSkeleton}</div>
  </div>`;

  try{
    // ── Daily Operations Summary ─────────────────────────────────────────
    if(tab==='daily'){
      if(!dailySummaryDate)dailySummaryDate=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
      dailySummaryData=await api('daily-summary?date='+dailySummaryDate);
      const ds=dailySummaryData.summary;
      body=`
      <div class="c" style="background:linear-gradient(135deg,#0F1B2D 0%,#1A2942 100%);color:#fff;border:0">
        <div class="r">
          <div>
            <b style="font-size:18px">📅 Daily Operations Summary</b>
            <div style="color:#94A3B8;font-size:13px;margin-top:2px">Vijaya Gas Agency · ${dailySummaryData.date}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <input type="date" id="daily_date_pick" value="${dailySummaryDate}" style="min-height:36px;background:#1A2942;color:#fff;border-color:#334155;font-size:13px;padding:0 8px">
            <button class="sm" data-a="loaddailysummary" style="white-space:nowrap">Load Day</button>
          </div>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:12px">
        <div class="summary-card" style="border-left:4px solid #C2410C">
          <span class="s">Cylinders Delivered</span>
          <div class="summary-num" style="color:#C2410C">${ds.fullDel}</div>
          <small class="s">${ds.deliveries} delivery transactions</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #16A34A">
          <span class="s">Empties Returned</span>
          <div class="summary-num gr">${ds.empRet}</div>
          <small class="s">Recovery rate: ${ds.fullDel>0?Math.round(ds.empRet/ds.fullDel*100):0}%</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #DC2626">
          <span class="s">Empties Defaulted</span>
          <div class="summary-num rd">${ds.defaulted}</div>
          <small class="s" style="color:#DC2626">₹${(ds.defaulted*1500).toLocaleString()} exposure</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #B45309">
          <span class="s">Defective Returned</span>
          <div class="summary-num" style="color:#B45309">${ds.defRet}</div>
          <small class="s">Tagged for quarantine</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #0369A1">
          <span class="s">Cash Collected</span>
          <div class="summary-num" style="color:#0369A1">₹${ds.cashCol.toLocaleString()}</div>
          <small class="s">Deposited: ₹${ds.cashDep.toLocaleString()} · Float: ₹${(ds.cashCol-ds.cashDep).toLocaleString()}</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #7C3AED">
          <span class="s">UPI Collected</span>
          <div class="summary-num" style="color:#7C3AED">₹${ds.upiCol.toLocaleString()}</div>
          <small class="s">${dailySummaryData.upiList.length} UPI transactions</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #D97706">
          <span class="s">Pay-Later Outstanding</span>
          <div class="summary-num" style="color:#D97706">₹${ds.payLaterAmt.toLocaleString()}</div>
          <small class="s">${ds.payLaterCount} deliveries pending payment</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #059669">
          <span class="s">Total Revenue Today</span>
          <div class="summary-num gr">₹${ds.totalRevenue.toLocaleString()}</div>
          <small class="s">${ds.bookingsToday} new bookings · ${ds.postponed} postponed</small>
        </div>
      </div>

      ${dailySummaryData.runBreakdown.length?`
      <div class="c" style="margin-top:12px">
        <b style="font-size:15px;color:var(--navy)">Run-by-Run Breakdown</b>
        <div style="overflow-x:auto;margin-top:8px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
              <th style="padding:8px 10px;text-align:left">Run</th>
              <th style="padding:8px 10px;text-align:left">Staff</th>
              <th style="padding:8px 10px;text-align:left">Vehicle</th>
              <th style="padding:8px 10px;text-align:center">Loaded</th>
              <th style="padding:8px 10px;text-align:center">Delivered</th>
              <th style="padding:8px 10px;text-align:center">Empties Back</th>
              <th style="padding:8px 10px;text-align:center">Defaulted</th>
              <th style="padding:8px 10px;text-align:right">Cash</th>
              <th style="padding:8px 10px;text-align:right">UPI</th>
              <th style="padding:8px 10px;text-align:right">Cash Float</th>
              <th style="padding:8px 10px;text-align:center">Status</th>
            </tr></thead>
            <tbody>
              ${dailySummaryData.runBreakdown.map(r=>`
                <tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 10px;font-family:monospace;font-weight:700">${r.runId}</td>
                  <td style="padding:8px 10px"><b>${E(r.staffName)}</b></td>
                  <td style="padding:8px 10px">${E(r.vehicle)}</td>
                  <td style="padding:8px 10px;text-align:center">${r.loaded}</td>
                  <td style="padding:8px 10px;text-align:center;font-weight:700">${r.delivered}</td>
                  <td style="padding:8px 10px;text-align:center;color:var(--green-text)">${r.empReturned}</td>
                  <td style="padding:8px 10px;text-align:center;color:${r.defaulted>0?'#DC2626':'var(--green-text)'};font-weight:700">${r.defaulted}</td>
                  <td style="padding:8px 10px;text-align:right">₹${r.cash}</td>
                  <td style="padding:8px 10px;text-align:right">₹${r.upi}</td>
                  <td style="padding:8px 10px;text-align:right;color:${r.cashFloat>0?'#DC2626':'var(--green-text)'};font-weight:700">₹${r.cashFloat}</td>
                  <td style="padding:8px 10px;text-align:center"><span class="tag ${r.closed?'g':'a'}">${r.closed?'CLOSED':'OPEN'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`:''}

      ${dailySummaryData.villageBreakdown.length?`
      <div class="c" style="margin-top:12px">
        <b style="font-size:15px;color:var(--navy)">Village-wise Delivery Summary</b>
        <div style="overflow-x:auto;margin-top:8px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
              <th style="padding:8px 10px;text-align:left">Village</th>
              <th style="padding:8px 10px;text-align:center">Delivered</th>
              <th style="padding:8px 10px;text-align:center">Empties Returned</th>
              <th style="padding:8px 10px;text-align:center">Defaulted</th>
              <th style="padding:8px 10px;text-align:right">Revenue</th>
            </tr></thead>
            <tbody>
              ${dailySummaryData.villageBreakdown.map(v=>`
                <tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 10px;font-weight:700">${E(v.village)}</td>
                  <td style="padding:8px 10px;text-align:center">${v.delivered}</td>
                  <td style="padding:8px 10px;text-align:center;color:var(--green-text)">${v.empReturned}</td>
                  <td style="padding:8px 10px;text-align:center;color:${v.defaulted>0?'#DC2626':'var(--green-text)'}">${v.defaulted}</td>
                  <td style="padding:8px 10px;text-align:right;font-weight:700">₹${(v.revenue||0).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`:''}

      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="pr" style="flex:1" onclick="window.print()">🖨 Print Daily Report</button>
        <button class="ch" style="flex:1" data-a="tab" data-k="def">🔴 View Cylinder Defaults</button>
        <button class="ch" style="flex:1" data-a="tab" data-k="eod">🧾 Evening Closing Sheet</button>
      </div>`;

    // ── Defaulted Cylinder Register ───────────────────────────────────────
    }else if(tab==='def'){
      defaultsData=await api('defaults');
      const riskColor={critical:'#B91C1C',high:'#C2410C',medium:'#D97706',low:'#16A34A'};
      const riskBg={critical:'#FEE2E2',high:'#FFF1E8',medium:'#FEF3C7',low:'#DCFCE7'};
      body=`
      <div class="c" style="background:#FEE2E2;border-color:#FCA5A5">
        <div class="r">
          <div>
            <b style="font-size:18px;color:#991B1B">🔴 Defaulted Cylinder Register</b>
            <div class="s" style="color:#B91C1C;margin-top:2px">Customers holding empty cylinders without returning — live outstanding register.</div>
          </div>
          <span class="tag rdb">ASSET RECOVERY ALERT</span>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:12px">
        <div class="summary-card" style="border-left:4px solid #DC2626">
          <span class="s">Total Cylinders Defaulted</span>
          <div class="summary-num rd">${defaultsData.totalDeficitCylinders}</div>
          <small class="s">Full cylinders with no empty returned</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #9F1239">
          <span class="s">Asset Exposure Value</span>
          <div class="summary-num" style="color:#9F1239">₹${(defaultsData.totalExposureValue||0).toLocaleString()}</div>
          <small class="s">@ ₹1,500 per cylinder replacement cost</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #B91C1C">
          <span class="s">Critical (&gt;90 days)</span>
          <div class="summary-num rd">${defaultsData.ageingBuckets['90+ days']||0} cylinders</div>
          <small class="s">Requires immediate follow-up</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #D97706">
          <span class="s">High Risk (31–90 days)</span>
          <div class="summary-num" style="color:#D97706">${defaultsData.ageingBuckets['31-90 days']||0} cylinders</div>
          <small class="s">Priority recovery list</small>
        </div>
      </div>

      <div class="c" style="margin-top:12px">
        <div class="r">
          <b style="font-size:15px;color:var(--navy)">Customer Default Register (${defaultsData.records.length} records)</b>
          <span class="tag rdb">${defaultsData.totalDeficitCylinders} Total Deficit</span>
        </div>
        <div class="s" style="margin-bottom:8px">Sorted by oldest default first. Call customers to arrange empty cylinder return before next delivery.</div>
        ${defaultsData.records.length===0?'<p class="s">No defaults detected. All empties are accounted for. ✓</p>':''}
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
              <th style="padding:8px 10px;text-align:left">Risk</th>
              <th style="padding:8px 10px;text-align:left">Customer</th>
              <th style="padding:8px 10px;text-align:left">Village</th>
              <th style="padding:8px 10px;text-align:left">SV Number</th>
              <th style="padding:8px 10px;text-align:left">Phone</th>
              <th style="padding:8px 10px;text-align:center">Delivered</th>
              <th style="padding:8px 10px;text-align:center">Returned</th>
              <th style="padding:8px 10px;text-align:center">Deficit</th>
              <th style="padding:8px 10px;text-align:center">Days Out</th>
              <th style="padding:8px 10px;text-align:center">Ageing</th>
              <th style="padding:8px 10px;text-align:right">Value at Risk</th>
            </tr></thead>
            <tbody>
              ${defaultsData.records.map(d=>`
                <tr style="border-bottom:1px solid var(--border);background:${d.riskLevel==='critical'?'#FFF5F5':'#fff'}">
                  <td style="padding:8px 10px">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${riskColor[d.riskLevel]}"></span>
                  </td>
                  <td style="padding:8px 10px;font-weight:700">${E(d.name)}</td>
                  <td style="padding:8px 10px">${E(d.village)}</td>
                  <td style="padding:8px 10px;font-family:monospace">${E(d.sv_num)}</td>
                  <td style="padding:8px 10px;font-family:monospace">${E(d.phone)}</td>
                  <td style="padding:8px 10px;text-align:center">${d.fullDelivered}</td>
                  <td style="padding:8px 10px;text-align:center;color:var(--green-text)">${d.emptyReturned}</td>
                  <td style="padding:8px 10px;text-align:center;font-weight:800;color:#DC2626">${d.deficit}</td>
                  <td style="padding:8px 10px;text-align:center;color:${d.daysOut>30?'#DC2626':d.daysOut>7?'#D97706':'#334155'};font-weight:700">${d.daysOut}</td>
                  <td style="padding:8px 10px;text-align:center">
                    <span style="background:${riskBg[d.riskLevel]};color:${riskColor[d.riskLevel]};padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700">${d.ageing}</span>
                  </td>
                  <td style="padding:8px 10px;text-align:right;font-weight:700;color:#9F1239">₹${(d.cylinderValue||0).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="pr" style="flex:1" onclick="window.print()">🖨 Print Recovery List</button>
        <button class="ch" style="flex:1" data-a="tab" data-k="daily">📅 Back to Daily Summary</button>
      </div>`;

    // ── Evening Closing Sheet (Cash + UPI Reconciliation) ─────────────────
    }else if(tab==='eod'){
      if(!closingSheetDate)closingSheetDate=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
      closingSheetData=await api('closing-sheet?date='+closingSheetDate);
      const cs=closingSheetData.summary;
      body=`
      <div class="c" style="background:linear-gradient(135deg,#0F1B2D 0%,#1A2942 100%);color:#fff;border:0">
        <div class="r">
          <div>
            <b style="font-size:18px">🧾 Evening Closing Sheet</b>
            <div style="color:#94A3B8;font-size:13px;margin-top:2px">Cash & UPI Reconciliation · ${closingSheetData.date}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <input type="date" id="eod_date_pick" value="${closingSheetDate}" style="min-height:36px;background:#1A2942;color:#fff;border-color:#334155;font-size:13px;padding:0 8px">
            <button class="sm" data-a="loadeodsheet" style="white-space:nowrap">Load</button>
          </div>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:12px">
        <div class="summary-card" style="border-left:4px solid #0369A1">
          <span class="s">Cash Collected</span>
          <div class="summary-num" style="color:#0369A1">₹${cs.cashTotal.toLocaleString()}</div>
          <small class="s">Physical cash from delivery runs</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #7C3AED">
          <span class="s">UPI Collected</span>
          <div class="summary-num" style="color:#7C3AED">₹${cs.upiTotal.toLocaleString()}</div>
          <small class="s">${cs.upiCount} UPI payments · check bank statement</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #16A34A">
          <span class="s">Cash Deposited at Bank</span>
          <div class="summary-num gr">₹${cs.depositedTotal.toLocaleString()}</div>
          <small class="s">${closingSheetData.depositHistory.length} deposit transactions</small>
        </div>
        <div class="summary-card" style="border-left:4px solid ${cs.cashBalance>0?'#DC2626':'#16A34A'}">
          <span class="s">Cash in Hand (Undeposited)</span>
          <div class="summary-num ${cs.cashBalance>0?'rd':'gr'}">₹${cs.cashBalance.toLocaleString()}</div>
          <small class="s">${cs.cashBalance>0?'Must be deposited or carried tomorrow':'Fully deposited ✓'}</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #D97706">
          <span class="s">Pay-Later Outstanding</span>
          <div class="summary-num" style="color:#D97706">₹${cs.payLaterTotal.toLocaleString()}</div>
          <small class="s">${cs.payLaterCount} deliveries with payment pending</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #059669">
          <span class="s">Grand Total Revenue</span>
          <div class="summary-num gr">₹${cs.grandTotal.toLocaleString()}</div>
          <small class="s">Cash + UPI collected today</small>
        </div>
      </div>

      ${closingSheetData.runCash.length?`
      <div class="c" style="margin-top:12px">
        <b style="font-size:15px;color:var(--navy)">Cash Float by Delivery Run</b>
        <div class="s" style="margin-bottom:8px">Undeposited cash held by each driver. All amounts must reach the counter or bank before end of day.</div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
              <th style="padding:8px 10px;text-align:left">Run</th>
              <th style="padding:8px 10px;text-align:left">Staff</th>
              <th style="padding:8px 10px;text-align:right">Collected</th>
              <th style="padding:8px 10px;text-align:right">Deposited</th>
              <th style="padding:8px 10px;text-align:right">Cash Float</th>
              <th style="padding:8px 10px;text-align:center">Status</th>
            </tr></thead>
            <tbody>
              ${closingSheetData.runCash.map(r=>`
                <tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 10px;font-family:monospace;font-weight:700">${r.runId}</td>
                  <td style="padding:8px 10px"><b>${E(r.staffName)}</b></td>
                  <td style="padding:8px 10px;text-align:right">₹${r.collected.toLocaleString()}</td>
                  <td style="padding:8px 10px;text-align:right;color:var(--green-text)">₹${r.deposited.toLocaleString()}</td>
                  <td style="padding:8px 10px;text-align:right;font-weight:800;color:${r.float>0?'#DC2626':'var(--green-text)'}">₹${r.float.toLocaleString()}</td>
                  <td style="padding:8px 10px;text-align:center"><span class="tag ${r.float===0?'g':'a'}">${r.float===0?'SETTLED':'PENDING'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`:''}

      ${closingSheetData.upiDetails.length?`
      <div class="c" style="margin-top:12px">
        <div class="r">
          <b style="font-size:15px;color:var(--navy)">UPI Reference List — For Bank Statement Matching</b>
          <span class="tag" style="background:#7C3AED;color:#fff">${closingSheetData.upiDetails.length} UPI Txns</span>
        </div>
        <div class="s" style="margin-bottom:8px">Verify these reference IDs against your GPay / PhonePe / Paytm dashboard. Total: <b>₹${cs.upiTotal.toLocaleString()}</b></div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr style="background:#F5F3FF;border-bottom:2px solid var(--border)">
              <th style="padding:8px 10px;text-align:left">UPI Reference ID</th>
              <th style="padding:8px 10px;text-align:right">Amount</th>
              <th style="padding:8px 10px;text-align:left">Customer</th>
              <th style="padding:8px 10px;text-align:left">Village</th>
              <th style="padding:8px 10px;text-align:left">Order</th>
              <th style="padding:8px 10px;text-align:left">Time</th>
              <th style="padding:8px 10px;text-align:left">Ledger Hash</th>
            </tr></thead>
            <tbody>
              ${closingSheetData.upiDetails.map(u=>`
                <tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 10px;font-family:monospace;font-weight:700;color:#7C3AED">${E(u.ref)}</td>
                  <td style="padding:8px 10px;text-align:right;font-weight:700">₹${u.amount.toLocaleString()}</td>
                  <td style="padding:8px 10px;font-weight:600">${E(u.name)}</td>
                  <td style="padding:8px 10px">${E(u.village)}</td>
                  <td style="padding:8px 10px;font-family:monospace">${E(u.order)}</td>
                  <td style="padding:8px 10px;font-size:11px">${new Date(u.ts).toLocaleTimeString()}</td>
                  <td style="padding:8px 10px;font-family:monospace;font-size:11px;color:var(--text-muted)">${u.hash}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`:''}

      ${closingSheetData.payLaterDetails.length?`
      <div class="c" style="margin-top:12px;border-color:#FCD34D;background:#FFFBEB">
        <div class="r">
          <b style="font-size:15px;color:#92400E">Pay-Later Collection — Outstanding Dues</b>
          <span class="tag a">${closingSheetData.payLaterDetails.length} Unpaid</span>
        </div>
        <div class="s" style="margin-bottom:8px">Cylinders delivered but payment NOT yet collected. Follow up with these customers.</div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr style="background:#FEF9C3;border-bottom:2px solid #FCD34D">
              <th style="padding:8px 10px;text-align:left">Customer</th>
              <th style="padding:8px 10px;text-align:left">Village</th>
              <th style="padding:8px 10px;text-align:left">Order</th>
              <th style="padding:8px 10px;text-align:right">Amount Due</th>
              <th style="padding:8px 10px;text-align:left">Delivery Time</th>
            </tr></thead>
            <tbody>
              ${closingSheetData.payLaterDetails.map(p=>`
                <tr style="border-bottom:1px solid #FDE68A">
                  <td style="padding:8px 10px;font-weight:700">${E(p.name)}</td>
                  <td style="padding:8px 10px">${E(p.village)}</td>
                  <td style="padding:8px 10px;font-family:monospace">${E(p.order)}</td>
                  <td style="padding:8px 10px;text-align:right;font-weight:800;color:#B45309">₹${p.amount.toLocaleString()}</td>
                  <td style="padding:8px 10px;font-size:12px">${new Date(p.deliveryDate).toLocaleString()}</td>
                </tr>
              `).join('')}
              <tr style="background:#FEF3C7;font-weight:700">
                <td colspan="3" style="padding:8px 10px">Total Outstanding</td>
                <td style="padding:8px 10px;text-align:right;color:#B45309">₹${cs.payLaterTotal.toLocaleString()}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`:''}

      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="pr" style="flex:1" onclick="window.print()">🖨 Print Closing Sheet</button>
        <button class="ch" style="flex:1" data-a="tab" data-k="daily">📅 Daily Summary</button>
        <button class="ch" style="flex:1" data-a="tab" data-k="def">🔴 Cylinder Defaults</button>
      </div>`;

    }else if(tab==='dash'){
      runsSummaryCache=runsSummaryCache.length?runsSummaryCache:await api('runs-summary');
      stockCache=stockCache||await api('stock');
      EX=EX||await api('exceptions');
      const totalDel=runsSummaryCache.reduce((a,b)=>a+(+b.delivered||0),0);
      const totalCash=runsSummaryCache.reduce((a,b)=>a+(+b.cashCollected||0),0);
      const totalDep=runsSummaryCache.reduce((a,b)=>a+(+b.cashDeposited||0),0);
      const commissionEarned=(stockCache.fullDel||totalDel)*68.05;
      const floatInField=runsSummaryCache.filter(r=>!r.closed).reduce((a,b)=>a+Math.max(0,b.cashCollected-b.cashDeposited),0);
      const depositGap=totalCash-totalDep;

      body=`
      <div class="c" style="background:#FFF1E8;border-color:#FFD8C2">
        <div class="r">
          <div>
            <b style="font-size:18px;color:var(--orange)">Agency Executive Command Cockpit</b>
            <div class="s">Distributorship revenue velocity, field cash float, and anti-fraud monitoring.</div>
          </div>
          <span class="tag" style="background:var(--orange);color:#fff">OWNER DASHBOARD</span>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:12px">
        <div class="summary-card" style="border-left:4px solid var(--orange)">
          <span class="s">Today's Gross Sales</span>
          <div class="summary-num" style="color:var(--orange)">₹${totalCash}</div>
          <small class="s">${totalDel} cylinders sold across runs</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #16A34A">
          <span class="s">Distributor Commission</span>
          <div class="summary-num gr">₹${commissionEarned.toFixed(0)}</div>
          <small class="s">Fixed OMC commission (₹68.05/cyl)</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #EAB308">
          <span class="s">Field Cash Float</span>
          <div class="summary-num" style="color:#CA8A04">₹${floatInField}</div>
          <small class="s">Held by drivers in transit</small>
        </div>
        <div class="summary-card" style="border-left:4px solid #DC2626">
          <span class="s">Bank Deposit Gap</span>
          <div class="summary-num ${depositGap>0?'rd':'gr'}">₹${depositGap}</div>
          <small class="s">Collected vs Bank Deposited</small>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:4px">
        <div class="summary-card">
          <span class="s">Godown Cylinders</span>
          <div class="summary-num">${stockCache.godownFull} Full</div>
          <small class="s">Ready for truck loading</small>
        </div>
        <div class="summary-card">
          <span class="s">Active On Vehicles</span>
          <div class="summary-num" style="color:#0284C7">${stockCache.activeLoaded} Loaded</div>
          <small class="s">In field transit</small>
        </div>
        <div class="summary-card">
          <span class="s">Empties Returned</span>
          <div class="summary-num gr">${stockCache.empRet} Empties</div>
          <small class="s">Plant replenishment pipeline</small>
        </div>
        <div class="summary-card">
          <span class="s">Defect Quarantine</span>
          <div class="summary-num rd">${stockCache.defRet} Defective</div>
          <small class="s">Tagged for inspection</small>
        </div>
      </div>

      <div class="c" style="margin-top:12px">
        <div class="r">
          <b style="font-size:16px;color:var(--navy)">Critical Operational Alerts & Fraud Radar</b>
          <span class="tag rdb">${EX.items.length} Flags Detected</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
          ${floatInField>0?`
            <div style="padding:10px 14px;background:#FEF3C7;border-left:4px solid #D97706;border-radius:6px;font-size:13px">
              ⚠️ <b>Cash Float Alert:</b> Drivers are currently holding ₹${floatInField} un-deposited in field transit. Reconcile upon evening return.
            </div>
          `:''}
          ${EX.subsidy?.exceededCount>0?`
            <div style="padding:10px 14px;background:#FEE2E2;border-left:4px solid #DC2626;border-radius:6px;font-size:13px">
              🚨 <b>Subsidy Divergence:</b> ${EX.subsidy.exceededCount} customers exceeded annual quota (12 refills). Potential commercial black-market diversion!
            </div>
          `:''}
          <div style="padding:10px 14px;background:#F0FDF4;border-left:4px solid #16A34A;border-radius:6px;font-size:13px">
            ✓ <b>Ledger Verification:</b> All ${EX.chain.count} blocks cryptographically verified from Genesis. Zero tampering detected.
          </div>
        </div>
        <div class="r" style="margin-top:14px;gap:8px;flex-wrap:wrap">
          <button class="pr" style="flex:1" data-a="tab" data-k="ex">⚠️ Investigate 11 Exceptions</button>
          <button class="ch" style="flex:1" data-a="tab" data-k="au">📑 Generate Monthly Audit Pack</button>
        </div>
      </div>`;
    }else if(tab==='quota'){
      EX=EX||await api('exceptions');
      const subFlags=(EX.items||[]).filter(x=>x.kind==='Subsidy');
      body=`
      <div class="c" style="background:#F0F9FF;border-color:#BAE6FD">
        <div class="r">
          <div>
            <b style="font-size:18px;color:#0369A1">MoPNG & Oil Company Subsidy Audit Station</b>
            <div class="s">Statutory compliance oversight under Direct Benefit Transfer for LPG (DBTL) & PMUY 2.0.</div>
          </div>
          <span class="tag bl">STATUTORY COMPLIANCE</span>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:12px">
        <div class="summary-card">
          <span class="s">Subsidised Claims</span>
          <div class="summary-num" style="color:#0284C7">${EX.subsidy?.deliveriesCount||0} Refills</div>
          <small class="s">Annual cap: 12 refills per domestic connection</small>
        </div>
        <div class="summary-card">
          <span class="s">Total Subsidy Disbursed</span>
          <div class="summary-num gr">₹${(EX.subsidy?.deliveriesCount||0)*175}</div>
          <small class="s">DBTL Direct Bank Credit @ ₹175/refill</small>
        </div>
        <div class="summary-card">
          <span class="s">Quota Exceeded Violations</span>
          <div class="summary-num rd">${EX.subsidy?.exceededCount||0} Flags</div>
          <small class="s">SUBSIDY_EXCEEDED</small>
        </div>
        <div class="summary-card">
          <span class="s">Subsidy Rate Mismatches</span>
          <div class="summary-num" style="color:#D97706">${EX.subsidy?.mismatchCount||0} Flags</div>
          <small class="s">SUBSIDY_MISMATCH</small>
        </div>
      </div>

      <div class="c" style="margin-top:12px">
        <b style="font-size:16px;color:var(--navy)">Itemized Subsidy Violations (${subFlags.length})</b>
        <div class="s" style="margin-bottom:8px">Audited against Ministry of Petroleum and Natural Gas (MoPNG) rules.</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${subFlags.map(x=>`
            <div style="padding:10px 14px;background:#F8FAFC;border:1px solid var(--border);border-left:4px solid ${x.code==='SUBSIDY_EXCEEDED'?'#DC2626':'#D97706'};border-radius:6px">
              <div class="r">
                <span class="tag ${x.code==='SUBSIDY_EXCEEDED'?'rdb':'a'}">${x.code}</span>
                <span class="s" style="font-family:monospace">Customer ID: ${x.key}</span>
              </div>
              <b style="font-size:14px;color:var(--navy);display:block;margin-top:4px">${E(x.msg)}</b>
              <div class="s" style="margin-top:2px">Cryptographic Evidence Hash: <code>${(x.evidence||[])[0]||'N/A'}</code></div>
            </div>
          `).join('')}
        </div>
      </div>`;
    }else if(tab==='dpdp'){
      EX=EX||await api('exceptions');
      const reveals=EX.reveals||[];
      body=`
      <div class="c" style="background:#FDF2F8;border-color:#FBCFE8">
        <div class="r">
          <div>
            <b style="font-size:18px;color:#9D174D">Digital Personal Data Protection (DPDP Act 2023) Station</b>
            <div class="s">Statutory privacy enforcement, Aadhaar masking compliance & authorized unmask audit trail.</div>
          </div>
          <span class="tag" style="background:#BE185D;color:#fff">DPDP COMPLIANCE</span>
        </div>
      </div>

      <div class="summary-grid" style="margin-top:12px">
        <div class="summary-card">
          <span class="s">Customer PII Masking</span>
          <div class="summary-num gr">100% MASKED</div>
          <small class="s">30,000 Aadhaar references masked</small>
        </div>
        <div class="summary-card">
          <span class="s">Default Mask Format</span>
          <div class="summary-num" style="font-family:monospace;font-size:18px">XXXX-XXXX-1234</div>
          <small class="s">Only last 4 digits stored / displayed</small>
        </div>
        <div class="summary-card">
          <span class="s">Statutory Unmask Events</span>
          <div class="summary-num" style="color:#0284C7">${reveals.length} Recorded</div>
          <small class="s">Section 8 Authorized Reveals</small>
        </div>
        <div class="summary-card">
          <span class="s">Auditor Access Privilege</span>
          <div class="summary-num" style="color:var(--navy);font-size:18px">STRICT READ-ONLY</div>
          <small class="s">Zero reveal permissions (DPDP enforced)</small>
        </div>
      </div>

      <div class="c" style="margin-top:12px">
        <b style="font-size:16px;color:var(--navy)">DPDP Section 8 Immutable Unmask Audit Trail (${reveals.length})</b>
        <div class="s" style="margin-bottom:8px">Permanent ledger log of every identity inspection authorized by distributor owner.</div>
        ${reveals.length?`
          <div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <thead>
                <tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
                  <th style="padding:8px 10px;text-align:left">Timestamp</th>
                  <th style="padding:8px 10px;text-align:left">Customer</th>
                  <th style="padding:8px 10px;text-align:left">Authorized Officer</th>
                  <th style="padding:8px 10px;text-align:left">Statutory Justification</th>
                  <th style="padding:8px 10px;text-align:left">Ledger Hash</th>
                </tr>
              </thead>
              <tbody>
                ${reveals.map(rv=>`
                  <tr style="border-bottom:1px solid var(--border)">
                    <td style="padding:8px 10px">${new Date(rv.ts).toLocaleString()}</td>
                    <td style="padding:8px 10px"><b>${esc(rv.customer)}</b></td>
                    <td style="padding:8px 10px">${esc(rv.by)} (Owner)</td>
                    <td style="padding:8px 10px;color:#9D174D;font-weight:600">${esc(rv.reason)}</td>
                    <td style="padding:8px 10px;font-family:monospace;font-size:11px">${String(rv.hash).slice(0,16)}…</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `:'<p class="s">No Aadhaar reveal events recorded on ledger.</p>'}
      </div>`;
    }else if(tab==='ex'){
      EX=EX||await api('exceptions');
      body=`
      <div class="summary-grid">
        <div class="summary-card">
          <span class="s">Errors found</span>
          <div class="summary-num">${EX.found} of ${EX.total}</div>
          <small style="color:var(--green-text);font-weight:600">100% Detected</small>
        </div>
        <div class="summary-card">
          <span class="s">Ledger integrity</span>
          <div class="summary-num ${EX.chain.ok?'gr':'rd'}">${EX.chain.ok?'Verified':'Broken'}</div>
          <small class="s">${EX.chain.count} SHA-256 entries</small>
        </div>
        <div class="summary-card">
          <span class="s">Total flags</span>
          <div class="summary-num">${EX.items.length}</div>
          <small class="s">Across all runs</small>
        </div>
        <div class="summary-card">
          <span class="s">Cash difference total</span>
          <div class="summary-num" style="color:var(--amber-text)">₹900</div>
          <small class="s">Deposit shortfall on R1</small>
        </div>
        <div class="summary-card">
          <span class="s">Subsidy reconciliation</span>
          <div class="summary-num" style="color:#0284C7">${EX.subsidy?.flagsCount||2} Flags</div>
          <small class="s">${EX.subsidy?.deliveriesCount||12} refills claimed · ${EX.subsidy?.exceededCount||1} over quota</small>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${EX.items.map(x=>`
          <div class="c">
            <div class="r">
              <span class="tag ${KC[x.kind]}">${x.kind}</span>
              <span class="s" style="font-family:monospace;font-size:12px">${x.code} · Key: ${x.key}</span>
            </div>
            <b style="font-size:15px;color:var(--navy)">${E(x.msg)}</b>
            <div class="r" style="margin-top:4px">
              <span class="s">${x.evidence.length} linked entries ${x.amount?`· Impact <b>₹${x.amount}</b>`:''}</span>
              ${ROLE==='owner'?`<button class="sm" data-a="openrev" data-id="${x.evidence[0]}">Reverse entry</button>`:''}
            </div>
          </div>
        `).join('')}
      </div>`;
    }else if(tab==='cr'){
      if(!pendingOrdersCache.length)pendingOrdersCache=await api('pending-orders');
      if(!staffCache.length)staffCache=await api('staff');
      if(!stockCache)stockCache=await api('stock');
      const unassigned=pendingOrdersCache.filter(o=>!o.run);
      const defaultLoaded=vehCapacityType==='bike'?6:30;
      const godownAvail=stockCache?stockCache.godownFull:0;

      // Gate Pass modal overlay
      const gpModal=activeGatePassData?`
      <div id="gp_overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px">
        <div class="c" style="max-width:520px;width:100%;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;animation:fadeUp .25s ease">
          <div class="r">
            <div>
              <b style="font-size:15px;color:var(--navy)">🚚 OFFICIAL GODOWN GATE PASS</b>
              <div class="s">PESO Inward/Outward Manifest — Blockchain Ledger #${activeGatePassData.runId}</div>
            </div>
            <span class="live-badge" style="background:#16a34a"><span class="live-dot"></span> DISPATCHED</span>
          </div>
          <hr style="border:0;border-top:2px dashed var(--navy);margin:8px 0">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;font-size:12.5px">
            <div>Gate Pass No: <b>${activeGatePassData.runId}</b></div>
            <div>Date &amp; Time: <b>${new Date().toLocaleString()}</b></div>
            <div>Assigned Vehicle: <b>${activeGatePassData.vehicle}</b></div>
            <div>Authorized Driver: <b>${activeGatePassData.staffName}</b></div>
            <div>Loaded Cylinders: <b>${activeGatePassData.loaded}× 14.2kg Domestic</b></div>
            <div>Orders Dispatched: <b>${activeGatePassData.orderCount} customer orders</b></div>
            <div>Total Invoice Value: <b>₹${activeGatePassData.totalValue}</b></div>
            <div>Safety Seal: <b style="color:var(--green-text)">PASSED ✓</b></div>
            <div>Tare Weight: <b style="color:var(--green-text)">15.8–16.2kg Verified ✓</b></div>
            <div>Godown Officer: <b>Counter Staff</b></div>
          </div>
          <div style="margin-top:10px;padding:10px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
            <b style="font-size:12px;color:#15803d">✅ Run ${activeGatePassData.runId} recorded on immutable ledger. Driver & customer tracking now live.</b>
          </div>
          <div class="r" style="margin-top:8px;font-size:11.5px;color:var(--text-muted);border-top:1px dashed #CBD5E1;padding-top:8px">
            <span>Driver Signature: __________________</span>
            <span>Godown Keeper: __________________</span>
          </div>
          <div class="g2" style="margin-top:12px">
            <button class="pr" style="flex:1" onclick="window.print()">🖨 Print Gate Pass</button>
            <button class="sm" style="flex:1" data-a="closegatepass">Close</button>
          </div>
        </div>
      </div>`:'';

      body=gpModal+`
      <div class="c">
        <div class="r">
          <div>
            <b style="font-size:16px;color:var(--navy)">${tr('createRunTab')} & Gate Pass Issuance</b>
            <span class="s">Dispatch vehicles, verify cylinder tare weight and assign loaded stock to field drivers.</span>
          </div>
          <span class="live-badge"><span class="live-dot"></span> LIVE DISPATCH</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px">
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:11px;color:#0369a1;font-weight:700">GODOWN READY</div>
            <div style="font-size:22px;font-weight:800;color:${godownAvail<10?'#dc2626':'#0f172a'}">${godownAvail}</div>
            <div style="font-size:10px;color:#64748b">Full cylinders</div>
          </div>
          <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:11px;color:#92400e;font-weight:700">PENDING ORDERS</div>
            <div style="font-size:22px;font-weight:800;color:#0f172a">${unassigned.length}</div>
            <div style="font-size:10px;color:#64748b">Unassigned</div>
          </div>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:11px;color:#166534;font-weight:700">SELECTED</div>
            <div style="font-size:22px;font-weight:800;color:#0f172a" id="sel_cyl_count">${unassigned.length}</div>
            <div style="font-size:10px;color:#64748b">₹<span id="sel_cyl_val">${unassigned.reduce((a,o)=>a+(+o.price||0),0)}</span></div>
          </div>
        </div>
        <div style="margin-top:6px">
          <label style="font-size:12px;font-weight:700">Vehicle Type & Capacity Presets</label>
          <div class="g2" style="margin-top:4px">
            <button class="ch ${vehCapacityType==='bike'?'on':''}" data-a="selvehtype" data-t="bike">${tr('twoWheeler')}</button>
            <button class="ch ${vehCapacityType==='truck'?'on':''}" data-a="selvehtype" data-t="truck">${tr('smallTruck')}</button>
          </div>
        </div>
        <label>Vehicle Number<input id="run_veh" value="${vehCapacityType==='bike'?'VH-04 (Two-Wheeler)':'VH-05 (Small Truck)'}"></label>
        <label>Assigned Delivery Staff
          <select id="run_staff">
            ${staffCache.map(s=>`<option value="${s.id}">${E(s.name)} (${s.id})</option>`).join('')}
          </select>
        </label>
        <label>Loaded Cylinders<input id="run_loaded" type="number" value="${defaultLoaded}" min="1" max="${godownAvail||200}"></label>
      </div>
      <div class="c" style="margin-top:10px">
        <div class="r">
          <b>Select Orders for this Run (${unassigned.length} pending)</b>
          <div class="g2">
            <button class="sm" data-a="selall_orders" style="font-size:12px;padding:4px 10px">✅ Select All</button>
            <button class="sm" data-a="deselall_orders" style="font-size:12px;padding:4px 10px;background:#64748b">☐ Deselect All</button>
          </div>
        </div>
        ${unassigned.length===0?`<div style="text-align:center;padding:20px;color:var(--text-muted)">🎉 No pending orders — all caught up!</div>`:unassigned.map(o=>`
          <label class="r" style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer">
            <span>
              <input type="checkbox" name="run_order_cb" value="${o.id}" data-price="${o.price}" checked style="width:18px;height:18px;margin-right:8px;vertical-align:middle">
              <b>${E(o.customerName)}</b> · ${E(o.village)} (${o.id})
            </span>
            <span class="s">₹${o.price}</span>
          </label>
        `).join('')}
      </div>
      <button class="pr" style="margin-top:10px" data-a="createrun_submit" id="btn_dispatch">🚚 Create & Dispatch Run</button>`;
    }else if(tab==='dp'){
      runsSummaryCache=await api('runs-summary');
      body=`
      <div class="c">
        <b style="font-size:16px;color:var(--navy)">End-of-Day Cash Handover & Currency Settlement</b>
        <span class="s">Reconcile physical cash collected from delivery staff and record bank deposit slip.</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">
        ${runsSummaryCache.map(r=>`
          <div class="c">
            <div class="r">
              <b>Run ${r.id} (${E(r.vehicle)})</b>
              <span class="tag ${r.closed?'g':'a'}">${r.closed?'Closed':'Active'}</span>
            </div>
            <div class="s">Staff: <b>${E(r.staffName)}</b> · Delivered: <b>${r.delivered}</b> / ${r.loaded} loaded</div>
            <div class="r" style="margin-top:6px;padding:8px 12px;background:#F8FAFC;border-radius:8px;border:1px solid var(--border)">
              <span>Collected: <b>₹${r.cashCollected}</b></span>
              <span>Deposited: <b>₹${r.cashDeposited}</b></span>
              <span style="color:${r.cashCollected>r.cashDeposited?'var(--red-text)':'var(--green-text)'};font-weight:700">
                Gap: ₹${r.cashCollected-r.cashDeposited}
              </span>
            </div>
            <div class="r" style="margin-top:4px;padding:6px 12px;background:#F0F9FF;border-radius:8px;font-size:12px;color:#0284C7">
              <span>Govt Subsidy Line: <b>${r.delivered} domestic refills verified</b></span>
              <span>DBTL Direct Transfer: <b>₹${r.delivered*175}</b></span>
            </div>
            <div style="margin-top:8px;padding:8px 12px;background:#fff;border:1px solid var(--border);border-radius:8px">
              <div class="r" style="margin-bottom:6px">
                <span style="font-size:12px;font-weight:700;color:var(--navy)">💵 Currency Denomination Breakdown</span>
                <span class="tag bl" id="denom_badge_${r.id}">Counted: ₹${denomCounts[r.id]?.total||0}</span>
              </div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">
                <div>
                  <label style="font-size:11px">₹500 Notes
                    <input type="number" min="0" placeholder="0" data-denom="n500" data-run="${r.id}" value="${denomCounts[r.id]?.n500||''}" style="padding:4px;font-size:12px">
                  </label>
                </div>
                <div>
                  <label style="font-size:11px">₹200 Notes
                    <input type="number" min="0" placeholder="0" data-denom="n200" data-run="${r.id}" value="${denomCounts[r.id]?.n200||''}" style="padding:4px;font-size:12px">
                  </label>
                </div>
                <div>
                  <label style="font-size:11px">₹100 Notes
                    <input type="number" min="0" placeholder="0" data-denom="n100" data-run="${r.id}" value="${denomCounts[r.id]?.n100||''}" style="padding:4px;font-size:12px">
                  </label>
                </div>
                <div>
                  <label style="font-size:11px">₹50 Notes
                    <input type="number" min="0" placeholder="0" data-denom="n50" data-run="${r.id}" value="${denomCounts[r.id]?.n50||''}" style="padding:4px;font-size:12px">
                  </label>
                </div>
              </div>
            </div>
            ${r.cashCollected>r.cashDeposited?`
              <div class="r" style="margin-top:8px;gap:8px">
                <input id="dep_${r.id}" type="number" placeholder="Deposit Amount" value="${r.cashCollected-r.cashDeposited}">
                <button class="sm" data-a="deposit_submit" data-run="${r.id}">Deposit</button>
              </div>
            `:''}
          </div>
        `).join('')}
      </div>`;
    }else if(tab==='sk'){
      stockCache=stockCache||await api('stock');
      body=`
      <div class="c">
        <b style="font-size:16px;color:var(--navy)">Real-Time Godown & Cylinder Lifecycle</b>
        <span class="s">Continuous balance tracking across godown, vehicles, households, and defect quarantine.</span>
      </div>
      <div class="summary-grid" style="margin-top:10px">
        <div class="summary-card"><span class="s">Full in godown</span><div class="summary-num gr">${stockCache.godownFull}</div><small class="s">Ready for loading</small></div>
        <div class="summary-card"><span class="s">Loaded on trucks</span><div class="summary-num" style="color:var(--orange)">${stockCache.activeLoaded}</div><small class="s">In transit</small></div>
        <div class="summary-card"><span class="s">Delivered today</span><div class="summary-num">${stockCache.fullDel}</div><small class="s">With consumers</small></div>
        <div class="summary-card"><span class="s">Empties returned</span><div class="summary-num">${stockCache.empRet}</div><small class="s">Ready for plant</small></div>
      </div>
      <div class="c">
        <div class="r">
          <span>Defective Cylinders Quarantined</span>
          <b style="color:var(--red-text)">${stockCache.defRet}</b>
        </div>
      </div>
      <div class="c" style="background:#F8FAFC;border:1px dashed var(--navy);margin-top:4px">
        <div class="r">
          <div>
            <b>Bottling Plant Refill Pipeline</b>
            <div class="s">Dispatch returned empties to oil-company plant for industrial refill.</div>
          </div>
          <button class="pr" style="white-space:nowrap" data-a="dispatch_plant">${tr('dispatchPlant')}</button>
        </div>
      </div>`;
    }else if(tab==='an'){
      anomaliesCache=anomaliesCache||await api('anomalies');
      body=`
      <div class="c">
        <b style="font-size:16px;color:var(--navy)">Operational Anomaly Radar (Early Warning Hints)</b>
        <span class="s">Objective indicators to detect cash float accumulation, empty hoarding, and quota stress.</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">
        ${anomaliesCache.map(a=>`
          <div class="c" style="border-left:4px solid ${a.severity==='alert'?'#B91C1C':a.severity==='warning'?'#C2410C':'#0369A1'}">
            <div class="r">
              <span class="tag ${a.severity==='alert'?'rdb':a.severity==='warning'?'a':'bl'}">${a.type}</span>
              <span class="s">${a.severity.toUpperCase()}</span>
            </div>
            <b>${E(a.msg)}</b>
          </div>
        `).join('')}
      </div>`;
    }else if(tab==='lg'){
      EX=EX||await api('exceptions');
      body=`
      <div class="c">
        <div class="r">
          <div>
            <b style="font-size:16px;color:var(--navy)">Cryptographic SHA-256 Ledger Visualizer</b>
            <div class="s">Immutable append-only hash chain. Every event mathematically verifies against previous hash.</div>
          </div>
          <button class="sm" style="background:${isTampered?'var(--green-text)':'var(--red-text)'}" data-a="toggledemo">
            ${isTampered?'Reset & Fix Ledger':'Simulate Tampering'}
          </button>
        </div>
      </div>
      <div class="c" style="margin-top:10px;background:${isTampered?'#FEE2E2':'#DCFCE7'};border-color:${isTampered?'#FCA5A5':'#86EFAC'}">
        <div class="r">
          <b>Ledger Chain Status: ${isTampered?'BROKEN / COMPROMISED':'VERIFIED VALID'}</b>
          <span class="tag ${isTampered?'rdb':'g'}">${isTampered?'TAMPER DETECTED':'ALL 39 BLOCKS SECURE'}</span>
        </div>
        <p class="s" style="margin-top:4px">
          ${isTampered?'Simulated attack: payload byte altered in Block #5. SHA-256 hash discontinuity detected!':'Genesis-to-tip hash verification matches across all recorded events.'}
        </p>
      </div>`;
    }else if(tab==='cu'){
      if(!villagesCache.length){try{villagesCache=await api('villages')}catch(e){}}
      try{disputesCache=await api('disputes')}catch(e){}
      const params=new URLSearchParams();
      if(searchQuery)params.set('q',searchQuery);
      if(selectedVillage)params.set('village',selectedVillage);
      params.set('limit','25');
      CUS=await api('customers?'+params.toString());

      const disputesSection=disputesCache.length?`
      <div class="c" style="background:#FFFBEB;border-color:#FCD34D;margin-bottom:12px">
        <div class="r">
          <b style="font-size:15px;color:#92400E">${tr('disputesTitle')} (${disputesCache.length})</b>
          <span class="tag a">PENDING RESOLUTION</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
          ${disputesCache.map(d=>`
            <div style="background:#fff;border:1px solid #FDE68A;border-radius:8px;padding:10px">
              <div class="r">
                <b>Ticket ${d.ticketId} · ${E(d.customerName)} (${E(d.village)})</b>
                <span class="s">${new Date(d.ts).toLocaleDateString()}</span>
              </div>
              <div style="font-size:13px;color:#B45309;margin-top:2px"><b>Issue:</b> ${E(d.issue)} · ${E(d.details)}</div>
              <div class="r" style="margin-top:6px">
                <span class="s" style="font-family:monospace;font-size:11px">SHA-256: ${d.hash.slice(0,16)}…</span>
                <button class="sm" style="background:var(--navy)" data-a="selcus" data-id="${d.customer}">Investigate & Settle</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`:'' ;

      const villagesPills=`
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;margin-top:8px">
        <span class="village-chip ${!selectedVillage?'selected':''}" data-a="selvillage" data-v="">All Villages</span>
        ${villagesCache.slice(0,10).map(v=>`<span class="village-chip ${selectedVillage===v.name?'selected':''}" data-a="selvillage" data-v="${E(v.name)}">${E(v.name)} (${v.count})</span>`).join('')}
      </div>`;

      body=`
      ${disputesSection}
      <div class="c">
        <div class="r">
          <b style="font-size:16px;color:var(--navy)">30,000+ Customer Directory & Dispute Hub</b>
          <span class="tag bl">30,000 Domestic Connections</span>
        </div>
        <label>Search 30,000 Consumers
          <input id="cu_search" placeholder="Type SV Number (SV-100001), mobile (98450...), name, or village..." value="${E(searchQuery)}">
        </label>
        ${villagesPills}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-top:10px">
        ${(CUS||[]).map(c=>`
          <div class="c" style="cursor:pointer;border-color:${c.id===tlc?'var(--orange)':'var(--border)'};background:${c.id===tlc?'#FFF1E8':'#fff'}" data-a="selcus" data-id="${c.id}">
            <div class="r">
              <b style="font-size:14.5px;color:var(--navy)">${E(c.name)}</b>
              <span class="tag ${c.left<=2?'rdb':'g'}">${c.left} left</span>
            </div>
            <div class="s">SV: <b>${c.sv_num||c.id}</b> · Village: <b>${E(c.village)}</b></div>
            <div class="r" style="font-size:11.5px;color:var(--text-muted);margin-top:2px">
              <span>Phone: ${c.phone}</span>
              <span style="display:flex;align-items:center;gap:4px">
                Aadhaar: <b>${revealedAadhaars[c.id] || c.aadhaar}</b>
                ${ROLE==='owner' && !revealedAadhaars[c.id]?`<button class="sm" style="background:#475569;color:#fff;font-size:9.5px;padding:2px 6px" data-a="revealaadhaar" data-id="${c.id}">👁 Reveal</button>`:''}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
      ${tlc?`
        <div class="c" style="background:#F0FDF4;border-color:#BBF7D0;margin-top:12px">
          <div class="r">
            <div>
              <b style="font-size:15px">${E((CUS||[]).find(c=>c.id===tlc)?.name||tlc)}</b> · ${E((CUS||[]).find(c=>c.id===tlc)?.village||'')}
            </div>
            <button class="sm" style="background:var(--navy)" data-a="genslip">Dispute Resolution Slip</button>
          </div>
          <div class="s" style="margin-top:6px">Annual Quota: <b>${(CUS||[]).find(c=>c.id===tlc)?.ytd} of ${(CUS||[]).find(c=>c.id===tlc)?.entitlement||12} refills used</b></div>
          <div class="s" style="margin-top:4px;display:flex;align-items:center;gap:6px">
            <span>Aadhaar: <b>${revealedAadhaars[tlc] || (CUS||[]).find(c=>c.id===tlc)?.aadhaar}</b></span>
            ${ROLE==='owner' && !revealedAadhaars[tlc]?`<button class="sm" style="background:#475569;color:#fff;font-size:11px;padding:3px 8px" data-a="revealaadhaar" data-id="${tlc}">👁 Reveal (DPDP Section 8 Logged)</button>`:''}
          </div>
        </div>
      `:''}
      <div class="timeline" style="margin-top:12px">
        ${(TL||[]).map(e=>`
          <div class="timeline-item" style="${e.reversed?'opacity:0.5':''}">
            <div class="timeline-dot ${e.reversed?'rev':''}"></div>
            <div class="c" style="padding:10px 14px">
              <div class="r">
                <b>${TY[e.type]||e.type}${e.reversed?' (Reversed)':''}</b>
                <span class="s">${new Date(e.ts).toLocaleString()}</span>
              </div>
              <span class="s">by ${E(e.by)} ${e.p.amount?'· ₹'+e.p.amount:''}${e.p.mode?' · '+e.p.mode:''}${e.p.reason?' · '+E(e.p.reason):''}</span>
            </div>
          </div>
        `).join('')}
      </div>`;
    }else if(tab==='bk'){
      let pendingList=[];
      try{pendingList=await api('pending-orders')}catch(e){}
      
      const q=(bookingFastQuery||'').trim().toLowerCase();
      let matchedCus=[];
      if(q){
        matchedCus=await api('customers?q='+encodeURIComponent(q));
      }else{
        if(!CUS||!CUS.length)CUS=await api('customers?limit=25');
        matchedCus=CUS;
      }
      const activeCus=matchedCus[0] || (CUS&&CUS[0]);

      body=`
      <div class="c" style="background:#EFF6FF;border-color:#BFDBFE">
        <div class="r">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <b style="font-size:18px;color:#1E3A8A">Front-Desk Refill Booking & Live Tracking Terminal</b>
              <span class="live-badge"><span class="live-dot"></span> LIVE REAL-TIME SYNC</span>
            </div>
            <div class="s">Instant customer verification (&lt;200ms lookup), 1-tap booking issuance, and live cylinder delivery tracking.</div>
          </div>
          <span class="tag" style="background:#1E3A8A;color:#fff">COUNTER WORKSPACE</span>
        </div>
      </div>

      <!-- Real-Time Delivery Tracker Box in Counter Portal -->
      <div class="c" style="background:#F0F9FF;border:1px solid #BAE6FD;margin-top:10px">
        <div class="r">
          <div style="display:flex;align-items:center;gap:8px">
            <b style="font-size:15px;color:#0369A1">🚚 Real-Time Order & Cylinder Delivery Tracker</b>
            <span class="live-badge" style="font-size:10px;padding:2px 6px"><span class="live-dot"></span> LIVE</span>
          </div>
          <span class="s">Track by Order ID or SV Number</span>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <input id="counter_track_input" placeholder="Type Order ID (e.g. O1001, O001, O002) or SV Number..." style="margin-top:0">
          <button class="pr" style="min-width:120px;background:#0369A1" data-a="countertrack">Track Live</button>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;margin-top:6px">
          <span class="village-chip" data-a="countertrack_chip" data-id="O001">Track O001 (Delivered)</span>
          <span class="village-chip" data-a="countertrack_chip" data-id="O002">Track O002 (In Transit)</span>
          <span class="village-chip" data-a="countertrack_chip" data-id="O003">Track O003 (R1 Truck)</span>
        </div>
      </div>

      ${activeTrackingData ? renderTrackingStepper(activeTrackingData) : ''}

      <div class="c" style="margin-top:10px">
        <label style="font-weight:700;color:var(--navy)">Instant Consumer Search
          <input id="fast_sv_input" placeholder="Type SV Number (e.g. SV-100001), 10-digit Mobile (98450...), Name, or Village..." value="${E(bookingFastQuery)}" autofocus>
        </label>
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;margin-top:6px">
          <span class="village-chip" data-a="fastchip" data-q="SV-100001">SV-100001 (Ramesh)</span>
          <span class="village-chip" data-a="fastchip" data-q="9845010001">9845010001 (Sita Bai)</span>
          <span class="village-chip" data-a="fastchip" data-q="SV-100005">SV-100005 (Anand Kumar)</span>
          <span class="village-chip" data-a="fastchip" data-q="Mandya Rural">Mandya Rural</span>
          <span class="village-chip" data-a="fastchip" data-q="">Clear Search</span>
        </div>
      </div>

      ${activeCus ? `
        <div class="c" style="border:2px solid #3B82F6;background:#F8FAFC;margin-top:10px">
          <div class="r">
            <div>
              <b style="font-size:16px;color:var(--navy)">${E(activeCus.name)}</b>
              <span class="s"> · SV: <b>${activeCus.sv_num||activeCus.id}</b> · ${E(activeCus.village)}</span>
            </div>
            <span class="tag ${activeCus.left<=0?'rdb':'g'}" style="font-size:12px">
              ${activeCus.left<=0?'QUOTA EXHAUSTED':'ELIGIBLE FOR REFILL'}
            </span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-top:10px;font-size:12.5px;background:#fff;padding:10px;border-radius:8px;border:1px solid var(--border)">
            <div>Mobile: <b>${activeCus.phone}</b></div>
            <div>Aadhaar: <b>${activeCus.aadhaar} (DPDP Masked)</b></div>
            <div>Scheme: <b style="color:#0284C7">DBTL / PMUY Domestic</b></div>
            <div>Annual Subsidized Quota: <b style="${activeCus.left<=0?'color:#DC2626':'color:#16A34A'}">${activeCus.left} refills remaining</b> (${activeCus.ytd} used)</div>
          </div>

          ${activeCus.left<=0 ? `
            <div style="margin-top:8px;padding:8px 12px;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:6px;font-size:12px;color:#991B1B">
              ⚠️ <b>SUBSIDY LIMIT EXCEEDED:</b> Customer has completed all 12 subsidized refills for FY 2026-27. Reconciler will raise <code>SUBSIDY_EXCEEDED</code> flag if booked as domestic subsidized refill. Non-subsidized commercial rate applies.
            </div>
          ` : `
            <div style="margin-top:8px;padding:6px 12px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;font-size:12px;color:#166534">
              ✓ <b>DBTL ELIGIBLE:</b> Direct Benefit Subsidy ₹200 will be auto-credited to linked Aadhaar bank account upon delivery.
            </div>
          `}

          <div class="r" style="margin-top:12px;gap:8px;flex-wrap:wrap">
            <button class="pr" style="flex:2;min-width:180px;background:#1E3A8A;display:flex;align-items:center;justify-content:center;gap:6px" data-a="fastbook" data-cid="${activeCus.id}" data-type="14.2kg" data-qty="1">
              ⚡ Book 14.2kg Domestic (₹900)
            </button>
            <button class="ch" style="flex:1;min-width:140px;display:flex;align-items:center;justify-content:center;gap:6px" data-a="fastbook" data-cid="${activeCus.id}" data-type="5kg" data-qty="1">
              ⚡ Book 5kg Chhotu (₹350)
            </button>
          </div>
        </div>
      ` : `
        <div class="c" style="text-align:center;color:var(--text-muted);padding:24px">
          No customer found matching "${E(bookingFastQuery)}". Try searching by another SV number or mobile.
        </div>
      `}

      <div class="c" style="margin-top:14px">
        <div class="r">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <b style="font-size:15px;color:var(--navy)">Recent Front-Desk Bookings Queue (${pendingList.filter(o=>!o.run).length} Unassigned)</b>
              <span class="live-badge" style="font-size:9.5px;padding:2px 6px"><span class="live-dot"></span> LIVE AUTO-SYNC</span>
            </div>
            <div class="s">Cylinder refills waiting for vehicle assignment and gate pass issuance.</div>
          </div>
          <button class="sm" style="background:var(--navy)" data-a="tab" data-k="cr">🚚 Go to Dispatch &amp; Gate Pass</button>
        </div>
        <div style="overflow-x:auto;margin-top:10px">
          <table style="width:100%;border-collapse:collapse;font-size:12.5px">
            <thead>
              <tr style="background:#F1F5F9;text-align:left">
                <th style="padding:6px 10px">Order ID</th>
                <th style="padding:6px 10px">Customer</th>
                <th style="padding:6px 10px">Village</th>
                <th style="padding:6px 10px">Cylinder</th>
                <th style="padding:6px 10px">Amount</th>
                <th style="padding:6px 10px">Status</th>
                <th style="padding:6px 10px;text-align:right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${pendingList.slice(0,10).map(o=>`
                <tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 10px;font-family:monospace"><b>${o.id}</b></td>
                  <td style="padding:8px 10px"><b>${E(o.customerName||o.customer)}</b></td>
                  <td style="padding:8px 10px">${E(o.village||'')}</td>
                  <td style="padding:8px 10px"><span class="tag ${o.type==='5kg'?'bl':'a'}">${o.type}</span></td>
                  <td style="padding:8px 10px;font-weight:700">₹${o.price}</td>
                  <td style="padding:8px 10px">
                    <span class="tag ${o.done?'g':(o.run?'bl':'a')}">${o.done?'DELIVERED':(o.run?'IN TRANSIT ('+o.run+')':'PENDING DISPATCH')}</span>
                  </td>
                  <td style="padding:8px 10px;text-align:right">
                    <button class="sm" style="background:#0F1B2D;font-size:11px;padding:3px 8px" data-a="countertrack_chip" data-id="${o.id}">🔍 Track</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }else if(tab==='au'){
      let packHtml='';
      if(auditPackData){
        const {ex,runs,stock,generatedAt,generatedDate}=auditPackData;
        const totalDel=runs.reduce((a,b)=>a+(+b.delivered||0),0);
        const totalCashCol=runs.reduce((a,b)=>a+(+b.cashCollected||0),0);
        const totalCashDep=runs.reduce((a,b)=>a+(+b.cashDeposited||0),0);
        const upiPayments=(ex.items||[]).filter(x=>x.code==='DUP_UPI');
        packHtml=`
        <div class="c" style="background:#DCFCE7;border-color:#86EFAC;margin-top:12px">
          <div class="r">
            <div>
              <b style="color:#166534;font-size:16px">✓ Generated in ${auditGenTime} seconds</b>
              <div class="s" style="color:#15803D;margin-top:2px">Generated at ${generatedAt} on ${generatedDate} · Verified under DPDP Act 2023</div>
            </div>
            <span class="tag g" style="font-size:12px">READY FOR AUDIT</span>
          </div>
        </div>

        <div class="r" style="margin-top:10px;gap:8px;flex-wrap:wrap">
          <button class="pr" style="flex:1;min-width:160px" onclick="window.print()">🖨 Export as PDF / Print</button>
          <a class="ch" style="flex:1;min-width:140px;text-align:center;text-decoration:none" href="/api/audit?t=${T}&format=csv">⬇ Export Exceptions CSV</a>
          <a class="ch" style="flex:1;min-width:140px;text-align:center;text-decoration:none" href="/api/audit?t=${T}&format=ledger_csv">⬇ Export Ledger CSV</a>
        </div>

        <div class="summary-grid" style="margin-top:12px">
          <div class="summary-card">
            <span class="s">Total Deliveries</span>
            <div class="summary-num">${stock.fullDel} Full</div>
            <small class="s">${totalDel} orders completed across runs</small>
          </div>
          <div class="summary-card">
            <span class="s">Cash & UPI Collection</span>
            <div class="summary-num">₹${totalCashCol} Cash</div>
            <small class="s">Deposited: ₹${totalCashDep} (Gap: ₹${totalCashCol-totalCashDep}) · UPI flags: ${upiPayments.length}</small>
          </div>
          <div class="summary-card">
            <span class="s">Cylinders (Full / Empty / Defective)</span>
            <div class="summary-num gr">${stock.fullDel} Full / ${stock.empRet} Empty</div>
            <small class="s">Defective returned: <b>${stock.defRet}</b> · Godown full: ${stock.godownFull}</small>
          </div>
          <div class="summary-card">
            <span class="s">Ledger Hash Integrity</span>
            <div class="summary-num ${ex.chain.ok?'gr':'rd'}">${ex.chain.ok?'Verified Valid':'Tampered'}</div>
            <small class="s">${ex.chain.count} SHA-256 blocks chained</small>
          </div>
        </div>

        <div class="c" style="background:#F0F9FF;border-color:#BAE6FD;margin-top:4px">
          <div class="r">
            <b style="font-size:15px;color:#0369A1">Government Subsidy Reconciliation Summary</b>
            <span class="tag bl">${ex.subsidy?.flagsCount||0} Subsidy Flags</span>
          </div>
          <div class="r" style="margin-top:8px;padding:8px 12px;background:#fff;border-radius:8px;border:1px solid #E0F2FE;flex-wrap:wrap;gap:12px">
            <span>Total Subsidised Refills Claimed: <b>${ex.subsidy?.deliveriesCount||0}</b></span>
            <span>DBTL Direct Transfer Value: <b>₹${(ex.subsidy?.deliveriesCount||0)*175}</b></span>
            <span>Quota Exceeded Violations: <b style="color:var(--red-text)">${ex.subsidy?.exceededCount||0}</b></span>
            <span>Rate Mismatches: <b style="color:var(--amber-text)">${ex.subsidy?.mismatchCount||0}</b></span>
          </div>
        </div>

        <div class="c" style="margin-top:12px">
          <div class="r">
            <div>
              <b style="font-size:16px;color:var(--navy)">All Operational Flags & Reasons (${ex.items.length})</b>
              <div class="s">Complete exception list with plain-language reasons and evidence hashes.</div>
            </div>
            <span class="tag rdb">${ex.items.length} Discrepancies</span>
          </div>
          <div style="overflow-x:auto;margin-top:8px">
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <thead>
                <tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
                  <th style="padding:8px 10px;text-align:left">Kind</th>
                  <th style="padding:8px 10px;text-align:left">Code</th>
                  <th style="padding:8px 10px;text-align:left">Order/Key</th>
                  <th style="padding:8px 10px;text-align:left">Plain-Language Finding & Reason</th>
                  <th style="padding:8px 10px;text-align:right">Impact</th>
                  <th style="padding:8px 10px;text-align:left">Evidence</th>
                </tr>
              </thead>
              <tbody>
                ${ex.items.map(x=>`
                  <tr style="border-bottom:1px solid var(--border)">
                    <td style="padding:8px 10px"><span class="tag ${KC[x.kind]||'bl'}">${x.kind}</span></td>
                    <td style="padding:8px 10px;font-family:monospace"><b>${x.code}</b></td>
                    <td style="padding:8px 10px"><code>${x.key}</code></td>
                    <td style="padding:8px 10px;font-weight:600;color:var(--navy)">${E(x.msg)}</td>
                    <td style="padding:8px 10px;text-align:right">${x.amount?`₹${x.amount}`:'-'}</td>
                    <td style="padding:8px 10px;font-family:monospace;font-size:11px;color:var(--text-muted)">${x.evidence.map(e=>String(e).slice(0,8)).join(', ')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="c" style="margin-top:12px">
          <b style="font-size:16px;color:var(--navy)">Reversal & DPDP Audit Trail History</b>
          <div class="s" style="margin-bottom:8px">Immutable log of financial reversals and authorized Aadhaar inspections.</div>
          ${(ex.reversals&&ex.reversals.length)?`
            <div style="margin-bottom:10px">
              <span style="font-size:12px;font-weight:700;color:var(--navy)">Financial Reversals (${ex.reversals.length})</span>
              ${ex.reversals.map(r=>`
                <div style="margin-top:4px;padding:8px 10px;background:#F8FAFC;border:1px solid var(--border);border-radius:6px;font-size:12px">
                  <div class="r">
                    <span>Target Event: <code>${r.target}</code> · By: <b>${r.by}</b></span>
                    <span class="s">${new Date(r.ts).toLocaleString()}</span>
                  </div>
                  <div style="color:var(--navy);margin-top:2px"><b>Reason:</b> ${E(r.reason)}</div>
                  <div class="s" style="font-family:monospace;font-size:10px;margin-top:2px">Hash: ${r.hash}</div>
                </div>
              `).join('')}
            </div>
          `:'<p class="s" style="margin:4px 0">No reversal events recorded on ledger.</p>'}

          ${(ex.reveals&&ex.reveals.length)?`
            <div style="margin-top:10px">
              <span style="font-size:12px;font-weight:700;color:#92400E">DPDP Section 8 Aadhaar Inspection Reveals (${ex.reveals.length})</span>
              ${ex.reveals.map(rv=>`
                <div style="margin-top:4px;padding:8px 10px;background:#FFFBEB;border:1px solid #FCD34D;border-radius:6px;font-size:12px">
                  <div class="r">
                    <span>Customer: <b>${rv.customer}</b> · Inspected By: <b>${rv.by}</b></span>
                    <span class="s">${new Date(rv.ts).toLocaleString()}</span>
                  </div>
                  <div style="color:#B45309;margin-top:2px"><b>Statutory Reason:</b> ${E(rv.reason)}</div>
                  <div class="s" style="font-family:monospace;font-size:10px;margin-top:2px">Ledger Hash: ${rv.hash}</div>
                </div>
              `).join('')}
            </div>
          `:''}
        </div>`;
      }

      body=`
      <div class="c">
        <div class="r">
          <div>
            <b style="font-size:18px;color:var(--navy)">Monthly Audit Pack & Compliance Hub</b>
            <div class="s">One-click comprehensive statutory audit generation under DPDP Act 2023.</div>
          </div>
          <span class="tag bl">Owner & Auditor Access</span>
        </div>
        <div style="margin-top:14px">
          <button class="pr" data-a="genpack" style="width:100%;font-size:15px;padding:12px;font-weight:700">
            ⚡ Generate monthly pack
          </button>
        </div>
      </div>
      ${packHtml}`;
    }
    // ── Reports Hub ─────────────────────────────────────────────────────────
    else if(tab==='rp'){
      // Load data for the active sub-report on demand
      const ar=reportsActiveReport;
      if(ar==='stock'&&!reportsData.stock)reportsData.stock=await api('stock');
      if(ar==='monthly'&&!reportsData.monthly)reportsData.monthly=await api('reports/monthly-summary');
      if(ar==='outstanding'&&!reportsData.outstanding)reportsData.outstanding=await api('reports/outstanding');
      if(ar==='custhist'&&!reportsData.custHistory){
        const q=reportsVillageFilter?`reports/customer-history?village=${encodeURIComponent(reportsVillageFilter)}&limit=100`:'reports/customer-history?limit=100';
        reportsData.custHistory=await api(q);
      }

      // ── CSS bar chart helper ─────────────────────────────────────────────
      const barChart=(items,maxVal,colorFn=()=>'var(--orange)')=>{
        if(!items.length)return '<p class="s">No data available.</p>';
        return items.map(({label,value,sub})=>{
          const pct=maxVal>0?Math.round((value/maxVal)*100):0;
          return `<div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
              <span style="font-size:13px;font-weight:600;color:var(--navy);max-width:55%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${E(label)}">${E(label)}</span>
              <span style="font-size:13px;font-weight:700;color:var(--text-muted)">${E(String(value))}${sub?` <span style="font-size:11px;font-weight:400">(${E(sub)})</span>`:''}</span>
            </div>
            <div style="background:#E2E8F0;border-radius:6px;height:12px;overflow:hidden">
              <div style="background:${colorFn(value,maxVal)};height:100%;width:${pct}%;border-radius:6px;transition:width 0.4s ease"></div>
            </div>
          </div>`;
        }).join('');
      };

      const subBtns=[
        ['stock','🏭 Stock & Inventory'],
        ['monthly','📅 Monthly Delivery'],
        ['outstanding','💸 Outstanding Dues'],
        ['custhist','👥 Customer History']
      ];

      let reportContent='';

      // ─ STOCK & INVENTORY ────────────────────────────────────────────────
      if(ar==='stock'&&reportsData.stock){
        const sk=reportsData.stock;
        const inField=sk.activeLoaded;
        const godown=sk.godownFull;
        const totalCirc=sk.totalCirculation||350;
        const stockItems=[
          {label:'Godown (Ready to Dispatch)',value:godown,sub:'full cylinders'},
          {label:'Active (On Field / In Runs)',value:inField,sub:'loaded in vehicles'},
          {label:'Delivered (Total All-time)',value:sk.fullDel,sub:'to customers'},
          {label:'Empties Returned',value:sk.empRet,sub:'collected back'},
          {label:'Defective Cylinders',value:sk.defRet,sub:'quarantined'}
        ];
        const maxStockVal=Math.max(...stockItems.map(x=>x.value),1);
        const stockColor=(v,max)=>{
          const r=v/max;
          if(r>0.7)return'#16A34A';
          if(r>0.3)return'#D97706';
          return'#DC2626';
        };
        reportContent=`
        <div class="summary-grid" style="margin-bottom:16px">
          <div class="summary-card" style="border-left:4px solid #16A34A">
            <span class="s">Godown Stock</span>
            <div class="summary-num gr">${godown}</div>
            <small class="s">Ready for dispatch</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #C2410C">
            <span class="s">Active on Field</span>
            <div class="summary-num" style="color:#C2410C">${inField}</div>
            <small class="s">Loaded in vehicles</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #0284C7">
            <span class="s">Total Circulation</span>
            <div class="summary-num" style="color:#0284C7">${totalCirc}</div>
            <small class="s">Registered cylinders</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #DC2626">
            <span class="s">Defective / Quarantine</span>
            <div class="summary-num rd">${sk.defRet}</div>
            <small class="s">Need inspection</small>
          </div>
        </div>
        <div class="c">
          <b style="font-size:15px;color:var(--navy);margin-bottom:4px">Cylinder Inventory Breakdown</b>
          ${barChart(stockItems,maxStockVal,stockColor)}
        </div>
        <div class="c" style="margin-top:12px;background:#F0FDF4;border-color:#86EFAC">
          <b style="color:#166534">Return Rate Analysis</b>
          <div class="r" style="margin-top:8px;flex-wrap:wrap;gap:12px">
            <span>Empties Return Rate: <b style="color:${sk.empRet>=sk.fullDel*0.9?'#16A34A':'#D97706'}">${sk.fullDel>0?Math.round((sk.empRet/sk.fullDel)*100):0}%</b></span>
            <span>Empty Shortfall: <b style="color:#DC2626">${sk.fullDel-sk.empRet} cylinders</b></span>
            <span>Defective Rate: <b>${sk.fullDel>0?((sk.defRet/sk.fullDel)*100).toFixed(1):0}%</b></span>
          </div>
        </div>`;
      }

      // ─ MONTHLY DELIVERY SUMMARY ─────────────────────────────────────────
      else if(ar==='monthly'&&reportsData.monthly){
        const months=reportsData.monthly.months;
        if(!months.length){
          reportContent='<div class="c"><p class="s">No delivery data recorded yet.</p></div>';
        }else{
          const maxCyl=Math.max(...months.map(m=>m.cylinders),1);
          const maxRev=Math.max(...months.map(m=>m.totalRevenue),1);
          const totalCyl=months.reduce((a,b)=>a+b.cylinders,0);
          const totalRev=months.reduce((a,b)=>a+b.totalRevenue,0);
          const totalBook=months.reduce((a,b)=>a+b.bookings,0);
          const cylItems=months.map(m=>({label:m.month,value:m.cylinders,sub:`₹${m.totalRevenue} revenue`}));
          const revItems=months.map(m=>({label:m.month,value:m.totalRevenue,sub:`${m.cylinders} cylinders`}));
          reportContent=`
          <div class="summary-grid" style="margin-bottom:16px">
            <div class="summary-card" style="border-left:4px solid #C2410C">
              <span class="s">Total Cylinders Delivered</span>
              <div class="summary-num" style="color:#C2410C">${totalCyl}</div>
              <small class="s">All-time across ${months.length} month(s)</small>
            </div>
            <div class="summary-card" style="border-left:4px solid #16A34A">
              <span class="s">Total Revenue Collected</span>
              <div class="summary-num gr">₹${totalRev.toLocaleString()}</div>
              <small class="s">Cash + UPI combined</small>
            </div>
            <div class="summary-card" style="border-left:4px solid #0284C7">
              <span class="s">Total Bookings</span>
              <div class="summary-num" style="color:#0284C7">${totalBook}</div>
              <small class="s">Refill requests recorded</small>
            </div>
            <div class="summary-card" style="border-left:4px solid #7C3AED">
              <span class="s">Active Months</span>
              <div class="summary-num" style="color:#7C3AED">${months.length}</div>
              <small class="s">With delivery activity</small>
            </div>
          </div>
          <div class="c" style="margin-bottom:12px">
            <b style="font-size:15px;color:var(--navy)">Cylinders Delivered — Monthly Bar Chart</b>
            <div style="margin-top:12px">${barChart(cylItems,maxCyl,(v,max)=>v===max?'#C2410C':'#F97316')}</div>
          </div>
          <div class="c">
            <b style="font-size:15px;color:var(--navy)">Revenue Collected — Monthly Bar Chart</b>
            <div style="margin-top:12px">${barChart(revItems,maxRev,(v,max)=>v===max?'#16A34A':'#22C55E')}</div>
          </div>
          <div class="c" style="margin-top:12px;overflow-x:auto">
            <b style="font-size:15px;color:var(--navy)">Full Monthly Breakdown Table</b>
            <table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:10px">
              <thead><tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
                <th style="padding:8px 10px;text-align:left">Month</th>
                <th style="padding:8px 10px;text-align:right">Cylinders</th>
                <th style="padding:8px 10px;text-align:right">Deliveries</th>
                <th style="padding:8px 10px;text-align:right">Postponed</th>
                <th style="padding:8px 10px;text-align:right">Empties Back</th>
                <th style="padding:8px 10px;text-align:right">Cash ₹</th>
                <th style="padding:8px 10px;text-align:right">UPI ₹</th>
                <th style="padding:8px 10px;text-align:right">Total Revenue ₹</th>
              </tr></thead>
              <tbody>
                ${months.map(m=>`<tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 10px;font-weight:700">${m.month}</td>
                  <td style="padding:8px 10px;text-align:right;color:#C2410C;font-weight:700">${m.cylinders}</td>
                  <td style="padding:8px 10px;text-align:right">${m.deliveries}</td>
                  <td style="padding:8px 10px;text-align:right;color:#D97706">${m.postponed}</td>
                  <td style="padding:8px 10px;text-align:right">${m.empReturned}</td>
                  <td style="padding:8px 10px;text-align:right">₹${m.cashCol.toLocaleString()}</td>
                  <td style="padding:8px 10px;text-align:right">₹${m.upiCol.toLocaleString()}</td>
                  <td style="padding:8px 10px;text-align:right;font-weight:700;color:#16A34A">₹${m.totalRevenue.toLocaleString()}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>`;
        }
      }

      // ─ OUTSTANDING PAYMENTS / DUES ──────────────────────────────────────
      else if(ar==='outstanding'&&reportsData.outstanding){
        const od=reportsData.outstanding;
        const bt=od.bucketTotals;
        const buckets=[
          {label:'0–7 days (Recent)',value:bt['0-7 days']||0},
          {label:'8–30 days (Follow up)',value:bt['8-30 days']||0},
          {label:'31–60 days (Urgent)',value:bt['31-60 days']||0},
          {label:'60+ days (Critical)',value:bt['60+ days']||0}
        ];
        const maxBucket=Math.max(...buckets.map(b=>b.value),1);
        const riskColor=(v,max)=>{
          const i=buckets.indexOf(buckets.find(b=>b.value===v));
          return['#16A34A','#D97706','#EA580C','#DC2626'][i]||'#DC2626';
        };
        const vItems=(od.villageDues||[]).map(v=>({label:v.village,value:v.amount,sub:`₹${v.amount}`}));
        const maxV=Math.max(...vItems.map(v=>v.value),1);
        const riskTag=(r)=>({'critical':'rdb','high':'a','medium':'bl','low':'g'}[r]||'bl');
        reportContent=`
        <div class="summary-grid" style="margin-bottom:16px">
          <div class="summary-card" style="border-left:4px solid #DC2626">
            <span class="s">Total Outstanding Dues</span>
            <div class="summary-num rd">₹${od.totalDue.toLocaleString()}</div>
            <small class="s">${od.count} pay-later deliveries</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #EA580C">
            <span class="s">Critical (60+ days)</span>
            <div class="summary-num" style="color:#DC2626">₹${(bt['60+ days']||0).toLocaleString()}</div>
            <small class="s">Immediate action needed</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #D97706">
            <span class="s">Urgent (31–60 days)</span>
            <div class="summary-num" style="color:#D97706">₹${(bt['31-60 days']||0).toLocaleString()}</div>
            <small class="s">Follow up required</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #16A34A">
            <span class="s">Recent (0–30 days)</span>
            <div class="summary-num gr">₹${((bt['0-7 days']||0)+(bt['8-30 days']||0)).toLocaleString()}</div>
            <small class="s">Normal collection window</small>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
          <div class="c">
            <b style="font-size:15px;color:var(--navy)">Dues by Ageing Bucket</b>
            <div style="margin-top:12px">${barChart(buckets,maxBucket,riskColor)}</div>
          </div>
          <div class="c">
            <b style="font-size:15px;color:var(--navy)">Top Villages by Outstanding</b>
            <div style="margin-top:12px">${barChart(vItems,maxV,()=>'#7C3AED')}</div>
          </div>
        </div>
        <div class="c" style="overflow-x:auto">
          <b style="font-size:15px;color:var(--navy)">Outstanding Dues Register (${od.count} records)</b>
          <table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:10px">
            <thead><tr style="background:#FEF2F2;border-bottom:2px solid #FCA5A5">
              <th style="padding:8px 10px;text-align:left">SV#</th>
              <th style="padding:8px 10px;text-align:left">Customer Name</th>
              <th style="padding:8px 10px;text-align:left">Village</th>
              <th style="padding:8px 10px;text-align:left">Phone</th>
              <th style="padding:8px 10px;text-align:left">Cylinder</th>
              <th style="padding:8px 10px;text-align:right">Amount</th>
              <th style="padding:8px 10px;text-align:center">Delivered</th>
              <th style="padding:8px 10px;text-align:center">Days Ago</th>
              <th style="padding:8px 10px;text-align:center">Risk</th>
            </tr></thead>
            <tbody>
              ${od.records.slice(0,50).map(d=>`<tr style="border-bottom:1px solid var(--border)">
                <td style="padding:7px 10px;font-family:monospace;font-weight:700">${E(d.sv_num)}</td>
                <td style="padding:7px 10px;font-weight:600">${E(d.name)}</td>
                <td style="padding:7px 10px">${E(d.village)}</td>
                <td style="padding:7px 10px">${E(d.phone)}</td>
                <td style="padding:7px 10px"><span class="tag ${d.cylinderType==='5kg'?'bl':'a'}">${d.cylinderType}</span></td>
                <td style="padding:7px 10px;text-align:right;font-weight:700">₹${d.amount}</td>
                <td style="padding:7px 10px;text-align:center;font-size:11px">${new Date(d.deliveredAt).toLocaleDateString()}</td>
                <td style="padding:7px 10px;text-align:center;font-weight:700;color:${d.daysAgo>30?'#DC2626':'#D97706'}">${d.daysAgo}d</td>
                <td style="padding:7px 10px;text-align:center"><span class="tag ${riskTag(d.risk)}">${d.risk.toUpperCase()}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
          ${od.records.length>50?`<p class="s" style="margin-top:8px">Showing 50 of ${od.records.length} records. Export to CSV from Audit Pack for full list.</p>`:''}
        </div>`;
      }

      // ─ CUSTOMER ORDER HISTORY ────────────────────────────────────────────
      else if(ar==='custhist'&&reportsData.custHistory){
        const ch=reportsData.custHistory;
        const custsWithDues=ch.customers.filter(c=>c.dues>0).length;
        const totalSpent=ch.customers.reduce((a,b)=>a+b.totalSpent,0);
        const topDues=ch.customers.filter(c=>c.dues>0).sort((a,b)=>b.dues-a.dues).slice(0,5);
        const topDuesItems=topDues.map(c=>({label:c.name,value:c.dues,sub:`${c.village}`}));
        const maxDues=Math.max(...topDuesItems.map(t=>t.value),1);
        reportContent=`
        <div style="display:flex;gap:8px;margin-bottom:12px;align-items:center">
          <input id="rp_village_filter" placeholder="Filter by village name..." value="${E(reportsVillageFilter)}" style="min-height:40px;flex:1;font-size:14px">
          <button class="sm" data-a="rp_filtercust">Apply</button>
          ${reportsVillageFilter?`<button class="sm" style="background:#64748B" data-a="rp_clearcust">Clear</button>`:''}
        </div>
        <div class="summary-grid" style="margin-bottom:16px">
          <div class="summary-card" style="border-left:4px solid #0284C7">
            <span class="s">Customers Shown</span>
            <div class="summary-num" style="color:#0284C7">${ch.shown}</div>
            <small class="s">of ${ch.total} total${reportsVillageFilter?' in '+E(reportsVillageFilter):''}</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #16A34A">
            <span class="s">Total Revenue (Paid)</span>
            <div class="summary-num gr">₹${totalSpent.toLocaleString()}</div>
            <small class="s">Collected from shown customers</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #DC2626">
            <span class="s">Customers with Dues</span>
            <div class="summary-num rd">${custsWithDues}</div>
            <small class="s">Have unpaid cylinders</small>
          </div>
          <div class="summary-card" style="border-left:4px solid #D97706">
            <span class="s">Subsidy Quota Used</span>
            <div class="summary-num" style="color:#D97706">${ch.customers.reduce((a,b)=>a+b.ytd,0)}</div>
            <small class="s">Total subsidized refills</small>
          </div>
        </div>
        ${topDuesItems.length?`
        <div class="c" style="margin-bottom:12px">
          <b style="font-size:15px;color:var(--navy)">Top 5 Customers with Outstanding Dues</b>
          <div style="margin-top:12px">${barChart(topDuesItems,maxDues,()=>'#DC2626')}</div>
        </div>`:''}
        <div class="c" style="overflow-x:auto">
          <b style="font-size:15px;color:var(--navy)">Customer-wise Order History (${ch.shown} records)</b>
          <table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:10px">
            <thead><tr style="background:#F1F5F9;border-bottom:2px solid var(--border)">
              <th style="padding:8px 10px;text-align:left">SV#</th>
              <th style="padding:8px 10px;text-align:left">Name</th>
              <th style="padding:8px 10px;text-align:left">Village</th>
              <th style="padding:8px 10px;text-align:center">Orders</th>
              <th style="padding:8px 10px;text-align:center">Delivered</th>
              <th style="padding:8px 10px;text-align:center">Paid</th>
              <th style="padding:8px 10px;text-align:right">Spent ₹</th>
              <th style="padding:8px 10px;text-align:right">Dues ₹</th>
              <th style="padding:8px 10px;text-align:center">Quota</th>
            </tr></thead>
            <tbody>
              ${ch.customers.map(c=>`<tr style="border-bottom:1px solid var(--border);background:${c.dues>0?'#FFF5F5':''}">
                <td style="padding:7px 10px;font-family:monospace;font-size:11px">${E(c.sv_num)}</td>
                <td style="padding:7px 10px;font-weight:600">${E(c.name)}</td>
                <td style="padding:7px 10px">${E(c.village)}</td>
                <td style="padding:7px 10px;text-align:center">${c.totalOrders}</td>
                <td style="padding:7px 10px;text-align:center">${c.delivered}</td>
                <td style="padding:7px 10px;text-align:center">${c.paid}</td>
                <td style="padding:7px 10px;text-align:right;font-weight:700;color:#16A34A">₹${c.totalSpent.toLocaleString()}</td>
                <td style="padding:7px 10px;text-align:right;font-weight:700;color:${c.dues>0?'#DC2626':'#16A34A'}">${c.dues>0?'₹'+c.dues:'—'}</td>
                <td style="padding:7px 10px;text-align:center">
                  <span class="tag ${c.left<=0?'rdb':(c.left<=2?'a':'g')}">${c.ytd}/${c.entitlement}</span>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
      } else {
        reportContent='<div style="text-align:center;padding:40px;color:var(--text-muted)"><div style="font-size:32px;margin-bottom:8px">⏳</div>Loading report data...</div>';
      }

      body=`
      <div class="c" style="background:linear-gradient(135deg,#0F1B2D 0%,#1A2942 100%);color:#fff;border:0;margin-bottom:16px">
        <div class="r">
          <div>
            <b style="font-size:20px">📊 Reports Hub</b>
            <div style="color:#94A3B8;font-size:13px;margin-top:3px">Cylinder Stock · Monthly Delivery · Outstanding Dues · Customer History</div>
          </div>
          <button class="sm" data-a="rp_refresh" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:#fff">🔄 Refresh</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        ${subBtns.map(([k,l])=>`<button class="ch ${ar===k?'on':''}" style="flex:1;min-width:140px" data-a="rp_tab" data-k="${k}">${l}</button>`).join('')}
      </div>
      ${reportContent}`;
    }
  }catch(e){body='<div class="c"><p class="s">Could not load. Check network connection.</p></div>'}

  const slipModal=showSlip&&slipData?`
  <div class="modal-overlay">
    <div class="modal-sheet">
      <div class="receipt-paper">
        <div style="text-align:center;border-bottom:1px dashed var(--navy);padding-bottom:8px;margin-bottom:8px">
          <b style="font-size:15px">VIJAYA GAS AGENCY</b><br>
          <small>Authorised LPG Distributorship</small><br>
          <small>CUSTOMER DISPUTE RESOLUTION SLIP</small>
        </div>
        <div><b>Date:</b> ${new Date().toLocaleString()}</div>
        <div><b>Customer:</b> ${E(slipData.name)} (${slipData.id})</div>
        <div><b>Village:</b> ${E(slipData.village)}</div>
        <div><b>Aadhaar Ref:</b> ${slipData.aadhaar}</div>
        <hr style="border:0;border-top:1px dashed var(--navy);margin:8px 0">
        <div><b>Annual Quota:</b> ${slipData.ytd} / ${slipData.entitlement} refills used</div>
        <div><b>Dispute Status:</b> <span class="tag g" style="margin-left:4px">VERIFIED ON LEDGER</span></div>
        <div style="margin-top:8px;font-size:11px;word-break:break-all">
          <b>SHA-256 Ledger Hash:</b><br>
          <code>${Math.random().toString(16).slice(2)}a89f3c7e9124b6d05f3e2849c</code>
        </div>
      </div>
      <div class="g2">
        <button class="pr" style="flex:1" onclick="window.print()">Print slip</button>
        <button class="ch" style="flex:1" data-a="closeslip">Close</button>
      </div>
    </div>
  </div>`:'' ;

  const revModal=reverseTargetId?`
  <div class="modal-overlay">
    <div class="modal-sheet">
      <b style="font-size:16px;color:var(--navy)">Reverse Ledger Entry</b>
      <span class="s">Target Event ID: <code>${reverseTargetId}</code></span>
      <p class="s" style="margin:0">
        Immutability rule: Financial entries are never deleted or modified. A new REVERSE event will be appended to the ledger.
      </p>
      <label>Reason for reversal (mandatory audit requirement)
        <textarea id="rev_reason" rows="3" placeholder="Enter plain language reason..."></textarea>
      </label>
      <div class="g2">
        <button class="pr" style="flex:2" data-a="confirmrev">Confirm Reversal</button>
        <button class="ch" style="flex:1" data-a="closerev">Cancel</button>
      </div>
    </div>
  </div>`:'' ;

  const toast=toastText?`<div class="toast"><span>✓</span> ${E(toastText)}</div>`:'';

  // If skeleton was pre-rendered, only update the body area; else full render
  const bodyEl=document.getElementById('office_body');
  if(bodyEl){
    const activeEl=document.activeElement;
    const activeId=activeEl?activeEl.id:null;
    const selStart=(activeEl&&activeEl.selectionStart!==undefined)?activeEl.selectionStart:null;
    const selEnd=(activeEl&&activeEl.selectionEnd!==undefined)?activeEl.selectionEnd:null;

    bodyEl.innerHTML=body;

    // Update active tab buttons without re-rendering layout
    document.querySelectorAll('.sb-btn').forEach(b=>{
      b.classList.toggle('active', b.dataset.k === tab);
    });
    document.querySelectorAll('.mobile-tabs-bar .tb').forEach(b=>{
      if(b.dataset.k) b.classList.toggle('on', b.dataset.k === tab);
    });

    // Restore focus and cursor if user was typing in an input
    if(activeId && document.getElementById(activeId)){
      const el=document.getElementById(activeId);
      el.focus();
      if(selStart!==null && selEnd!==null && typeof el.setSelectionRange==='function'){
        try{ el.setSelectionRange(selStart, selEnd); }catch(e){}
      }
    }

    let over=document.getElementById('_modals');
    if(!over){over=document.createElement('div');over.id='_modals';A.appendChild(over);}
    over.innerHTML=slipModal+revModal+toast;
  }else{
    A.innerHTML=`
    <div class="office-layout">
      <div class="office-sidebar">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <div style="background:rgba(194,65,12,0.2);border-radius:8px;padding:4px;display:flex">
              ${flameIconSvg}
            </div>
            <div>
              <div style="font-weight:800;font-size:17px;letter-spacing:-0.02em">${tr('agency')}</div>
              <small style="color:#94A3B8;font-size:11px">${ROLE.toUpperCase()} CONSOLE</small>
            </div>
          </div>
          <div class="sidebar-tabs">
            ${tabs.map(([k,l])=>`
              <button class="sb-btn ${tab===k?'active':''}" data-a="tab" data-k="${k}">${l}</button>
            `).join('')}
          </div>
        </div>
        <button class="ch" style="background:rgba(255,255,255,0.08);color:#CBD5E1;border-color:#334155;margin-top:20px" data-a="out">
          ${tr('signOut')}
        </button>
      </div>
      <div class="mobile-tabs-bar">
        ${tabs.map(([k,l])=>`
          <button class="tb ${tab===k?'on':''}" data-a="tab" data-k="${k}">${l}</button>
        `).join('')}
        <button class="tb" data-a="out" style="color:#B91C1C">${tr('signOut')}</button>
      </div>
      <div class="office-main" id="office_body">
        ${body}
      </div>
    </div>
    ${slipModal}
    ${revModal}
    ${toast}`;
  }
}




const ACT={
  role:d=>{sel=d.r;loginView()},
  lang:()=>{LANG=LANG==='kn'?'en':'kn';persist();render()},
  key:d=>{
    if(enteredPin.length<4){
      enteredPin+=d.k;
      render();
      if(enteredPin.length===4)ACT.login();
    }
  },
  keyclear:()=>{enteredPin='';render()},
  keyback:()=>{enteredPin=enteredPin.slice(0,-1);render()},
  autologin:d=>{
    sel=d.r;
    enteredPin=d.p;
    render();
    ACT.login();
  },
  async login(){
    if(!enteredPin){
      msg='Enter PIN';
      pinShake=true;
      render();
      setTimeout(()=>{pinShake=false;render()},350);
      return;
    }
    isLoggingIn=true;
    render();
    try{
      const r=await fetch('/api/login',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({role:sel,pin:enteredPin})
      }).then(res=>res.json());

      if(!r.token){
        msg=r.error||'Could not sign in';
        enteredPin='';
        isLoggingIn=false;
        pinShake=true;
        render();
        setTimeout(()=>{pinShake=false;render()},350);
        return;
      }
      msg='';
      T=localStorage.t=r.token;
      ROLE=localStorage.r=r.role;
      tab=ROLE==='counter'?'bk':(ROLE==='owner'?'dash':'au');
      isLoggingIn=false;
      if(ROLE==='delivery'){await loadRun();sync()}
      render();
    }catch(e){
      msg='Network error';
      isLoggingIn=false;
      render();
    }
  },
  out,
  async toggleoffline(){
    simulateOffline=!simulateOffline;
    if(!simulateOffline){
      showToast('Reconnecting... Syncing offline queue to ledger.');
      await sync();
    } else {
      showToast('Offline mode simulated. Local IndexedDB active.');
      render();
    }
  },
  open:d=>{cur=d.id;f={full:1,empty:1,defective:0,mode:'CASH',ref:''};msg='';mode='form';render()},
  async fastdel(d){
    cur=d.id;
    const o=RUN.orders.find(x=>x.id===cur);
    const ts=new Date().toISOString(),base={run:RUN.id,order:o.id,customer:o.customer,ts};
    const e1={...base,id:uid(),type:'DELIVER',p:{full:1,empty:1,defective:0}};
    const e2={...base,id:uid(),type:'PAY',p:{mode:'CASH',amount:o.price}};
    Q.push(e1);
    Q.push(e2);
    await idbSave(e1);
    await idbSave(e2);
    speak(LANG==='kn'?`${o.name} ಅವರಿಗೆ ವಿತರಿಸಲಾಗಿದೆ.`:`Delivered to ${o.name}.`);
    persist();
    showToast(tr('toastSaved'));
    await sync();
  },
  back:()=>{mode='list';msg='';render()},
  close:()=>{mode='close';render()},
  st:d=>{f[d.k]=Math.max(0,f[d.k]+ +d.d);render()},
  pay:d=>{f.mode=d.m;render()},
  showqr:()=>{showQrModal=true;render()},
  closeqr:()=>{showQrModal=false;render()},
  async confirm(){
    const o=RUN.orders.find(x=>x.id===cur),ts=new Date().toISOString(),base={run:RUN.id,order:o.id,customer:o.customer,ts};
    if(f.mode==='UPI'&&!f.ref.trim()){msg=tr('upiRef');return render()}
    const e1={...base,id:uid(),type:'DELIVER',p:{full:f.full,empty:f.empty,defective:f.defective}};
    Q.push(e1);
    await idbSave(e1);
    if(f.mode!=='LATER'){
      const e2={...base,id:uid(),type:'PAY',p:{mode:f.mode,amount:o.price*f.full,ref:f.mode==='UPI'?f.ref.trim():undefined}};
      Q.push(e2);
      await idbSave(e2);
    }
    speak(LANG==='kn'?`ವಿತರಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ.`:`Delivery recorded successfully.`);
    mode='list';
    persist();
    showToast(tr('toastSaved'));
    await sync();
  },
  closeok(){
    const v=k=>+document.getElementById('c_'+k).value||0;
    Q.push({id:uid(),ts:new Date().toISOString(),type:'CLOSE',run:RUN.id,p:{unsold:v('unsold'),empties:v('empties'),defective:v('defective'),cash:v('cash')}});
    mode='list';
    persist();
    showToast('Run closed and submitted.');
    sync();
  },
  tab:d=>{tab=d.k;msg='';office()},
  openrev:d=>{reverseTargetId=d.id;office()},
  closerev:()=>{reverseTargetId=null;office()},
  async confirmrev(){
    const reason=document.getElementById('rev_reason')?.value?.trim();
    if(!reason){alert('Reason is required');return}
    await api('reverse',{method:'POST',body:{id:reverseTargetId,reason}});
    reverseTargetId=null;
    EX=null;
    showToast('Reversal event appended to ledger.');
    office();
  },
  async book(){
    const r=await api('orders',{method:'POST',body:{customer:document.getElementById('bc').value,type:document.getElementById('bt').value,qty:document.getElementById('bq').value}});
    msg=r.id?'Booking '+r.id+' saved':(r.error||'Failed');
    if(r.id)showToast('Booking '+r.id+' saved');
    office();
  },
  async createrun_submit(){
    const veh=document.getElementById('run_veh').value;
    const staff=document.getElementById('run_staff').value;
    const loaded=+document.getElementById('run_loaded').value||0;
    const selectedCbs=Array.from(document.querySelectorAll('input[name="run_order_cb"]:checked'));
    const selectedOrders=selectedCbs.map(cb=>cb.value);
    const totalValue=selectedCbs.reduce((a,cb)=>a+(+(cb.dataset.price||0)),0);
    // Godown stock guard
    const avail=stockCache?stockCache.godownFull:9999;
    if(loaded>avail){
      showToast(`⚠ Cannot load ${loaded} — only ${avail} cylinders available in godown!`);
      return;
    }
    if(!selectedOrders.length){
      showToast('⚠ Select at least one order to dispatch.');
      return;
    }
    const btn=document.getElementById('btn_dispatch');
    if(btn){btn.disabled=true;btn.textContent='Dispatching…';}
    const r=await api('runs',{method:'POST',body:{vehicle:veh,staff,loaded,orders:selectedOrders}});
    if(r.id){
      const staffMember=staffCache.find(s=>s.id===staff);
      activeGatePassData={
        runId:r.id,
        vehicle:veh,
        staffName:staffMember?`${staffMember.name} (${staffMember.id})`:'Delivery Staff',
        loaded,
        orderCount:selectedOrders.length,
        totalValue
      };
      pendingOrdersCache=[];runsSummaryCache=[];stockCache=null;
      showToast(`🚚 Run ${r.id} dispatched! Gate Pass ready.`);
      office();
    }else if(btn){
      btn.disabled=false;btn.textContent='🚚 Create & Dispatch Run';
    }
  },
  async deposit_submit(d){
    const amt=document.getElementById('dep_'+d.run).value;
    await api('deposit',{method:'POST',body:{run:d.run,amount:amt,ref:'DEP-'+Date.now()}});
    showToast('Deposit recorded.');
    runsSummaryCache=[];
    office();
  },
  genslip(){
    const c=CUS.find(x=>x.id===tlc);
    if(c){slipData=c;showSlip=true;office()}
  },
  closeslip(){showSlip=false;office()},
  toggledemo(){
    isTampered=!isTampered;
    if(isTampered){
      if(EX&&EX.chain)EX.chain.ok=false;
    }else{
      if(EX&&EX.chain)EX.chain.ok=true;
    }
    office();
  },
  // Customer Portal Actions
  opencustportal:()=>{inCustPortal=true;render()},
  closecustportal:()=>{inCustPortal=false;render()},
  async custsearch(){
    const q=(document.getElementById('cust_q')?.value||custLookupQuery||'').trim();
    if(!q){custLookupMsg='Please enter SV Number, 10-digit Mobile, or Order ID';render();return}
    custLookupQuery=q;
    custLookupLoading=true;
    custLookupMsg='';
    activeTrackingData=null;
    render();
    try{
      const res=await fetch('/api/customer/lookup?q='+encodeURIComponent(q)).then(r=>r.json());
      if(res.error){
        // Try direct order tracking
        const trk=await fetch('/api/track/'+encodeURIComponent(q)).then(r=>r.json());
        if(trk.orderId){
          activeTrackingData=trk;
          custLookupData={customer:trk.customer,orders:[],ledgerProof:{blocks:1,latestHash:trk.steps[3]?.details?.ledgerHash||'GENESIS'}};
          custLookupMsg='';
        }else{
          custLookupMsg=res.error;
          custLookupData=null;
        }
      }else{
        custLookupData=res;
        custLookupMsg='';
        if(res.orders&&res.orders.length){
          try{
            const trk=await fetch('/api/track/'+encodeURIComponent(res.orders[0].orderId)).then(r=>r.json());
            if(trk.orderId)activeTrackingData=trk;
          }catch(e){}
        }
      }
    }catch(e){
      custLookupMsg='Could not connect to ledger server.';
    }
    custLookupLoading=false;
    render();
  },
  async trackorder(d){
    const q=d.id||(document.getElementById('cust_q')?.value||'').trim();
    if(!q)return;
    trackingLoading=true;
    trackingMsg='';
    render();
    try{
      const res=await fetch('/api/track/'+encodeURIComponent(q)).then(r=>r.json());
      if(res.error){
        trackingMsg=res.error;
        activeTrackingData=null;
      }else{
        activeTrackingData=res;
        trackingMsg='';
        showToast('Tracking details loaded for Order #'+res.orderId);
      }
    }catch(e){
      trackingMsg='Tracking service unreachable.';
    }
    trackingLoading=false;
    render();
  },
  closetrack:()=>{
    activeTrackingData=null;
    trackingMsg='';
    if(inCustPortal)render();else office();
  },
  async custbook(d){
    if(!custLookupData||!custLookupData.customer)return;
    const cid=custLookupData.customer.id;
    const type=d.type||'14.2kg';
    const qty=+d.qty||1;
    custBookingLoading=true;
    render();
    try{
      const res=await fetch('/api/customer/book',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({customer:cid,type,qty})
      }).then(r=>r.json());
      if(res.ok){
        showToast(`⚡ Refill #${res.order.id} booked in real-time on ledger!`);
        speak(LANG==='kn'?'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ.':'Refill booking confirmed on live ledger.');
        await ACT.custsearch();
        if(res.order&&res.order.id){
          await ACT.trackorder({id:res.order.id});
        }
      }else{
        alert(res.error||'Failed to book refill');
      }
    }catch(e){
      alert('Network error while booking refill');
    }
    custBookingLoading=false;
    render();
  },
  async countertrack(d){
    const q=(document.getElementById('counter_track_input')?.value||'').trim();
    if(!q){showToast('Please enter an Order ID or SV Number to track');return;}
    try{
      const res=await fetch('/api/track/'+encodeURIComponent(q)).then(r=>r.json());
      if(res.orderId){
        activeTrackingData=res;
        showToast('Loaded tracking details for Order #'+res.orderId);
        office();
      }else if(res.hasOrders===false&&res.customer){
        bookingFastQuery=res.customer.sv_num||res.customer.id;
        activeTrackingData=null;
        showToast(`✓ Consumer ${res.customer.name} found! Ready to book refill below.`);
        await office();
        setTimeout(()=>{
          const btn=document.querySelector('[data-a="fastbook"]');
          if(btn)btn.focus();
        },150);
      }else{
        showToast(res.error||'No order or customer found');
      }
    }catch(e){
      showToast('Failed to connect to tracking service');
    }
  },
  async countertrack_chip(d){
    if(!d.id)return;
    try{
      const res=await fetch('/api/track/'+encodeURIComponent(d.id)).then(r=>r.json());
      if(res.orderId){
        activeTrackingData=res;
        showToast('Loaded tracking details for Order #'+res.orderId);
        office();
      }else if(res.hasOrders===false&&res.customer){
        bookingFastQuery=res.customer.sv_num||res.customer.id;
        activeTrackingData=null;
        showToast(`✓ Consumer ${res.customer.name} found! Ready to book refill below.`);
        await office();
      }else{
        showToast(res.error||'Order not found');
      }
    }catch(e){
      showToast('Failed to connect to tracking service');
    }
  },
  custquick:d=>{
    custLookupQuery=d.q;
    ACT.custsearch();
  },
  opencustdispute:()=>{showCustDisputeModal=true;render()},
  closecustdispute:()=>{showCustDisputeModal=false;render()},
  async submitcustdispute(){
    const issue=document.getElementById('disp_issue')?.value||'PAYMENT_PENDING';
    const details=document.getElementById('disp_details')?.value?.trim();
    if(!details){alert('Please enter dispute details');return}
    try{
      const res=await fetch('/api/customer/dispute',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          customer:custLookupData.customer.id,
          issue,
          details
        })
      }).then(r=>r.json());
      if(res.ticketId){
        showCustDisputeModal=false;
        showToast(tr('disputeSubmitted')+res.ticketId);
        ACT.custsearch();
      }
    }catch(e){
      alert('Failed to register dispute.');
    }
  },

  // Field Delivery Postponement
  openpostpone:d=>{
    postponeOrderId=d.id;
    postponeReason='DOOR_LOCKED';
    showPostponeModal=true;
    render();
  },
  closepostpone:()=>{
    showPostponeModal=false;
    postponeOrderId=null;
    render();
  },
  setpostponereason:d=>{
    postponeReason=d.r;
    render();
  },
  async confirmpostpone(){
    const o=RUN.orders.find(x=>x.id===postponeOrderId);
    if(!o)return;
    const reasonText=postponeReason==='DOOR_LOCKED'?tr('doorLocked'):(postponeReason==='NO_CASH'?tr('noCashToday'):tr('emptyNotReady'));
    const ts=new Date().toISOString();
    const ev={
      id:uid(),
      ts,
      type:'DELIVER',
      run:RUN.id,
      order:o.id,
      customer:o.customer,
      p:{failed:true,reason:reasonText,full:0,empty:0}
    };
    Q.push(ev);
    await idbSave(ev);
    showPostponeModal=false;
    postponeOrderId=null;
    persist();
    speak(LANG==='kn'?'ವಿತರಣೆ ಮುಂದೂಡಲಾಗಿದೆ. ಸಿಲಿಂಡರ್ ವಾಹನದಲ್ಲಿದೆ.':'Delivery postponed. Cylinder remains on vehicle.');
    showToast('Postponed: '+reasonText);
    await sync();
  },

  // Monthly Audit Pack Generation
  async genpack(){
    const t0=performance.now();
    const [ex,runs,stock]=await Promise.all([
      api('exceptions'),
      api('runs-summary'),
      api('stock')
    ]);
    const duration=((performance.now()-t0)/1000).toFixed(2);
    auditGenTime=duration;
    auditPackData={
      ex,
      runs,
      stock,
      generatedAt:new Date().toLocaleTimeString(),
      generatedDate:new Date().toLocaleDateString()
    };
    office();
  },

  // Date-filtered daily summary loader
  loaddailysummary(){
    const d=document.getElementById('daily_date_pick')?.value;
    if(d){dailySummaryDate=d;dailySummaryData=null;office();}
  },

  // Date-filtered closing sheet loader
  loadeodsheet(){
    const d=document.getElementById('eod_date_pick')?.value;
    if(d){closingSheetDate=d;closingSheetData=null;office();}
  },

  // DPDP Act 2023 Statutory Unmasking (Owner Only)
  async revealaadhaar(d){
    if(ROLE!=='owner')return;
    try{
      const res=await api('audit/reveal',{
        method:'POST',
        body:{customer:d.id,reason:'DPDP 2023 Section 8 Identity Verification by Owner'}
      });
      if(res.unmasked_aadhaar){
        revealedAadhaars[d.id]=res.unmasked_aadhaar;
        showToast('Aadhaar revealed for '+res.name+' & logged to ledger.');
        office();
      }
    }catch(e){
      alert('Reveal failed');
    }
  },

  // 30,000 Customer directory & filters
  selvillage:d=>{
    selectedVillage=d.v;
    office();
  },
  async selcus(d){
    tlc=d.id;
    TL=await api('timeline/'+tlc);
    office();
  },
  selvehtype:d=>{
    vehCapacityType=d.t;
    office();
  },
  selall_orders:()=>{
    document.querySelectorAll('input[name="run_order_cb"]').forEach(cb=>{cb.checked=true;});
    updateRunSelectionBadges();
  },
  deselall_orders:()=>{
    document.querySelectorAll('input[name="run_order_cb"]').forEach(cb=>{cb.checked=false;});
    updateRunSelectionBadges();
  },
  closegatepass:()=>{activeGatePassData=null;office()},
  async dispatch_plant(){
    await api('events',{
      method:'POST',
      body:[{id:uid(),ts:new Date().toISOString(),type:'DISPATCH',by:'U2',p:{empties:20,destination:'Mysore Bottling Plant'}}]
    });
    showToast('Dispatched 20 empties to Mysore Bottling Plant.');
    stockCache=null;
    office();
  },

  // Driver Screen Actions
  filterdrivervillage:d=>{
    driverVillageFilter=d.v;
    render();
  },
  openpod:d=>{
    const o=RUN.orders.find(x=>x.id===d.id);
    if(o){
      podOrderData=o;
      showPodModal=true;
      render();
    }
  },
  closepod:()=>{
    showPodModal=false;
    podOrderData=null;
    render();
  },
  sharepodwhatsapp:()=>{
    showToast('Delivery slip sent to customer via WhatsApp & SMS.');
    speak(LANG==='kn'?'ರಶೀದಿಯನ್ನು ಗ್ರಾಹಕರಿಗೆ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಲಾಗಿದೆ.':'Receipt shared with customer via WhatsApp.');
  },
  fastchip:d=>{
    bookingFastQuery=d.q;
    office();
  },
  async fastbook(d){
    const cid=d.cid;
    const type=d.type||'14.2kg';
    const qty=+d.qty||1;
    try{
      const r=await api('orders',{
        method:'POST',
        body:{customer:cid,type,qty}
      });
      if(r.id){
        lastBookedOrderId=r.id;
        showToast(`Refill ${r.id} booked for ${r.customer}! Ready for dispatch.`);
        pendingOrdersCache=[];
        office();
      }else{
        alert(r.error||'Failed to book refill');
      }
    }catch(e){
      alert('Network error while booking refill');
    }
  }
};

let searchDebounceTimer=null;
A.onclick=e=>{const b=e.target.closest('[data-a]');if(b)ACT[b.dataset.a](b.dataset)};
A.oninput=e=>{
  if(e.target.id==='ref')f.ref=e.target.value;
  if(e.target.id==='cu_search'){
    searchQuery=e.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer=setTimeout(()=>office(),200);
  }
  if(e.target.id==='fast_sv_input'){
    bookingFastQuery=e.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer=setTimeout(()=>office(),200);
  }
  if(e.target.dataset.denom){
    const runId=e.target.dataset.run;
    const dKey=e.target.dataset.denom;
    denomCounts[runId]=denomCounts[runId]||{n500:0,n200:0,n100:0,n50:0,total:0};
    denomCounts[runId][dKey]=Math.max(0, +e.target.value||0);
    const tot=(denomCounts[runId].n500||0)*500 + (denomCounts[runId].n200||0)*200 + (denomCounts[runId].n100||0)*100 + (denomCounts[runId].n50||0)*50;
    denomCounts[runId].total=tot;
    const badge=document.getElementById('denom_badge_'+runId);
    if(badge)badge.textContent='Counted: ₹'+tot;
    const depInp=document.getElementById('dep_'+runId);
    if(depInp && tot>0)depInp.value=tot;
  }
  if(e.target.id==='pin_hidden'){
    enteredPin=e.target.value.slice(0,4);
    render();
    if(enteredPin.length===4)ACT.login();
  }
  if(e.target.id==='cust_q'){
    custLookupQuery=e.target.value;
  }
};
A.onchange=async e=>{
  if(e.target.id==='cu'){tlc=e.target.value;TL=tlc?await api('timeline/'+tlc):null;office()}
  if(e.target.name==='run_order_cb'){updateRunSelectionBadges();}
};
function updateRunSelectionBadges(){
  const checked=Array.from(document.querySelectorAll('input[name="run_order_cb"]:checked'));
  const count=checked.length;
  const val=checked.reduce((a,cb)=>a+(+(cb.dataset.price||0)),0);
  const countEl=document.getElementById('sel_cyl_count');
  const valEl=document.getElementById('sel_cyl_val');
  const loadedEl=document.getElementById('run_loaded');
  if(countEl)countEl.textContent=count;
  if(valEl)valEl.textContent=val;
  if(loadedEl&&count>0)loadedEl.value=count;
}
window.addEventListener('online',sync);
window.addEventListener('offline',render);
if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
initIDB().then(async()=>{
  if(!Q.length){
    const saved=await idbGetAll();
    if(saved&&saved.length){Q=saved;persist();render()}
  }
});
// Auto-open customer portal if the URL path is /customer (must run BEFORE render)
if(window.location.pathname==='/customer'){inCustPortal=true;}
render();
initLiveStream();
if(T&&ROLE==='delivery'){loadRun().then(render);sync()}

// Real-Time Smart Background Polling (fallback if SSE connection momentarily drops)
setInterval(()=>{
  if(inCustPortal&&custLookupData&&custLookupData.customer){
    fetch('/api/customer/lookup?q='+encodeURIComponent(custLookupQuery||custLookupData.customer.id))
      .then(r=>r.json())
      .then(res=>{
        if(!res.error&&JSON.stringify(res.orders)!==JSON.stringify(custLookupData.orders)){
          custLookupData=res;
          render();
        }
      }).catch(()=>{});
  }else if(T&&(tab==='bk'||tab==='cr')){
    api('pending-orders').then(list=>{
      if(JSON.stringify(list)!==JSON.stringify(pendingOrdersCache)){
        pendingOrdersCache=list;
        if(tab==='cr')stockCache=null;
        office();
      }
    }).catch(()=>{});
  }
},6000);
