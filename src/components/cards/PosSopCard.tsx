import type { SopItem } from "../../services/data/sopData";
import { Check } from "lucide-react";

interface PosSopCardProps {
  item: SopItem;
  isChecked: boolean;
  onToggle: (id: string) => void;
  isLast?: boolean;
}

export default function PosSopCard({ item, isChecked, onToggle, isLast }: PosSopCardProps) {
  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`flex items-start gap-3.5 px-6 py-4 cursor-pointer select-none transition hover:bg-black/[0.015] ${
        !isLast ? "border-b border-gray-200/70" : ""
      }`}
    >
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition ${
          isChecked
            ? "bg-[#7CB370] text-white border border-[#7CB370]"
            : "bg-white border border-gray-300"
        }`}
      >
        {isChecked && <Check size={13} strokeWidth={3} />}
      </div>

      <div className="flex flex-col">
        <h4 className="text-[13.5px] font-semibold text-gray-800 leading-snug">{item.title}</h4>
        <p className="text-[11.5px] text-gray-500 mt-0.5 leading-snug">{item.description}</p>
      </div>
    </div>
  );
}