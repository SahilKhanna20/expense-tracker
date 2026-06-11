const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

function SummaryPanel({ expenses }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const totalThisMonth = thisMonthExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const totalsByCategory = expenses.reduce((totals, expense) => {
    const category = expense.category;
    totals[category] = (totals[category] || 0) + Number(expense.amount);
    return totals;
  }, {});

  const highestExpense = expenses.reduce((highest, expense) => {
    if (!highest || Number(expense.amount) > Number(highest.amount)) {
      return expense;
    }

    return highest;
  }, null);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Spent this month</p>
        <p className="mt-2 text-2xl font-bold text-slate-950">
          {currencyFormatter.format(totalThisMonth)}
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-600">
          Highest single expense
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-950">
          {highestExpense
            ? currencyFormatter.format(Number(highestExpense.amount))
            : currencyFormatter.format(0)}
        </p>
        {highestExpense && (
          <p className="mt-1 text-sm text-slate-600">
            {highestExpense.category} on {highestExpense.date}
          </p>
        )}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-600">By category</p>

        {Object.keys(totalsByCategory).length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No spending yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {Object.entries(totalsByCategory).map(([category, total]) => (
              <li
                className="flex items-center justify-between gap-3 text-sm"
                key={category}
              >
                <span className="text-slate-700">{category}</span>
                <span className="font-medium text-slate-950">
                  {currencyFormatter.format(total)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export { currencyFormatter };
export default SummaryPanel;
