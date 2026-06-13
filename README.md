# Expense Tracker

A full-stack personal finance web app . Users can log, edit, and delete daily expenses, filter by category and date range, view spending summaries and charts, set monthly category budgets, and export data as CSV. The backend exposes a REST API backed by SQLite; the frontend is a React SPA styled with Tailwind CSS.

---

## Live Demo

| | URL |
|---|---|
| **Frontend** | https://expensetracker0101.netlify.app/ |
| **Backend API** | https://expense-tracker-e5g9.onrender.com |

> **Note:** The backend runs on Render's free tier — the first request after inactivity may take ~30s (cold start). SQLite data resets on each redeploy; this is expected for a demo.

---

## Tech Stack

| Layer | Library / Tool | Why |
|---|---|---|
| Frontend framework | React 19 | Component model suits a form-heavy dashboard |
| Build tool | Vite 8 | Fast HMR, minimal config |
| Styling | Tailwind CSS 4 | Utility-first keeps component files lean |
| HTTP client | Axios | Cleaner error handling than fetch for REST calls |
| Charts | Recharts | Composable chart components built on D3 |
| Backend framework | Express 5 | Minimal, well-understood REST API setup |
| Database | better-sqlite3 | Zero-config embedded SQL; no separate DB process needed |
| Dev server | Nodemon | Auto-restarts server on file change |

---

## How to Run Locally

Assumes Node.js ≥ 20 is installed. No other tools required.

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd expense-tracker

# 2. Install and start the backend
cd server
cp .env.example .env   # uses PORT=5000 by default
npm install
npm run dev
# Server runs on http://localhost:5000

# 3. In a new terminal, install and start the frontend
cd ../client
cp .env.example .env   # sets VITE_API_URL=http://localhost:5000
npm install
npm run dev
# App opens at http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## API Documentation

Base URL: `https://expense-tracker-e5g9.onrender.com/api` (production) or `http://localhost:5000/api` (local)

All request and response bodies are JSON. Dates are strings in `YYYY-MM-DD` format.

---

### `GET /expenses`

Returns all expenses ordered by date descending.

**Response `200`**
```json
[
  {
    "id": 1718000000000,
    "amount": 450.00,
    "category": "Food",
    "date": "2025-06-13",
    "note": "Lunch",
    "createdAt": "2025-06-13T10:00:00.000Z"
  }
]
```

---

### `POST /expenses`

Creates a new expense.

**Request body**
```json
{
  "amount": 450.00,
  "category": "Food",
  "date": "2025-06-13",
  "note": "Lunch"
}
```

**Response `201`** — the created expense object.

**Response `400`**
```json
{ "error": "Amount must be greater than zero" }
```

Validation rules: `amount` > 0, `category` required, `date` required and not in the future.

---

### `PUT /expenses/:id`

Updates an existing expense.

**Request body** — same shape as `POST /expenses`.

**Response `200`** — the updated expense object.

**Response `400`** — validation error (same shape as POST).

**Response `404`**
```json
{ "error": "Expense not found" }
```

---

### `DELETE /expenses/:id`

Deletes an expense.

**Response `204`** — no body.

**Response `404`**
```json
{ "error": "Expense not found" }
```

---

## Project Structure

```
expense-tracker/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # UI components (form, list, charts, budgets)
│   │   ├── hooks/           # useCategoryBudgets — localStorage persistence
│   │   ├── utils/           # exportExpensesCsv helper
│   │   ├── App.jsx          # Root component, state, data fetching
│   │   └── index.css        # Tailwind import + CSS variables
│   └── package.json
│
└── server/                  # Express backend
    ├── src/
    │   ├── controllers/     # expenseController.js — request/response logic
    │   ├── db/
    │   │   ├── database.js  # SQLite connection + schema creation
    │   │   └── expenseRepository.js  # SQL queries (CRUD)
    │   └── routes/          # expenseRoutes.js — maps HTTP verbs to controllers
    ├── index.js             # Express app entry point
    └── package.json
```

---

## Next Steps

**Deployed on:**
- Frontend → Netlify (`netlify.toml` in `/client`)
- Backend → Render (`render.yaml` in `/server`)
- API URL driven by `VITE_API_URL` env var; see `.env.example` in each package.

**Would build next:**
- **Accessibility** — improve focus management on edit mode and add ARIA roles to chart sections.
- **Categories** — categories are currently hardcoded. A `/categories` endpoint would make them data-driven.
- **Pagination** — the expense list fetches all rows; `?limit` / `?offset` query params would be needed at scale.
- **Persistent storage on deploy** — swap SQLite for a hosted Postgres instance (e.g. Render Postgres) so data survives redeploys.
