import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type DashboardDataPoint = { month: string; value: number };

export default function AdminDashboardCard({
  data,
}: {
  data: DashboardDataPoint[];
}) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Statistik Transaksi</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="value" maxBarSize={50} fill="#FE8507" radius={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
