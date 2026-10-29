# Vijaya Gas Agency: LPG Operations & Automated Ledger Reconciliation

Offline-first Progressive Web App (PWA) and enterprise office console for rural LPG distributorships (30,000+ domestic customers across 30+ villages). Eliminates paper registers and WhatsApp messages with an **immutable SHA-256 append-only ledger** and a **14-rule automated reconciliation engine** that audits cylinders, cash, and government subsidies with zero manual investigation.

---

## 🏗 System Architecture

```
                                 [ Rural Delivery Staff (Ravi) ]
                                    │ (2-Wheeler / Spotty 2G/3G)
                                    ▼
       ┌──────────────────────────────────────────────────────────────┐
       │                 OFFLINE-FIRST CLIENT PWA                     │
       │  • Kannada / English Vernacular Switcher (ಕನ್ನಡ / English)   │
       │  • 1-Tap Quick Deliver (Full 1, Empty 1, ₹900 Cash)          │
       │  • Dynamic Offline Bharat QR / UPI Generator                 │
       │  • HTML5 Voice / Speech Audio Confirmation                   │
       │  • Service Worker (vga-v2) + localStorage Idempotent Queue   │
       └──────────────────────────────┬───────────────────────────────┘
                                      │ (Sync when online / REST API)
                                      ▼
       ┌──────────────────────────────────────────────────────────────┐
       │                   EXPRESS BACKEND SERVER                     │
       │  • RBAC: Delivery (1111), Counter (2222), Owner, Auditor     │
       │  • Constant-time Salted Scrypt PIN Verification              │
       │  • Brute-Force Rate Limiting (5-attempt lockouts)            │
       │  • DPDP Act 2023 Masking (Aadhaar: XXXX-XXXX-1234)           │
       │  • Idempotent Deduplication by Client UUID                   │
       └──────────────────────────────┬───────────────────────────────┘
                                      │
                                      ▼
       ┌──────────────────────────────────────────────────────────────┐
       │             CORE RECONCILIATION & LEDGER ENGINE              │
       │  • Append-Only SHA-256 Hash Chain: Genesis ➔ Tip             │
       │  • Strict Immutability: No UPDATE / DELETE (REVERSE only)    │
       │  • 14 Pure Functional Reconciliation Rules                   │
       │  • Algorithmic Anomaly Radar (Cash Float & Empty Shortfall)  │
       │  • Atomic Temp-file Persistence                              │
       └──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (Node 18+)

```bash
npm install
npm run seed     # Seeds 20 customers, 37 ledger entries, and 11 planted errors
npm run check    # Validates: Found 11 of 11 planted errors; ledger verified
npm test         # Runs full 14-rule reconciliation test suite & anti-tamper tests
npm start        # Launches app on http://localhost:3000
```

---

## 🔑 Demo Role Logins

| Role | PIN | Capabilities & Demo Features |
|---|---|---|
| **Delivery Staff (Ravi)** | `1111` | Run R2 with pending orders; works 100% offline; **ಕನ್ನಡ / English** toggle; **1-Tap Quick Cash**; dynamic **UPI QR generator**; speech audio confirmations; closing vehicle inventory count. |
| **Counter Staff (Meena)** | `2222` | **Create Run (`POST /api/runs`)** with vehicle assignment and order selection; **End-of-Day Cash Handover & Deposit**; live **Stock Gauge**; new bookings. |
| **Customer Dispute Desk** | `2222`/`3333` | Instant search by customer name, village, ID (`C002`), or Aadhaar; annual quota meter; **Digital Dispute Slip** with SHA-256 proof badge (`VERIFIED ON LEDGER`). |
| **Owner (Suresh)** | `3333` | Full exceptions dashboard; entry reversal with mandatory audit rationale; **Anomaly Radar**; printable & CSV audit packs. |
| **Auditor (Anil)** | `4444` | Read-only ledger audit; printable compliance pack under DPDP Act 2023; **Cryptographic Ledger Visualizer** with live **Tamper Simulation Demo**. |

---

## 🧪 Interactive Walkthrough & Demo Script

1. **Kannada Language Toggle & 1-Tap Delivery**:
   - Sign in as **Ravi** (`1111`).
   - Click the **`ಕನ್ನಡ`** button in the header. The interface seamlessly translates into Kannada (`ವಿಜಯಾ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿ`, `ವಿತರಣಾ ಸಿಬ್ಬಂದಿ`, `ತುಂಬಿದ ಸಿಲಿಂಡರ್`).
   - Click **`⚡ 1-ಟ್ಯಾಪ್ ನಗದು (₹900)`** on an order: it immediately logs full out, empty in, ₹900 cash, speaks an audio confirmation, and saves offline.
2. **Offline UPI Payment**:
   - On another order, click **`ಬದಲಾಯಿಸಿ / Custom`** ➔ select **`UPI`** ➔ click **`📱 Show UPI QR Code`**.
   - A dynamic Bharat QR code pops up with the exact order amount (`₹900`) and VPA (`vijayagas@upi`) so customers can scan directly from the delivery phone.
3. **Counter Operations & Run Creation**:
   - Sign in as **Meena** (`2222`).
   - Open **`Create Run`** tab: assign vehicle `VH-04`, pick delivery person, set loaded cylinders, select pending orders, and dispatch atomically.
   - Open **`Cash Deposit`** tab: view cash collected vs deposited per run and record bank deposits.
   - Open **`Stock Gauge`** tab: view live cylinder circulation (Godown Full, On Trucks, Delivered, Empties, Defectives).
4. **Customer Dispute Resolution ("I paid but it shows pending!")**:
   - Under the **`Customer Dispute`** tab, search for customer `C002`.
   - View their timeline of bookings, deliveries, and payments.
   - Click **`Generate Verified Receipt Slip`**: prints/exports a formal receipt slip with masked Aadhaar (`XXXX-XXXX-1074`) and the cryptographic SHA-256 ledger proof snippet (`VERIFIED ON LEDGER`).
5. **Simulate Cryptographic Ledger Tampering for Judges**:
   - Sign in as **Suresh** (`3333`) or **Anil** (`4444`).
   - Navigate to the **`Ledger Inspector`** tab. Shows Genesis-to-tip hash verification.
   - Click **`Simulate Tampering`**: modifies a byte in historical Block #5. The status banner turns bright red (**`BROKEN / COMPROMISED - TAMPER DETECTED`**).
   - Click **`Reset & Fix Ledger`**: restores original bytes and returns to green (**`VERIFIED VALID`**).
6. **Download Audit CSVs**:
   - In the **`Audit Pack`** tab, click **`⬇ Exceptions CSV`** or **`⬇ Ledger Chain CSV`** for instant audit spreadsheets.

---

## 🛡 Security & Compliance (DPDP Act 2023)

- **Aadhaar Protection**: Aadhaar numbers are masked on output as `XXXX-XXXX-` + last 4 digits. Full numbers are never stored or logged.
- **Salted Scrypt PIN Hashing**: Stored PINs are hashed using Node.js `crypto.scryptSync` with salt and verified via constant-time comparison.
- **Brute-Force Lockout**: 5 failed PIN attempts trigger an automatic 5-minute cooldown.
- **Atomic File Persistence**: Saves use atomic temporary file write and replacement to prevent corruption under concurrent mobile syncs.
