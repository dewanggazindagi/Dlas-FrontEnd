import { useEffect, useState } from "react";
import axios from "axios";
import PosLayout from "../../components/layout/Pos/PosLayout";
import AdminTransactionSummaryCard from "../../components/cards/AdminTransactionSummaryCard";
import AdminTransactionTable from "../../components/tables/AdminTransactionTable";
import type { TransactionTable } from "../../types/transactionTable";

export default function PosTransactionList() {
  const [transactions, setTransactions] = useState<TransactionTable[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let rawToken =
        localStorage.getItem("accessToken") || localStorage.getItem("token");

      if (rawToken) {
        rawToken = rawToken.replace(/^"(.*)"$/, "$1").trim();
      }

      const authHeaderValue = rawToken
        ? rawToken.startsWith("Bearer ")
          ? rawToken
          : `Bearer ${rawToken}`
        : "";

      const response = await axios.get("/api/v1/transactions", {
        headers: { Authorization: authHeaderValue },
      });

      const resData = response.data;
      let rawList: any[] = [];

      if (Array.isArray(resData)) {
        rawList = resData;
      } else if (Array.isArray(resData?.data)) {
        rawList = resData.data;
      } else if (Array.isArray(resData?.data?.transactions)) {
        rawList = resData.data.transactions;
      } else if (Array.isArray(resData?.transactions)) {
        rawList = resData.transactions;
      }

      const mappedData: TransactionTable[] = rawList.map((item: any, index: number) => {
        const rawTicketName =
          item.tiketDipesan ||
          item.ticketTitle ||
          item.ticketName ||
          item.title ||
          item.namaTiket ||
          "Tiket Masuk D'las";

        const rawCustomer =
          item.dipesanOleh ||
          item.namaPetugas ||
          item.customerName ||
          item.petugas ||
          item.kasir ||
          "Loket A";

        const rawQty =
          item.jumlahTiket ||
          item.jumlah ||
          item.quantity ||
          item.totalQty ||
          1;

        const rawMethod =
          item.metode ||
          item.metodePembayaran ||
          item.paymentMethod ||
          item.paymentType ||
          "Tunai";

        let formattedStatus: "Dibayar" | "Menunggu" | "Dibatalkan" = "Dibayar";
        const st = String(item.status || "").toUpperCase();

        if (
          st === "PENDING" ||
          st === "MENUNGGU" ||
          st === "UNPAID" ||
          st === "WAITING"
        ) {
          formattedStatus = "Menunggu";
        } else if (
          st === "CANCELLED" ||
          st === "DIBATALKAN" ||
          st === "FAILED" ||
          st === "EXPIRED"
        ) {
          formattedStatus = "Dibatalkan";
        }

        const rawTotal =
          item.totalPembayaran ||
          item.totalHarga ||
          item.totalPayment ||
          item.total_price ||
          item.grandTotal ||
          0;

        const rawVisitDate =
          item.berliburPada ||
          item.tanggalBerkunjung ||
          item.visitDate ||
          item.createdAt ||
          new Date().toISOString();

        const rawOrderDate =
          item.dipesanPada ||
          item.createdAt ||
          item.tanggalTransaksi ||
          item.orderDate ||
          new Date().toISOString();

        const rawId =
          item.idPesanan ||
          item.id ||
          item.kodeTransaksi ||
          item.idTransaksi ||
          `TRX-${index}`;

        const finalId = String(rawId).startsWith("#")
          ? String(rawId)
          : `#${rawId}`;

        return {
          id: `${finalId}-${index}`,
          ticket: rawTicketName,
          customer: rawCustomer,
          quantity: Number(rawQty),
          paymentMethod: rawMethod as any,
          status: formattedStatus,
          totalPayment: Number(rawTotal),
          visitDate: String(rawVisitDate),
          orderDate: String(rawOrderDate),
        };
      });

      setTransactions(mappedData);
    } catch (err) {
      console.error("Gagal mengambil data transaksi dari API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <PosLayout>
      <div className="grid gap-7 p-10 pt-28">
        <AdminTransactionSummaryCard data={transactions} />
        {loading ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            Memuat data transaksi...
          </div>
        ) : (
          <AdminTransactionTable data={transactions} />
        )}
      </div>
    </PosLayout>
  );
}