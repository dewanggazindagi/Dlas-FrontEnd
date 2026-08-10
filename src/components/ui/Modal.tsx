import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  width = "max-w-lg",
  showCloseButton = true,
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
      onClick={() => {
        if (closeOnOverlay) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative
          w-full
          ${width}
          rounded-3xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            {title ?
              <h2 className="text-xl font-semibold">{title}</h2>
            : <div />}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
