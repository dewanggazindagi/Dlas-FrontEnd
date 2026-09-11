import { useMemo } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import OrderStatusTabs from "../../components/ui/OrderStatusTabs";
import OrderCard from "../../components/cards/OrderCard";
import { useAuth } from "../../hooks/useAuth";
import { orderStore } from "../../services/orderStore";
import { getOrderStatus } from "../../utils/orderStatus";
import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";
import type { Order, OrderStatus } from "../../types/order";

const tabLabels: Record<OrderStatus, string> = {
  aktif: "Aktif",
  menunggu: "Menunggu",
  terlewat: "Terlewat",
  batal: "Batal",
};

const validTabs: OrderStatus[] = ["aktif", "menunggu", "terlewat", "batal"];

export default function PesananAndaPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as OrderStatus | null;
  const activeTab: OrderStatus = tabParam && validTabs.includes(tabParam) ? tabParam : "aktif";

  const orders = useMemo(() => orderStore.getAll(), []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleTabChange(tab: OrderStatus) {
    setSearchParams({ tab });
  }

  function detailHrefFor(order: Order) {
    if (getOrderStatus(order) === "menunggu") {
      const params = new URLSearchParams({ qty: String(order.quantity), date: order.visitDate });
      return `/tiket/${order.ticketId}/konfirmasi?${params.toString()}`;
    }
    return `/pesanan-anda/${order.id}`;
  }

  const filteredOrders = orders.filter((order) => getOrderStatus(order) === activeTab);
  const satuanOrders = filteredOrders.filter((order) => order.type === "satuan");
  const paketOrders = filteredOrders.filter((order) => order.type === "paket");
  const isEmpty = satuanOrders.length === 0 && paketOrders.length === 0;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-[42px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-start">
          <BackLink label="Kembali" to="/" className="md:hidden" />
          <BackLink label="Kembali ke Beranda" to="/" className="hidden md:flex" />
        </div>

        <div className="flex w-full flex-col items-center gap-[38px]">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <p className="text-h6 font-semibold text-black capitalize md:text-h2">Pesanan Anda</p>
            <p className="text-t5 text-dark-gray md:w-[622px] md:text-t3">
              Berbagai pesanan anda pada tiket D'las Lembah Asri
            </p>
          </div>
          <OrderStatusTabs activeTab={activeTab} onChange={handleTabChange} />
        </div>

        <div className="flex w-full max-w-[1336px] flex-col items-start gap-12">
          {isEmpty && <p className="w-full text-center text-t4 text-dark-gray">Belum ada pesanan pada kategori ini.</p>}

          {satuanOrders.length > 0 && (
            <div className="flex w-full flex-col items-start gap-[38px]">
              <div className="hidden w-full flex-col items-start gap-1.5 md:flex">
                <p className="text-h6 font-semibold text-black capitalize">Tiket Satuan {tabLabels[activeTab]}</p>
                <p className="text-t3 text-dark-gray">Berbagai tiket satuan/reguler dengan status yang sama</p>
              </div>
              <div className="flex w-full flex-wrap items-start gap-3.5">
                {satuanOrders.map((order) => {
                  const ticket = ticketData.find((item) => item.id === order.ticketId);
                  if (!ticket) return null;
                  return (
                    <OrderCard
                      key={order.id}
                      name={ticket.name}
                      image={ticket.images[0]}
                      price={ticket.price}
                      orderId={order.id}
                      visitDate={order.visitDate}
                      quantity={order.quantity}
                      detailHref={detailHrefFor(order)}
                      ctaLabel={getOrderStatus(order) === "menunggu" ? "Lanjutkan Pembayaran" : undefined}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {paketOrders.length > 0 && (
            <div className="flex w-full flex-col items-start gap-[38px]">
              <div className="hidden w-full flex-col items-start gap-1.5 md:flex">
                <p className="text-h6 font-semibold text-black capitalize">Tiket Paket {tabLabels[activeTab]}</p>
                <p className="text-t3 text-dark-gray">Berbagai tiket paket hemat dengan status yang sama</p>
              </div>
              <div className="flex w-full flex-wrap items-start gap-3.5">
                {paketOrders.map((order) => {
                  const packageTicket = packageTicketData.find((item) => item.id === order.ticketId);
                  if (!packageTicket) return null;
                  return (
                    <OrderCard
                      key={order.id}
                      name={packageTicket.name}
                      image={packageTicket.images[0]}
                      price={packageTicket.price}
                      orderId={order.id}
                      visitDate={order.visitDate}
                      quantity={order.quantity}
                      detailHref={detailHrefFor(order)}
                      ctaLabel={getOrderStatus(order) === "menunggu" ? "Lanjutkan Pembayaran" : undefined}
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
