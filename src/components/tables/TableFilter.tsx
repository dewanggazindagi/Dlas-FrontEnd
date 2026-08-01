import { List } from "lucide-react";
import Dropdown, { type DropdownOption } from "../ui/Dropdown";

interface Props {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function TableFilter({ options, value, onChange }: Props) {
  const selected = options.find((o) => o.value === value);

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      trigger={
        <>
          <List size={18} />
          <span className="font-semibold">Urutkan :</span>
          <span className="font-semibold">{selected?.label}</span>
        </>
      }
    />
  );
}
