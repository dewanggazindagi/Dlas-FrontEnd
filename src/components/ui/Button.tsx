import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger";
  size?: "xs" | "sm" | "default" | "md" | "lg" | "xl" | "undefined";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
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
  xs: "px-3 py-2 text-xs gap-1.5",
  sm: "px-3.5 py-2.5 text-t5 gap-1.5",
  default: "px-5 py-3 text-t4 gap-2",
  md: "px-5 py-3 text-t4 gap-2",
  lg: "px-5 py-3 text-t4 gap-2 h-12",
  xl: "px-5 py-2 text-t4 gap-2.5 h-14",
  undefined: "",
};

const variantClasses = {
  primary: "bg-primary border-[1.5px] border-border-button text-white hover:bg-primary-hover",
  outline:
    "bg-white border border-border text-black drop-shadow-[2px_3px_7px_rgba(0,0,0,0.05)] hover:bg-soft-gray",
  danger: "bg-danger text-white hover:bg-danger-soft",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  startIcon,
  endIcon,
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
  const classes = `inline-flex cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {startIcon}
      {children}
      {endIcon}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (as === "a" && !disabled) {
    return (
      <a href={href} target={target} rel={rel} download={download} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
