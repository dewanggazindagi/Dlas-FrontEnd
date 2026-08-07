import { Ticket, ReceiptText } from "lucide-react";

import StatCard from "../ui/StatCard";
import { formatter } from "../../utils/formatter";
import { transactionTableData } from "../../services/data/transactionTableData";

interface Props {
  data: Array<typeof transactionTableData[number]>;
}

export default function AdminTransactionSummaryCard({ data }: Props) {
  const totalTicket = data.reduce((sum, item) => sum + item.quantity, 0);

  const totalTransaction = data.reduce(
    (sum, item) => sum + item.totalPayment,
    0,
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Data Transaksi</h1>

        <p className="mt-1.5 text-md text-dark-gray">
          Lihat aktivitas penjual tiket wisata D'las Lembah Asri
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <StatCard
          icon={<Ticket size={24} color="#238302" />}
          title="Tiket Terjual"
          value={formatter.number(totalTicket)}
        />

        <StatCard
          icon={<ReceiptText size={24} color="#238302" />}
          title="Total Transaksi"
          value={formatter.rupiah(totalTransaction)}
        />
      </div>
    </div>
  );
}
