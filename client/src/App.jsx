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
import exportExpensesToCsv from "./utils/exportExpensesCsv";

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
    <div className="min-h-screen bg-page text-primary">
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
        <span className="text-lg font-semibold text-primary">Expense Tracker</span>
        <button
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-sm disabled:cursor-not-allowed disabled:text-gray-400"
          disabled={visibleExpenses.length === 0}
          onClick={() => exportExpensesToCsv(visibleExpenses)}
          type="button"
        >
          Export CSV
        </button>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
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
            <SummaryPanel expenses={expenses} />
            <BudgetStatus budgets={budgets} expenses={expenses} />
            <CategoryChart expenses={expenses} />
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
        </div>
      </main>
    </div>
  );
}

export default App;
