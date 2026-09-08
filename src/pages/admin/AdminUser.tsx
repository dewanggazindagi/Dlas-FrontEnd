// AdminUser.tsx
import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminUserCard from "../../components/cards/AdminUserCard";
import AdminUserTable from "../../components/tables/AdminUserTable";
import useUsers from "../../hooks/useUsers";

export default function AdminUser() {
  const { data, loading, error } = useUsers();

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
        <AdminUserCard data={data} loading={loading} />
        <AdminUserTable data={data} loading={loading} />
      </div>
    </AdminLayout>
  );
}
