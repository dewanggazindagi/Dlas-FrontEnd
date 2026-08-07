import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminAnalisysCard from "../../components/cards/AdminAnalisysCard";
import AdminTable from "../../components/cards/AdminTable";

export default function AdminUser() {
  return (
    <AdminLayout>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-5">Daftar Pengguna</h1>
      </div>
    </AdminLayout>
  );
}