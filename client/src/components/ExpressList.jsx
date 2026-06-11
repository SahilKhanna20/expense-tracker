import { currencyFormatter } from "./SummaryPanel";

function ExpenseList({
  expenses,
  isLoading,
  error,
  onEditExpense,
  onDeleteExpense,
}) {
  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Expenses</h2>
        <p className="mt-2 text-sm text-slate-600">Loading expenses...</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Expenses</h2>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-700">{error}</p>
      )}

      {!error && expenses.length === 0 && (
        <p className="mt-2 text-sm text-slate-600">
          No expenses added yet. Use the form to log your first expense.
        </p>
      )}

      {!error && expenses.length > 0 && (
        <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-4 py-3 text-slate-700">{expense.date}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {expense.category}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {currencyFormatter.format(Number(expense.amount))}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {expense.note || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="rounded-md border border-slate-300 px-3 py-1 font-medium text-slate-700 transition hover:bg-slate-50"
                        onClick={() => onEditExpense(expense)}
                        type="button"
                      >
                        Edit
                      </button>
                    <button
                      className="rounded-md border border-red-200 px-3 py-1 font-medium text-red-700 transition hover:bg-red-50"
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
