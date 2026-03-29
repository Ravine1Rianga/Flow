##ChaiConnect + FlowCredit

M-Pesa-based payment transparency and supply chain financing for Kenya's tea farmers  ·  M-Pesa Money in Motion Hackathon 2025

The Problem

Kenya has 680,000 smallholder tea farmers supplying 77 KTDA-affiliated factories. Together they sustain a KSh 140 billion industry. But the farmers at the bottom of this chain operate in a financial information blackout — they do not know what they are owed, when they will be paid, why their amounts differ, or what is being deducted from their payments.

"The money received as bonus was deducted by banks and SACCOs. We only saw it reflected in statements, not actual cash." — Patrick Langat, tea farmer, Bomet
680K
smallholder tea farmers affected
KSh 4.2B
annual losses from preventable quality rejections
94%
of smallholder farmers cannot access formal credit
Problem 1 — Payment opacity

When a farmer delivers green leaf to the factory, a chain of calculations begins that the farmer cannot see. The factory weighs and grades the tea. A rate is applied. Deductions are made — for the SACCO, an outstanding loan, a factory levy. A net figure is sent to the farmer's M-Pesa, sometimes weeks later, with no itemised breakdown. The farmer has no way to verify if the weight was recorded correctly, which grade was assigned, which rate applied, or why the amount differs from last month. Payment disputes are resolved at annual AGMs — once a year. Everything in between is word of mouth.

On the cooperative side, factory clerks track payments in spreadsheets or paper registers. With hundreds of farmers per factory, keeping track of who has been paid, who is pending, and who has outstanding deductions is error-prone and opaque. KTDA was forced to publicly deny "false payment numbers circulating online" in September 2025 because the information vacuum had become so severe that farmers could not distinguish official figures from rumours.

Problem 2 — No working capital for farmers

Between harvest and payment, tea farmers face a cash gap that can stretch two to four weeks. Inputs — fertiliser, labour, transport — must be paid immediately. Cooperative payments arrive on a cycle. To bridge this gap, most farmers borrow from informal lenders at interest rates of 30–50% per month.

The reason formal credit is inaccessible is not that farmers have no financial history. It is that their financial history is invisible to lenders. Every cooperative payment, every M-Pesa transaction, every delivery record exists in Safaricom's infrastructure — but no lender is using it to assess creditworthiness. Farmers are credit-invisible despite being economically active.

The Solution

ChaiConnect + FlowCredit is a unified platform with two integrated portals sharing one M-Pesa backbone. It solves both problems simultaneously — and does not ask farmers to adopt a new payment system. It builds on top of the M-Pesa infrastructure they already use every day.

ChaiConnect — Payment transparency portal

ChaiConnect gives every actor in the tea value chain a real-time, accurate view of their role in the payment flow.

1
Factory clerk logs the delivery — weight, grade, and date entered digitally. The farmer receives an instant SMS: "Your 42 kg of Grade A tea has been recorded at Kiambu Factory. Expected payment: KSh 1,260."
2
Cooperative admin approves the payment batch — a live dashboard shows every farmer's status: pending, approved, or paid. No spreadsheet. No guesswork.
3
Disbursement triggered via M-Pesa B2C — admin clicks "Disburse All." The Daraja B2C API sends individual payments to each farmer's M-Pesa wallet. Funds arrive in under 60 seconds.
4
Farmer sees the full breakdown — in their mobile portal: KSh 1,260 gross → KSh 210 SACCO deduction → KSh 1,050 net to your M-Pesa. Every figure is visible. Nothing is hidden.
5
USSD fallback for feature phones — farmers without smartphones dial *483# to access delivery records, payment summaries, and quality feedback in English or Kiswahili.
FlowCredit — Supply chain financing portal

FlowCredit turns a farmer's M-Pesa transaction history into a credit score — and uses that score to offer short-term working capital that is disbursed in seconds and repaid automatically.

1
Farmer opts in and consents — explicit, reversible consent to share M-Pesa transaction history for credit assessment.
2
Credit score generated from five factors — delivery consistency, buyer relationship length, payment volume trend, repayment history, and transaction frequency. Score: 0–100, Grade A/B/C.
3
Loan offer presented with full transparency — amount, flat interest rate, number of repayment deductions, and exact net payment after each deduction. No hidden fees.
4
Funds disbursed via M-Pesa B2C — farmer accepts and money lands in their M-Pesa wallet within 60 seconds with a confirmation SMS showing the full repayment schedule.
5
Repayment deducted automatically — when the cooperative pays the farmer next time, ChaiConnect's C2B validation webhook intercepts the payment, deducts the loan instalment, and forwards the remainder. The farmer never needs to remember a repayment date.
How We Use the M-Pesa API

ChaiConnect integrates four Daraja 3.0 endpoints. Each maps directly to a specific problem in the tea payment and financing chain.

B2C API
Disburses cooperative payments and FlowCredit loans directly to individual farmer M-Pesa wallets. The payload includes the farmer's phone number, the net amount after deductions, and a remarks field containing the delivery or loan reference so the farmer sees the context in their M-Pesa message.
C2B Paybill + Validation URL
Powers the automatic repayment mechanic. When a cooperative pays a farmer, Safaricom fires a validation callback to ChaiConnect before processing. ChaiConnect checks for a pending loan repayment, calculates the net amount, and returns the adjusted figure. The deduction is transparent — visible to the farmer in their payment ledger in real time.
Transaction Status API
Confirms every B2C disbursement was received using the OriginatorConversationID. This is what lets ChaiConnect mark a farmer as "Paid" vs "Pending" programmatically — solving the exact problem cooperatives currently cannot solve with spreadsheets. Also used to build the inflow history for credit scoring.
OAuth Token
Requested before every API call, cached for the one-hour validity window, and refreshed automatically. All credentials are stored server-side and never exposed to the frontend. Every M-Pesa action in ChaiConnect is authenticated — judges can see the full token request and API response in the live transaction feed.
The repayment intercept — step by step

