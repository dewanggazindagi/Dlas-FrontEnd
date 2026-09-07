/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Payload untuk membuat tiket satuan
 */
export interface CreateTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: File[];
}

/**
 * Payload untuk membuat tiket paket
 */
export interface CreatePackageTicketPayload extends CreateTicketPayload {
  wahanaIds: string[];
}

/**
 * Response dari API tiket
 */
export interface TicketResponse {
  id: string;
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  jenisTiket: string;
  [key: string]: any;
}