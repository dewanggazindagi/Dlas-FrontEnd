import type { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "undefined";
  variant?: "primary" | "outline" | "danger";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  type = "button",
  children,
  size = "sm",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-[14px] py-[9px] text-sm",
    md: "px-5 py-3 text-base",
    undefined: "",
  };

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary-hover disabled:bg--primary-soft disabled:text-white",
    outline:
      "border bg-white text--primary hover:bg--primary-soft",
    danger: "bg-danger text-white hover:bg-danger-soft",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-medium leading-none transition-all 
        duration-200 whitespace-nowrap
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${className}
      `}
    >
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </button>
  );
};

export default Button;
