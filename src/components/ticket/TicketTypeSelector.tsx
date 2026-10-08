import type { TicketType } from "../../types/ticket";
import Button from "../../components/ui/Button";

interface TicketTypeSelectorProps {
  type: TicketType;
  onTypeChange: (type: TicketType) => void;
}

/**
 * Component untuk memilih tipe tiket (Paket atau Satuan)
 */
export default function TicketTypeSelector({
  type,
  onTypeChange,
}: TicketTypeSelectorProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-1
        rounded-full
        border
        border-border
        bg-white
        p-1
        shadow-md
      "
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onTypeChange("package")}
        className={`h-11 w-full ${
          type === "package" ?
            "border border-border bg-dark-gray font-semibold text-black"
          : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
        }`}
      >
        Tiket Paket Hemat
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onTypeChange("regular")}
        className={`h-11 w-full ${
          type === "regular" ?
            "border border-border bg-dark-gray font-semibold text-black"
          : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
        }`}
      >
        Tiket Regular/Satuan
      </Button>
    </div>
  );
}
