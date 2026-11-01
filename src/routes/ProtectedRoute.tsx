import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRole?: string;
  redirectTo: string;
}

export default function ProtectedRoute({ allowedRole, redirectTo }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Tampilkan loading sebentar jika AuthContext masih mengecek localStorage
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika tidak ada user (belum login/token habis), redirect ke login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Jika ada spesifikasi role dan role user tidak sesuai, lempar ke login
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}