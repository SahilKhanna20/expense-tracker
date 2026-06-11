const expenses = require("../data/expenses");

const validateExpense = ({ amount, category, date }) => {
  if (!amount || amount <= 0) {
    return "Amount must be greater than zero";
  }

  if (!category) {
    return "Category is required";
  }

  if (!date) {
    return "Date is required";
  }

  const selectedDate = new Date(date);
  const today = new Date();

  if (selectedDate > today) {
    return "Future dates are not allowed";
  }

  return "";
};

const getExpenses = (req, res) => {
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  res.json(sortedExpenses);
};

const addExpense = (req, res) => {
  const { amount, category, date, note } = req.body;

  const validationError = validateExpense({ amount, category, date });

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }
  
  const newExpense = {
    id: Date.now(),
    amount,
    category,
    date,
    note: note || "",
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
};

const updateExpense = (req, res) => {
  const expenseId = Number(req.params.id);
  const expense = expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return res.status(404).json({
      error: "Expense not found",
    });
  }

  const { amount, category, date, note } = req.body;
  const validationError = validateExpense({ amount, category, date });

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  expense.amount = amount;
  expense.category = category;
  expense.date = date;
  expense.note = note || "";

  res.json(expense);
};

const deleteExpense = (req, res) => {
  const expenseId = Number(req.params.id);
  const expenseIndex = expenses.findIndex((expense) => expense.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({
      error: "Expense not found",
    });
  }

  expenses.splice(expenseIndex, 1);

  res.status(204).send();
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
