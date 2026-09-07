import { ChevronDown } from "lucide-react";
import FormField from "../ui/FormField";
import type { TicketForm, TextField } from "../../types/ticket";

interface TicketBasicInfoProps {
  form: TicketForm;
  onChange: (field: TextField, value: string) => void;
}

/**
 * Component untuk input informasi dasar tiket
 * (Nama, Harga Weekdays/Weekend, Status)
 */
export default function TicketBasicInfo({
  form,
  onChange,
}: TicketBasicInfoProps) {
  return (
    <div className="mt-7 grid grid-cols-4 gap-3">
      <FormField label="Nama Tiket">
        <input
          type="text"
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Masukan nama tiket"
          className="ticket-input"
          required
        />
      </FormField>

      <FormField label="Harga Weekdays">
        <input
          type="number"
          min="0"
          value={form.weekdayPrice}
          onChange={(event) => onChange("weekdayPrice", event.target.value)}
          placeholder="Masukan harga weekdays"
          className="ticket-input"
          required
        />
      </FormField>

      <FormField label="Harga Weekend">
        <input
          type="number"
          min="0"
          value={form.weekendPrice}
          onChange={(event) => onChange("weekendPrice", event.target.value)}
          placeholder="Masukan harga weekend"
          className="ticket-input"
          required
        />
      </FormField>

      <FormField label="Status">
        <div className="relative">
          <select
            value={form.status}
            onChange={(event) => onChange("status", event.target.value)}
            className="
              h-11
              w-full
              appearance-none
              rounded-full
              border
              border-border
              bg-white
              px-4
              text-sm
              text-gray-500
              outline-none
              focus:border-primary
            "
            required
          >
            <option value="">Pilih Status</option>
            <option value="Tiket Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />
        </div>
      </FormField>
    </div>
  );
}
