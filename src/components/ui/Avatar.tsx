interface Props {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-[34px] text-t6",
  md: "size-[43px] text-t5 md:size-[50px]",
  lg: "size-[100px] text-h6",
};

export default function Avatar({ name, src, size = "sm", className = "" }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`shrink-0 rounded-full border border-border object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border border-border bg-primary-soft font-semibold text-primary ${sizeClasses[size]} ${className}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
