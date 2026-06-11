const expenses = require("../data/expenses");

const getExpenses = (req, res) => {
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  res.json(sortedExpenses);
};

const addExpense = (req, res) => {
  const { amount, category, date, note } = req.body;
  
  if (!amount || amount <= 0) {
  return res.status(400).json({
    error: "Amount must be greater than zero",
    });
  } 
  if (!category) {
  return res.status(400).json({
    error: "Category is required",
    });
  }  
  if (!date) {
  return res.status(400).json({
    error: "Date is required",
    });
  }
  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate > today) {
  return res.status(400).json({
    error: "Future dates are not allowed",
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

module.exports = {
  getExpenses,
  addExpense,
};
