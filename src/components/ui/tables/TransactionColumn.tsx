import type { TableColumn } from "./types";
import type { transactionTableData } from "../../../services/data/transactionTableData";
import { formatter } from "../../../utils/formatter";
import Badge from "../Badge";

type Transaction = (typeof transactionTableData)[number];

export const getTransactionColumns = (
  onDetail: (row: Transaction) => void,
): TableColumn<Transaction>[] => [
  {
    key: "id",
    header: "ID Pesanan",
    width: "90px",
  },
  {
    key: "ticket",
    header: "Tiket Dipesan",
    width: "180px",
  },
  {
    key: "customer",
    header: "Dipesan Oleh",
    width: "150px",
  },
  {
    key: "quantity",
    header: "Jumlah Tiket",
    width: "90px",
  },
  {
    key: "paymentMethod",
    header: "Metode",
    width: "110px",
  },
  {
    key: "status",
    header: "Status",
    width: "120px",
    render: (row) => <Badge status={row.status} />,
  },
  {
    key: "totalPayment",
    header: "Total Pembayaran",
    width: "150px",
    render: (row) => formatter.rupiah(row.totalPayment),
  },
  {
    key: "visitDate",
    header: "Berlibur Pada",
    width: "130px",
    render: (row) => formatter.date(row.visitDate),
  },
  {
    key: "orderDate",
    header: "Dipesan Pada",
    width: "130px",
    render: (row) => formatter.date(row.orderDate),
  },
  {
    key: "id",
    header: "",
    width: "80px",
    render: (row) => (
      <button
        onClick={() => onDetail(row)}
        className="font-semibold text-primary hover:underline"
      >
        Detail
      </button>
    ),
  },
];
