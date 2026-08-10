import { Trash2 } from "lucide-react";

import type { TableColumn } from "./types";
import type { UserTable } from "../../../types/userTable";

export const getUserColumns = (
  onDelete: (user: UserTable) => void,
): TableColumn<UserTable>[] => [
  {
    key: "id",
    header: "ID Pengguna",
    width: "110px",
  },

  {
    key: "name",
    header: "Nama Pengguna",
    width: "180px",
  },

  {
    key: "email",
    header: "Email",
    width: "250px",
  },

  {
    key: "phone",
    header: "No.HP",
    width: "150px",
  },

  {
    key: "role",
    header: "Role",
    width: "150px",
  },

  {
    key: "password",
    header: "Kata Sandi",
    width: "180px",
  },

  {
    key: "id",
    header: "",
    width: "60px",
    render: (row) => (
      <button
        type="button"
        onClick={() => onDelete(row)}
        className="
          flex
          items-center
          justify-center
          p-1.5
          text-black
          transition
          hover:text-red-500
        "
        aria-label={`Hapus pengguna ${row.name}`}
      >
        <Trash2 size={18} strokeWidth={1.8} />
      </button>
    ),
  },
];
