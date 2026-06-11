import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { currencyFormatter } from "./SummaryPanel";

const CATEGORY_COLORS = {
  Food: "#0f766e",
  Transport: "#0369a1",
  Bills: "#b45309",
  Entertainment: "#7c3aed",
  Other: "#475569",
};

function CategoryChart({ expenses }) {
  const chartData = Object.entries(
    expenses.reduce((totals, expense) => {
      const category = expense.category;
      totals[category] = (totals[category] || 0) + Number(expense.amount);
      return totals;
    }, {})
  )
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  const totalSpending = chartData.reduce((sum, entry) => sum + entry.total, 0);

  const formatShareTooltip = (value, name) => {
    const percent =
      totalSpending > 0
        ? ((value / totalSpending) * 100).toFixed(1)
        : "0.0";

    return [`${currencyFormatter.format(value)} (${percent}%)`, name];
  };

  if (chartData.length === 0) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Spending by category
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add expenses to see a category breakdown chart.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">
        Spending by category
      </h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-slate-600">
            Amount by category
          </h3>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "#475569", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#475569", fontSize: 12 }}
                  tickFormatter={(value) => currencyFormatter.format(value)}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  formatter={(value) => currencyFormatter.format(value)}
                  contentStyle={{
                    borderRadius: "0.375rem",
                    borderColor: "#e2e8f0",
                  }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={CATEGORY_COLORS[entry.category] || "#64748b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-600">
            Share of total spending
          </h3>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={chartData}
                  dataKey="total"
                  innerRadius={50}
                  nameKey="category"
                  outerRadius={90}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={CATEGORY_COLORS[entry.category] || "#64748b"}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={formatShareTooltip} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryChart;
