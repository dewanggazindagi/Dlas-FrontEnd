import { formatter } from "../../utils/formatter";
import type { RegularTicket } from "../../types/ticket";

interface WahanaSelectionProps {
  regularTickets: RegularTicket[];
  selectedItems: string[];
  loading: boolean;
  onToggleItem: (id: string) => void;
}

/**
 * Component untuk memilih wahana yang termasuk dalam tiket paket
 */
export default function WahanaSelection({
  regularTickets,
  selectedItems,
  loading,
  onToggleItem,
}: WahanaSelectionProps) {
  return (
    <div className="mt-5 border-t border-border pt-5">
      <label className="mb-4 block text-sm text-gray-500">
        Pilih Wahana Yang Termasuk
      </label>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-border
        "
      >
        {loading && (
          <div className="px-4 py-5 text-sm text-gray-500">
            Memuat daftar wahana...
          </div>
        )}

        {!loading && regularTickets.length === 0 && (
          <div className="px-4 py-5 text-sm text-gray-500">
            Belum ada tiket satuan yang dapat dimasukkan ke paket.
          </div>
        )}

        {!loading &&
          regularTickets.map((ticket) => {
            const checked = selectedItems.includes(ticket.id);

            return (
              <label
                key={ticket.id}
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  border-b
                  border-border
                  px-3
                  py-3
                  last:border-b-0
                  hover:bg-gray-50
                "
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleItem(ticket.id)}
                  className="
                    h-4
                    w-4
                    accent-primary
                  "
                />

                <div>
                  <p className="text-sm font-medium">{ticket.namaTiket}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Harga tiket satuan:{" "}
                    {formatter.rupiah(Number(ticket.hargaWeekdays))}
                  </p>
                </div>
              </label>
            );
          })}
      </div>

      {selectedItems.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          {selectedItems.length} wahana dipilih
        </p>
      )}
    </div>
  );
}
