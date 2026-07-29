import AdminLayout from "../../components/layout/Admin/AdminLayout";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import { ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div>
      <Typography variant="h1" weight="bold">
        Selamat Datang
      </Typography>
      <p>
        Welcome to the admin dashboard!{" "}
        <Button size="sm" endIcon={<ArrowUpRight size={20} />}>
          Lihat Semua
        </Button>
      </p>
    </div>
    </AdminLayout>
  );
}