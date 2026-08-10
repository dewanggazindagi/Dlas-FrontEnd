interface TransactionDetailRowProps {
  label: string;
  value: React.ReactNode;
  border?: boolean;
}

export default function TransactionDetailRow({
  label,
  value,
  border = true,
}: TransactionDetailRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        border ? "border-b border-dashed border-border" : ""
      }`}
    >
      <p className="text-dark-gray text-sm">{label}</p>

      <div className="text-sm font-medium text-right">{value}</div>
    </div>
  );
}
