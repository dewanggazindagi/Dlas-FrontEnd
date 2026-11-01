import { useState, useEffect } from "react";
<<<<<<< HEAD
import type {
  DashboardSummary,
  ChartData,
  TopTicket,
} from "../../types/dashboard";
=======
import type { DashboardSummary, ChartData, TopTicket } from "../../types/dashboard";
>>>>>>> arthur/main
import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminAnalisysCard from "../../components/cards/Admin/AdminAnalisysCard";
import AdminChartCard from "../../components/cards/Admin/AdminChartCard";
import AdminTable from "../../components/tables/AdminTable";
<<<<<<< HEAD
import { dashboardApi } from "../../services/api/dashboardApi";
=======
import { dashboardApi } from "../../services/api/dashboardApi"; 
>>>>>>> arthur/main

export default function Dashboard() {
  const [period, setPeriod] = useState("year");

  const [summaryData, setSummaryData] = useState<DashboardSummary | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [tableData, setTableData] = useState<TopTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const summaryResponse = await dashboardApi.getSummary();
        setSummaryData(summaryResponse);

        const tableResponse = await dashboardApi.getTopTickets();
        setTableData(tableResponse);

        if (period === "year") {
          const yearlyResponse = await dashboardApi.getYearlyChart();
          setChartData(yearlyResponse);
        } else {
          const monthlyResponse = await dashboardApi.getMonthlyChart();
          setChartData(monthlyResponse);
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
<<<<<<< HEAD
        {isLoading && (
          <div className="text-center text-gray-500">
            Memuat data analitik...
          </div>
        )}
=======
        {isLoading && <div className="text-center text-gray-500">Memuat data analitik...</div>}
>>>>>>> arthur/main

        {!isLoading && (
          <>
            <AdminAnalisysCard
              period={period}
              setPeriod={setPeriod}
<<<<<<< HEAD
              data={summaryData}
            />

            <AdminChartCard data={chartData} topTickets={tableData} />

            <AdminTable data={tableData} />
          </>
        )}
=======
              data={summaryData} 
            />

            <AdminChartCard 
              data={chartData} 
              topTickets={tableData}
            />

            <AdminTable 
              data={tableData} 
            />
          </>
        )}

>>>>>>> arthur/main
      </div>
    </AdminLayout>
  );
}