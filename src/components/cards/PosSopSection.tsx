import { useState } from "react";
import type { SopItem } from "../../services/data/sopData";
import { SOP_ITEMS } from "../../services/data/sopData";
import PosSopCard from "./PosSopCard";

interface PosSopSectionProps {
  onComplete: () => void;
}

export default function PosSopSection({ onComplete }: PosSopSectionProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Fungsi untuk handle "Checklist Semua" / "Batalkan Semua"
  const handleToggleAll = () => {
    if (checkedIds.length === SOP_ITEMS.length) {
      setCheckedIds([]); // Kalau semua sudah dicentang, kosongkan
    } else {
      setCheckedIds(SOP_ITEMS.map((item) => item.id)); // Kalau belum, centang semua ID
    }
  };

  const isAllChecked = checkedIds.length === SOP_ITEMS.length;

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Persiapan Sebelum Melayani
        </h1>
        <p className="text-sm text-gray-500 mt-1.5 font-normal">
          Checklist beberapa point jika sudah anda laksanakan
        </p>
      </div>

      {/* Tombol Checklist Semua */}
      <div className="w-full max-w-[500px] flex justify-end mb-3 px-1">
        <button
          type="button"
          onClick={handleToggleAll}
          className="text-xs font-semibold text-[#2E9310] hover:text-[#25770d] transition cursor-pointer flex items-center gap-1.5"
        >
          <span>{isAllChecked ? "Batalkan Semua" : "Checklist Semua"}</span>
        </button>
      </div>

      <div className="w-full max-w-[500px] bg-[#F2F4F7] rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {SOP_ITEMS.map((item: SopItem, index: number) => (
          <PosSopCard
            key={item.id}
            item={item}
            isChecked={checkedIds.includes(item.id)}
            onToggle={handleToggle}
            isLast={index === SOP_ITEMS.length - 1}
          />
        ))}
      </div>

      <div className="w-full max-w-[500px] mt-6">
        <button
          type="button"
          disabled={!isAllChecked}
          onClick={onComplete}
          className={`w-full py-3 text-white text-sm font-semibold rounded-full transition-all duration-200 ${
            isAllChecked
              ? "bg-[#2E9310] hover:bg-[#25770d] cursor-pointer shadow-md"
              : "bg-[#2E9310]/40 cursor-not-allowed text-white/80"
          }`}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}