import { Trash2 } from "lucide-react";

import type { TableColumn } from "./types";
import type { userTableData } from "../../../services/data/userTableData";

type User = (typeof userTableData)[number];

export const getUserColumns = (
  onDelete: (user: User) => void,
): TableColumn<User>[] => [
  {
    key: "id",
    header: "ID Pengguna",
    width: "100px",
  },
  {
    key: "name",
    header: "Nama Pengguna",
    width: "160px",
  },
  {
    key: "email",
    header: "Email",
    width: "230px",
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
    width: "160px",
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
          h-7
          w-7
          items-center
          justify-center
          rounded-md
          text-dark-gray
          transition
          hover:bg-danger-soft
          hover:text-danger
        "
        aria-label={`Hapus pengguna ${row.name}`}
      >
        <Trash2 size={18} />
      </button>
    ),
  },
];
