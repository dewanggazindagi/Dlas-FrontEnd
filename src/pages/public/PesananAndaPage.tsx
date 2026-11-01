/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import OrderStatusTabs from "../../components/ui/OrderStatusTabs";
import OrderCard from "../../components/cards/OrderCard";
import { useAuth } from "../../hooks/useAuth";
import { orderStore } from "../../services/orderStore";
import { getOrderStatus } from "../../utils/orderStatus";
import { getPackageTickets, getTickets } from "../../services/api/ticketApi";
import type { Order, OrderStatus } from "../../types/order";

const tabLabels: Record<OrderStatus, string> = {
  aktif: "Aktif",
  menunggu: "Menunggu",
  terlewat: "Terlewat",
  batal: "Batal",
};

const validTabs: OrderStatus[] = ["aktif", "menunggu", "terlewat", "batal"];

/**
 * Bentuk data tiket yang dipakai halaman ini (sudah dinormalisasi dari API).
 */
interface TicketItem {
  id: string;
  name: string;
  image: string;
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
  const firstImage = (raw?.gambar ?? raw?.images ?? [])[0];
  const image =
    typeof firstImage === "string" ? firstImage : (
      (firstImage?.url ?? firstImage?.path ?? "")
    );

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
    image,
    hargaWeekdays: Number(raw?.hargaWeekdays ?? fallbackPrice),
    hargaWeekend: Number(raw?.hargaWeekend ?? fallbackPrice),
    includedRides,
  };
}

/**
 * Harga weekend dipakai jika tanggal kunjungan jatuh di Sabtu/Minggu.
 */
function priceFor(ticket: TicketItem, visitDate: string): number {
  const day = new Date(visitDate).getDay();
  return day === 0 || day === 6 ? ticket.hargaWeekend : ticket.hargaWeekdays;
}

export default function PesananAndaPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as OrderStatus | null;
  const activeTab: OrderStatus =
    tabParam && validTabs.includes(tabParam) ? tabParam : "aktif";

  const orders = useMemo(() => orderStore.getAll(), []);

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

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleTabChange(tab: OrderStatus) {
    setSearchParams({ tab });
  }

  function detailHrefFor(order: Order) {
    if (getOrderStatus(order) === "menunggu") {
      const params = new URLSearchParams({
        qty: String(order.quantity),
        date: order.visitDate,
      });
      return `/tiket/${order.ticketId}/konfirmasi?${params.toString()}`;
    }
    return `/pesanan-anda/${order.id}`;
  }

  const filteredOrders = orders.filter(
    (order) => getOrderStatus(order) === activeTab,
  );
  const satuanOrders = filteredOrders.filter(
    (order) => order.type === "satuan",
  );
  const paketOrders = filteredOrders.filter((order) => order.type === "paket");
  const isEmpty = satuanOrders.length === 0 && paketOrders.length === 0;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-10.5 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-start">
          <BackLink label="Kembali" to="/" className="md:hidden" />
          <BackLink
            label="Kembali ke Beranda"
            to="/"
            className="hidden md:flex"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-9.5">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <p className="text-h6 font-semibold text-black capitalize md:text-h2">
              Pesanan Anda
            </p>
            <p className="text-t5 text-dark-gray md:w-155.5 md:text-t3">
              Berbagai pesanan anda pada tiket D'las Lembah Asri
            </p>
          </div>
          <OrderStatusTabs activeTab={activeTab} onChange={handleTabChange} />
        </div>

        <div className="flex w-full max-w-334 flex-col items-start gap-12">
          {loading && (
            <p className="w-full text-center text-t4 text-dark-gray">
              Memuat pesanan...
            </p>
          )}

          {!loading && error && (
            <p className="w-full text-center text-t4 text-danger">{error}</p>
          )}

          {!loading && !error && isEmpty && (
            <p className="w-full text-center text-t4 text-dark-gray">
              Belum ada pesanan pada kategori ini.
            </p>
          )}

          {!loading && !error && satuanOrders.length > 0 && (
            <div className="flex w-full flex-col items-start gap-9.5">
              <div className="hidden w-full flex-col items-start gap-1.5 md:flex">
                <p className="text-h6 font-semibold text-black capitalize">
                  Tiket Satuan {tabLabels[activeTab]}
                </p>
                <p className="text-t3 text-dark-gray">
                  Berbagai tiket satuan/reguler dengan status yang sama
                </p>
              </div>
              <div className="flex w-full flex-wrap items-start gap-3.5">
                {satuanOrders.map((order) => {
                  const ticket = tickets.find(
                    (item) => item.id === String(order.ticketId),
                  );
                  if (!ticket) return null;
                  return (
                    <OrderCard
                      key={order.id}
                      name={ticket.name}
                      image={ticket.image}
                      price={priceFor(ticket, order.visitDate)}
                      orderId={order.id}
                      visitDate={order.visitDate}
                      quantity={order.quantity}
                      detailHref={detailHrefFor(order)}
                      ctaLabel={
                        getOrderStatus(order) === "menunggu" ?
                          "Lanjutkan Pembayaran"
                        : undefined
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}

          {!loading && !error && paketOrders.length > 0 && (
            <div className="flex w-full flex-col items-start gap-9.5">
              <div className="hidden w-full flex-col items-start gap-1.5 md:flex">
                <p className="text-h6 font-semibold text-black capitalize">
                  Tiket Paket {tabLabels[activeTab]}
                </p>
                <p className="text-t3 text-dark-gray">
                  Berbagai tiket paket hemat dengan status yang sama
                </p>
              </div>
              <div className="flex w-full flex-wrap items-start gap-3.5">
                {paketOrders.map((order) => {
                  const packageTicket = packageTickets.find(
                    (item) => item.id === String(order.ticketId),
                  );
                  if (!packageTicket) return null;
                  return (
                    <OrderCard
                      key={order.id}
                      name={packageTicket.name}
                      image={packageTicket.image}
                      price={priceFor(packageTicket, order.visitDate)}
                      orderId={order.id}
                      visitDate={order.visitDate}
                      quantity={order.quantity}
                      detailHref={detailHrefFor(order)}
                      ctaLabel={
                        getOrderStatus(order) === "menunggu" ?
                          "Lanjutkan Pembayaran"
                        : undefined
                      }
                      includedRides={packageTicket.includedRides}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
