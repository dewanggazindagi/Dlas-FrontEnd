import FormField from "../ui/FormField";

interface TicketDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

/**
 * Component untuk input deskripsi tiket
 */
export default function TicketDescription({
  description,
  onChange,
}: TicketDescriptionProps) {
  return (
    <div className="mt-5">
      <FormField label="Tentang Tiket">
        <textarea
          value={description}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Tambahkan deskripsi tiket"
          className="
            min-h-28.75
            w-full
            resize-none
            rounded-2xl
            border
            border-border
            p-4
            text-sm
            outline-none
            placeholder:text-gray-400
            focus:border-primary
          "
          required
        />
      </FormField>
    </div>
  );
}
