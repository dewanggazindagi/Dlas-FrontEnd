import Modal from "../ui/Modal";
import Button from "../ui/Button";
import TransactionDetailRow from "./TransactionDetailRow";
import logo from "../../assets/images/Logo.webp";

import { Download, CircleCheck } from "lucide-react";

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

  const isPaid = transaction.status === "Dibayar";
  const isPending = transaction.status === "Menunggu";
  const isCancelled = transaction.status === "Dibatalkan";

  return (
    <Modal open={open} onClose={onClose} width="max-w-[390px]">
      <div className="p-4">
        <div className="mb-4 pr-8">
          <div className="flex items-center gap-2.5">
            {isPaid && (
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-white
                "
              >
                <CircleCheck size={20} strokeWidth={2.5} />
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold leading-5">
                {isPaid && "Pembayaran Berhasil"}
                {isPending && "Menunggu Pembayaran"}
                {isCancelled && "Pembelian Dibatalkan"}
              </h2>

              <p className="mt-2 text-sm text-dark-gray">
                {isPaid && "Tiket sudah siap untuk digunakan"}

                {isPending && "Selesaikan pembayaran"}

                {isCancelled && "Jika sudah dibatalkan, tidak bisa dipulihkan"}
              </p>
            </div>
          </div>
        </div>

        {isPaid && (
          <div
            className="
              mb-3
              rounded-xl
              border
              border-gray-200
              bg-white
              p-3
            "
          >
            <img
              src={logo}
              alt="D'Las"
              className="
                mx-auto
                mb-3
                h-12
                w-auto
                object-contain
              "
            />

            <div className="flex justify-center">
              <img
                src="/qrcode.png"
                alt="QR Code Tiket"
                className="h-36 w-36 object-contain"
              />
            </div>

            <h3 className="mt-3 text-center text-base font-semibold">
              {transaction.ticket}
            </h3>

            <p className="mt-1 text-center text-xs text-dark-gray">
              ID : {transaction.id}
            </p>

            <div
              className="
                my-4.5
                rounded-lg
                border
                border-gray-200
                py-2
                text-center
                text-sm
                font-medium
              "
            >
              {transaction.quantity} Pengunjung
            </div>

            <div className="px-3">
              <TransactionDetailRow
                label="Status Tiket"
                value={
                  <span className="font-medium text-primary">
                    Siap Digunakan
                  </span>
                }
              />

              <TransactionDetailRow
                label="Tiket Dipesan"
                value={transaction.ticket}
              />

              <TransactionDetailRow
                label="Dipesan pada"
                value={formatter.date(transaction.orderDate)}
              />
            </div>
          </div>
        )}

        {isPending && (
          <div
            className="
            rounded-xl
            border
            border-gray-200
            px-3
          "
          >
            <TransactionDetailRow label="ID Pesanan" value={transaction.id} />

            <TransactionDetailRow
              label="Tiket Dipesan"
              value={transaction.ticket}
            />

            <TransactionDetailRow
              label="Dipesan pada"
              value={formatter.date(transaction.orderDate)}
            />

            <TransactionDetailRow
              label="Berlibur pada"
              value={formatter.date(transaction.visitDate)}
            />

            <TransactionDetailRow
              label="Metode Pembayaran"
              value={transaction.paymentMethod}
            />

            <TransactionDetailRow
              label="Harga Tiket"
              value={
                <div className="flex items-center gap-2">
                  <span>x{transaction.quantity}</span>

                  <span>{formatter.rupiah(ticketPrice)}</span>
                </div>
              }
            />

            <TransactionDetailRow
              label="Total Pembayaran"
              value={
                <span className="font-semibold text-gray-900">
                  {formatter.rupiah(transaction.totalPayment)}
                </span>
              }
              border={false}
            />
          </div>
        )}

        {isCancelled && (
          <div
            className="
            rounded-xl
            border
            border-gray-200
            px-3
          "
          >
            <TransactionDetailRow label="ID Pesanan" value={transaction.id} />

            <TransactionDetailRow
              label="Tiket Dipesan"
              value={transaction.ticket}
            />

            <TransactionDetailRow
              label="Dipesan pada"
              value={formatter.date(transaction.orderDate)}
            />

            <TransactionDetailRow
              label="Berlibur pada"
              value={formatter.date(transaction.visitDate)}
            />

            <TransactionDetailRow
              label="Metode Pembayaran"
              value={transaction.paymentMethod}
            />

            <TransactionDetailRow
              label="Harga Tiket"
              value={
                <div className="flex items-center gap-2">
                  <span>x{transaction.quantity}</span>

                  <span>{formatter.rupiah(ticketPrice)}</span>
                </div>
              }
            />

            <TransactionDetailRow
              label="Total Pembayaran"
              value={
                <span className="font-semibold text-gray-900">
                  {formatter.rupiah(transaction.totalPayment)}
                </span>
              }
              border={false}
            />
          </div>
        )}

        {isPaid && (
          <Button
            variant="primary"
            className="
              mt-3
              h-10
              w-full
              rounded-full
              font-semibold
            "
            startIcon={<Download size={16} />}
          >
            Print Tiket
          </Button>
        )}

        {isPending && (
          <Button
            variant="danger"
            className="
              mt-3
              h-10
              w-full
              rounded-full
              font-semibold
            "
          >
            Batalkan Pembelian
          </Button>
        )}

        {isCancelled && <div className="mt-3" />}
      </div>
    </Modal>
  );
}
