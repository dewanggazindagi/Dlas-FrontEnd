import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminUserCard from "../../components/cards/AdminUserCard";
import AdminUserTable from "../../components/tables/AdminUserTable";
import { userTableData } from "../../services/data/userTableData";

export default function AdminUser() {
  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminUserCard data={userTableData} />
        <AdminUserTable data={userTableData} />
      </div>
    </AdminLayout>
  );
}
