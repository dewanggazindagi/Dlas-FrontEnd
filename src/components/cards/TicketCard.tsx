import { formatter } from "../../utils/formatter";
import { getImageUrl } from "../../utils/imageUrl";
import Button from "../ui/Button";
import type { Ticket } from "../../types/ticket";

interface TicketCardProps {
  ticket: Ticket;
  itemNames?: Record<string, string>;
  itemTickets?: Record<string, Ticket>;
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
}

export default function TicketCard({
  ticket,
  itemNames = {},
  itemTickets = {},
  onEdit,
  onDelete,
}: TicketCardProps) {
  const originalImageUrl = ticket.gambar?.[0]?.urlGambar;
  const imageUrl = getImageUrl(originalImageUrl);

  const packageItems =
    ticket.category === "Paket Hemat" && Array.isArray(ticket.items) ?
      ticket.items
        .map((itemId) => {
          const id = String(itemId);
          const itemTicket = itemTickets[id];
          const itemName = itemTicket?.name ?? itemNames[id] ?? id;

          return {
            id,
            name: itemName,
            ticket: itemTicket,
          };
        })
        .filter((item) => item.ticket)
    : [];

  const packageImages = packageItems
    .map((item) => {
      const originalUrl = item.ticket?.gambar?.[0]?.urlGambar;
      return getImageUrl(originalUrl);
    })
    .filter((url): url is string => Boolean(url));

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white p-3">
      <div className="flex gap-3">
        {ticket.category === "Paket Hemat" && packageImages.length > 0 ?
          <div className="grid h-35 w-35 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-xl bg-gray-100">
            {packageImages.slice(0, 4).map((src, index) => (
              <div
                key={`${ticket.id}-image-${index}`}
                className="h-full w-full overflow-hidden"
              >
                <img
                  src={src}
                  alt={`${ticket.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/default-ticket.webp";
                  }}
                />
              </div>
            ))}
          </div>
        : <div className="h-35 w-35 shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <img
              src={imageUrl}
              alt={ticket.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                console.error("GAGAL LOAD GAMBAR:", imageUrl);
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/default-ticket.webp";
              }}
            />
          </div>
        }

        <div className="grid min-w-0 flex-1 justify-between">
          <div>
            <h3 className="truncate text-[18px] font-semibold text-gray-900">
              {ticket.name}
            </h3>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                ticket.isActive ?
                  "bg-green-100 text-primary"
                : "bg-gray-100 text-gray-500"
              }`}
            >
              {ticket.isActive ? "Tiket Aktif" : "Tidak Aktif"}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            <span className="text-md font-medium text-black">
              {formatter.rupiah(ticket.price)}
            </span>

            <span className="ml-1 text-xs text-dark-gray">/tiket</span>
          </div>
        </div>
      </div>

      {ticket.category === "Paket Hemat" && packageItems.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-gray-50">
          {packageItems.map((item, index) => (
            <div
              key={`${ticket.id}-${item.id}`}
              className="flex items-center gap-2 border-b border-border px-2 py-2 last:border-b-0"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-dark-gray">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="truncate text-md text-black">{item.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          onClick={() => onDelete?.(ticket)}
          variant="outline"
          size="sm"
          className="h-11 flex-1 border-border font-semibold text-danger hover:bg-danger-soft"
          startIcon={false}
        >
          Hapus Tiket
        </Button>

        <Button
          type="button"
          onClick={() => onEdit?.(ticket)}
          variant="outline"
          size="sm"
          className="h-11 flex-1 border-border font-semibold text-black hover:bg-primary-soft"
          startIcon={false}
        >
          Edit Tiket
        </Button>
      </div>
    </div>
  );
}
