import logo from "../../../assets/images/logo.png";
import Button from "../../ui/Button";

interface Props {
  variant?: "overlay" | "static";
}

export default function PublicHeader({ variant = "static" }: Props) {
  return (
    <header
      className={`relative z-20 flex w-full items-center justify-between px-4 py-4 md:px-[52px] md:py-[10px] ${
        variant === "overlay" ? "md:absolute md:inset-x-0 md:top-0" : "bg-soft-gray"
      }`}
    >
      <img src={logo} alt="D'Las Lembah Asri" className="h-[42px] w-auto md:h-[93.9px]" />
      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="outline" size="sm" className="md:px-5 md:py-3 md:text-t4">
          Masuk
        </Button>
        <Button variant="primary" size="sm" className="md:px-5 md:py-3 md:text-t4">
          Daftar
        </Button>
      </div>
    </header>
  );
}
