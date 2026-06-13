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
        <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
      )}

      {!error && expenses.length === 0 && (
        <p className="mt-2 text-sm text-gray-600">
          {hasFilters
            ? "No expenses match the selected filters."
            : "No expenses added yet. Use the form to log your first expense."}
        </p>
      )}

      {!error && expenses.length > 0 && (
        <div className="mt-5">
          <div className="mb-2 text-xs text-gray-500 md:hidden">
            ← Swipe to view more →
          </div>

          <div className="max-w-full overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-[950px] border-collapse text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    Date
                  </th>

                  <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    Category
                  </th>

                  <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    Amount
                  </th>

                  <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500">
                    Note
                  </th>

                  <th className="px-4 py-3 text-xs font-normal uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {expense.date}
                    </td>

                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {expense.category}
                    </td>

                    <td className="px-4 py-3 font-medium tabular-nums text-gray-900 whitespace-nowrap">
                      {currencyFormatter.format(Number(expense.amount))}
                    </td>

                    <td className="w-[250px] px-4 py-3 text-gray-600">
                      {expense.note || "-"}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEditExpense(expense)}
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteExpense(expense.id)}
                          className="text-sm font-medium text-red-500 hover:underline"
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
        </div>
      )}
    </section>
  );
}

export default ExpenseList;