export interface Ticket {
  id: string;

  namaTiket: string;

  name: string;

  price: number;

  hargaWeekdays: number;

  hargaWeekend: number;

  deskripsi: string;

  description: string;

  status: string;

  isActive: boolean;

  jenisTiket: "SATUAN" | "PAKET";

  category: string;

  items: string[];

  ketentuan: TicketKetentuan[];

  gambar: TicketGambar[];

  image: string | TicketGambar[];

  createdAt: string;

  updatedAt: string;
}

export interface TicketKetentuan {
  id: string;

  ticketId: string;

  deskripsi: string;

  urutan: number;

  createdAt: string;

  updatedAt: string;
}

export interface TicketGambar {
  id: string;

  ticketId: string;

  url?: string;

  gambar?: string;

  createdAt?: string;

  updatedAt?: string;
}