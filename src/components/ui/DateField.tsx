import { CalendarDays } from "lucide-react";
import DatePicker from "./DatePicker";
import { formatter } from "../../utils/formatter";

interface Props {
  label: string;
  date?: Date;
  onDateChange: (date?: Date) => void;
  placeholder?: string;
  className?: string;
}

export default function DateField({ label, date, onDateChange, placeholder = "Pilih tanggal", className = "" }: Props) {
  return (
    <div className={`flex w-full flex-col items-start gap-2.5 ${className}`}>
      <p className="text-t5 text-dark-gray">{label}</p>
      <DatePicker date={date} onSelect={onDateChange} className="w-full">
        <button
          type="button"
          className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-5"
        >
          <CalendarDays size={20} className="shrink-0 text-black" />
          <span className="flex-1 text-left text-t4 font-medium text-black">
            {date ? formatter.dateLong(date) : placeholder}
          </span>
        </button>
      </DatePicker>
    </div>
  );
}
