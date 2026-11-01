import type { RegularTicket } from "../../services/data/posRegularTicketData";
import dlasLogo from "../../assets/images/logo.webp";

interface TicketRegularCardProps {
  ticket: RegularTicket;
  onSelect: (ticket: RegularTicket) => void;
  onDetail?: (ticket: RegularTicket) => void;
}

export default function TicketRegularCard({
  ticket,
  onSelect,
  onDetail,
}: TicketRegularCardProps) {
  if (!ticket) return null;

  if (ticket.isMainTicket) {
    return (
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between h-full min-h-[220px]">
        <div>
          <h3 className="font-semibold text-base text-gray-900 tracking-tight">
            {ticket.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-normal">
            {ticket.description}
          </p>

          <div className="mt-6 flex items-baseline gap-1">
            <span className="font-semibold text-lg text-gray-900">
              Rp{ticket.price?.toLocaleString("id-ID")}
            </span>
            <span className="text-xs text-gray-400 font-normal">/tiket</span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(ticket);
          }}
          className="w-full mt-4 bg-[#2E9310] hover:bg-green-700 text-white py-2.5 rounded-full text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          Pilih & Lanjutkan
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between h-full min-h-[220px]">
      <div className="flex gap-3.5 items-start">
        <div className="w-20 h-20 shrink-0 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex items-center justify-center">
          <img
            src={ticket.image || dlasLogo}
            alt={ticket.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 tracking-tight truncate">
            {ticket.title}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1 leading-snug line-clamp-2 font-normal">
            {ticket.description}
          </p>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-semibold text-base text-gray-900">
              Rp{ticket.price?.toLocaleString("id-ID")}
            </span>
            <span className="text-[11px] text-gray-400 font-normal">/tiket</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onDetail) onDetail(ticket);
          }}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer"
        >
          Lihat Detail
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(ticket);
          }}
          className="w-full bg-[#2E9310] hover:bg-green-700 text-white py-2.5 rounded-full text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          Pilih & Lanjutkan
        </button>
      </div>
    </div>
  );
}