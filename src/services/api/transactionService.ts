// src/services/api/transactionService.ts
import api from "./axios";
import type {
  TransactionTable,
  TransactionStatus,
  PaymentMethod,
} from "../../types/transactionTable"; // sesuaikan path

interface TransactionApiItem {
  id: string;
  idPesanan: string;
  tiketDipesan: string;
  dipesanOleh: string;
  jumlahTiket: number;
  metode: string;
  status: string;
  totalPembayaran: number;
  berliburPada: string;
  dipesanPada: string;
}

interface TransactionApiResponse {
  data: TransactionApiItem[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

const VALID_STATUSES: TransactionStatus[] = ["Menunggu", "Dibayar", "Dibatalkan"];
const VALID_PAYMENT_METHODS: PaymentMethod[] = ["Tunai", "QRIS", "GoPay", "Transfer", "-"];

function normalizeStatus(value: string): TransactionStatus {
  const match = VALID_STATUSES.find((s) => s.toLowerCase() === value.toLowerCase());
  return match ?? "Menunggu";
}

function normalizePaymentMethod(value: string): PaymentMethod {
  const match = VALID_PAYMENT_METHODS.find((m) => m.toLowerCase() === value.toLowerCase());
  return match ?? "-";
}

function mapTransactionResponse(item: TransactionApiItem): TransactionTable {
  return {
    id: item.idPesanan,
    ticket: item.tiketDipesan,
    customer: item.dipesanOleh,
    quantity: item.jumlahTiket,
    paymentMethod: normalizePaymentMethod(item.metode),
    status: normalizeStatus(item.status),
    totalPayment: item.totalPembayaran,
    visitDate: item.berliburPada,
    orderDate: item.dipesanPada,
  };
}

export async function fetchTransactions(): Promise<TransactionTable[]> {
  const response = await api.get<TransactionApiResponse>("/transactions", {
    params: { page: 1, limit: 1000 },
  });
  return response.data.data.map(mapTransactionResponse);
}