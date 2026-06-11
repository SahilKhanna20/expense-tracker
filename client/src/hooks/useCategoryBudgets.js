import { useEffect, useState } from "react";

const STORAGE_KEY = "expense-tracker-category-budgets";

const loadBudgets = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

function useCategoryBudgets() {
  const [budgets, setBudgets] = useState(loadBudgets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  return { budgets, setBudgets };
}

export default useCategoryBudgets;
