import { transactionTableData } from "./../../services/data/transactionTableData";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminTransactionSummaryCard from "../../components/cards/Admin/AdminTransactionSummaryCard";

export default function AdminContent() {
  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminTransactionSummaryCard data={transactionTableData} />
      </div>
    </AdminLayout>
  );
}
