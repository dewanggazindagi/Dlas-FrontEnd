export type PaymentStatus = "paid" | "pending" | "cancelled";
export type OrderStatus = "aktif" | "menunggu" | "terlewat" | "batal";
export type OrderType = "satuan" | "paket";

export interface Order {
  id: string;
  type: OrderType;
  ticketId: string;
  quantity: number;
  visitDate: string;
  orderedAt: string;
  paymentStatus: PaymentStatus;
}
