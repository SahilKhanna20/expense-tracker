import { useEffect, useState } from "react";

const categories = ["Food", "Transport", "Bills", "Entertainment", "Other"];

function BudgetSettings({ budgets, onBudgetsChange }) {
  const [draftBudgets, setDraftBudgets] = useState({});

  useEffect(() => {
    const nextDraft = categories.reduce((draft, category) => {
      draft[category] = budgets[category] ? String(budgets[category]) : "";
      return draft;
    }, {});

    setDraftBudgets(nextDraft);
  }, [budgets]);

  const updateDraft = (category, value) => {
    setDraftBudgets((current) => ({
      ...current,
      [category]: value,
    }));
  };

  const handleSave = () => {
    const nextBudgets = {};

    categories.forEach((category) => {
      const value = Number(draftBudgets[category]);

      if (draftBudgets[category] && value > 0) {
        nextBudgets[category] = value;
      }
    });

    onBudgetsChange(nextBudgets);
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Category budgets</h2>
      <p className="mt-1 text-sm text-slate-600">
        Set a monthly spending limit per category.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        {categories.map((category) => (
          <label
            className="flex flex-col gap-1 text-sm font-medium text-slate-700"
            key={category}
          >
            {category}
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              min="0"
              placeholder="No budget"
              step="0.01"
              type="number"
              value={draftBudgets[category] || ""}
              onChange={(e) => updateDraft(category, e.target.value)}
            />
          </label>
        ))}

        <button
          className="rounded-md bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-800"
          onClick={handleSave}
          type="button"
        >
          Save budgets
        </button>
      </div>
    </section>
  );
}

export default BudgetSettings;
