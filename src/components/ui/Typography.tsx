import type { ElementType, ReactNode } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-xl"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption";

type TypographyWeight = "light" | "normal" | "medium" | "semibold" | "bold";

type TypographyColor = "default" | "primary" | "secondary" | "danger" | "white";

interface TypographyProps {
  children: ReactNode;
  as?: ElementType;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-7xl leading-tight",
  h2: "text-6xl leading-tight",
  h3: "text-5xl leading-tight",
  h4: "text-4xl leading-snug",
  h5: "text-3xl leading-snug",
  h6: "text-2xl leading-snug",

  "body-xl": "text-2xl leading-relaxed",
  "body-lg": "text-xl leading-relaxed",
  "body-md": "text-lg leading-relaxed",
  "body-sm": "text-base leading-relaxed",

  caption: "text-sm leading-normal",
};

const weightClasses: Record<TypographyWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorClasses: Record<TypographyColor, string> = {
  default: "text-[var(--color-black)]",
  primary: "text-[var(--color-primary)]",
  secondary: "text-[var(--color-dark-gray)]",
  danger: "text-[var(--color-danger)]",
  white: "text-white",
};

export default function Typography({
  children,
  as,
  variant = "body-md",
  weight = "normal",
  color = "default",
  className = "",
}: TypographyProps) {
  const Component =
    as ?? (variant.startsWith("h") ? (variant as ElementType) : "p");

  return (
    <Component
      className={`
        ${variantClasses[variant]}
        ${weightClasses[weight]}
        ${colorClasses[color]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
