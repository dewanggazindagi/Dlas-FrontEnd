import clsx from "clsx";

export type TransactionStatus = "Dibayar" | "Menunggu" | "Dibatalkan";

interface BadgeProps {
  status: TransactionStatus;
}

export default function Badge({ status }: BadgeProps) {
  const variants = {
    Dibayar: "bg-primary-soft text-primary",

    Menunggu: "bg-border text-dark-gray",

    Dibatalkan: "bg-danger-soft text-danger",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium",
        variants[status],
      )}
    >
      {status}
    </span>
  );
}
