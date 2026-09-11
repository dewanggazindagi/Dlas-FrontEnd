import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
}

export default function TextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  autoComplete,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex w-full flex-col items-start gap-2.5 ${className}`}>
      <p className="text-t5 text-dark-gray">{label}</p>
      <div className="flex h-12 w-full items-center gap-2 rounded-full border border-border bg-white px-5">
        <input
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full flex-1 text-t4 text-black placeholder:text-dark-gray focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex shrink-0 cursor-pointer items-center justify-center text-dark-gray"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
