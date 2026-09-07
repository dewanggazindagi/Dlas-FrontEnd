import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

/**
 * Reusable form field component dengan label
 */
export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-500">{label}</label>
      {children}
    </div>
  );
}