This is the core technical innovation of FlowCredit. Here is the exact sequence when a loan repayment is due:

1
Cooperative initiates bulk payment to farmers via M-Pesa Paybill
2
Safaricom fires a POST to ChaiConnect's registered Validation URL before processing the payment
3
ChaiConnect checks the database — does this farmer have a pending repayment instalment?
4
If yes: ChaiConnect returns the net amount (cooperative payment minus loan instalment)
5
Safaricom processes the adjusted amount and fires the Confirmation URL
6
Farmer's ledger updates: KSh 3,200 received → KSh 800 loan repayment → KSh 2,400 net to M-Pesa
Why This Works

ChaiConnect does not ask farmers to change their behaviour. It does not require a bank account, a smartphone, or any new payment method. It builds transparency and financing on top of the M-Pesa infrastructure that 680,000 tea farmers are already using every payday.

The repayment mechanism is not a new collection process — it is a deduction from a payment the farmer is already receiving, made visible rather than hidden. The credit score is not invented data — it is the transaction history that already exists, finally being used in the farmer's favour.

The problem is real, live, and politically urgent. The infrastructure is already in place. The only thing that was missing was the platform to connect them.

M-Pesa B2C API
C2B Validation
Transaction Status API
Daraja 3.0
USSD fallback
React + Node.js
Firebase
680,000 farmers

## Live demo 

- **Live web app:** https://chaiconnects.vercel.app/.
- **Drive / assets :** https://drive.google.com/drive/folders/1-6lkr_GvSyRf2VtywiHGLc29TTeVJ0Ca?usp=drive_link.


---

## Screenshots


<img width="1361" height="631" alt="image" src="https://github.com/user-attachments/assets/583342f3-1195-42eb-8fd6-f07cb1ba14c7" />

<img width="1349" height="631" alt="image" src="https://github.com/user-attachments/assets/fb98bea0-3339-4ef9-b595-9df2a8cc71e8" />

<img width="1351" height="633" alt="image" src="https://github.com/user-attachments/assets/ac2c6086-6776-43aa-bb41-10fa723bb1e1" />

<img width="527" height="618" alt="image" src="https://github.com/user-attachments/assets/6eda5e58-a8af-48fd-a8ac-90b88daf5cc9" />

<img width="1364" height="631" alt="image" src="https://github.com/user-attachments/assets/a27895a5-6c88-41a8-912d-6dc96aaa2225" />

<img width="372" height="239" alt="image" src="https://github.com/user-attachments/assets/787e6cbd-bdd5-494c-8120-7ee46ebd25f8" />


---

## Test accounts (multi-role)

On the **Login** page, choose a role tab and submit (simulated auth).

- **Admin:** email + any password → staff app `/app`
- **Clerk:** employee ID + 4-digit PIN → `/app`
- **Officer:** staff ID + password → `/app`
- **Farmer:** M-Pesa phone e.g. `0712345678` + any OTP → `/portal`

---

## About

ChaiConnect supports **admins, clerks, extension officers, and farmers** with coherent navigation: staff use the forest sidebar shell with global search and FlowCredit section; farmers use bottom tabs, gold emphasis for credit, and optional USSD simulation. The stack prioritises readable TypeScript/React on the client and Express routes on the server.

---

## Technologies and tools

- React 19, TypeScript, Vite, React Router, Recharts
- Node.js, Express, Sequelize, PostgreSQL, Helmet, CORS, Morgan
- Safaricom Daraja OAuth stub; sandbox B2C simulation via API
- ESLint, npm
- **AI tools:** Cursor (and similar) used for assistance; team reviewed all changes.

---

## Collaborators (transparency — 5 members)

1. **Blessings Wanjiku** — Frontend Developer, Business Analyst, Team Lead  
2. **Ravine Riang'a** — Full Stack / Mobile DevOps  
3. **Francis Musau** — Backend Developer  
4. **Faruoq Muhammed** — MERN Developer  
5. **Peter Kariuki** — ML Developer  

---

## Setup and run

### Prerequisites

Node.js 18+, npm, PostgreSQL.

### Backend

```bash
cd chai_connect_backend
cp .env.example .env
# Edit .env: DB_NAME, DB_USER, DB_PASS, DB_HOST, PORT, MPESA_* as needed
npm install
npm start
```

API base: `http://localhost:5000` — health `GET /health`, data `GET /api/...`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Proxy sends `/api` to port 5000.

### Production build

```bash
cd frontend
npm run build
```

Serve `frontend/dist` via your host; configure the API base URL or reverse-proxy `/api` to the backend.

---

## Documentation

- **FEATURES.md** — detailed feature list and behaviour  
- **chai_connect_backend/.env.example** — environment variables  

## APIs and integrations

See `chai_connect_backend/src/routes/api.js` for `GET /api/farmers`, `/api/stats`, `/api/payments/recent`, `POST /api/mpesa/simulate-b2c`, and more. Live Daraja calls use `GET /test-mpesa-token` when sandbox keys are set in `.env`.
</think>


<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace
