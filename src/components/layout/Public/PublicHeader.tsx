import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import { useAuth } from "../../../hooks/useAuth";

interface Props {
  variant?: "overlay" | "static";
}

export default function PublicHeader({ variant = "static" }: Props) {
  const { user, isAuthenticated } = useAuth();

  return (
    <header
      className={`relative z-20 flex w-full items-center justify-between px-4 py-4 md:px-[52px] md:py-[10px] ${
        variant === "overlay" ? "md:absolute md:inset-x-0 md:top-0" : "bg-soft-gray"
      }`}
    >
      <img src={logo} alt="D'Las Lembah Asri" className="h-[42px] w-auto md:h-[93.9px]" />
      {isAuthenticated && user ? (
        <div className="flex items-center gap-2">
          <Button
            to="/pesanan-anda"
            variant="outline"
            size="sm"
            startIcon={<FileText size={18} />}
            className="md:px-5 md:py-3 md:text-t4"
          >
            Pesanan Anda
          </Button>
          <Link to="/profile" className="cursor-pointer">
            <Avatar name={user.name} src={user.avatar} size="md" />
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 md:gap-3">
          <Button to="/login" variant="outline" size="sm" className="md:px-5 md:py-3 md:text-t4">
            Masuk
          </Button>
          <Button to="/register" variant="primary" size="sm" className="md:px-5 md:py-3 md:text-t4">
            Daftar
          </Button>
        </div>
      )}
    </header>
  );
}
