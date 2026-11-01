import { useState } from "react";
import { X, Calendar, Plus, Minus, ChevronDown } from "lucide-react";
import axios from "axios";
import dlasLogo from "../../assets/images/logo.webp";

interface TicketOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData?: {
    id: string;
    title: string;
    price: number;
    description?: string;
    image?: string;
    type?: string;
  };
  visitDate?: Date;
  onSuccessPay?: (summary: any) => void;
}

export default function TicketOrderModal({
  isOpen,
  onClose,
  ticketData,
  visitDate,
  onSuccessPay,
}: TicketOrderModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [officerName, setOfficerName] = useState("");
  const [paymentType, setPaymentType] = useState<"tunai" | "non-tunai">("tunai");
  const [nonCashMethod, setNonCashMethod] = useState("QRIS");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !ticketData) return null;

  const totalPrice = (ticketData.price || 0) * ticketQuantity;

  const formattedDateUI = visitDate
    ? new Date(visitDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const formattedDateISO = visitDate
    ? new Date(visitDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const handleCloseModal = () => {
    setStep(1);
    setIsConfirmed(false);
    onClose();
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      let rawToken =
        localStorage.getItem("accessToken") || localStorage.getItem("token");

      if (rawToken) {
        rawToken = rawToken.replace(/^"(.*)"$/, "$1").trim();
      }

      if (!rawToken) {
        alert("Session login telah habis, silakan login ulang.");
        setLoading(false);
        return;
      }

      const authHeaderValue = rawToken.startsWith("Bearer ")
        ? rawToken
        : `Bearer ${rawToken}`;

      const payload = {
        namaPetugas: officerName.trim() || "Kasir",
        metodePembayaran:
          paymentType === "non-tunai" ? nonCashMethod.toUpperCase() : "TUNAI",
        items: [
          {
            ticketId: ticketData.id,
            tanggalBerkunjung: formattedDateISO,
            jumlah: Number(ticketQuantity),
          },
        ],
      };

      const response = await axios.post(
        "/api/v1/pos/checkout",
        payload,
        {
          headers: {
            Authorization: authHeaderValue,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = response.data;
      const firstTrx = Array.isArray(resData)
        ? resData[0]
        : resData?.data || resData;

      const realTrxId =
        firstTrx?.kodeTransaksi ||
        firstTrx?.idTransaksi ||
        firstTrx?.id ||
        firstTrx?._id ||
        resData?.kodeTransaksi ||
        resData?.id;

      const modalOrderPayload = {
        transactionId: String(realTrxId),
        ticketData: {
          id: ticketData.id,
          title: ticketData.title,
          price: ticketData.price,
        },
        quantity: ticketQuantity,
        totalPrice: totalPrice,
        paymentType: paymentType,
        nonCashMethod: paymentType === "non-tunai" ? nonCashMethod : null,
        visitDate: formattedDateUI,
      };

      // Tutup modal order terlebih dahulu, lalu lempar data ke parent (PosMain)
      handleCloseModal();
      
      if (onSuccessPay) {
        onSuccessPay(modalOrderPayload);
      }
    } catch (error: any) {
      console.error("Gagal POS Checkout:", error.response || error);

      if (error.response?.status === 401) {
        alert(
          "Sesi kamu sudah berakhir (401 Unauthorized). Silakan Log Out lalu Log In kembali untuk mendapatkan token baru."
        );
      } else {
        const backendMsg = error.response?.data?.message;
        alert(
          `Gagal memproses transaksi: ${
            Array.isArray(backendMsg)
              ? backendMsg.join(", ")
              : backendMsg || error.message
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] w-full max-w-[420px] p-6 shadow-2xl relative my-auto space-y-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Pesan Tiket
          </h2>
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 block">
                  Nama Petugas Loket
                </label>
                <input
                  type="text"
                  placeholder="Masukan nama anda"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#2E9310]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 block">
                  Kapan anda berlibur?
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-900">
                    {formattedDateUI}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-gray-900">
                  Jumlah tiket yang dibeli
                </span>
                <div className="flex items-center gap-3 bg-gray-100/70 p-1 rounded-full border border-gray-200/60">
                  <button
                    type="button"
                    onClick={() =>
                      setTicketQuantity((prev) => Math.max(1, prev - 1))
                    }
                    disabled={ticketQuantity <= 1}
                    className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center font-semibold text-xs text-gray-900">
                    {ticketQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTicketQuantity((prev) => prev + 1)}
                    className="w-7 h-7 rounded-full bg-[#2E9310] flex items-center justify-center text-white hover:bg-[#25770d] transition cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Harga Tiket Paket</span>
                  <div className="flex items-center gap-3">
                    <span>x{ticketQuantity}</span>
                    <span className="font-medium text-gray-600">
                      Rp{totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-gray-200 flex items-center justify-between">
                  <span className="text-gray-400 font-medium">
                    Total Pembayaran
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 space-y-2.5">
                <h4 className="text-xs font-bold text-gray-900">
                  Ketentuan Tiket
                </h4>
                <div className="space-y-2 text-[11px] text-gray-500">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-400 shrink-0">
                      01
                    </span>
                    <p className="pt-0.5 leading-tight">
                      Maksimal anda memasuki area D'las untuk tiket paket
                      hemat yaitu pukul 15.00
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-400 shrink-0">
                      02
                    </span>
                    <p className="pt-0.5 leading-tight">
                      Pembelian tiket paket sudah termasuk tiket masuk area
                      D'las Lembah Asri
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-400 shrink-0">
                      03
                    </span>
                    <p className="pt-0.5 leading-tight">
                      Tiket tidak dapat digunakan setelah tanggal berlibur
                      yang anda isi/tiket sudah digunakan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#82C366] hover:bg-[#2E9310] text-white text-sm font-semibold rounded-full transition cursor-pointer mt-2"
            >
              Pesan Sekarang
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="p-3.5 border border-gray-200/80 rounded-2xl flex items-center gap-3.5 bg-white">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                <img
                  src={ticketData.image || dlasLogo}
                  alt={ticketData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {ticketData.title}
                </h3>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  {ticketData.description ||
                    "Penjelasan singkat tiket wahana D'las"}
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-semibold text-xs text-gray-900">
                    Rp{ticketData.price?.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    /tiket
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200/80 rounded-2xl space-y-3 bg-white">
              <label className="text-[11px] font-medium text-gray-400 block">
                Jenis Pembayaran
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentType"
                    value="tunai"
                    checked={paymentType === "tunai"}
                    onChange={() => setPaymentType("tunai")}
                    className="w-4 h-4 accent-[#2E9310] cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-gray-900">
                    Tunai
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentType"
                    value="non-tunai"
                    checked={paymentType === "non-tunai"}
                    onChange={() => setPaymentType("non-tunai")}
                    className="w-4 h-4 accent-[#2E9310] cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-gray-900">
                    Non-Tunai
                  </span>
                </label>
              </div>

              {paymentType === "non-tunai" && (
                <div className="pt-2 space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 block">
                    Metode Non-Tunai
                  </label>
                  <div className="relative">
                    <select
                      value={nonCashMethod}
                      onChange={(e) => setNonCashMethod(e.target.value)}
                      className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-[#2E9310] cursor-pointer pr-10"
                    >
                      <option value="QRIS">QRIS Mandiri</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border border-gray-200/80 rounded-2xl space-y-3 bg-white text-xs">
              <div className="flex items-center justify-between text-gray-500">
                <span>Berlibur pada</span>
                <span className="text-gray-900 font-medium">
                  {formattedDateUI}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-500">
                <span>Harga Tiket</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">x{ticketQuantity}</span>
                  <span className="text-gray-500 font-medium">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
                <span className="text-gray-500 font-medium">
                  Total Pembayaran
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer px-1">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="w-4 h-4 rounded accent-[#2E9310] cursor-pointer"
              />
              <span className="text-xs text-gray-500 font-normal">
                Saya sudah memastikan jumlah pembayaran benar
              </span>
            </label>

            <button
              type="button"
              disabled={!isConfirmed || loading}
              onClick={handlePay}
              className={`w-full py-3.5 rounded-full text-sm font-semibold transition shadow-sm ${
                isConfirmed && !loading
                  ? "bg-[#82C366] hover:bg-[#2E9310] text-white cursor-pointer"
                  : "bg-[#82C366]/50 text-white/80 cursor-not-allowed"
              }`}
            >
              {loading ? "Memproses..." : "Sudah Melakukan Pembayaran"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}