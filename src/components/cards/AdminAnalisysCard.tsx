import { Banknote, Coins, Download, Globe, QrCode } from "lucide-react";

import Button from "../ui/Button";
import DateFilter from "./DateFilter";
import StatCard from "../ui/StatCard";

import { formatter } from "../../utils/formatter";
import type { Transaction } from "../../types/transaction";

interface Props {
  data: Transaction[];
  period: string;
  setPeriod: (value: string) => void;
}

export default function AdminAnalisysCard({ data, period, setPeriod }: Props) {
  const periodOptions = [
    {
      label: "Hari Ini",
      value: "today",
    },
    {
      label: "Minggu Ini",
      value: "week",
    },
    {
      label: "Bulan Ini",
      value: "month",
    },
    {
      label: "1 Tahun",
      value: "year",
    },
  ];

  const totalRevenue = data.reduce((sum, item) => sum + item.total, 0);

  const totalCash = data.reduce((sum, item) => sum + item.cash, 0);

  const totalNonCash = data.reduce((sum, item) => sum + item.nonCash, 0);

  const totalOnline = data.reduce((sum, item) => sum + item.online, 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-2xl font-semibold">Dashboard Analisis</h6>

          <p className="mt-1.5 text-md font-normal text-dark-gray">
            Lihat perkembangan wisata D'Las Lembah Asri
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateFilter
            value={period}
            options={periodOptions}
            onChange={setPeriod}
          />

          <Button
            variant="outline"
            size="sm"
            className="h-11 border-border font-semibold shadow-md hover:bg-gray-100"
            startIcon={<Download size={18} />}
          >
            Download
          </Button>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <StatCard
          icon={<Banknote size={24} color="#238302" />}
          title="Pendapatan Penjualan Tiket"
          value={formatter.rupiah(totalRevenue)}
        />

        <StatCard
          icon={<Coins size={24} color="#238302" />}
          title="Penjualan Tunai"
          value={formatter.rupiah(totalCash)}
        />

        <StatCard
          icon={<QrCode size={24} color="#238302" />}
          title="Penjualan Non-Tunai"
          value={formatter.rupiah(totalNonCash)}
        />

        <StatCard
          icon={<Globe size={24} color="#238302" />}
          title="Penjualan Online"
          value={formatter.rupiah(totalOnline)}
        />
      </div>
    </div>
  );
}
