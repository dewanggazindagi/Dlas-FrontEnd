import type { Ticket } from "../../types/ticket";
import Image from "../../assets/images/gambar.png"

export const ticketData: Ticket[] = [
  {
    id: "TKT-001",
    name: "Tiket Masuk",
    category: "Regular/Satuan",
    price: 10000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-002",
    name: "D'Las Zoo",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-003",
    name: "Kolam Renang",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-004",
    name: "Playground",
    category: "Regular/Satuan",
    price: 20000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-005",
    name: "Sepeda Air",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-006",
    name: "Dino Land",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-007",
    name: "Rainbow Slide",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: false,
  },
  {
    id: "TKT-008",
    name: "Taman Salju",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-009",
    name: "ATV Bike",
    category: "Regular/Satuan",
    price: 25000,
    image: Image,
    isActive: true,
  },
  {
    id: "TKT-010",
    name: "Flying Fox",
    category: "Regular/Satuan",
    price: 30000,
    image: Image,
    isActive: true,
  },
];
import ticketDinoland from "../../assets/images/ticket-dinoland.png";
import ticketDlasZoo from "../../assets/images/ticket-dlaszoo.png";
import ticketTamanSalju from "../../assets/images/ticket-tamansalju.png";
import gallery1 from "../../assets/images/gallery-1.png";
import gallery2 from "../../assets/images/gallery-2.jpg";
import gallery3 from "../../assets/images/gallery-3.png";
import gallery4 from "../../assets/images/gallery-4.jpg";

export const ticketData: Ticket[] = [
  {
    id: "dino-land",
    name: "Dino Land",
    description: "Jelajahi dunia dinosaurus dengan replika raksasa yang seru.",
    price: 10000,
    images: [ticketDinoland, gallery3, gallery1],
    category: "Regular/Satuan",
  },
  {
    id: "dlas-zoo",
    name: "D'Las Zoo",
    description: "Area mini zoo untuk berinteraksi dengan berbagai hewan lucu.",
    price: 20000,
    images: [ticketDlasZoo, gallery1, gallery2],
    category: "Regular/Satuan",
  },
  {
    id: "taman-salju",
    name: "Taman Salju",
    description: "Rasakan dinginnya salju buatan dalam wahana musim dingin.",
    price: 20000,
    images: [ticketTamanSalju, gallery4, gallery2],
    category: "Regular/Satuan",
  },
  {
    id: "sepeda-air",
    name: "Sepeda Air",
    description: "Naik sepeda air sambil nikmati udara dan pemandangan alam.",
    price: 10000,
    images: [ticketDinoland, gallery2, gallery3],
    category: "Regular/Satuan",
  },
  {
    id: "kolam-renang",
    name: "Kolam Renang",
    description: "Tempat yang pas untuk bermain air dan bersantai.",
    price: 10000,
    images: [ticketDinoland, gallery4, gallery1],
    category: "Regular/Satuan",
  },
  {
    id: "atv-bike",
    name: "ATV Bike",
    description: "Nikmati adrenalin di lintasan ATV yang seru.",
    price: 10000,
    images: [ticketDinoland, gallery3, gallery4],
    category: "Regular/Satuan",
  },
  {
    id: "rainbow-slide",
    name: "Rainbow Slide",
    description: "Meluncur di seluncuran warna-warni yang menyenangkan.",
    price: 20000,
    images: [ticketDinoland, gallery1, gallery3],
    category: "Regular/Satuan",
  },
];
