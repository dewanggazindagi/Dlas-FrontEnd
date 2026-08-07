export type TransactionStatus =
  | "Menunggu"
  | "Dibayar"
  | "Dibatalkan";

export type PaymentMethod =
  | "Tunai"
  | "QRIS"
  | "GoPay"
  | "Transfer"
  | "-";

export interface TransactionTable {
  id: string;

  ticket: string;

  customer: string;

  quantity: number;

  paymentMethod: PaymentMethod;

  status: TransactionStatus;

  totalPayment: number;

  visitDate: string;

  orderDate: string;
}