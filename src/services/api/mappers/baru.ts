/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ticket } from "../../../types/ticket";

/**
 * Map data dari API ke interface Ticket
 * @param data - Raw data dari API
 * @returns Ticket object yang sudah dimapping
 */
export const mapTicketApiToTicket = (data: any): Ticket => {
  return {
    id: data.id,
    namaTiket: data.namaTiket,
    hargaWeekdays: Number(data.hargaWeekdays),
    hargaWeekend: Number(data.hargaWeekend),
    deskripsi: data.deskripsi ?? "",
    status: data.status ?? "",
    isActive: data.status === "Tiket Aktif",
    jenisTiket:
      data.jenisTiket === "PAKET"
        ? "Paket Hemat"
        : "Regular/Satuan",
    wahanaIds: data.wahanaIds ?? data.items ?? [],
    ketentuan: Array.isArray(data.ketentuan)
      ? data.ketentuan
      : [],
    gambar: Array.isArray(data.gambar)
      ? data.gambar.map((item: any) => ({
          id: item.id,
          urlGambar: item.urlGambar,
        }))
      : [],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

/**
 * Map array data dari API ke array Ticket
 * @param dataArray - Array raw data dari API
 * @returns Array of Ticket objects
 */
export const mapTicketArrayApiToTickets = (dataArray: any[]): Ticket[] => {
  if (!Array.isArray(dataArray)) {
    return [];
  }
  return dataArray.map(mapTicketApiToTicket);
};