// AdminTransactionList.tsx
import AdminLayout from "../../../components/layout/Admin/AdminLayout";
import AdminTransactionSummaryCard from "../../../components/cards/AdminTransactionSummaryCard";
import AdminTransactionTable from "../../../components/tables/AdminTransactionTable";
import useTransactions from "../../../hooks/useTransactions";

export default function AdminTransactionList() {
  const { data, loading, error } = useTransactions();

  if (error) {
    return (
      <AdminLayout>
        <p className="p-10 text-red-500">{error}</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminTransactionSummaryCard data={data} loading={loading} />
        <AdminTransactionTable data={data} loading={loading} />
      </div>
    </AdminLayout>
  );
}