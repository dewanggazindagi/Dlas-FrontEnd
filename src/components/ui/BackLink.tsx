import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
  className?: string;
}

export default function BackLink({ label, to, className = "" }: Props) {
  return (
    <Link to={to} className={`flex cursor-pointer items-center gap-1 text-t4 font-semibold text-primary ${className}`}>
      <ArrowLeft size={20} />
      {label}
    </Link>
  );
}
