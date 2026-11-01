import type { TableColumn } from "./types";
<<<<<<< HEAD
=======
import type { TopTicket } from "../../../types/dashboard";
>>>>>>> arthur/main
import { formatter } from "../../../utils/formatter";
import type { TopTicket } from "../../../types/dashboard";

export const columns: TableColumn<TopTicket>[] = [
  {
    key: "idTiket",
    header: "ID Tiket",
    width: "120px",
  },
  {
<<<<<<< HEAD
    key: "namaTiket", 
    header: "Nama Tiket",
  },
  {
    key: "kategori", 
=======
    key: "namaTiket",
    header: "Nama Tiket",
  },
  {
    key: "kategori",
>>>>>>> arthur/main
    header: "Kategori",
  },
  {
    key: "tiketTerjual",
    header: "Tiket Terjual",
  },
  {
    key: "pendapatanNonTunai",
    header: "Pendapatan Non-Tunai",
<<<<<<< HEAD
    render: (row) => formatter.rupiah(row.pendapatanNonTunai), 
=======
    render: (row) => formatter.rupiah(row.pendapatanNonTunai),
>>>>>>> arthur/main
  },
  {
    key: "pendapatanTunai",
    header: "Pendapatan Tunai",
    render: (row) => formatter.rupiah(row.pendapatanTunai),
  },
  {
    key: "totalPendapatan",
    header: "Total Pendapatan",
    render: (row) => formatter.rupiah(row.totalPendapatan),
  },
];