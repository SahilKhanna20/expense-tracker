const db = require("./database");

const getAllExpenses = () => {
  return db
    .prepare(
      `
      SELECT
        id,
        amount,
        category,
        date,
        note,
        created_at AS createdAt
      FROM expenses
      ORDER BY date DESC
    `
    )
    .all();
};

const getExpenseById = (id) => {
  return db
    .prepare(
      `
      SELECT
        id,
        amount,
        category,
        date,
        note,
        created_at AS createdAt
      FROM expenses
      WHERE id = ?
    `
    )
    .get(id);
};

const createExpense = (expense) => {
  db.prepare(
    `
    INSERT INTO expenses (id, amount, category, date, note, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  ).run(
    expense.id,
    expense.amount,
    expense.category,
    expense.date,
    expense.note,
    expense.createdAt
  );

  return expense;
};

const updateExpense = (id, expenseData) => {
  const result = db
    .prepare(
      `
      UPDATE expenses
      SET amount = ?, category = ?, date = ?, note = ?
      WHERE id = ?
    `
    )
    .run(
      expenseData.amount,
      expenseData.category,
      expenseData.date,
      expenseData.note,
      id
    );

  if (result.changes === 0) {
    return null;
  }

  return getExpenseById(id);
};

const deleteExpense = (id) => {
  const result = db.prepare("DELETE FROM expenses WHERE id = ?").run(id);

  return result.changes > 0;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
