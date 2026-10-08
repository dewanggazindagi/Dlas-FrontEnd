import type { CreateTicketPayload, CreatePackageTicketPayload } from "../../../types/api";

/**
 * Helper untuk membuild FormData dari payload tiket satuan
 * @param payload - Payload tiket satuan
 * @returns FormData object
 */
export const buildTicketFormData = (
  payload: CreateTicketPayload
): FormData => {
  const formData = new FormData();

  // Basic info
  formData.append("namaTiket", payload.namaTiket);
  formData.append("hargaWeekdays", String(payload.hargaWeekdays));
  formData.append("hargaWeekend", String(payload.hargaWeekend));
  formData.append("deskripsi", payload.deskripsi);
  formData.append("status", payload.status);

  // Terms
  payload.ketentuan.forEach((term) => {
    formData.append("ketentuan", term);
  });

  // Images
  payload.gambar.forEach((file) => {
    formData.append("gambar", file);
  });

  return formData;
};

/**
 * Helper untuk membuild FormData dari payload tiket paket
 * @param payload - Payload tiket paket
 * @returns FormData object
 */
export const buildPackageTicketFormData = (
  payload: CreatePackageTicketPayload
): FormData => {
  const formData = buildTicketFormData(payload);

  // Add wahana IDs
  payload.wahanaIds.forEach((id) => {
    formData.append("wahanaIds", id);
  });

  return formData;
};