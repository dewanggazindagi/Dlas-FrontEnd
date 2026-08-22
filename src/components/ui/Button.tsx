import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "default" | "lg" | "xl";
  fullWidth?: boolean;
  as?: "button" | "a";
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const sizeClasses = {
  sm: "px-3.5 py-2.5 text-t5 gap-1.5",
  default: "px-5 py-3 text-t4 gap-2",
  lg: "px-5 py-3 text-t4 gap-2 h-12",
  xl: "px-5 py-2 text-t4 gap-2.5 h-14",
};

const variantClasses = {
  primary: "bg-primary border-[1.5px] border-border-button text-white hover:bg-primary-hover",
  outline:
    "bg-white border border-border text-black drop-shadow-[2px_3px_7px_rgba(0,0,0,0.05)] hover:bg-soft-gray",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  fullWidth = false,
  as = "button",
  to,
  href,
  target,
  rel,
  download,
  disabled = false,
  className = "",
  onClick,
  type = "button",
}: Props) {
  const classes = `inline-flex cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a href={href} target={target} rel={rel} download={download} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
