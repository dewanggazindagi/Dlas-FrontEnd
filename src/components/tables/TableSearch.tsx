import { Search } from "lucide-react";

interface TableSearchProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function TableSearch({
  value,
  placeholder = "Cari...",
  onChange,
}: TableSearchProps) {
  return (
    <div className="flex items-center gap-1.75 w-full max-w-xs rounded-full border border-border bg-white focus:border-primary pl-5.25">
      <Search size={18} className=" text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          text-sm
          outline-none
          transition
        "
      />
    </div>
  );
}
