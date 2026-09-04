export interface Ticket {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: "Regular/Satuan" | "Paket Hemat";
}
