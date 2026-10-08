import TicketCard from "./TicketCard";
import type { Ticket } from "../../types/ticket";

interface TicketListContentProps {
  data: Ticket[];
  loading: boolean;
  itemTickets: Record<string, Ticket>;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

/**
 * Component untuk menampilkan content (loading, list, empty state)
 */
export default function TicketListContent({
  data,
  loading,
  itemTickets,
  onEdit,
  onDelete,
}: TicketListContentProps) {
  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-dark-gray">
        Memuat data tiket...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-dark-gray">
        Belum ada tiket pada kategori ini.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-3
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {data.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          itemTickets={itemTickets}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
