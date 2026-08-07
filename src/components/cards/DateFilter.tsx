import { CalendarDays } from "lucide-react";
import Dropdown, { type DropdownOption } from "../ui/Dropdown";

interface DateFilterProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

export default function DateFilter({
  value,
  options,
  onChange,
}: DateFilterProps) {
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      trigger={
        <>
          <CalendarDays size={18} />
          <span className="font-semibold">
            {options.find((item) => item.value === value)?.label}
          </span>
        </>
      }
    />
  );
}
