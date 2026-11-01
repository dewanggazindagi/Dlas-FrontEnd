import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Auth/AdminLogin";
import PosLogin from "../pages/Auth/PosLogin";

import Dashboard from "../pages/Admin/DashboardPage/Dashboard";
import AdminTransactionList from "../pages/Admin/TransactionPage/AdminTransactionList";
import AdminUser from "../pages/Admin/AdminUser";
import AdminTicket from "../pages/Admin/TicketPage/AdminTicket";
import AdminContent from "../pages/Admin/AdminContent";
import AddTicket from "../pages/Admin/TicketPage/AddTicket";
import EditTicket from "../pages/Admin/TicketPage/EditTicket";

import PosMain from "../pages/pos/PosMain";
import PosTransactionList from "../pages/pos/PosTransactionList";

import RoleRoutes from "./RoleRoutes";
import EditPackageTicket from "../pages/Admin/TicketPage/EditPackageTiket";
import AdminEditTerms from "../pages/Admin/AdminEditTerms";
import LandingPage from "../pages/public/LandingPage";
import DenahPage from "../pages/public/DenahPage";
import TiketPage from "../pages/public/TiketPage";
import RekomendasiTiketPage from "../pages/public/RekomendasiTiketPage";
import HasilRekomendasiPage from "../pages/public/HasilRekomendasiPage";
import DetailTiketPage from "../pages/public/DetailTiketPage";
import KonfirmasiPembelianPage from "../pages/public/KonfirmasiPembelianPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import ProfilePage from "../pages/public/ProfilePage";
import PesananAndaPage from "../pages/public/PesananAndaPage";
import DetailPesananPage from "../pages/public/DetailPesananPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. ROUTE REDIRECT UTAMA (Direct URL /pos dan /admin paksa ke Login) */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/pos" element={<Navigate to="/pos/login" replace />} />

      {/* 2. ROUTE LOGIN (PUBLIC) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/pos/login" element={<PosLogin />} />

      {/* 3. SUPERADMIN ROUTES (/admin/*) */}
      <Route
        element={<RoleRoutes allowedRoles={["superadmin", "SUPERADMIN"]} />}
      >
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
        <Route
          path="/admin/websitecontent/edit-terms"
          element={<AdminEditTerms />}
        />
      </Route>

      {/* 4. POS ROUTES (/pos/*) */}
      <Route
        element={
          <RoleRoutes
            allowedRoles={[
              "admin",
              "superadmin",
              "SUPERADMIN",
              "adminl1",
              "admin_l1",
              "admin1",
              "pos",
              "admin_pos",
            ]}
          />
        }
      >
        <Route path="/pos/dashboard" element={<PosMain />} />
        <Route path="/pos/transactionlist" element={<PosTransactionList />} />
      </Route>

      {/* 5. FALLBACK ROUTE (Jika URL ngawur / tidak ditemukan) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/denah" element={<DenahPage />} />
      <Route path="/tiket" element={<TiketPage />} />
      <Route path="/tiket/rekomendasi" element={<RekomendasiTiketPage />} />
      <Route
        path="/tiket/hasil-rekomendasi"
        element={<HasilRekomendasiPage />}
      />
      <Route path="/tiket/:id" element={<DetailTiketPage />} />
      <Route
        path="/tiket/:id/konfirmasi"
        element={<KonfirmasiPembelianPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/pesanan-anda" element={<PesananAndaPage />} />
      <Route path="/pesanan-anda/:orderId" element={<DetailPesananPage />} />
    </Routes>
  );
}
