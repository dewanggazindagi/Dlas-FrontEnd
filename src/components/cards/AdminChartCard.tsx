import BarChart from "../../components/charts/BarChart";
import { dashboardData } from "../../services/data/dashboardData";
import { topTicketData } from "../../services/data/topTicketData";

export default function AdminChartCard() {
  return (
    <div>
      <h6 className="text-dark-gray text-md font-medium mb-2">
        Tiket Terjual 1 tahun
      </h6>
      <div className="gap-7 grid">
        <BarChart
          title="32.901 Tiket"
          data={dashboardData}
          xKey="month"
          yKey="value"
        />
        <BarChart
          title="Tiket Penjualan Terbanyak"
          data={topTicketData}
          xKey="ticket"
          yKey="value"
          color="#FCB212"
        />
      </div>
    </div>
  );
}
