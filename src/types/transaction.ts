export interface Transaction {
  id: string;
  ticket: string;
  category: string;

  sold: number;

  cash: number;

  nonCash: number;

  total: number;

  online: number;

  date: string;
}