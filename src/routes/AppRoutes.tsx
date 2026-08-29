import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Auth/AdminLogin";

import Dashboard from "../pages/Admin/Dashboard";
import AdminTransactionList from "../pages/Admin/AdminTransactionList";
import AdminUser from "../pages/Admin/AdminUser";
import AdminTicket from "../pages/Admin/AdminTicket";
import AdminContent from "../pages/Admin/AdminContent";
import AddTicket from "../pages/Admin/AddTicket";
import EditTicket from "../pages/Admin/EditTicket";

import RoleRoutes from "./RoleRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* =========================
          ADMIN
      ========================= */}

      <Route element={<RoleRoutes allowedRoles={["superadmin"]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route
          path="/admin/transactionlist"
          element={<AdminTransactionList />}
        />

        <Route path="/admin/userlist" element={<AdminUser />} />

        <Route path="/admin/ticket" element={<AdminTicket />} />

        <Route path="/admin/ticket/add" element={<AddTicket />} />

        <Route path="/admin/ticket/edit/:id" element={<EditTicket />} />

        <Route path="/admin/websitecontent" element={<AdminContent />} />
      </Route>

      {/* =========================
          ROOT
      ========================= */}

      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* =========================
          NOT FOUND
      ========================= */}

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
