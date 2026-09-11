import type { Ticket } from "../../types/ticket";
import Checkbox from "../ui/Checkbox";
import TicketThumbnail from "../ui/TicketThumbnail";

interface Props {
  ticket: Ticket;
  checked: boolean;
  onToggle: (id: string) => void;
}

export default function WahanaSelectItem({ ticket, checked, onToggle }: Props) {
  return (
    <div
      onClick={() => onToggle(ticket.id)}
      className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-border bg-white py-2.5 pr-2.5 pl-4"
    >
      <Checkbox checked={checked} />
      <TicketThumbnail image={ticket.images[0]} alt={ticket.name} />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-t3 font-semibold text-black">{ticket.name}</p>
        <p className="line-clamp-2 text-t5 text-dark-gray">{ticket.description}</p>
      </div>
    </div>
  );
}
