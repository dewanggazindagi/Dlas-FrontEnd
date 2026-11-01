import { CalendarDays } from "lucide-react";
import Button from "./Button";
import DatePicker from "./DatePicker";

interface Props {
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
  onSearch: () => void;
  searchLabel?: string;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function DateSearchBar({
  selectedDate,
  onDateChange,
  onSearch,
  searchLabel = "Cari Tiket Sekarang",
  className = "",
}: Props) {
  const mobileSearchLabel = searchLabel === "Cari Tiket Sekarang" ? "Cari Tiket" : searchLabel;

  return (
    <div
      className={`relative flex w-full items-stretch gap-1.5 rounded-full border border-border bg-white p-1.5 shadow-[2px_3px_7px_rgba(0,0,0,0.05)] md:w-[742px] ${className}`}
    >
      <DatePicker date={selectedDate} onSelect={onDateChange} className="flex-1">
        <button
          type="button"
          className="flex w-full cursor-pointer flex-col items-start gap-1.5 rounded-full bg-white px-5 py-1.5 text-left"
        >
          <span className="text-t6 text-dark-gray md:text-t5">Kapan anda berkunjung?</span>
          <span className="flex items-center gap-2.5">
            <CalendarDays className="size-5 text-black" />
            <span className="text-t4 font-medium text-black md:text-t3">
              {selectedDate ? dateFormatter.format(selectedDate) : "Pilih tanggal"}
            </span>
          </span>
        </button>
      </DatePicker>
      <Button variant="primary" size="default" onClick={onSearch} className="shrink-0">
        <span className="md:hidden">{mobileSearchLabel}</span>
        <span className="hidden md:inline">{searchLabel}</span>
      </Button>
    </div>
  );
}
