import { UserRound, Users } from "lucide-react";
import StatCard from "../ui/StatCard";
import { formatter } from "../../utils/formatter";
import { type UserTable } from "../../types/userTable";

interface Props {
  data: UserTable[];
  loading: boolean;
}

export default function AdminUserCard({ data, loading }: Props) {
  const totalLoket = data.filter((item) => item.role === "Loket").length;

  const totalPengunjung = data.filter(
    (item) => item.role === "Pengunjung",
  ).length;

  return (
    <div>
      <div>
        <h6 className="text-2xl font-semibold">Daftar Pengguna</h6>

        <p className="mt-1.5 text-md text-dark-gray">
          Lihat semua data pengguna yang ada
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <StatCard
          icon={<UserRound size={24} color="#238302" />}
          title="Pengguna Loket"
          value={loading ? "-" : formatter.number(totalLoket)}
        />

        <StatCard
          icon={<Users size={24} color="#238302" />}
          title="Pengunjung"
          value={loading ? "-" : formatter.number(totalPengunjung)}
        />
      </div>
    </div>
  );
}
