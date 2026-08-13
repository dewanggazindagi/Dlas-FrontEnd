import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;

  width?: string;
  closeOnOverlay?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  width = "max-w-md",
  closeOnOverlay = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-9999
        flex
        items-center
        justify-center
        bg-black/30
        px-4
        py-6
      "
      onMouseDown={() => {
        if (closeOnOverlay) {
          onClose();
        }
      }}
    >
      <div
        className={`
          relative
          w-full
          ${width}
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        `}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Close Button */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-10
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-500
            shadow-sm
            transition
            hover:bg-gray-100
            hover:text-gray-800
          "
          aria-label="Tutup modal"
        >
          <X size={15} />
        </button>

        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
