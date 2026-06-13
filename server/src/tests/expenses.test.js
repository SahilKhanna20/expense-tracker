const request = require("supertest");
const Database = require("better-sqlite3");
const app = require("../../src/app");

// Point the db module at an in-memory database for tests
jest.mock("../db/database", () => {
  const Database = require("better-sqlite3");
  const db = new Database(":memory:");

  db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      note TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);

  return db;
});

describe("POST /api/expenses", () => {
  it("creates an expense and returns 201 with the new record", async () => {
    const res = await request(app).post("/api/expenses").send({
      amount: 250,
      category: "Food",
      date: "2025-01-15",
      note: "Lunch",
    });

    expect(res.status).toBe(201);
    expect(res.body.amount).toBe(250);
    expect(res.body.category).toBe("Food");
    expect(res.body.date).toBe("2025-01-15");
    expect(res.body.id).toBeDefined();
  });

  it("returns 400 when amount is missing", async () => {
    const res = await request(app).post("/api/expenses").send({
      category: "Food",
      date: "2025-01-15",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Amount must be greater than zero");
  });

  it("returns 400 when category is missing", async () => {
    const res = await request(app).post("/api/expenses").send({
      amount: 100,
      date: "2025-01-15",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Category is required");
  });

  it("returns 400 for a future date", async () => {
    const res = await request(app).post("/api/expenses").send({
      amount: 100,
      category: "Transport",
      date: "2099-12-31",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Future dates are not allowed");
  });
});

describe("DELETE /api/expenses/:id", () => {
  it("returns 404 when expense does not exist", async () => {
    const res = await request(app).delete("/api/expenses/999999");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Expense not found");
  });
});