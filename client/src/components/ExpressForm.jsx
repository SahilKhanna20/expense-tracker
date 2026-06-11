import { useState } from "react";
import axios from "axios";

function ExpenseForm({ onExpenseAdded }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/expenses", {
        amount: Number(amount),
        category,
        date,
        note,
      });

      setAmount("");
      setCategory("");
      setDate("");
      setNote("");
      setMessage("Expense added successfully.");
      onExpenseAdded();
    } catch (err) {
      if (!err.response) {
        setError("Backend is not reachable. Please start the server on port 5000.");
        return;
      }

      setError(err.response.data?.error || "Could not add expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold text-slate-950">Add Expense</h2>

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Amount
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Category
          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Date
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Note
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            type="text"
            placeholder="Optional note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button
          className="rounded-md bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>

        {message && (
          <p className="text-sm font-medium text-emerald-700">{message}</p>
        )}

        {error && (
          <p className="text-sm font-medium text-red-700">{error}</p>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
