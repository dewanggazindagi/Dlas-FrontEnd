import Modal from "../ui/Modal";
import Button from "../ui/Button";
import TransactionDetailRow from "./TransactionDetailRow";

import { Download, CheckCircle2 } from "lucide-react";

import { formatter } from "../../utils/formatter";
import type { TransactionTable } from "../../types/transactionTable";

interface Props {
  open: boolean;
  onClose: () => void;
  transaction: TransactionTable | null;
}

export default function TransactionDetailModal({
  open,
  onClose,
  transaction,
}: Props) {
  if (!transaction) return null;

  const ticketPrice = transaction.totalPayment / transaction.quantity;

  const ticketStatus =
    transaction.status === "Dibayar" ? "Siap Digunakan"
    : transaction.status === "Menunggu" ? "Belum Dibayar"
    : "Dibatalkan";

  return (
    <Modal open={open} onClose={onClose} width="max-w-md">
      {/* HEADER */}

      <div className="mb-6">
        {transaction.status === "Dibayar" && (
          <div className="flex items-start gap-3">
            <CheckCircle2 size={30} className="text-green-600" />

            <div>
              <h2 className="font-semibold text-xl">Pembayaran Berhasil</h2>

              <p className="text-sm text-dark-gray">
                Tiket sudah siap untuk digunakan
              </p>
            </div>
          </div>
        )}

        {transaction.status === "Menunggu" && (
          <>
            <h2 className="font-semibold text-xl">Menunggu Pembayaran</h2>

            <p className="text-sm text-dark-gray">Selesaikan pembayaran</p>
          </>
        )}

        {transaction.status === "Dibatalkan" && (
          <>
            <h2 className="font-semibold text-xl">Pembelian Dibatalkan</h2>

            <p className="text-sm text-dark-gray">
              Jika sudah dibatalkan, tidak bisa dipulihkan
            </p>
          </>
        )}
      </div>

      {/* QR */}

      {transaction.status === "Dibayar" && (
        <div className="mb-5 rounded-2xl border border-border p-5">
          <img src="/logo.webp" className="mx-auto mb-4 h-14" />

          <img src="/qrcode.png" className="mx-auto mb-4 w-40" />

          <h3 className="text-center font-semibold text-lg">
            {transaction.ticket}
          </h3>

          <p className="text-center text-dark-gray text-sm">
            ID : {transaction.id}
          </p>

          <div className="mt-4 rounded-xl border border-border py-2 text-center font-medium">
            {transaction.quantity} Pengunjung
          </div>
        </div>
      )}

      {/* DETAIL */}

      <div className="rounded-2xl border border-border px-5">
        {transaction.status === "Dibayar" && (
          <TransactionDetailRow
            label="Status Tiket"
            value={
              <span className="text-primary font-semibold">{ticketStatus}</span>
            }
          />
        )}

        <TransactionDetailRow label="ID Pesanan" value={transaction.id} />

        <TransactionDetailRow
          label="Tiket Dipesan"
          value={transaction.ticket}
        />

        <TransactionDetailRow
          label="Dipesan pada"
          value={transaction.orderDate}
        />

        <TransactionDetailRow
          label="Berlibur pada"
          value={transaction.visitDate}
        />

        <TransactionDetailRow
          label="Metode Pembayaran"
          value={transaction.paymentMethod}
        />

        <TransactionDetailRow
          label="Harga Tiket"
          value={
            <>
              x{transaction.quantity} &nbsp;
              {formatter.rupiah(ticketPrice)}
            </>
          }
        />

        <TransactionDetailRow
          label="Total Pembayaran"
          value={
            <span className="font-semibold">
              {formatter.rupiah(transaction.totalPayment)}
            </span>
          }
          border={false}
        />
      </div>

      {/* BUTTON */}

      <div className="mt-6">
        {transaction.status === "Dibayar" && (
          <Button
            variant="primary"
            className="w-full"
            startIcon={<Download size={18} />}
          >
            Print Tiket
          </Button>
        )}

        {transaction.status === "Menunggu" && (
          <Button variant="danger" className="w-full">
            Batalkan Pembelian
          </Button>
        )}
      </div>
    </Modal>
  );
}
