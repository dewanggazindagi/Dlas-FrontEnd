interface Props {
  number: string;
  children: string;
  variant?: "default" | "recommend";
  className?: string;
}

const badgeVariantClasses = {
  default: "border-border bg-soft-gray text-dark-gray",
  recommend: "border-primary-soft bg-primary-soft text-primary",
};

export default function NumberedPoint({ number, children, variant = "default", className = "" }: Props) {
  return (
    <div className={`flex w-full items-start gap-2.5 ${className}`}>
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${badgeVariantClasses[variant]}`}
      >
        <span className="text-t6 font-semibold md:text-t5">{number}</span>
      </div>
      <p className="flex-1 text-t5 text-dark-gray md:text-t4">{children}</p>
    </div>
  );
}
