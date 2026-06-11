const categories = ["Food", "Transport", "Bills", "Entertainment", "Other"];

function ExpenseFilters({ filters, onFiltersChange }) {
  const updateFilter = (name, value) => {
    onFiltersChange({
      ...filters,
      [name]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Filters</h2>
          <p className="mt-1 text-sm text-slate-600">
            Narrow expenses by category or date range.
          </p>
        </div>

        <button
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          onClick={clearFilters}
          type="button"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Category
          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          From
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            type="date"
            value={filters.startDate}
            onChange={(e) => updateFilter("startDate", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          To
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            type="date"
            value={filters.endDate}
            onChange={(e) => updateFilter("endDate", e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}

export default ExpenseFilters;
