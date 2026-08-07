import { useState } from "react";
import { transactionData } from "../../services/data/transactionData";
import { filterTransactionByPeriod } from "../../utils/filterTransactionByPeriod";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminAnalisysCard from "../../components/cards/AdminAnalisysCard";
import AdminChartCard from "../../components/cards/AdminChartCard";
import AdminTable from "../../components/cards/AdminTable";


export default function Dashboard() {
  const [period, setPeriod] = useState("year");

  const filteredData = filterTransactionByPeriod(transactionData, period);

  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminAnalisysCard
          period={period}
          setPeriod={setPeriod}
          data={filteredData}
        />

        <AdminChartCard data={filteredData} />

        <AdminTable data={filteredData} />
      </div>
    </AdminLayout>
  );
}
