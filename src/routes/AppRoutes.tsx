import { Route, Routes } from "react-router-dom";
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
      <Route path="/" element={<LandingPage />} />
      <Route path="/denah" element={<DenahPage />} />
      <Route path="/tiket" element={<TiketPage />} />
      <Route path="/tiket/rekomendasi" element={<RekomendasiTiketPage />} />
      <Route path="/tiket/hasil-rekomendasi" element={<HasilRekomendasiPage />} />
      <Route path="/tiket/:id" element={<DetailTiketPage />} />
      <Route path="/tiket/:id/konfirmasi" element={<KonfirmasiPembelianPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/pesanan-anda" element={<PesananAndaPage />} />
      <Route path="/pesanan-anda/:orderId" element={<DetailPesananPage />} />
    </Routes>
  );
}
