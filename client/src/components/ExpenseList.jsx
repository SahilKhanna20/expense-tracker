import { currencyFormatter } from "./SummaryPanel";

function ExpenseList({
  expenses,
  isLoading,
  error,
  hasFilters,
  onEditExpense,
  onDeleteExpense,
}) {
  if (isLoading) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-700">
          Expenses
        </h2>
        <p className="mt-2 text-sm text-gray-600">Loading expenses...</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-700">
        Expenses
      </h2>

      {error && (
        <p className="mt-2 text-sm font-medium text-danger">{error}</p>
      )}

      {!error && expenses.length === 0 && (
        <p className="mt-2 text-sm text-gray-600">
          {hasFilters
            ? "No expenses match the selected filters."
            : "No expenses added yet. Use the form to log your first expense."}
        </p>
      )}

      {!error && expenses.length > 0 && (
        <div className="mt-5 overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500">
                  Amount
                </th>
                <th className="hidden px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500 sm:table-cell">
                  Note
                </th>
                <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-4 py-3 text-gray-600">{expense.date}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {expense.category}
                  </td>
                  <td className="px-4 py-3 font-medium tabular-nums text-gray-900">
                    {currencyFormatter.format(Number(expense.amount))}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                    {expense.note || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        className="text-sm font-medium text-blue-600 hover:underline"
                        onClick={() => onEditExpense(expense)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm font-medium text-red-500 hover:underline"
                        onClick={() => onDeleteExpense(expense.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
