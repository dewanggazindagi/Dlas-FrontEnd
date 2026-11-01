import type { Ticket } from "../../types/ticket";
import Image from "../../assets/images/gambar.png"

export const packageTicketData: Ticket[] = [
  {
    id: "PKG-001",
    name: "Tiket Paket A",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: true,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-002",
    name: "Tiket Paket B",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: false,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-003",
    name: "Tiket Paket C",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: true,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-004",
    name: "Tiket Paket D",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: true,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-005",
    name: "Tiket Paket AE",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: true,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-006",
    name: "Tiket Paket F",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: true,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-007",
    name: "Tiket Paket G",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: false,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },

  {
    id: "PKG-008",
    name: "Tiket Paket H",
    category: "Paket Hemat",
    price: 75000,
    image: Image,
    isActive: false,

    items: [
      "TKT-002",
      "TKT-003",
      "TKT-004",
      "TKT-005",
    ],
  },
];
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
