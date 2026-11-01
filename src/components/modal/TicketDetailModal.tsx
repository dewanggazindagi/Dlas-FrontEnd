import { X } from "lucide-react";

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData?: {
    id: string;
    title: string;
    price: number;
    description?: string;
  };
  onContinueToOrder: () => void;
}

export default function TicketDetailModal({
  isOpen,
  onClose,
  ticketData,
  onContinueToOrder,
}: TicketDetailModalProps) {
  if (!isOpen || !ticketData) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] w-full max-w-[420px] p-6 shadow-2xl relative my-auto border border-gray-100">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Detail Tiket
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title & Price */}
        <div className="space-y-1 mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {ticketData.title}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">
              Rp{ticketData.price?.toLocaleString("id-ID")}
            </span>
            <span className="text-xs text-gray-400 font-normal">/tiket</span>
          </div>
        </div>

        {/* Description Text */}
        <div className="space-y-3 mb-6 text-xs text-gray-500 leading-relaxed font-normal">
          <p>
            {ticketData.description ||
              "Menawarkan pengalaman rekreasi lengkap dengan tiket masuk utama yang mencakup berbagai wahana menarik dan aktivitas seru untuk menambah kenyamanan selama berwisata."}
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onContinueToOrder}
          className="w-full py-3.5 bg-[#2E9310] hover:bg-[#25770d] text-white font-semibold text-sm rounded-full transition shadow-xs cursor-pointer"
        >
          Pilih & Lanjutkan
        </button>

      </div>
    </div>
  );
}