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