import ExpenseForm from "./components/ExpressForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <main className="mx-auto flex max-w-5xl flex-col gap-8">
        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            Mini Expense Tracker
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Track daily spending
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Add expenses by amount, category, date, and note. Summary and
            filtering will be added in upcoming stages.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          <ExpenseForm />

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Expenses
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Expense records will appear here after the frontend is connected
              to the backend API.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
