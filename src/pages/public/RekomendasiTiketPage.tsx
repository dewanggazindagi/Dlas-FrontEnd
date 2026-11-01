/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ComponentProps } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import WahanaSelectItem from "../../components/cards/WahanaSelectItem";
import { getTickets } from "../../services/api/ticketApi";

/**
 * Bentuk data tiket (sama dengan bentuk data dummy lama) supaya
 * WahanaSelectItem tetap bisa dipakai tanpa diubah.
 * Jika TypeScript protes, ganti dengan type bawaan project (mis. Ticket).
 */
type TicketItem = ComponentProps<typeof WahanaSelectItem>["ticket"];

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
 * Harga yang dipakai adalah harga weekdays.
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
    ...raw,
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.namaTiket ?? raw?.name ?? "",
    description: raw?.deskripsi ?? raw?.description ?? "",
    price: Number(raw?.hargaWeekdays ?? raw?.harga ?? raw?.price ?? 0),
    images,
  } as TicketItem;
}

export default function RekomendasiTiketPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSelected =
    searchParams
      .get("wahana")
      ?.split(",")
      .filter(Boolean)
      .map(decodeURIComponent) ?? [];
  const [selectedNames, setSelectedNames] = useState<string[]>(initialSelected);

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getTickets();
        if (!cancelled) {
          setTickets(extractList(response).map(normalizeTicket));
        }
      } catch (err) {
        console.error("Gagal memuat data tiket:", err);
        if (!cancelled) {
          setError("Gagal memuat daftar wahana. Silakan coba lagi.");
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

  const toggle = (id: string) => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) return;
    setSelectedNames((prev) =>
      prev.includes(ticket.name) ?
        prev.filter((n) => n !== ticket.name)
      : [...prev, ticket.name],
    );
  };

  const handleSubmit = () => {
    const query = selectedNames.map(encodeURIComponent).join(",");
    navigate(`/tiket/hasil-rekomendasi?wahana=${query}`);
  };

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-21 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-center gap-6 md:gap-10.5">
          <div className="flex w-full flex-col items-start">
            <BackLink label="Kembali" to="/" className="md:hidden" />
            <BackLink
              label="Kembali ke Beranda"
              to="/"
              className="hidden md:flex"
            />
          </div>
          <SectionHeading
            title="Rekomendasi Tiket"
            description="Pilih wahana yang ingin anda kunjungi di D'las Lembah Asri, lalu kami akan memberikan rekomendasi tiket yang sesuai"
          />
        </div>

        <div className="flex w-full max-w-334 flex-col items-center gap-8 md:px-13">
          {loading && (
            <p className="w-full text-center text-t4 text-dark-gray">
              Memuat daftar wahana...
            </p>
          )}

          {!loading && error && (
            <p className="w-full text-center text-t4 text-danger">{error}</p>
          )}

          {!loading && !error && tickets.length === 0 && (
            <p className="w-full text-center text-t4 text-dark-gray">
              Belum ada wahana yang tersedia.
            </p>
          )}

          {!loading && !error && tickets.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-2">
              {tickets.map((ticket) => (
                <WahanaSelectItem
                  key={ticket.id}
                  ticket={ticket}
                  checked={selectedNames.includes(ticket.name)}
                  onToggle={toggle}
                />
              ))}
            </div>
          )}

          <Button
            variant="primary"
            fullWidth
            disabled={selectedNames.length === 0}
            onClick={handleSubmit}
          >
            Dapatkan Rekomendasi
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
