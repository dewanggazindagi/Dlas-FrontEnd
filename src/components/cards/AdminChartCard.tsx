import BarChart from "../../components/charts/BarChart";
import type { ChartData, TopTicket } from "../../types/dashboard";
//import type { Transaction } from "../../types/transaction";

// import {
//   transactionToBarChart,
//   transactionToTopTicket,
// } from "../../utils/chart";

interface Props {
  data: ChartData[];
  topTickets: TopTicket[];
}

export default function AdminChartCard({ data, topTickets }: Props) {
  const dashboardData = data.map((item) => ({
    month: item.month || item.year || "Data", 
    value: Number(item.totalTiket || 0)
  }));

  const topTicketData = topTickets.map((item) => ({
    ticket: item.namaTiket, 
    value: item.tiketTerjual
  }));

  return (
    <div>
      <h6 className="mb-2 text-md font-medium text-dark-gray">Tiket Terjual</h6>

      <div className="grid gap-7">
        <BarChart
          title="Statistik Penjualan"
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
