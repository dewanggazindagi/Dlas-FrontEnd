import type { TableColumn } from "./types";
import { formatter } from "../../../utils/formatter";
import type { TopTicket } from "../../../types/dashboard";

export const columns: TableColumn<TopTicket>[] = [
  {
    key: "idTiket",
    header: "ID Tiket",
    width: "120px",
  },
  {
    key: "namaTiket", 
    header: "Nama Tiket",
  },
  {
    key: "kategori", 
    header: "Kategori",
  },
  {
    key: "tiketTerjual",
    header: "Tiket Terjual",
  },
  {
    key: "pendapatanNonTunai",
    header: "Pendapatan Non-Tunai",
    render: (row) => formatter.rupiah(row.pendapatanNonTunai), 
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