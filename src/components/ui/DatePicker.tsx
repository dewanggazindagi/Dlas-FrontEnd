import { useEffect, useRef, useState, type ReactNode } from "react";
import { DayPicker } from "react-day-picker";
import { id } from "react-day-picker/locale";

interface Props {
  date?: Date;
  onSelect: (date?: Date) => void;
  children: ReactNode;
  className?: string;
}

export default function DatePicker({ date, onSelect, children, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div onClick={() => setOpen((prev) => !prev)}>{children}</div>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 rounded-2xl border border-border bg-white p-3 shadow-card">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(selected) => {
              onSelect(selected);
              setOpen(false);
            }}
            locale={id}
            required={false}
          />
        </div>
      )}
    </div>
  );
}
