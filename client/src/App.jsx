import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilters from "./components/ExpenseFilters";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CategoryChart from "./components/CategoryChart";
import BudgetSettings from "./components/BudgetSettings";
import BudgetStatus from "./components/BudgetStatus";
import useCategoryBudgets from "./hooks/useCategoryBudgets";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { budgets, setBudgets } = useCategoryBudgets();

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

  const handleDeleteExpense = async (expenseId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`);
      fetchExpenses();
    } catch {
      setError("Could not delete expense. Please try again.");
    }
  };

  const handleExpenseSaved = () => {
    setEditingExpense(null);
    fetchExpenses();
  };

  const handleUpdateExpense = async (expenseId, expenseData) => {
    await axios.put(
      `http://localhost:5000/api/expenses/${expenseId}`,
      expenseData
    );

    handleExpenseSaved();
  };

  const visibleExpenses = expenses.filter((expense) => {
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    if (filters.startDate && expense.date < filters.startDate) {
      return false;
    }

    if (filters.endDate && expense.date > filters.endDate) {
      return false;
    }

    return true;
  });

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
            Add expenses by amount, category, date, and note.
          </p>
        </header>

        <SummaryPanel expenses={expenses} />

        <BudgetStatus budgets={budgets} expenses={expenses} />

        <CategoryChart expenses={expenses} />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="flex flex-col gap-6">
            <ExpenseForm
              editingExpense={editingExpense}
              onCancelEdit={() => setEditingExpense(null)}
              onExpenseAdded={handleExpenseSaved}
              onExpenseUpdated={handleUpdateExpense}
            />

            <BudgetSettings budgets={budgets} onBudgetsChange={setBudgets} />
          </div>

          <div className="flex flex-col gap-6">
            <ExpenseFilters filters={filters} onFiltersChange={setFilters} />
            <ExpenseList
              onEditExpense={setEditingExpense}
              onDeleteExpense={handleDeleteExpense}
              error={error}
              expenses={visibleExpenses}
              hasFilters={Boolean(
                filters.category || filters.startDate || filters.endDate
              )}
              isLoading={isLoading}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
