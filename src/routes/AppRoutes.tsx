import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard";
import AdminTransactionList from "../pages/Admin/AdminTransactionList";
import AdminUser from "../pages/Admin/AdminUser";
import AdminTicket from "../pages/Admin/AdminTicket";
import AdminContent from "../pages/Admin/AdminContent";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/transactionlist" element={<AdminTransactionList />} />
      <Route path="/admin/userlist" element={<AdminUser />} />
      <Route path="/admin/ticket" element={<AdminTicket />} />
      <Route path="/admin/websitecontent" element={<AdminContent />} />
    </Routes>
  );
}
