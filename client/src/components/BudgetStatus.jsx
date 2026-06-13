import { currencyFormatter } from "./SummaryPanel";

function getThisMonthTotalsByCategory(expenses) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenses.reduce((totals, expense) => {
    const expenseDate = new Date(expense.date);

    if (
      expenseDate.getMonth() !== currentMonth ||
      expenseDate.getFullYear() !== currentYear
    ) {
      return totals;
    }

    totals[expense.category] =
      (totals[expense.category] || 0) + Number(expense.amount);

    return totals;
  }, {});
}

const getProgressBarColor = (spent, budget) => {
  const usagePercent = (spent / budget) * 100;

  if (usagePercent >= 90) {
    return "bg-[#DC2626]";
  }

  if (usagePercent >= 75) {
    return "bg-[#F59E0B]";
  }

  return "bg-[#2563EB]";
};

function BudgetStatus({ expenses, budgets }) {
  const categoriesWithBudgets = Object.entries(budgets).filter(
    ([, budget]) => budget > 0
  );

  if (categoriesWithBudgets.length === 0) {
    return null;
  }

  const spentThisMonthByCategory = getThisMonthTotalsByCategory(expenses);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-700">
        Budget status
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Monthly spending compared to your category budgets.
      </p>

      <ul className="mt-5 space-y-4">
        {categoriesWithBudgets.map(([category, budget]) => {
          const spent = spentThisMonthByCategory[category] || 0;
          const isOverBudget = spent > budget;
          const usagePercent = Math.min((spent / budget) * 100, 100);

          return (
            <li key={category}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-gray-800">{category}</span>
                <span
                  className={`tabular-nums ${
                    isOverBudget
                      ? "font-medium text-danger"
                      : "text-gray-700"
                  }`}
                >
                  {currencyFormatter.format(spent)} /{" "}
                  {currencyFormatter.format(budget)}
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(spent, budget)}`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>

              {isOverBudget && (
                <p className="mt-2 text-sm font-medium text-danger">
                  Over budget by {currencyFormatter.format(spent - budget)}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BudgetStatus;
