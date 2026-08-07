import BarChart from "../../components/charts/BarChart";
import type { Transaction } from "../../types/transaction";

import {
  transactionToBarChart,
  transactionToTopTicket,
} from "../../utils/chart";

interface Props {
  data: Transaction[];
}

export default function AdminChartCard({ data }: Props) {
  const dashboardData = transactionToBarChart(data);

  const topTicketData = transactionToTopTicket(data);

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
