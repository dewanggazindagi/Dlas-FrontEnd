import { NavLink } from "react-router-dom";
import { LogOut, CircleUserRound } from "lucide-react";
import Button from "../../ui/Button";
import logo from "../../../assets/images/Logo.webp";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Daftar Transaksi",
    path: "/admin/transaksi",
  },
  {
    label: "Pengguna",
    path: "/admin/pengguna",
  },
  {
    label: "Tiket",
    path: "/admin/tiket",
  },
  {
    label: "Konten Website",
    path: "/admin/konten",
  },
];

export default function AdminHeader() {
  return (
    <header className="h-22.5 w-full px-10 fixed z-100 bg-white">
      <div className="mx-auto h-full flex items-center justify-between">
        <img src={logo} alt="D'Las Logo" className="h-22.5" />

        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                text-sm
                font-medium
                transition
                ${
                  isActive ? "text-primary" : "text-gray-500 hover:text-primary"
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
            <span className="text-sm font-medium">Admin</span>
          </div>

          <Button
            variant="outline"
            className="p-3.5 hover:bg-danger-soft border-border"
            size="undefined"
          >
            <LogOut size={18} className="text-danger" />
          </Button>
        </div>
      </div>
    </header>
  );
}
