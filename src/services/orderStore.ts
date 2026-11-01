import type { Order } from "../types/order";

const STORAGE_KEY = "dlas_orders";

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function seedOrders(): Order[] {
  return [
    {
      id: "09201",
      type: "satuan",
      ticketId: "dlas-zoo",
      quantity: 2,
      visitDate: daysFromNow(10),
      orderedAt: daysFromNow(-2),
      paymentStatus: "paid",
    },
    {
      id: "09202",
      type: "paket",
      ticketId: "paket-hemat-a",
      quantity: 3,
      visitDate: daysFromNow(15),
      orderedAt: daysFromNow(-1),
      paymentStatus: "paid",
    },
    {
      id: "09203",
      type: "satuan",
      ticketId: "dino-land",
      quantity: 1,
      visitDate: daysFromNow(20),
      orderedAt: daysFromNow(0),
      paymentStatus: "pending",
    },
    {
      id: "09204",
      type: "paket",
      ticketId: "paket-hemat-b",
      quantity: 4,
      visitDate: daysFromNow(25),
      orderedAt: daysFromNow(0),
      paymentStatus: "pending",
    },
    {
      id: "09205",
      type: "satuan",
      ticketId: "taman-salju",
      quantity: 2,
      visitDate: daysFromNow(-30),
      orderedAt: daysFromNow(-35),
      paymentStatus: "paid",
    },
    {
      id: "09206",
      type: "paket",
      ticketId: "paket-hemat-c",
      quantity: 2,
      visitDate: daysFromNow(-15),
      orderedAt: daysFromNow(-20),
      paymentStatus: "paid",
    },
    {
      id: "09207",
      type: "satuan",
      ticketId: "kolam-renang",
      quantity: 3,
      visitDate: daysFromNow(-5),
      orderedAt: daysFromNow(-10),
      paymentStatus: "cancelled",
    },
    {
      id: "09208",
      type: "paket",
      ticketId: "paket-hemat-d",
      quantity: 2,
      visitDate: daysFromNow(12),
      orderedAt: daysFromNow(-8),
      paymentStatus: "cancelled",
    },
  ];
}

function readOrders(): Order[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    const seeded = seedOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function writeOrders(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export const orderStore = {
  getAll(): Order[] {
    return readOrders();
  },

  getById(id: string): Order | undefined {
    return readOrders().find((order) => order.id === id);
  },

  add(order: Order): void {
    const orders = readOrders();
    orders.unshift(order);
    writeOrders(orders);
  },

  generateId(): string {
    return String(Math.floor(10000 + Math.random() * 89999));
  },
};
