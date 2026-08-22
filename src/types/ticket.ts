export interface Ticket {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Regular/Satuan" | "Paket Hemat";
}
