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
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="relative rounded-xl border border-gray-200 bg-white p-5">
        <div
          aria-hidden="true"
          className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-blue-100"
        />
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Spent this month
        </p>
        <p className="mt-2 text-[28px] font-semibold tabular-nums text-primary">
          {currencyFormatter.format(totalThisMonth)}
        </p>
      </div>

      <div className="relative rounded-xl border border-gray-200 bg-white p-5">
        <div
          aria-hidden="true"
          className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-amber-100"
        />
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Highest single expense
        </p>
        <p className="mt-2 text-[28px] font-semibold tabular-nums text-primary">
          {highestExpense
            ? currencyFormatter.format(Number(highestExpense.amount))
            : currencyFormatter.format(0)}
        </p>
        {highestExpense && (
          <p className="mt-1 text-sm text-gray-600">
            {highestExpense.category} on {highestExpense.date}
          </p>
        )}
      </div>

      <div className="relative rounded-xl border border-gray-200 bg-white p-5">
        <div
          aria-hidden="true"
          className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-green-100"
        />
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          By category
        </p>

        {Object.keys(totalsByCategory).length === 0 ? (
          <p className="mt-2 text-sm text-gray-600">No spending yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {Object.entries(totalsByCategory).map(([category, total]) => (
              <li
                className="flex items-center justify-between gap-3 text-sm"
                key={category}
              >
                <span className="text-gray-600">{category}</span>
                <span className="font-medium tabular-nums text-primary">
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
