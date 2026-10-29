const assert = require('assert');
const L = require('./lib');

console.log('--- Running Vijaya Gas ERP Automated Test Suite ---');

// 1. Test Seeded Reconciliation & Planted Errors
L.load();
const r = L.reconcile();
const v = L.verify();

console.log(`Checking baseline: ${r.found}/${r.total} planted errors detected, ledger status: ${v.ok ? 'OK' : 'FAIL'}`);
assert.strictEqual(r.found, r.total, 'All 11 planted errors must be detected');
assert.strictEqual(v.ok, true, 'Ledger hash chain must be valid');

// Verify each planted error
r.score.forEach(s => {
  assert(s.found, `Planted error ${s.code} (${s.key}) must be found`);
  console.log(`  ✓ Planted [${s.code}] on [${s.key}] detected`);
});

// 2. Test Additional Reconciliation Rules In-Memory
console.log('\nTesting Additional Reconciliation Rule Handlers:');

// DUP_DELIVERY test
{
  const testOrder = 'O_TEST_DUP';
  const ev1 = { id: 'dup-1', ts: new Date().toISOString(), type: 'DELIVER', run: 'R1', order: testOrder, customer: 'C001', by: 'U1', p: { full: 1, empty: 1 } };
  const ev2 = { id: 'dup-2', ts: new Date().toISOString(), type: 'DELIVER', run: 'R1', order: testOrder, customer: 'C001', by: 'U1', p: { full: 1, empty: 1 } };
  L.db.events.push(ev1, ev2);
  const res = L.reconcile();
  const foundDup = res.items.some(x => x.code === 'DUP_DELIVERY' && x.key === testOrder);
  assert(foundDup, 'DUP_DELIVERY rule must flag order delivered twice');
  console.log('  ✓ Rule [DUP_DELIVERY] verified');
  // cleanup
  L.db.events.pop();
  L.db.events.pop();
}

// ORPHAN_PAY test
{
  const orphanOrder = 'O_ORPHAN_TEST';
  const payEv = { id: 'orphan-1', ts: new Date().toISOString(), type: 'PAY', run: 'R1', order: orphanOrder, customer: 'C001', by: 'U1', p: { mode: 'CASH', amount: 900 } };
  L.db.events.push(payEv);
  const res = L.reconcile();
  const foundOrphan = res.items.some(x => x.code === 'ORPHAN_PAY' && x.key === orphanOrder);
  assert(foundOrphan, 'ORPHAN_PAY rule must flag payment with no delivery');
  console.log('  ✓ Rule [ORPHAN_PAY] verified');
  L.db.events.pop();
}

// 3. Test Cryptographic Ledger Tamper Resistance
console.log('\nTesting Cryptographic Anti-Tamper Verification...');
const originalEventPayload = JSON.stringify(L.db.events[5].p);
try {
  // Simulate attacker altering delivery quantity in event 5
  L.db.events[5].p.full = 999;
  const tamperedCheck = L.verify();
  assert.strictEqual(tamperedCheck.ok, false, 'verify() MUST fail when historical event payload is tampered');
  assert.strictEqual(tamperedCheck.at, L.db.events[5].id, 'Tamper verifier must pinpoint exact broken block ID');
  console.log(`  ✓ Ledger tamper detected correctly at block ID: ${tamperedCheck.at}`);
} finally {
  // Restore original state
  L.db.events[5].p = JSON.parse(originalEventPayload);
  assert.strictEqual(L.verify().ok, true, 'Ledger must return to valid after restoring original bytes');
  console.log('  ✓ Ledger hash chain restored successfully');
}

// 4. Test Reversal Logic
console.log('\nTesting Reversal Event Logic...');
const testEv = L.db.events.find(e => e.type === 'DELIVER' && e.order === 'O003');
assert(testEv, 'Event O003 exists');
const initialSwap = L.reconcile().items.some(x => x.code === 'CYL_SWAP' && x.key === 'O003');
assert(initialSwap, 'O003 has CYL_SWAP discrepancy flag initially');

// Add in-memory reverse for the bad delivery
const revEvent = {
  id: 'test-rev-' + Date.now(),
  ts: new Date().toISOString(),
  type: 'REVERSE',
  order: 'O003',
  customer: testEv.customer,
  by: 'U3',
  p: { of: testEv.id, reason: 'Test correction' }
};
L.add(revEvent);
const afterReconcile = L.reconcile();
const hasSwapNow = afterReconcile.items.some(x => x.code === 'CYL_SWAP' && x.key === 'O003');
assert.strictEqual(hasSwapNow, false, 'CYL_SWAP discrepancy must be cleared after reversing the faulty delivery event');
console.log('  ✓ REVERSE event successfully neutralized target CYL_SWAP discrepancy');

// Clean up test reversal from memory to preserve clean state
const idx = L.db.events.findIndex(e => e.id === revEvent.id);
if (idx !== -1) L.db.events.splice(idx, 1);

console.log('\n✅ All automated tests passed successfully!');
process.exit(0);
