/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import HeroSection from "../../components/sections/HeroSection";
import TicketSection from "../../components/sections/TicketSection";
import TermsSection from "../../components/sections/TermsSection";
import FacilitySection from "../../components/sections/FacilitySection";
import GallerySection from "../../components/sections/GallerySection";
import BookingBar from "../../components/ui/BookingBar";
import { getTickets } from "../../services/api/ticketApi";
import { facilityData } from "../../services/data/facilityData";
import { termsData } from "../../services/data/termsData";

/**
 * Bentuk data tiket (sama dengan bentuk data dummy lama) supaya
 * TicketSection tetap bisa dipakai tanpa diubah.
 * Jika TypeScript protes, ganti dengan type bawaan project (mis. Ticket).
 */
interface TicketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
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

  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.namaTiket ?? raw?.name ?? "",
    description: raw?.deskripsi ?? raw?.description ?? "",
    price: Number(raw?.hargaWeekdays ?? raw?.harga ?? raw?.price ?? 0),
    images,
  };
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [tickets, setTickets] = useState<TicketItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchTickets = async () => {
      try {
        const response = await getTickets();
        if (!cancelled) {
          setTickets(extractList(response).map(normalizeTicket));
        }
      } catch (err) {
        // Landing page tetap tampil walau tiket gagal dimuat
        console.error("Gagal memuat data tiket:", err);
      }
    };

    fetchTickets();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams({ tab: "regular" });
    if (selectedDate)
      params.set("date", selectedDate.toISOString().slice(0, 10));
    navigate(`/tiket?${params.toString()}`);
  };

  return (
    <PublicLayout headerVariant="overlay">
      <HeroSection />
      <BookingBar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onSearch={handleSearch}
      />
      <TicketSection
        data={tickets as unknown as Parameters<typeof TicketSection>[0]["data"]}
      />
      <TermsSection data={termsData} />
      <FacilitySection data={facilityData} />
      <GallerySection />
    </PublicLayout>
  );
}
