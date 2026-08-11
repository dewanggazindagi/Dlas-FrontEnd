import { transactionTableData } from "./../../services/data/transactionTableData";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminTransactionSummaryCard from "../../components/cards/AdminTransactionSummaryCard";

export default function AdminTicket() {
  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminTransactionSummaryCard data={transactionTableData} />
      </div>
    </AdminLayout>
  );
}
