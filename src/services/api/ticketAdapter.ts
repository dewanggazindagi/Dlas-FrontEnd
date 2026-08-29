import type { Ticket } from "../../types/ticket";

interface TicketApiResponse {
  id: string;
  namaTiket: string;
  hargaWeekdays: string | number;
  hargaWeekend: string | number;
  deskripsi: string;
  status: string;
  jenisTiket?: "SATUAN" | "PAKET";
  ketentuan?: unknown[];
  gambar?: string[];

  wahanaSatuan?: Array<{
    id?: string;
    tiketId?: string;
    namaWahana?: string;
    namaTiket?: string;
    [key: string]: unknown;
  }>;

  createdAt?: string;
  updatedAt?: string;
}

export function mapTicketApiToTicket(
  ticket: TicketApiResponse,
): Ticket {
  const images = ticket.gambar ?? [];

  const items =
    ticket.wahanaSatuan?.map((item) => {
      return (
        item.id ??
        item.tiketId ??
        item.namaWahana ??
        item.namaTiket ??
        ""
      );
    }).filter(Boolean) ?? [];

  return {
    id: ticket.id,

    namaTiket: ticket.namaTiket,

    name: ticket.namaTiket,

    price: Number(ticket.hargaWeekdays),

    hargaWeekdays: Number(ticket.hargaWeekdays),

    hargaWeekend: Number(ticket.hargaWeekend),

    deskripsi: ticket.deskripsi,

    description: ticket.deskripsi,

    status: ticket.status,

    isActive: ticket.status === "Tiket Aktif",

    jenisTiket: ticket.jenisTiket ?? "SATUAN",

    ketentuan: [],

    gambar: [],

    image:
      images.length > 0 ?
        images[0]
      : "/images/default-ticket.webp",

    items,

    category:
      ticket.jenisTiket === "PAKET" ?
        "Paket Hemat"
      : "Regular/Satuan",

    createdAt: ticket.createdAt ?? "",

    updatedAt: ticket.updatedAt ?? "",
  };
}