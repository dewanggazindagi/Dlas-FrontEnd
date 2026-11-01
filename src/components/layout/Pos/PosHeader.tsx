import { NavLink } from "react-router-dom";
import { LogOut, CircleUserRound } from "lucide-react";
import Button from "../../ui/Button";
import logo from "../../../assets/images/Logo.webp";
import { useAuth } from "../../../context/AuthContext"; // Import useAuth

const NAV_ITEMS = [
  {
    label: "Daftar Transaksi",
    path: "/pos/transactionlist",
  },
  {
    label: "Layanan Tiket",
    path: "/pos/dashboard", // Disesuaikan dengan URL dashboard POS kamu
  },
];

export default function PosHeader() {
  const { user, logout } = useAuth(); // Ambil user & fungsi logout

  return (
    <header className="h-22.5 w-full px-10 fixed z-99 bg-white">
      <div className="mx-auto h-full flex items-center justify-between">
        <img src={logo} alt="D'Las Logo" className="h-22.5" />

        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/pos/dashboard"}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 rounded-full
              border p-2 border-border"
          >
            <CircleUserRound
              size={30}
              className="text-dark-gray rounded-full bg-border p-1.5"
            />
            <span className="text-sm font-medium">{user?.name || "Loket A"}</span>
          </div>

          <Button
            variant="outline"
            className="p-3.5 hover:bg-danger-soft border-border"
            size="undefined"
            onClick={logout} // Panggil fungsi logout saat diklik
          >
            <LogOut size={18} className="text-danger" />
          </Button>
        </div>
      </div>
    </header>
  );
}