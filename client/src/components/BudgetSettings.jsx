import { useEffect, useState } from "react";

const categories = ["Food", "Transport", "Bills", "Entertainment", "Other"];

const inputClassName =
  "h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-primary outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500";

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
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-700">
        Category budgets
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Set a monthly spending limit per category.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        {categories.map((category) => (
          <label
            className="block text-sm font-medium text-gray-700"
            key={category}
          >
            <span className="mb-1 block">{category}</span>
            <input
              className={inputClassName}
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
          className="h-10 w-full rounded-lg bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
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
