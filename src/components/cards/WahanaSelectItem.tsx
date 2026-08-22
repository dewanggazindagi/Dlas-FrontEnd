import type { Ticket } from "../../types/ticket";
import Checkbox from "../ui/Checkbox";

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
      <div className="relative size-[120px] shrink-0">
        <div className="absolute top-1/2 left-1/2 h-[104px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-soft-gray shadow-[2px_4px_24px_0px_rgba(0,0,0,0.1)]" />
        <div className="absolute top-0 left-1/2 h-[120px] w-[105px] -translate-x-1/2 overflow-hidden rounded-xl border-[1.5px] border-black/4">
          <img src={ticket.image} alt={ticket.name} className="size-full object-cover" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-t3 font-semibold text-black">{ticket.name}</p>
        <p className="line-clamp-2 text-t5 text-dark-gray">{ticket.description}</p>
      </div>
    </div>
  );
}
