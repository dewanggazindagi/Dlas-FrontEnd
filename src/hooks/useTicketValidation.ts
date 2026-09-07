import type { TicketForm, TicketType } from "../types/ticket";

/**
 * Hook untuk validasi form tiket
 */
export const useTicketValidation = () => {
  const validateForm = (
    form: TicketForm,
    type: TicketType
  ): string => {
    if (!form.name.trim()) {
      return "Nama tiket wajib diisi.";
    }

    if (!form.weekdayPrice) {
      return "Harga weekdays wajib diisi.";
    }

    if (!form.weekendPrice) {
      return "Harga weekend wajib diisi.";
    }

    if (!form.status) {
      return "Status tiket wajib dipilih.";
    }

    if (!form.description.trim()) {
      return "Deskripsi tiket wajib diisi.";
    }

    if (type === "package" && form.selectedItems.length === 0) {
      return "Pilih minimal satu wahana untuk tiket paket.";
    }

    return "";
  };

  return { validateForm };
};