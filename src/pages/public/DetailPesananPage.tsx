/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CheckCircle2, Download, QrCode, XCircle } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import NumberedPoint from "../../components/ui/NumberedPoint";
import TicketTermsBox from "../../components/cards/TicketTermsBox";
import { useAuth } from "../../hooks/useAuth";
import { orderStore } from "../../services/orderStore";
import {
  getOrderStatus,
  orderStatusColorClass,
  orderStatusLabel,
} from "../../utils/orderStatus";
import {
  getPackageTicketById,
  getTicketById,
} from "../../services/api/ticketApi";
import { termsData } from "../../services/data/termsData";
import {
  regularTicketTermsData,
  packageTicketTermsData,
} from "../../services/data/ticketTermsData";
import { formatter } from "../../utils/formatter";

/**
 * Bentuk data tiket yang dipakai halaman ini (sudah dinormalisasi dari API).
 */
interface TicketDetail {
  name: string;
  price: number;
  includedRides: string[];
}

/**
 * Ubah response API menjadi TicketDetail.
 * Harga weekend dipakai jika tanggal kunjungan jatuh di Sabtu/Minggu.
 * Sesuaikan nama field di sini jika response backend berbeda.
 */
function normalizeTicket(
  response: any,
  visitDate: string | Date,
): TicketDetail {
  const raw = response?.data ?? response;

  const day = new Date(visitDate).getDay();
  const isWeekend = day === 0 || day === 6;
  const price = Number(
    (isWeekend ? raw?.hargaWeekend : raw?.hargaWeekdays) ??
      raw?.harga ??
      raw?.price ??
      0,
  );

  const rides: any[] = raw?.wahana ?? raw?.wahanas ?? raw?.includedRides ?? [];
  const includedRides = rides.map((ride) =>
    typeof ride === "string" ? ride : (
      (ride?.namaWahana ?? ride?.nama ?? ride?.name ?? "")
    ),
  );

  return {
    name: raw?.namaTiket ?? raw?.name ?? "",
    price,
    includedRides: includedRides.filter(Boolean),
  };
}

export default function DetailPesananPage() {
  const { isAuthenticated } = useAuth();
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? orderStore.getById(orderId) : undefined;

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isPackage = order?.type === "paket";
  const ticketId = order?.ticketId;
  const visitDate = order?.visitDate;

  useEffect(() => {
    if (!ticketId || !visitDate) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchTicket = async () => {
      setLoading(true);
      setError(null);
      try {
        const response =
          isPackage ?
            await getPackageTicketById(String(ticketId))
          : await getTicketById(String(ticketId));

        if (!cancelled) {
          setTicket(normalizeTicket(response, visitDate));
        }
      } catch (err) {
        console.error("Gagal memuat detail tiket:", err);
        if (!cancelled) {
          setError("Gagal memuat data tiket. Silakan coba lagi.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTicket();

    return () => {
      cancelled = true;
    };
  }, [ticketId, isPackage, visitDate]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!order) {
    return <Navigate to="/pesanan-anda" replace />;
  }

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex w-full items-center justify-center bg-soft-gray px-4 py-24">
          <p className="text-t4 text-dark-gray">Memuat detail pesanan...</p>
        </div>
      </PublicLayout>
    );
  }

  if (error || !ticket) {
    return (
      <PublicLayout>
        <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 py-24">
          <p className="text-t4 text-danger">
            {error ?? "Data tiket tidak ditemukan."}
          </p>
          <BackLink label="Kembali" to="/pesanan-anda" />
        </div>
      </PublicLayout>
    );
  }

  const status = getOrderStatus(order);
  const isCancelled = status === "batal";
  const totalPayment = ticket.price * order.quantity;
  const categoryTerms =
    isPackage ? packageTicketTermsData : regularTicketTermsData;
  const includedRides = ticket.includedRides;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-21 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-start">
          <BackLink label="Kembali" to="/pesanan-anda" />
        </div>

        <div className="flex w-full max-w-334 flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-8 rounded-2xl border border-border bg-white px-4 pt-8 pb-4">
            {isCancelled ?
              <XCircle size={100} className="text-danger" />
            : <CheckCircle2 size={100} className="text-primary" />}
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <p className="text-h7 font-semibold text-black capitalize">
                {isCancelled ? "Pesanan Dibatalkan" : "Pembayaran Berhasil"}
              </p>
              <p className="text-t5 text-dark-gray">
                {isCancelled ?
                  `Pesanan dengan ID #${order.id} telah dibatalkan.`
                : `Pesanan dengan ID #${order.id} sudah berhasil. Anda sudah dapat melihat tiket anda dibawah`
                }
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-border bg-white p-4">
            <div className="flex w-full flex-col items-center gap-4.5 rounded-xl border border-border bg-soft-gray py-4.5">
              <div className="flex size-43.5 items-center justify-center rounded-xl border border-border bg-white">
                <QrCode size={120} className="text-black" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-t2 font-semibold text-black">
                  {ticket.name}
                </p>
                <p className="text-t5 text-dark-gray">ID : {order.id}</p>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-3 rounded-xl border border-border bg-white p-3">
              <div className="flex w-full items-center justify-center rounded-xl border border-border bg-soft-gray py-2">
                <p className="flex-1 text-center text-t4 font-medium text-black">
                  {order.quantity} Pengunjung
                </p>
              </div>
              {includedRides.map((ride, index) => (
                <div
                  key={`${ride}-${index}`}
                  className="flex w-full flex-col gap-3"
                >
                  {index > 0 && (
                    <div className="h-px w-full border-t border-border" />
                  )}
                  <NumberedPoint
                    number={String(index + 1).padStart(2, "0")}
                    textClassName="text-t4 font-medium text-black"
                  >
                    {ride}
                  </NumberedPoint>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full items-start gap-5 px-3 text-t4">
                <p className="flex-1 text-dark-gray">Status Tiket</p>
                <p className={`font-medium ${orderStatusColorClass[status]}`}>
                  {orderStatusLabel[status]}
                </p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4 text-dark-gray">
                <p className="flex-1">Tiket Dipesan</p>
                <p className="text-black">{ticket.name}</p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4 text-dark-gray">
                <p className="flex-1">Dipesan pada</p>
                <p className="text-black">
                  {formatter.dateLong(order.orderedAt)}
                </p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4 text-dark-gray">
                <p className="flex-1">Berlibur pada</p>
                <p className="text-black">
                  {formatter.dateLong(order.visitDate)}
                </p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4">
                <p className="flex-1 text-dark-gray">Harga Tiket</p>
                <div className="flex items-center gap-5">
                  <p className="text-dark-gray">x{order.quantity}</p>
                  <p className="text-black">{formatter.rupiah(ticket.price)}</p>
                </div>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4">
                <p className="flex-1 text-dark-gray">Total Pembayaran</p>
                <p className="font-medium text-black">
                  {formatter.rupiah(totalPayment)}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              <TicketTermsBox title="Ketentuan Tiket" terms={categoryTerms} />
              <TicketTermsBox
                title="Ketentuan D'las Lembah Asri"
                terms={termsData}
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <Button
              variant="primary"
              fullWidth
              startIcon={<Download size={20} />}
              onClick={() => window.print()}
            >
              Download & Simpan Tiket
            </Button>
            <Button to="/denah" variant="outline" fullWidth>
              Lihat Denah Area D'las
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
