import { X, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import dlasLogo from "../../assets/images/logo.webp";
import successIcon from "../../assets/images/success.png";

interface TicketPaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: {
    transactionId?: string; // <-- Ditambahkan agar menerima Real TRX ID
    ticketData?: {
      id?: string;
      title?: string;
      price?: number;
    };
    quantity?: number;
    totalPrice?: number;
    paymentType?: string;
    nonCashMethod?: string | null;
    visitDate?: string;
  };
}

export default function TicketPaymentSuccessModal({
  isOpen,
  onClose,
  orderData,
}: TicketPaymentSuccessModalProps) {
  if (!isOpen || !orderData) return null;

  const ticketTitle = orderData.ticketData?.title || "Tiket Masuk";
  const quantity = orderData.quantity || 1;

  const todayFormatted = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const visitDate = orderData.visitDate || todayFormatted;

  // PERBAIKAN: Gunakan transactionId dari orderData, bukan ticketData.id!
  const transactionId =
    orderData.transactionId || orderData.ticketData?.id || "0920102812";

  const qrPayload = JSON.stringify({
    trxId: transactionId,
    ticketId: orderData.ticketData?.id || "TKT-001",
    title: ticketTitle,
    qty: quantity,
    date: visitDate,
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] w-full max-w-[400px] p-5 shadow-2xl relative my-auto space-y-4 border border-gray-100">
        <div className="flex items-start justify-between px-1">
          <div className="flex items-start gap-3">
            <img
              src={successIcon}
              alt="Pembayaran Berhasil"
              className="w-7 h-7 object-contain shrink-0 mt-0.5"
            />
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Pembayaran Berhasil
              </h2>
              <p className="text-xs text-gray-400 font-normal mt-0.5">
                Tiket Sudah siap untuk digunakan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="border border-gray-200/80 rounded-[28px] p-5 space-y-4 bg-white">
          <div className="flex justify-center">
            <img
              src={dlasLogo}
              alt="D'las Logo"
              className="h-12 object-contain"
            />
          </div>

          <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-3 rounded-xl shadow-2xs border border-gray-100">
              <QRCodeSVG
                value={qrPayload}
                size={160}
                level="M"
                includeMargin={false}
              />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mt-3">
              {ticketTitle}
            </h3>
            <p className="text-[11px] text-gray-400 font-normal mt-0.5 break-all max-w-[260px]">
              ID : {transactionId}
            </p>
          </div>

          <div className="bg-gray-50/70 border border-gray-100 rounded-xl py-2.5 px-4 text-center">
            <span className="text-xs font-semibold text-gray-800">
              {quantity} Pengunjung
            </span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-normal">Status Tiket</span>
              <span className="text-amber-500 font-semibold">
                Siap Digunakan
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-normal">Tiket Dipesan</span>
              <span className="text-gray-700 font-medium truncate max-w-[180px]">
                {ticketTitle}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
              <span className="text-gray-400 font-normal">Dipesan pada</span>
              <span className="text-gray-700 font-medium">{visitDate}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full py-3.5 bg-[#2E9310] hover:bg-[#25770d] text-white font-semibold text-sm rounded-full transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download size={18} />
          <span>Print Tiket</span>
        </button>
      </div>
    </div>
  );
}