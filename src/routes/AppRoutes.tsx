import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
