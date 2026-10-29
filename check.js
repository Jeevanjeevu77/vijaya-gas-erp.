const L=require('./lib');L.load();const r=L.reconcile(),v=L.verify();
console.log(`Found ${r.found} of ${r.total} planted errors; ${r.items.length} flags total; ledger ${v.ok?'verified':'BROKEN'} (${v.count} entries)`);
r.score.filter(s=>!s.found).forEach(s=>console.log('MISSED',s.code,s.key));process.exit(r.found===r.total&&v.ok?0:1);
