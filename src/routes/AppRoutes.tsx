import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Auth/AdminLogin";

import Dashboard from "../pages/Admin/DashboardPage/Dashboard";
import AdminTransactionList from "../pages/Admin/TransactionPage/AdminTransactionList";
import AdminUser from "../pages/Admin/AdminUser";
import AdminTicket from "../pages/Admin/TicketPage/AdminTicket";
import AdminContent from "../pages/Admin/AdminContent";
import AddTicket from "../pages/Admin/TicketPage/AddTicket";
import EditTicket from "../pages/Admin/TicketPage/EditTicket";

import RoleRoutes from "./RoleRoutes";
import EditPackageTicket from "../pages/Admin/TicketPage/EditPackageTiket";

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

        <Route
          path="/admin/ticket/edit-package/:id"
          element={<EditPackageTicket />}
        />

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
