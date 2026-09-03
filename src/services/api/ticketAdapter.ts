/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ticket } from "../../types/ticket";

export const mapTicketApiToTicket = (data: any): Ticket => {
  return {
    id: data.id,
    name: data.namaTiket,
    price: Number(data.hargaWeekdays),
    weekdayPrice: Number(data.hargaWeekdays),
    weekendPrice: Number(data.hargaWeekend),
    description: data.deskripsi ?? "",
    status: data.status ?? "",
    isActive: data.status === "Tiket Aktif",

    category:
      data.jenisTiket === "PAKET"
        ? "Paket Hemat"
        : "Regular/Satuan",

    items: data.items ?? [],
    ketentuan: data.ketentuan ?? [],

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