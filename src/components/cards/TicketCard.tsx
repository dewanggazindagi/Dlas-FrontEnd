import type { Ticket } from "../../types/ticket";
import { formatter } from "../../utils/formatter";
import Button from "../ui/Button";
import TicketThumbnail from "../ui/TicketThumbnail";

interface Props {
  ticket: Ticket;
  onDetailClick?: (ticket: Ticket) => void;
}

export default function TicketCard({ ticket, onDetailClick }: Props) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-border bg-white p-2.5">
      <div className="flex w-full items-start gap-4">
        <TicketThumbnail image={ticket.images[0]} alt={ticket.name} />
        <div className="flex flex-1 flex-col justify-between self-stretch py-1">
          <div className="flex flex-col gap-1">
            <p className="text-t3 font-semibold text-black">{ticket.name}</p>
            <p className="line-clamp-2 text-t5 text-dark-gray">{ticket.description}</p>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-t4 font-medium text-black">{formatter.rupiah(ticket.price)}</p>
            <p className="text-t5 text-dark-gray">/tiket</p>
          </div>
        </div>
      </div>
      <Button to={`/tiket/${ticket.id}`} variant="outline" size="sm" fullWidth onClick={() => onDetailClick?.(ticket)}>
        Lihat Detail Tiket
      </Button>
    </div>
  );
}
