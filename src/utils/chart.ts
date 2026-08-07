import type { Transaction } from "../types/transaction";

export function transactionToBarChart(
  data: Transaction[]
) {
  return data.map((item) => ({
    month: item.ticket,
    value: item.total,
  }));
}

export function transactionToTopTicket(
  data: Transaction[]
) {
  return [...data]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5)
    .map((item) => ({
      ticket: item.ticket,
      value: item.sold,
    }));
}