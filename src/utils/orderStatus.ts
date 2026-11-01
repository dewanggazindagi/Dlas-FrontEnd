import type { Order, OrderStatus } from "../types/order";

export function getOrderStatus(order: Order): OrderStatus {
  if (order.paymentStatus === "cancelled") return "batal";
  if (order.paymentStatus === "pending") return "menunggu";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const visitDate = new Date(order.visitDate);
  visitDate.setHours(0, 0, 0, 0);

  return visitDate < today ? "terlewat" : "aktif";
}

export const orderStatusLabel: Record<OrderStatus, string> = {
  aktif: "Siap Digunakan",
  menunggu: "Menunggu Pembayaran",
  terlewat: "Sudah Terlewat",
  batal: "Dibatalkan",
};

export const orderStatusColorClass: Record<OrderStatus, string> = {
  aktif: "text-yellow",
  menunggu: "text-dark-gray",
  terlewat: "text-dark-gray",
  batal: "text-danger",
};
