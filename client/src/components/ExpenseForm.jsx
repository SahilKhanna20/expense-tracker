import { useEffect, useState } from "react";
import axios from "axios";

const getTodayDateString = () => new Date().toISOString().split("T")[0];

const validateExpenseForm = ({ amount, category, date }) => {
  const parsedAmount = Number(amount);

  if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return "Amount must be greater than zero";
  }

  if (!category) {
    return "Category is required";
  }

  if (!date) {
    return "Date is required";
  }

  const selectedDate = new Date(date);
  const today = new Date();

  if (selectedDate > today) {
    return "Future dates are not allowed";
  }

  return "";
};

const inputClassName =
  "h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-primary outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500";

function ExpenseForm({
  editingExpense,
  onCancelEdit,
  onExpenseAdded,
  onExpenseUpdated,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(editingExpense);

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  useEffect(() => {
    if (!editingExpense) {
      return;
    }

    setAmount(String(editingExpense.amount));
    setCategory(editingExpense.category);
    setDate(editingExpense.date);
    setNote(editingExpense.note);
    setMessage("");
    setError("");
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const validationError = validateExpenseForm({ amount, category, date });

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const expenseData = {
        amount: Number(amount),
        category,
        date,
        note,
      };

      if (isEditing) {
        await onExpenseUpdated(editingExpense.id, expenseData);
        setMessage("Expense updated successfully.");
      } else {
        await axios.post("http://localhost:5000/api/expenses", expenseData);
        onExpenseAdded();
        setMessage("Expense added successfully.");
      }

      resetForm();
    } catch (err) {
      if (!err.response) {
        setError("Backend is not reachable. Please start the server on port 5000.");
        return;
      }

      setError(err.response.data?.error || "Could not save expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setMessage("");
    setError("");
    onCancelEdit();
  };

  return (
    <form
      className="rounded-xl border border-gray-200 bg-white p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-base font-medium text-primary">
        {isEditing ? "Edit expense" : "Add expense"}
      </h2>

      <div className="mt-5 flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">Amount</span>
          <input
            className={inputClassName}
            min="0.01"
            placeholder="0.00"
            step="0.01"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">Category</span>
          <select
            className={inputClassName}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">Date</span>
          <input
            className={inputClassName}
            max={getTodayDateString()}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">Note</span>
          <input
            className={inputClassName}
            type="text"
            placeholder="Optional note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button
          className="h-10 w-full rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Add Expense"}
        </button>

        {isEditing && (
          <button
            className="h-10 w-full rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:shadow-sm"
            onClick={handleCancelEdit}
            type="button"
          >
            Cancel
          </button>
        )}

        {message && (
          <p className="text-sm font-medium text-success">{message}</p>
        )}

        {error && (
          <p className="text-sm font-medium text-danger">{error}</p>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
