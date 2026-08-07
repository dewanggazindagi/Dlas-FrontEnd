import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";
import "../../styles/dayPicker.css";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Tanggal Pesanan",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          h-11
          px-5
          rounded-full
          bg-white
          border border-border
          shadow-md
          hover:bg-gray-50
        "
      >
        <CalendarDays size={18} />

        <span className="text-sm font-semibold">
          {value ? value.toLocaleDateString("id-ID") : placeholder}
        </span>
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            rounded-3xl
            bg-white
            shadow-xl
            border
            border-border
            p-4
            z-50
          "
        >
          <DayPicker
            mode="single"
            animate
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            showOutsideDays={false}
            weekStartsOn={0}
            formatters={{
              formatWeekdayName: (date) =>
                date
                  .toLocaleDateString("id-ID", {
                    weekday: "short",
                  })
                  .toUpperCase()
                  .substring(0, 3),
            }}
            components={{
              Chevron: ({ orientation }) =>
                orientation === "left" ?
                  <ChevronLeft size={18} />
                : <ChevronRight size={18} />,
            }}
          />
        </div>
      )}
    </div>
  );
}