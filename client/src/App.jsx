import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpressForm";
import ExpenseList from "./components/ExpressList";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(response.data);
    } catch {
      setError("Could not load expenses. Please check that the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
          <ExpenseForm onExpenseAdded={fetchExpenses} />
          <ExpenseList
            error={error}
            expenses={expenses}
            isLoading={isLoading}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
