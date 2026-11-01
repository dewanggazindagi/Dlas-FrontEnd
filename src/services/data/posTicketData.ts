export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface TicketPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  attractions: string[];
}

export const POS_SERVICE_STEPS: ServiceStep[] = [
  { step: "01", title: "Salam & Sapa", description: "Berikan salam & sapa yang ramah" },
  { step: "02", title: "Menjelaskan Jenis Tiket", description: "Jelaskan berbagai jenis tiket" },
  { step: "03", title: "Menanyakan Keinginan", description: "Tanya keinginan wahana/tiket" },
  { step: "04", title: "Rekomendasi", description: "Jika wahana, berikan rekomendasi" },
  { step: "05", title: "Memilih Tiket Yang Diinginkan", description: "Anda klik tiket sesuai keinginan" },
  { step: "06", title: "Menjelaskan Tiket", description: "Jelaskan tentang & ketentuan tiket" },
  { step: "07", title: "Proses Pembayaran", description: "Selesaikan proses pembayaran" },
  { step: "08", title: "Ucapan Terimakasih", description: "Terimakasih sudah berkunjung" },
];

export const TICKET_PACKAGES: TicketPackage[] = [
  {
    id: "paket-a",
    title: "Paket Hemat A",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    attractions: ["D'las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-b",
    title: "Paket Hemat B",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    attractions: ["D'las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-c",
    title: "Paket Hemat C",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    attractions: ["D'las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-d",
    title: "Paket Hemat D",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    attractions: ["D'las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-e",
    title: "Paket Hemat E",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    attractions: ["D'las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-f",
    title: "Paket Hemat F",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    attractions: ["D'las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
];