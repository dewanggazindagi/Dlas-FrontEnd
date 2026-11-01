import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";
import "../../styles/dayPicker.css";

interface VisitDatePickerProps {
  selectedDate: Date | string | undefined;
  onDateChange: (date: Date | undefined) => void;
  onSearch?: () => void;
}

export default function VisitDatePicker({
  selectedDate,
  onDateChange,
  onSearch,
}: VisitDatePickerProps) {
  const [open, setOpen] = useState(false);

  // Batas minimum tanggal (hari ini jam 00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Helper parser: Memastikan input dikonversi menjadi Object Date yang valid
  const parseToDate = (dateVal: Date | string | undefined): Date | undefined => {
    if (!dateVal) return undefined;
    if (dateVal instanceof Date && !isNaN(dateVal.getTime())) return dateVal;
    
    const parsed = new Date(dateVal);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  };

  const validDate = parseToDate(selectedDate);

  // Format label tanggal secara aman
  const formattedDate = validDate
    ? validDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : typeof selectedDate === "string" && selectedDate.length > 0
    ? selectedDate
    : "Pilih Tanggal";

  return (
    <div className="relative flex items-center justify-between bg-white rounded-full p-2.5 px-6 border border-gray-100 shadow-sm">
      {/* Trigger Button Pop-up */}
      <div className="flex flex-col">
        <span className="text-[11px] text-gray-400 font-medium">
          Kapan anda berkunjung?
        </span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 mt-0.5 text-left bg-transparent border-none p-0 focus:outline-none cursor-pointer group"
        >
          <Calendar size={16} className="text-gray-500 group-hover:text-gray-800 transition" />
          <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-600 transition">
            {formattedDate}
          </span>
        </button>
      </div>

      {/* Pop-up Kalender DayPicker */}
      {open && (
        <div className="absolute left-0 top-full mt-2 rounded-3xl bg-white shadow-xl border border-gray-100 p-4 z-50">
          <DayPicker
            mode="single"
            animate
            selected={validDate}
            onSelect={(date) => {
              if (date) {
                onDateChange(date);
                setOpen(false);
              }
            }}
            // Nonaktifkan seluruh tanggal sebelum hari ini
            disabled={{ before: today }}
            showOutsideDays={false}
            weekStartsOn={0}
            formatters={{
              formatWeekdayName: (date) =>
                date
                  .toLocaleDateString("id-ID", { weekday: "short" })
                  .toUpperCase()
                  .substring(0, 3),
            }}
            components={{
              Chevron: ({ orientation }) =>
                orientation === "left" ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                ),
            }}
          />
        </div>
      )}
      <button
        type="button"
        onClick={onSearch}
        className="bg-[#2E9310] hover:bg-green-700 text-white font-medium text-xs px-5 py-2.5 rounded-full transition shadow-sm cursor-pointer"
      >
        Cari Tiket
      </button>
    </div>
  );
}