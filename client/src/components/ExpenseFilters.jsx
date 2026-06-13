import { getCurrentMonth } from "../utils/monthUtils";

const categories = ["Food", "Transport", "Bills", "Entertainment", "Other"];

const fieldClassName =
  "h-9 rounded-lg border border-gray-200 px-3 text-sm text-primary outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500";

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
      month: getCurrentMonth(),
    });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-700">
          Filters
        </h2>

        <button
          className="text-sm text-gray-500 underline"
          onClick={clearFilters}
          type="button"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">Category</span>
          <select
            className={`${fieldClassName} w-full`}
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

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">From</span>
          <input
            className={`${fieldClassName} w-full`}
            type="date"
            value={filters.startDate}
            onChange={(e) => updateFilter("startDate", e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-1 block">To</span>
          <input
            className={`${fieldClassName} w-full`}
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
