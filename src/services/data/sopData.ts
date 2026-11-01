export interface SopItem {
  id: string;
  title: string;
  description: string;
}

export const SOP_ITEMS: SopItem[] = [
  {
    id: "kebersihan",
    title: "Persiapan & Kebersihan",
    description: "Kebersihan Area: Memastikan meja loket bersih, kaca pembatas",
  },
  {
    id: "internet",
    title: "Mengecek jaringan internet",
    description: "Memastikan jaringan internet lancar sebelum memulai operasional",
  },
  {
    id: "printer",
    title: "Memastikan printer struk berfungsi",
    description: "Memeriksa printer yang digunakan dapat berfungsi",
  },
  {
    id: "floating_money",
    title: "Modal Awal (Floating Money)",
    description: "Menyiapkan modal awal untuk kembalian pada pembelian tunai",
  },
  {
    id: "kertas_printer",
    title: "Kertas printer thermal cukup untuk seharian",
    description: "Memastikan kertas untuk tiket memiliki ketersediaan yang cukup",
  },
];