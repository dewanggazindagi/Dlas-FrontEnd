import type { TransactionTable } from "../types/transactionTable";

export function filterTransactionByDate(
  data: TransactionTable[],
  selectedDate?: Date
) {
  if (!selectedDate) return data;

  return data.filter((item) => {
    const orderDate = new Date(item.orderDate);

    return (
      orderDate.getFullYear() === selectedDate.getFullYear() &&
      orderDate.getMonth() === selectedDate.getMonth() &&
      orderDate.getDate() === selectedDate.getDate()
    );
  });
}