import type { TransactionTable } from "../types/transactionTable";

export function filterTransactionByDate(
  data: TransactionTable[],
  selectedDate?: Date
) {
  if (!selectedDate || !Array.isArray(data)) return data;

  const targetYear = selectedDate.getFullYear();
  const targetMonth = selectedDate.getMonth();
  const targetDay = selectedDate.getDate();

  return data.filter((item) => {
    if (!item.orderDate) return true;

    const parsedDate = new Date(item.orderDate);
    if (isNaN(parsedDate.getTime())) return true;

    return (
      parsedDate.getFullYear() === targetYear &&
      parsedDate.getMonth() === targetMonth &&
      parsedDate.getDate() === targetDay
    );
  });
}