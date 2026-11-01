/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import DateField from "../../components/ui/DateField";
import QuantityStepper from "../../components/ui/QuantityStepper";
import TicketGallery from "../../components/ui/TicketGallery";
import NumberedPoint from "../../components/ui/NumberedPoint";
import TicketTermsBox from "../../components/cards/TicketTermsBox";
import InlineAuthForm from "../../components/cards/InlineAuthForm";
import { useAuth } from "../../hooks/useAuth";
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

  const fallbackPrice = Number(raw?.harga ?? raw?.price ?? 0);

  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.namaTiket ?? raw?.name ?? "",
    description: raw?.deskripsi ?? raw?.description ?? "",
    images,
    hargaWeekdays: Number(raw?.hargaWeekdays ?? fallbackPrice),
    hargaWeekend: Number(raw?.hargaWeekend ?? fallbackPrice),
    includedRides,
  };
}

/**
 * Harga weekend dipakai jika tanggal kunjungan jatuh di Sabtu/Minggu.
 * Jika tanggal belum dipilih, dipakai harga weekdays.
 */
function priceFor(ticket: TicketItem, date?: Date): number {
  if (!date) return ticket.hargaWeekdays;
  const day = date.getDay();
  return day === 0 || day === 6 ? ticket.hargaWeekend : ticket.hargaWeekdays;
}

export default function DetailTiketPage() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

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

  const ticket = tickets.find((item) => item.id === id);
  const packageTicket = packageTickets.find((item) => item.id === id);

  const includedTickets = useMemo(() => {
    if (!packageTicket) return [];
    return packageTicket.includedRides.map((ride) => ({
      name: ride,
      ticket: tickets.find((item) => item.name === ride),
    }));
  }, [packageTicket, tickets]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex w-full items-center justify-center bg-soft-gray px-4 py-24">
          <p className="text-t4 text-dark-gray">Memuat detail tiket...</p>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 py-24">
          <p className="text-t4 text-danger">{error}</p>
          <BackLink label="Kembali" to="/tiket" />
        </div>
      </PublicLayout>
    );
  }

  if (!ticket && !packageTicket) {
    return <Navigate to="/tiket" replace />;
  }

  const item = (ticket ?? packageTicket)!;
  const isPackage = Boolean(packageTicket);
  const unitPrice = priceFor(item, selectedDate);
  const totalPayment = unitPrice * quantity;
  const priceLabel = isPackage ? "Harga Tiket Paket" : "Harga Tiket Satuan";
  const categoryTerms =
    isPackage ? packageTicketTermsData : regularTicketTermsData;

  const confirmationParams = new URLSearchParams({ qty: String(quantity) });
  if (selectedDate) confirmationParams.set("date", selectedDate.toISOString());
  const confirmationUrl = `/tiket/${item.id}/konfirmasi?${confirmationParams.toString()}`;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-10.5 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-start">
          <BackLink label="Kembali" to="/tiket" className="md:hidden" />
          <BackLink
            label="Kembali ke Beranda"
            to="/"
            className="hidden md:flex"
          />
        </div>

        <div className="flex w-full max-w-334 flex-col items-start gap-8 md:flex-row md:gap-12">
          <div className="w-full md:sticky md:top-4 md:w-auto md:flex-1">
            <TicketGallery images={item.images} alt={item.name} />
          </div>

          <div className="flex w-full flex-col items-start gap-8 md:w-auto md:flex-1">
            <div className="flex w-full flex-col items-start gap-5">
              <p className="w-full text-h7 font-semibold text-black capitalize md:text-h6">
                {item.name}
              </p>
              <div className="flex items-end gap-1">
                <p className="text-t3 font-medium text-black">
                  {formatter.rupiah(unitPrice)}
                </p>
                <p className="text-t5 text-dark-gray">/tiket</p>
              </div>
              <div className="flex w-full flex-col items-start gap-5">
                <p className="text-t3 font-medium text-black">
                  Deskripsi Tiket
                </p>
                <p className="w-full text-t4 text-dark-gray">
                  {item.description}
                </p>
              </div>

              {isPackage && (
                <div className="flex w-full flex-col items-start gap-5">
                  <p className="text-t3 font-medium text-black">
                    Wahana Apa saja yang termasuk?
                  </p>
                  <div className="flex w-full flex-col items-start gap-3.5 rounded-2xl border border-border bg-white p-4">
                    {includedTickets.map((included, index) => (
                      <div
                        key={`${included.name}-${index}`}
                        className="flex w-full flex-col gap-3.5"
                      >
                        {index > 0 && (
                          <div className="h-px w-full border-t border-border" />
                        )}
                        {included.ticket ?
                          <Link
                            to={`/tiket/${included.ticket.id}`}
                            className="flex w-full cursor-pointer items-center gap-2.5"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-soft-gray text-t6 font-semibold text-dark-gray">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-t4 font-medium text-black">
                              {included.name}
                            </span>
                            <ArrowRight
                              size={18}
                              className="shrink-0 text-black"
                            />
                          </Link>
                        : <NumberedPoint
                            number={String(index + 1).padStart(2, "0")}
                            textClassName="text-t4 font-medium text-dark-gray"
                          >
                            {included.name}
                          </NumberedPoint>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-3 rounded-2xl border border-border bg-white p-2.5 shadow-card">
              <div className="flex w-full flex-col items-start gap-2.5">
                <TicketTermsBox title="Ketentuan Tiket" terms={categoryTerms} />
                <TicketTermsBox
                  title="Ketentuan D'las Lembah Asri"
                  terms={termsData}
                />
              </div>

              {isAuthenticated ?
                <>
                  <div className="flex w-full flex-col items-start gap-5 px-1.5">
                    <DateField
                      label="Kapan anda berlibur?"
                      date={selectedDate}
                      onDateChange={setSelectedDate}
                    />

                    <div className="flex w-full items-center gap-5">
                      <p className="flex-1 text-t4 font-medium text-black">
                        Jumlah tiket yang dibeli
                      </p>
                      <QuantityStepper
                        value={quantity}
                        onChange={setQuantity}
                      />
                    </div>

                    <div className="h-px w-full border-t border-border" />

                    <div className="flex w-full flex-col items-start gap-4">
                      <div className="flex w-full items-start gap-5">
                        <p className="flex-1 text-t4 text-dark-gray">
                          {priceLabel}
                        </p>
                        <div className="flex items-center gap-5">
                          <p className="text-t4 text-dark-gray">x{quantity}</p>
                          <p className="text-t4 text-black">
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

                    <div className="h-px w-full border-t border-border" />

                    <button
                      type="button"
                      onClick={() => setConfirmed((prev) => !prev)}
                      className="flex w-full cursor-pointer items-center justify-center gap-2.5 text-left"
                    >
                      <Checkbox checked={confirmed} className="shrink-0" />
                      <span className="flex-1">
                        <span className="hidden text-t5 text-dark-gray md:inline">
                          Ya, saya sudah memastikan data pesanan sudah benar &
                          Membaca ketentuan
                        </span>
                        <span className="text-t5 text-dark-gray md:hidden">
                          Klik untuk checklist jika anda sudah memastikan data
                          pesanan sudah benar & menyetujui ketentuan
                        </span>
                      </span>
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    disabled={!confirmed}
                    to={confirmationUrl}
                  >
                    Beli Sekarang
                  </Button>
                </>
              : <InlineAuthForm />}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
