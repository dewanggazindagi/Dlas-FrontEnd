import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QuantityStepper({ value, onChange, min = 1, max = 99, className = "" }: Props) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2 rounded-full border border-border bg-white p-1 drop-shadow-[2px_3px_7px_rgba(0,0,0,0.05)] ${className}`}
    >
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex cursor-pointer items-center justify-center rounded-full bg-soft-gray p-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus size={16} className="text-black" />
      </button>
      <p className="w-2 text-center text-t4 font-semibold text-black">{value}</p>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex cursor-pointer items-center justify-center rounded-full bg-primary p-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={16} className="text-white" />
      </button>
    </div>
  );
}
