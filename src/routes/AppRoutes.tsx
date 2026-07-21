import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
