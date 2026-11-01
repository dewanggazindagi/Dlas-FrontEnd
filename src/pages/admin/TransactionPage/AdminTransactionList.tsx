// AdminTransactionList.tsx
import AdminLayout from "../../../components/layout/Admin/AdminLayout";
<<<<<<< HEAD
import AdminTransactionSummaryCard from "../../../components/cards/Admin/AdminTransactionSummaryCard";
=======
import AdminTransactionSummaryCard from "../../../components/cards/AdminTransactionSummaryCard";
>>>>>>> arthur/main
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
<<<<<<< HEAD
}
=======
}
>>>>>>> arthur/main
