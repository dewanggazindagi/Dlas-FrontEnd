import { transactionTableData } from "./../../services/data/transactionTableData";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminTransactionSummaryCard from "../../components/cards/AdminTransactionSummaryCard";
import AdminTransactionTable from "../../components/tables/AdminTransactionTable";

export default function AdminTransactionList() {
  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminTransactionSummaryCard data={transactionTableData} />
        <AdminTransactionTable data={transactionTableData} />
      </div>
    </AdminLayout>
  );
}
