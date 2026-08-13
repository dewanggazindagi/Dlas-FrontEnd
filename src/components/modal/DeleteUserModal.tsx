import { CircleUserRound } from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import type { UserTable } from "../../types/userTable";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserTable | null;
  onConfirm: (user: UserTable) => void;
}

export default function DeleteUserModal({
  open,
  onClose,
  user,
  onConfirm,
}: DeleteUserModalProps) {
  if (!user) return null;

  const handleConfirm = () => {
    onConfirm(user);
  };

  return (
    <Modal open={open} onClose={onClose} width="max-w-[398px] p-3">
      <div className="px-4 py-3">
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
            <CircleUserRound
              size={26}
              className="text-red-500"
              strokeWidth={2}
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-xl font-semibold text-black">
            Apakah anda yakin?
          </h2>

          <p className="mt-2.5 px-2 text-md leading-5 text-dark-gray">
            Jika anda hapus akun pengguna, maka tidak dapat dipulihkan kembali
          </p>
        </div>

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
