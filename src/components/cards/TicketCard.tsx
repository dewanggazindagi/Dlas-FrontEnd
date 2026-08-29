import { formatter } from "../../utils/formatter";
import Button from "../ui/Button";
import type { Ticket } from "../../types/ticket";

interface TicketCardProps {
  ticket: Ticket;

  itemNames?: Record<string, string>;

  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
}

export default function TicketCard({
  ticket,
  itemNames = {},
  onEdit,
  onDelete,
}: TicketCardProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-white
        p-3
      "
    >
      <div className="flex gap-3">
        <div
          className="
            h-35
            w-35
            shrink-0
            overflow-hidden
            rounded-xl
            bg-gray-100
          "
        >
          <div
            className="
    h-35
    w-35
    shrink-0
    overflow-hidden
    rounded-xl
    bg-gray-100
  "
          >
            <img
              src={
                ticket.gambar?.[0]?.url ??
                ticket.gambar?.[0]?.gambar ??
                "/images/default-ticket.webp"
              }
              alt={ticket.name}
              className="
      h-full
      w-full
      object-cover
    "
            />
          </div>
        </div>

        <div className="min-w-0 grid justify-between">
          <div>
            <h3
              className="
              truncate
              text-[18px]
              font-semibold
              text-gray-900
            "
            >
              {ticket.name}
            </h3>

            <span
              className={`
                  mt-2
                inline-flex
                rounded-full
                px-3 py-1
                text-xs
                font-medium
                ${
                  ticket.isActive ?
                    "bg-green-100 text-primary"
                  : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {ticket.isActive ? "Tiket Aktif" : "Tidak Aktif"}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            <span className="text-md font-medium text-black">
              {formatter.rupiah(ticket.price)}
            </span>

            <span className="text-xs text-dark-gray ml-1">/tiket</span>
          </div>
        </div>
      </div>

      {ticket.category === "Paket Hemat" &&
        ticket.items &&
        ticket.items.length > 0 && (
          <div
            className="
              mt-3
              overflow-hidden
              rounded-xl
              border
              border-border
              bg-gray-50
            "
          >
            {ticket.items.map((itemId, index) => (
              <div
                key={`${ticket.id}-${itemId}`}
                className="
                    flex
                    items-center
                    gap-2
                    border-b
                    border-border
                    px-2
                    py-2
                    last:border-b-0
                  "
              >
                <span
                  className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border
                      bg-white
                      text-xs
                      font-semibold
                      text-dark-gray
                    "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="
                      truncate
                      text-md
                      text-black
                    "
                >
                  {itemNames[itemId] ?? itemId}
                </span>
              </div>
            ))}
          </div>
        )}

      <div className="mt-3 flex gap-2">
        <Button
          onClick={() => onDelete?.(ticket)}
          variant="outline"
          size="sm"
          className="
            h-11
            flex-1
            border-border
            font-semibold
            text-danger
            hover:bg-danger-soft
          "
          startIcon={false}
        >
          Hapus Tiket
        </Button>

        <Button
          onClick={() => onEdit?.(ticket)}
          variant="outline"
          size="sm"
          className="
            h-11
            flex-1
            border-border
            font-semibold
            text-black
            hover:bg-primary-soft
          "
          startIcon={false}
        >
          Edit Tiket
        </Button>
      </div>
    </div>
  );
}
