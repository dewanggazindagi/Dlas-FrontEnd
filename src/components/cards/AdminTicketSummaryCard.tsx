import { Ticket, FolderOpen } from "lucide-react";

import StatCard from "../ui/StatCard";
import { formatter } from "../../utils/formatter";
import { allTicketData } from "./../../services/data/allTicketData";

interface Props {
  data: Array<(typeof allTicketData)[number]>;
}

export default function AdminTicketSummaryCard({ data }: Props) {
  const totalPackage = data.filter(
    (item) => item.category === "Paket Hemat",
  ).length;

  const totalRegular = data.filter(
    (item) => item.category === "Regular/Satuan",
  ).length;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Tiket Yang Tersedia</h1>

        <p className="mt-1.5 text-md text-dark-gray">
          Lihat semua tiket yang terdaftar
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <StatCard
          icon={<FolderOpen size={24} color="#238302" />}
          title="Jumlah tiket paket hemat"
          value={formatter.number(totalPackage)}
        />

        <StatCard
          icon={<Ticket size={24} color="#238302" />}
          title="Jumlah tiket satuan/reguler"
          value={formatter.number(totalRegular)}
        />
      </div>
    </div>
  );
}
