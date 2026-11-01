/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import SectionHeading from "../../components/ui/SectionHeading";
import DateSearchBar from "../../components/ui/DateSearchBar";
import TicketTabs, { type TicketTab } from "../../components/ui/TicketTabs";
import PackageTicketSection from "../../components/sections/PackageTicketSection";
import RegularTicketSection from "../../components/sections/RegularTicketSection";
import { getPackageTickets, getTickets } from "../../services/api/ticketApi";

/**
 * Bentuk data tiket (sama dengan bentuk data dummy lama) supaya
 * section tiket tetap bisa dipakai tanpa diubah.
 * Jika TypeScript protes, ganti dengan type bawaan project (mis. Ticket / PackageTicket).
 */
interface TicketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  includedRides: string[];
}

/**
 * Ambil array dari response list API (bisa langsung array, atau dibungkus { data: [...] }).
 */
function extractList(response: any): any[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

/**
 * Ubah satu item tiket dari API menjadi TicketItem.
 * Harga yang dipakai di kartu adalah harga weekdays.
 * Sesuaikan nama field di sini jika response backend berbeda.
 */
function normalizeTicket(raw: any): TicketItem {
  const rawImages: any[] = raw?.gambar ?? raw?.images ?? [];
  const images = rawImages
    .map((img) =>
      typeof img === "string" ? img : (img?.url ?? img?.path ?? ""),
    )
    .filter(Boolean);

  const rides: any[] = raw?.wahana ?? raw?.wahanas ?? raw?.includedRides ?? [];
  const includedRides = rides
    .map((ride) =>
      typeof ride === "string" ? ride : (
        (ride?.namaWahana ?? ride?.nama ?? ride?.name ?? "")
      ),
    )
    .filter(Boolean);

  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.namaTiket ?? raw?.name ?? "",
    description: raw?.deskripsi ?? raw?.description ?? "",
    price: Number(raw?.hargaWeekdays ?? raw?.harga ?? raw?.price ?? 0),
    images,
    includedRides,
  };
}

export default function TiketPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = (searchParams.get("tab") as TicketTab) || "regular";
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : undefined,
  );

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [packageTickets, setPackageTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const [satuanRes, paketRes] = await Promise.all([
          getTickets(),
          getPackageTickets(),
        ]);

        if (!cancelled) {
          setTickets(extractList(satuanRes).map(normalizeTicket));
          setPackageTickets(extractList(paketRes).map(normalizeTicket));
        }
      } catch (err) {
        console.error("Gagal memuat data tiket:", err);
        if (!cancelled) {
          setError("Gagal memuat data tiket. Silakan coba lagi.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTickets();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleTabChange = (tab: TicketTab) =>
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });

  const handleSearch = () =>
    setSearchParams((prev) => {
      if (selectedDate)
        prev.set("date", selectedDate.toISOString().slice(0, 10));
      return prev;
    });

  const handleGetRecommendation = () => navigate("/tiket/rekomendasi");

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-21 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-center gap-6 md:gap-10.5">
          <div className="flex w-full flex-col items-start">
            <BackLink label="Kembali ke Beranda" to="/" />
          </div>
          <div className="flex w-full flex-col items-center gap-8 md:gap-10.5">
            <SectionHeading
              title="Pesan Tiket Wisata"
              description="Temukan tiket dengan mudah dan jelajahi beragam aktivitas serta wahana seru yang ditawarkan D'Las Lembah Asri."
            />
            <div className="flex w-full flex-col items-center gap-5">
              <DateSearchBar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onSearch={handleSearch}
              />
              <TicketTabs activeTab={activeTab} onChange={handleTabChange} />
            </div>
          </div>
        </div>

        <div className="w-full max-w-334 md:px-13">
          {loading && (
            <p className="w-full text-center text-t4 text-dark-gray">
              Memuat tiket...
            </p>
          )}

          {!loading && error && (
            <p className="w-full text-center text-t4 text-danger">{error}</p>
          )}

          {!loading && !error && activeTab === "paket-hemat" && (
            <PackageTicketSection
              data={packageTickets}
              onGetRecommendation={handleGetRecommendation}
            />
          )}

          {!loading && !error && activeTab !== "paket-hemat" && (
            <RegularTicketSection
              data={tickets as any}
              onGetRecommendation={handleGetRecommendation}
            />
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
