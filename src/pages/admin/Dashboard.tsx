import AdminLayout from "../../components/layout/Admin/AdminLayout";

import BarChart from "../../components/charts/BarChart";
import { dashboardData } from "../../services/data/dashboardData";
import { topTicketData } from "../../services/data/topTicketData";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-rows p-10 gap-6">
        <BarChart
          title="Statistik Transaksi"
          data={dashboardData}
          xKey="month"
          yKey="value"
        />
        <BarChart
          title="Penjualan Terbanyak"
          data={topTicketData}
          xKey="ticket"
          yKey="value"
          color="#FCB212"
        />
      </div>
    </AdminLayout>
  );
}
