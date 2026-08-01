import { QrCode, Banknote, Coins, Globe } from "lucide-react";
import StatCard from "../ui/StatCard";

export default function AdminAnalisysCard() {
  return (
    <div>
      <h6 className="text-2xl font-semibold">Dashboard Analisis</h6>
      <p className="text-dark-gray text-md font-normal mt-1.5">
        Lihat perkembangan wisata D'las Lembah Asri
      </p>
      <div className="mt-7 gap-4 flex items-center justify-between">
        <StatCard
          icon={<Banknote size={24} color="#238302" />}
          title="Pendapatan Penjualan Tiket"
          value="Rp4.920.872.000"
        />
        <StatCard
          icon={<Coins size={24} color="#238302" />}
          title="Penjualan Tunai"
          value="Rp1.410.872.000"
        />
        <StatCard
          icon={<QrCode size={24} color="#238302" />}
          title="Penjualan Non-Tunai"
          value="Rp1.410.872.000"
        />
        <StatCard
          icon={<Globe size={24} color="#238302" />}
          title="Penjualan Online"
          value="Rp2.920.872.000"
        />
      </div>
    </div>
  );
}