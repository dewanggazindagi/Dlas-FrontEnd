import type { ReactNode } from "react";

interface TransactionDetailRowProps {
  label: string;
  value: ReactNode;
  border?: boolean;
}

export default function TransactionDetailRow({
  label,
  value,
  border = true,
}: TransactionDetailRowProps) {
  return (
    <div
      className={`
        flex
        min-h-13
        items-center
        justify-between
        gap-4
        py-3
        ${border ? "border-b border-dashed border-border" : ""}
      `}
    >
      <span className="text-sm text-dark-gray">{label}</span>

      <span className="text-right text-sm text-dark-gray">{value}</span>
    </div>
  );
}
