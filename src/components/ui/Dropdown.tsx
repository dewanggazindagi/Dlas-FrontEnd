import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  trigger?: React.ReactNode;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  trigger,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center text-sm gap-1.75 w-full max-w-md rounded-full border border-border bg-white pl-4 pr-3.5 h-11
        "
      >
        {trigger ?? (
          <span className="font-semibold text-sm">{selected?.label}</span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-64
            rounded-3xl
            border
            border-border
            bg-white
            p-3
            z-50
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                w-full
                rounded-2xl
                px-4
                py-3
                text-left
                transition
                text-sm

                ${
                  option.value === value ?
                    "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
