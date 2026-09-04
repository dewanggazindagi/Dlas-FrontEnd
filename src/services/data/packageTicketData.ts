import type { PackageTicket } from "../../types/packageTicket";
import ticketDinoland from "../../assets/images/ticket-dinoland.png";
import ticketDlasZoo from "../../assets/images/ticket-dlaszoo.png";
import ticketTamanSalju from "../../assets/images/ticket-tamansalju.png";
import gallery1 from "../../assets/images/gallery-1.png";
import gallery2 from "../../assets/images/gallery-2.jpg";

export const packageTicketData: PackageTicket[] = [
  {
    id: "paket-hemat-a",
    name: "Paket Hemat A",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    images: [ticketDinoland, ticketDlasZoo, gallery1],
    includedRides: ["D'Las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-hemat-b",
    name: "Paket Hemat B",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    images: [ticketDinoland, ticketTamanSalju, gallery2],
    includedRides: ["D'Las Zoo", "Sepeda Air", "Dino Land", "Kolam Renang"],
  },
  {
    id: "paket-hemat-c",
    name: "Paket Hemat C",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    images: [ticketDinoland, ticketDlasZoo, gallery2],
    includedRides: ["D'Las Zoo", "Dino Land", "Rainbow Slide", "Kolam Renang"],
  },
  {
    id: "paket-hemat-d",
    name: "Paket Hemat D",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    images: [ticketDinoland, ticketTamanSalju, gallery1],
    includedRides: ["D'Las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
];
