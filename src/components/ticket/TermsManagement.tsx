import { Plus, Trash2 } from "lucide-react";
import Button from "../ui/Button";

interface TermsManagementProps {
  terms: string[];
  onAddTerm: () => void;
  onTermChange: (index: number, value: string) => void;
  onRemoveTerm: (index: number) => void;
}

/**
 * Component untuk mengelola ketentuan tiket (CRUD)
 */
export default function TermsManagement({
  terms,
  onAddTerm,
  onTermChange,
  onRemoveTerm,
}: TermsManagementProps) {
  return (
    <div className="mt-5 border-t border-border pt-5">
      <label className="mb-4 block text-sm text-gray-500">
        Ketentuan Tiket
      </label>

      <div className="space-y-3">
        {terms.map((term, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type="text"
              value={term}
              onChange={(event) => onTermChange(index, event.target.value)}
              placeholder="Masukan poin ketentuan"
              className="
                h-11
                flex-1
                rounded-full
                border
                border-border
                px-4
                text-sm
                outline-none
                placeholder:text-gray-400
                focus:border-primary
              "
            />

            <button
              type="button"
              onClick={() => onRemoveTerm(index)}
              className="
                text-danger
                transition
                hover:opacity-70
              "
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAddTerm}
        startIcon={<Plus size={18} />}
        className="
          mt-3
          h-10
          rounded-full
          px-4
          font-semibold
        "
      >
        Tambah Ketentuan
      </Button>
    </div>
  );
}
