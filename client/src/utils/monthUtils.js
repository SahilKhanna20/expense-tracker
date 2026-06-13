const getCurrentMonth = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${now.getFullYear()}-${month}`;
};

const formatMonthLabel = (monthValue) => {
  const [year, month] = monthValue.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

const isExpenseInMonth = (expense, monthValue) => {
  if (!monthValue) {
    return true;
  }

  return expense.date.startsWith(monthValue);
};

export { formatMonthLabel, getCurrentMonth, isExpenseInMonth };
