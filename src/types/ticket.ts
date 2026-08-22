export interface Ticket {
  id: string;
  name: string;
  category: "Paket Hemat" | "Regular/Satuan";
  price: number;
  image: string;
  isActive: boolean;
  items?: string[];
}