/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Gambar yang terkait dengan tiket
 */
export interface TicketGambar {
  id: string;
  urlGambar: string;
}

/**
 * Ketentuan yang terkait dengan tiket
 */
export interface TicketKetentuan {
  id: string;
  tipe: string;
  tiketId: string;
  deskripsi: string;
  urutan: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface untuk Wahana Satuan yang berada di dalam Tiket Paket
 */
export interface WahanaSatuanInPackage {
  id: string;
  namaTiket: string;
  hargaWeekdays: string | number;
  hargaWeekend: string | number;
  deskripsi: string;
  status: string;
  jenisTiket: string;
  gambar: TicketGambar[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Ticket {
  id: string;
  namaTiket: string;
  hargaWeekdays: string | number;
  hargaWeekend: string | number;
  deskripsi: string;
  status: string;
  jenisTiket: "SATUAN" | "PAKET" | "Paket Hemat" | "Regular/Satuan" | string;
  wahanaIds?: string[]; 
  wahanaSatuan?: any[]; // Tambahkan baris ini untuk menampung relasi dari backend
  ketentuan: TicketKetentuan[]; 
  gambar: TicketGambar[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Tipe tiket yang tersedia untuk form
 */
export type TicketType = "package" | "regular";

/**
 * Interface untuk form tiket
 */
export interface TicketForm {
  name: string;
  weekdayPrice: string;
  weekendPrice: string;
  status: string;
  description: string;
  selectedItems: string[];
  terms: string[];
  images: File[];
}

/**
 * Interface untuk tiket regular/satuan (dari API)
 */
export interface RegularTicket {
  id: string;
  namaTiket: string;
  hargaWeekdays: string | number;
  jenisTiket: string;
}

/**
 * Tipe untuk field text yang dapat diubah
 */
export type TextField =
  | "name"
  | "weekdayPrice"
  | "weekendPrice"
  | "status"
  | "description";