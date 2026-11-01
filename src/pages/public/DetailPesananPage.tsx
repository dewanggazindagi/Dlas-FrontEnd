import { CheckCircle2, Download, QrCode, XCircle } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import NumberedPoint from "../../components/ui/NumberedPoint";
import TicketTermsBox from "../../components/cards/TicketTermsBox";
import { useAuth } from "../../hooks/useAuth";
import { orderStore } from "../../services/orderStore";
import { getOrderStatus, orderStatusColorClass, orderStatusLabel } from "../../utils/orderStatus";
import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";
import { termsData } from "../../services/data/termsData";
import { regularTicketTermsData, packageTicketTermsData } from "../../services/data/ticketTermsData";
import { formatter } from "../../utils/formatter";

export default function DetailPesananPage() {
  const { isAuthenticated } = useAuth();
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? orderStore.getById(orderId) : undefined;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!order) {
    return <Navigate to="/pesanan-anda" replace />;
  }

  const isPackage = order.type === "paket";
  const packageTicket = isPackage ? packageTicketData.find((item) => item.id === order.ticketId) : undefined;
  const regularTicket = !isPackage ? ticketData.find((item) => item.id === order.ticketId) : undefined;
  const ticket = packageTicket ?? regularTicket;

  if (!ticket) {
    return <Navigate to="/pesanan-anda" replace />;
  }

  const status = getOrderStatus(order);
  const isCancelled = status === "batal";
  const totalPayment = ticket.price * order.quantity;
  const categoryTerms = isPackage ? packageTicketTermsData : regularTicketTermsData;
  const includedRides = packageTicket?.includedRides ?? [];

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-[42px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-start">
          <BackLink label="Kembali" to="/pesanan-anda" />
        </div>

        <div className="flex w-full max-w-[742px] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-8 rounded-2xl border border-border bg-white px-4 pt-8 pb-4">
            {isCancelled ? <XCircle size={100} className="text-danger" /> : <CheckCircle2 size={100} className="text-primary" />}
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <p className="text-h7 font-semibold text-black capitalize">
                {isCancelled ? "Pesanan Dibatalkan" : "Pembayaran Berhasil"}
              </p>
              <p className="text-t5 text-dark-gray">
                {isCancelled
                  ? `Pesanan dengan ID #${order.id} telah dibatalkan.`
                  : `Pesanan dengan ID #${order.id} sudah berhasil. Anda sudah dapat melihat tiket anda dibawah`}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-border bg-white p-4">
            <div className="flex w-full flex-col items-center gap-[18px] rounded-xl border border-border bg-soft-gray py-[18px]">
              <div className="flex size-[174px] items-center justify-center rounded-xl border border-border bg-white">
                <QrCode size={120} className="text-black" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-t2 font-semibold text-black">{ticket.name}</p>
                <p className="text-t5 text-dark-gray">ID : {order.id}</p>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-3 rounded-xl border border-border bg-white p-3">
              <div className="flex w-full items-center justify-center rounded-xl border border-border bg-soft-gray py-2">
                <p className="flex-1 text-center text-t4 font-medium text-black">{order.quantity} Pengunjung</p>
              </div>
              {includedRides.map((ride, index) => (
                <div key={ride} className="flex w-full flex-col gap-3">
                  {index > 0 && <div className="h-px w-full border-t border-border" />}
                  <NumberedPoint number={String(index + 1).padStart(2, "0")} textClassName="text-t4 font-medium text-black">
                    {ride}
                  </NumberedPoint>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full items-start gap-5 px-3 text-t4">
                <p className="flex-1 text-dark-gray">Status Tiket</p>
                <p className={`font-medium ${orderStatusColorClass[status]}`}>{orderStatusLabel[status]}</p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4 text-dark-gray">
                <p className="flex-1">Tiket Dipesan</p>
                <p className="text-black">{ticket.name}</p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4 text-dark-gray">
                <p className="flex-1">Dipesan pada</p>
                <p className="text-black">{formatter.dateLong(order.orderedAt)}</p>
              </div>
              <div className="h-px w-full border-t border-border" />
              <div className="flex w-full items-start gap-5 px-3 text-t4 text-dark-gray">
                <p className="flex-1">Berlibur pada</p>
                <p className="text-black">{formatter.dateLong(order.visitDate)}</p>
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
                <p className="font-medium text-black">{formatter.rupiah(totalPayment)}</p>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              <TicketTermsBox title="Ketentuan Tiket" terms={categoryTerms} />
              <TicketTermsBox title="Ketentuan D'las Lembah Asri" terms={termsData} />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <Button variant="primary" fullWidth startIcon={<Download size={20} />} onClick={() => window.print()}>
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
