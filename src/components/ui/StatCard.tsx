import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  className?: string;
}

export default function StatCard({
  icon,
  title,
  value,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`flex items-center w-full gap-4 rounded-2xl bg-soft-gray p-5 border border-border${className}`}
    >
      <div className="flex h-12.5 w-12.5 items-center justify-center bg-white rounded-full border border-border">
        {icon}
      </div>

      <div>
        <p className="text-sm font-normal text-gray-500 mb-1">{title}</p>

        <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
      </div>
    </div>
  );
}
