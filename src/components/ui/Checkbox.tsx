import { Check } from "lucide-react";

interface Props {
  checked: boolean;
  className?: string;
}

export default function Checkbox({ checked, className = "" }: Props) {
  return (
    <div
      className={`flex size-6 shrink-0 items-center justify-center rounded-md border ${
        checked ? "border-primary bg-primary" : "border-border bg-white"
      } ${className}`}
    >
      {checked && <Check size={16} className="text-white" />}
    </div>
  );
}
