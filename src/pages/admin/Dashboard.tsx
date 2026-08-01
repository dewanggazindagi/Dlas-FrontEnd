import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminAnalisysCard from "../../components/cards/AdminAnalisysCard";
import AdminChartCard from "../../components/cards/AdminChartCard";
import AdminTable from "../../components/cards/AdminTable";
import { transactionData } from "../../services/data/transactionData";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-rows p-10 gap-7">
        <AdminAnalisysCard />
        <AdminChartCard />
        <AdminTable data={transactionData} />
      </div>
    </AdminLayout>
  );
}
