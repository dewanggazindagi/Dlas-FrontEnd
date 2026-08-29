import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
  allowedRoles: string[];
}

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, loading } = useAuth();

  console.log("ROLE ROUTE:", {
    user,
    loading,
    role: user?.role,
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log("ROLE DITOLAK:", user.role);

    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
