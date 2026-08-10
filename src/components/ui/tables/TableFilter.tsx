import { List } from "lucide-react";
import Dropdown, { type DropdownOption } from "../Dropdown";

interface Props {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  showPrefix?: boolean;
}

export default function TableFilter({
  options,
  value,
  onChange,
  showPrefix = true,
}: Props) {
  const selected = options.find((o) => o.value === value);

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      trigger={
        <>
          <List size={18} />

          {showPrefix && <span className="font-semibold">Urutkan :</span>}

          <span className="font-semibold">{selected?.label}</span>
        </>
      }
    />
  );
}
