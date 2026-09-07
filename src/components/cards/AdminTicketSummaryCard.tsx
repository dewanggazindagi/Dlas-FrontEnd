import { Ticket, FolderOpen } from "lucide-react";

import StatCard from "../ui/StatCard";
import { formatter } from "../../utils/formatter";
import type { Ticket as TicketType } from "../../types/ticket";

interface Props {
  data: TicketType[];
  loading?: boolean;
}

/**
 * Summary card untuk menampilkan statistik tiket
 */
export default function AdminTicketSummaryCard({
  data,
  loading = false,
}: Props) {
  // Filter tiket paket dan satuan
  const totalPackage = data.filter(
    (item) => item.jenisTiket === "Paket Hemat",
  ).length;

  const totalRegular = data.filter(
    (item) => item.jenisTiket === "Regular/Satuan",
  ).length;

  const totalTickets = totalPackage + totalRegular;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Tiket Yang Tersedia</h1>

        <p className="mt-1.5 text-md text-dark-gray">
          {loading ? "Memuat data..." : `Total ${totalTickets} tiket terdaftar`}
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <StatCard
          icon={<FolderOpen size={24} color="#238302" />}
          title="Jumlah tiket paket hemat"
          value={loading ? "-" : formatter.number(totalPackage)}
        />

        <StatCard
          icon={<Ticket size={24} color="#238302" />}
          title="Jumlah tiket satuan/reguler"
          value={loading ? "-" : formatter.number(totalRegular)}
        />
      </div>
    </div>
  );
}
