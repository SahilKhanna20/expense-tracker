const escapeCsvField = (value) => {
  const stringValue = String(value ?? "");

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const buildCsvContent = (expenses) => {
  const headers = ["Date", "Category", "Amount", "Note"];
  const rows = expenses.map((expense) => [
    expense.date,
    expense.category,
    expense.amount,
    expense.note || "",
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvField).join(","))
    .join("\n");
};

function exportExpensesToCsv(expenses) {
  const csvContent = buildCsvContent(expenses);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const today = new Date().toISOString().split("T")[0];

  link.href = downloadUrl;
  link.download = `expenses-${today}.csv`;
  link.click();

  URL.revokeObjectURL(downloadUrl);
}

export default exportExpensesToCsv;
