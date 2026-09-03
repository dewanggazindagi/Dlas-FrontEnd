/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TicketGambar {
  id: string;
  urlGambar: string;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
  weekdayPrice: number;
  weekendPrice: number;
  description: string;
  status: string;
  isActive: boolean;
  category: "Paket Hemat" | "Regular/Satuan";
  items: string[];
  ketentuan: any[];
  gambar: TicketGambar[];
  createdAt?: string;
  updatedAt?: string;
}