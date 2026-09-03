import { TicketX } from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import type { Ticket } from "../../types/ticket";

interface DeleteTicketModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onConfirm: (ticket: Ticket) => void;
}

export default function DeleteTicketModal({
  open,
  onClose,
  ticket,
  onConfirm,
}: DeleteTicketModalProps) {
  if (!ticket) return null;

  const handleConfirm = () => {
    onConfirm(ticket);
  };

  return (
    <Modal open={open} onClose={onClose} width="max-w-[398px] p-3">
      <div className="px-4 py-3">
        {/* ICON */}
        <div className="flex justify-center">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-100
            "
          >
            <TicketX size={26} className="text-red-500" strokeWidth={2} />
          </div>
        </div>

        {/* TEXT */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-semibold text-black">
            Apakah anda yakin?
          </h2>

          <p className="mt-2.5 px-2 text-md leading-5 text-dark-gray">
            Jika anda hapus tiket ini, maka data tiket tidak dapat dipulihkan
            kembali.
          </p>

          {/* NAMA TIKET */}
          <p className="mt-3 px-2 text-sm font-semibold text-black">
            "{ticket.name}"
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-8 grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="
              h-9
              w-full
              rounded-full
              border-gray-200
              bg-white
              text-md
              font-semibold
              shadow-sm
              hover:bg-gray-50
            "
          >
            Kembali
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            className="
              h-9
              w-full
              rounded-full
              text-md
              font-semibold
            "
          >
            Ya, Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
}
