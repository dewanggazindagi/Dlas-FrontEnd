import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminTransactionSummaryCard from "../../components/cards/AdminTransactionSummaryCard";

export default function AdminContent() {
  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminTransactionSummaryCard data={TransactionTable} />
      </div>
    </AdminLayout>
  );
}
