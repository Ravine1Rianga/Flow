# ChaiConnect + FlowCredit

**ChaiConnect** is a full-stack platform for Kenyan tea cooperatives: **Operations** (deliveries, quality, payments, communications) and **FlowCredit** (M-Pesa-aware credit, loans, disbursements). A **Farmer Portal** mirrors the same design language with a mobile-first layout.

**Public repository:** Ensure this GitHub repo is set to **Public** for judges and collaborators.

---

## Problem and solution

**Problem:** Cooperatives and farmers lack a single transparent system for factory intake, payment visibility, and responsible credit linked to M-Pesa behaviour.

**Solution:** One app with role-based dashboards, bilingual (English / Kiswahili) entry, sandbox M-Pesa JSON surfaces for demos, and REST APIs plus seed data so teams can extend Daraja without rebuilding the UI.

---

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
