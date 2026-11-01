/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import TicketThumbnail from "../../components/ui/TicketThumbnail";
import TicketTermsBox from "../../components/cards/TicketTermsBox";
import { useAuth } from "../../hooks/useAuth";
import { orderStore } from "../../services/orderStore";
import { getPackageTickets, getTickets } from "../../services/api/ticketApi";
import { termsData } from "../../services/data/termsData";
import {
  regularTicketTermsData,
  packageTicketTermsData,
} from "../../services/data/ticketTermsData";
import { formatter } from "../../utils/formatter";

/**
 * Bentuk data tiket yang dipakai halaman ini (sudah dinormalisasi dari API).
 */
interface TicketItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  hargaWeekdays: number;
  hargaWeekend: number;
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
 * Sesuaikan nama field di sini jika response backend berbeda.
 */
function normalizeTicket(raw: any): TicketItem {
  const rawImages: any[] = raw?.gambar ?? raw?.images ?? [];
  const images = rawImages
    .map((img) =>
      typeof img === "string" ? img : (img?.url ?? img?.path ?? ""),
    )
    .filter(Boolean);

  const fallbackPrice = Number(raw?.harga ?? raw?.price ?? 0);

  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.namaTiket ?? raw?.name ?? "",
    description: raw?.deskripsi ?? raw?.description ?? "",
    images,
    hargaWeekdays: Number(raw?.hargaWeekdays ?? fallbackPrice),
    hargaWeekend: Number(raw?.hargaWeekend ?? fallbackPrice),
  };
}

/**
 * Harga weekend dipakai jika tanggal kunjungan jatuh di Sabtu/Minggu.
 * Jika tanggal tidak ada, dipakai harga weekdays.
 */
function priceFor(ticket: TicketItem, dateParam: string | null): number {
  if (!dateParam) return ticket.hargaWeekdays;
  const day = new Date(dateParam).getDay();
  return day === 0 || day === 6 ? ticket.hargaWeekend : ticket.hargaWeekdays;
}

export default function KonfirmasiPembelianPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

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

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex w-full items-center justify-center bg-soft-gray px-4 py-24">
          <p className="text-t4 text-dark-gray">Memuat detail pembelian...</p>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 py-24">
          <p className="text-t4 text-danger">{error}</p>
          <BackLink label="Kembali" to={`/tiket/${id ?? ""}`} />
        </div>
      </PublicLayout>
    );
  }

  const ticket = tickets.find((item) => item.id === id);
  const packageTicket = packageTickets.find((item) => item.id === id);

  if (!ticket && !packageTicket) {
    return <Navigate to="/tiket" replace />;
  }

  const item = (ticket ?? packageTicket)!;
  const isPackage = Boolean(packageTicket);
  const quantity = Math.max(1, Number(searchParams.get("qty")) || 1);
  const dateParam = searchParams.get("date");
  const dateLabel = dateParam ? formatter.dateLong(dateParam) : "-";
  const unitPrice = priceFor(item, dateParam);
  const totalPayment = unitPrice * quantity;
  const categoryTerms =
    isPackage ? packageTicketTermsData : regularTicketTermsData;

  function handlePayment() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const newOrder = {
      id: orderStore.generateId(),
      type: isPackage ? ("paket" as const) : ("satuan" as const),
      ticketId: item.id,
      quantity,
      visitDate: dateParam ?? new Date().toISOString(),
      orderedAt: new Date().toISOString(),
      paymentStatus: "paid" as const,
    };
    orderStore.add(newOrder);
    navigate(`/pesanan-anda/${newOrder.id}`);
  }

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-10.5 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-start">
          <BackLink label="Kembali" to={`/tiket/${item.id}`} />
        </div>

        <div className="flex w-full max-w-185.5 flex-col items-center gap-8 md:gap-9.5">
          <div className="flex w-full flex-col items-center gap-2 text-center md:gap-4">
            <p className="text-h6 font-semibold text-black capitalize md:text-h2">
              Konfirmasi Pembelian
            </p>
            <p className="text-t5 text-dark-gray md:text-t3">
              Selesaikan transaksi anda dan nikmati liburan anda
            </p>
          </div>

          <div className="flex w-full flex-col items-start rounded-2xl border border-border bg-white p-2.5">
            <div className="flex w-full items-start gap-4">
              <TicketThumbnail image={item.images[0]} alt={item.name} />
              <div className="flex flex-1 flex-col items-start justify-between gap-4 self-stretch py-1">
                <div className="flex w-full flex-col items-start gap-1">
                  <p className="w-full text-t3 font-semibold text-black capitalize">
                    {item.name}
                  </p>
                  <p className="line-clamp-2 w-full text-t5 text-dark-gray">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-end gap-1">
                  <p className="text-t4 font-medium text-black">
                    {formatter.rupiah(unitPrice)}
                  </p>
                  <p className="text-t5 text-dark-gray">/tiket</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-5">
            <p className="text-t2 font-medium text-black">Detail Pemesanan</p>

            <div className="flex w-full flex-col items-start gap-3">
              <div className="flex w-full flex-col items-start gap-5 rounded-2xl border border-border bg-white p-4">
                <div className="flex w-full items-start gap-5 text-t4">
                  <p className="flex-1 text-dark-gray">Berlibur pada</p>
                  <p className="text-dark-gray">{dateLabel}</p>
                </div>

                <div className="h-px w-full border-t border-border" />

                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-start gap-5">
                    <p className="flex-1 text-t4 text-dark-gray">Harga Tiket</p>
                    <div className="flex items-center gap-5">
                      <p className="text-t4 text-dark-gray">x{quantity}</p>
                      <p className="text-t4 text-dark-gray">
                        {formatter.rupiah(unitPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-full border-t border-border" />
                  <div className="flex w-full items-start gap-5">
                    <p className="flex-1 text-t4 text-dark-gray">
                      Total Pembayaran
                    </p>
                    <p className="text-t4 font-medium text-black">
                      {formatter.rupiah(totalPayment)}
                    </p>
                  </div>
                </div>

                <Button variant="primary" fullWidth onClick={handlePayment}>
                  Bayar Sekarang
                </Button>
              </div>

              <TicketTermsBox title="Ketentuan Tiket" terms={categoryTerms} />
              <TicketTermsBox
                title="Ketentuan D'las Lembah Asri"
                terms={termsData}
              />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
