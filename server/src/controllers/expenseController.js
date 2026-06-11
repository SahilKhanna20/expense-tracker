const expenseRepository = require("../db/expenseRepository");

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
  const expenses = expenseRepository.getAllExpenses();

  res.json(expenses);
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

  expenseRepository.createExpense(newExpense);

  res.status(201).json(newExpense);
};

const updateExpense = (req, res) => {
  const expenseId = Number(req.params.id);
  const existingExpense = expenseRepository.getExpenseById(expenseId);

  if (!existingExpense) {
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

  const updatedExpense = expenseRepository.updateExpense(expenseId, {
    amount,
    category,
    date,
    note: note || "",
  });

  res.json(updatedExpense);
};

const deleteExpense = (req, res) => {
  const expenseId = Number(req.params.id);
  const wasDeleted = expenseRepository.deleteExpense(expenseId);

  if (!wasDeleted) {
    return res.status(404).json({
      error: "Expense not found",
    });
  }

  res.status(204).send();
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
