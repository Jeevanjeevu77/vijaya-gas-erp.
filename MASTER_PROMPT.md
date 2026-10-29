# Master prompt for Antigravity (paste as the first message)

You are the lead engineer on **Vijaya Gas Agency**, an offline-first LPG distribution ERP for a national-level 24-hour student hackathon (Cynefian, Enterprise ERP track). Read this repo first (README.md, lib.js, server.js, public/app.js), run `npm install && npm run seed && npm run check`, then continue the work below without breaking `npm run check` (it must still report all planted errors found).

## Problem
A rural LPG distributor serves 30,000+ domestic customers across 30+ villages. Delivery staff on two-wheelers and small trucks capture bookings, deliveries, cash/UPI collections and cylinder swaps (full, empty, defective, in transit) by memory, WhatsApp and notebooks. Month-end reconciliation of cylinders, cash and government subsidy takes days, disputes are frequent, and connectivity is poor.

## Goal
One truthful operational record that works offline for non-technical field staff, so month-end reconciliation becomes a check instead of an investigation.

## Judging criteria (optimise for these)
1. Planted errors in the synthetic dataset are correctly identified and explained.
2. Time to produce the monthly reconciliation and audit pack is short.
3. Delivery-person usability: few taps, low error rate in a judged walk-through.
4. Customer dispute resolution: a clear, trustworthy history.
5. Safety: DPDP Act 2023 (store only what is needed, protect Aadhaar-linked references), immutable financial entries corrected only by reversal, role-based access (delivery staff, counter staff, owner, auditor).
Out of scope: live oil-company integration (simulate it), routing optimisation, payroll.

## Architecture (keep)
- Append-only event ledger with SHA-256 hash chain (`lib.js`). No update or delete. Corrections are REVERSE events.
- Reconciliation engine = pure function over effective events (non-reversed). Every flag has a code, kind (Cylinder, Cash, Subsidy), key, plain-language reason, amount and linked evidence IDs.
- Offline: client queues events with client-generated IDs; server de-duplicates by ID; sync on reconnect.
- Express API with server-side role checks. Vanilla JS PWA in `public/`.

## Design language
Navy header #0F1B2D, flame-orange primary #C2410C, light grey background, green = done/verified, amber = pending/review, red = mismatch. Touch targets at least 44px, large numbers, offline/synced banner on every field screen, sentence case, agency name "Vijaya Gas Agency".

## Tasks (in order)
1. Add a counter-staff "Create run" screen using `POST /api/runs` (vehicle, staff, cylinders loaded, orders).
2. Add a Kannada/English toggle for the delivery screens.
3. Move storage from data.json to Postgres (or SQLite) behind the same function names in `lib.js`. Add unique constraints on event id. Hash PINs, use signed sessions.
4. Add monthly period filtering and an Excel/CSV export to the audit pack, plus per-village and per-staff summaries.
5. Add tests for each reconciliation rule (one passing and one failing case each) and a test that tampering with a ledger entry makes `verify()` fail.
6. Add an anomaly view (cash per delivery outliers, repeated empty shortfalls by one staff member), clearly labelled as hints, not findings.
7. Polish: loading and error states, accessibility (labels, contrast), and a one-page architecture diagram in README.

## Rules
- Never store full Aadhaar numbers. Mask in API output.
- Never add edit or delete of financial entries.
- Keep dependencies minimal. Explain any rule you change.
- After each task: run `npm run check`, summarise what changed, and list anything left.
