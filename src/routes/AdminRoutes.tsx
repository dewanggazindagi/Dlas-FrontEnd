import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-dark-gray">Memuat...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== "superadmin") {
    console.log("ROLE DITOLAK:", user.role);

    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
