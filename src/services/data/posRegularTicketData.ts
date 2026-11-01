import dlasLogo from "../../assets/images/logo.webp";

export interface RegularTicket {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  isMainTicket?: boolean;
}

export const REGULAR_TICKETS: RegularTicket[] = [
  {
    id: "reg-1",
    title: "Tiket Masuk",
    description: "Tiket yang harus dimiliki untuk masuk ke kawasan jika membeli tiket regular",
    price: 10000,
    isMainTicket: true,
  },
  {
    id: "reg-2",
    title: "D'las Zoo",
    description: "Area mini zoo untuk berinteraksi dengan berbagai satwa liar dan jinak.",
    price: 25000,
    image: dlasLogo,
  },
  {
    id: "reg-3",
    title: "Dino Land",
    description: "Jelajahi dunia dinosaurus dengan replika raksasa yang menakjubkan.",
    price: 25000,
    image: dlasLogo,
  },
  {
    id: "reg-4",
    title: "Taman Salju",
    description: "Rasakan dinginnya salju buatan dalam wahana keluarga yang menyenangkan.",
    price: 25000,
    image: dlasLogo,
  },
  {
    id: "reg-5",
    title: "Sepeda Air",
    description: "Naik sepeda air sambil nikmati udara dan pemandangan danau yang asri.",
    price: 25000,
    image: dlasLogo,
  },
  {
    id: "reg-6",
    title: "Kolam Renang",
    description: "Tempat yang pas untuk bermain air dan bersantai bersama keluarga.",
    price: 25000,
    image: dlasLogo,
  },
  {
    id: "reg-7",
    title: "ATV Bike",
    description: "Nikmati adrenalin di lintasan ATV yang seru dan menantang.",
    price: 25000,
    image: dlasLogo,
  },
  {
    id: "reg-8",
    title: "Rainbow Slide",
    description: "Meluncur di seluncuran warna-warni yang menyenangkan dan instagramable.",
    price: 25000,
    image: dlasLogo,
  },
];