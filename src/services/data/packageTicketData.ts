import type { PackageTicket } from "../../types/packageTicket";
import ticketDinoland from "../../assets/images/ticket-dinoland.png";

export const packageTicketData: PackageTicket[] = [
  {
    id: "paket-hemat-a",
    name: "Paket Hemat A",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    image: ticketDinoland,
    includedRides: ["D'Las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
  {
    id: "paket-hemat-b",
    name: "Paket Hemat B",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    image: ticketDinoland,
    includedRides: ["D'Las Zoo", "Sepeda Air", "Dino Land", "Kolam Renang"],
  },
  {
    id: "paket-hemat-c",
    name: "Paket Hemat C",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    image: ticketDinoland,
    includedRides: ["D'Las Zoo", "Dino Land", "Rainbow Slide", "Kolam Renang"],
  },
  {
    id: "paket-hemat-d",
    name: "Paket Hemat D",
    description: "Kumpulan wahana dan juga sudah termasuk tiket masuk",
    price: 75000,
    image: ticketDinoland,
    includedRides: ["D'Las Zoo", "Dino Land", "Taman Kelinci", "Kolam Renang"],
  },
];
