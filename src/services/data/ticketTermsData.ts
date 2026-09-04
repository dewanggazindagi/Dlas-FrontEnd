import type { Term } from "../../types/terms";

export const regularTicketTermsData: Term[] = [
  {
    id: "regular-term-1",
    number: "01",
    description: "Pembelian tiket satuan/reguler belum termasuk tiket masuk area, anda perlu beli terpisah",
  },
  {
    id: "regular-term-2",
    number: "02",
    description: "Tiket tidak dapat digunakan setelah tanggal berlibur yang anda isi/tiket sudah digunakan",
  },
];

export const packageTicketTermsData: Term[] = [
  {
    id: "package-term-1",
    number: "01",
    description: "Maksimal anda memasuki area D'las untuk tiket paket hemat yaitu pukul 15.00",
  },
  {
    id: "package-term-2",
    number: "02",
    description: "Pembelian tiket paket sudah termasuk tiket masuk area D'las Lembah Asri",
  },
];
