import type { TableColumn } from "../tables/types";
import { transactionData } from "../../services/data/transactionData";
import { formatter } from "../../utils/formatter";

type Ticket = (typeof transactionData)[number];

export const columns: TableColumn<Ticket>[] = [
  {
    key: "id",
    header: "ID Tiket",
    width: "120px",
  },
  {
    key: "ticket",
    header: "Nama Tiket",
  },
  {
    key: "category",
    header: "Kategori",
  },
  {
    key: "sold",
    header: "Tiket Terjual",
  },
  {
    key: "nonCash",
    header: "Pendapatan Non-Tunai",
    render: (row) => formatter.rupiah(row.nonCash),
  },
  {
    key: "cash",
    header: "Pendapatan Tunai",
    render: (row) => formatter.rupiah(row.cash),
  },
  {
    key: "total",
    header: "Total Pendapatan",
    render: (row) => formatter.rupiah(row.total),
  },
];
