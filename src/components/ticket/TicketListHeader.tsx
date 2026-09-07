import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

type Category = "Paket Hemat" | "Regular/Satuan";

interface TicketListHeaderProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

/**
 * Component untuk header section (tab + tombol tambah)
 */
export default function TicketListHeader({
  category,
  onCategoryChange,
}: TicketListHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-center justify-between">
      {/* CATEGORY TABS */}
      <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange("Paket Hemat")}
          className={`
            h-11
            ${
              category === "Paket Hemat" ?
                "border border-border bg-dark-gray font-semibold text-black"
              : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }
          `}
        >
          Tiket Paket Hemat
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange("Regular/Satuan")}
          className={`
            h-11
            ${
              category === "Regular/Satuan" ?
                "border border-border bg-dark-gray font-semibold text-black"
              : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }
          `}
        >
          Tiket Regular/Satuan
        </Button>
      </div>

      {/* ADD BUTTON */}
      <Button
        type="button"
        variant="primary"
        size="sm"
        className="h-11 font-semibold"
        onClick={() => navigate("/admin/ticket/add")}
      >
        Tambah Tiket
      </Button>
    </div>
  );
}
