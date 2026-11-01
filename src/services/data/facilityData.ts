import type { Facility } from "../../types/facility";
import forkKnifeIcon from "../../assets/icons/ForkKnife.svg";
import toiletIcon from "../../assets/icons/Toilet.svg";
import houseIcon from "../../assets/icons/House.svg";
import mosqueIcon from "../../assets/icons/Mosque.svg";

export const facilityData: Facility[] = [
  {
    id: "foodcourt",
    name: "Foodcourt",
    description: "Foodcourt menawarkan berbagai kios makanan lezat untuk Anda.",
    icon: forkKnifeIcon,
  },
  {
    id: "toilet",
    name: "Toilet",
    description: "Tersedia fasilitas toilet bersih dan nyaman untuk kenyamanan pengunjung",
    icon: toiletIcon,
  },
  {
    id: "aula-gratis",
    name: "Aula Gratis",
    description: "Aula gratis tersedia untuk umum tanpa perlu pemesanan, siapa cepat dia dapat menggunakan",
    icon: houseIcon,
  },
  {
    id: "mushola",
    name: "Mushola",
    description: "Terdapat beberapa titik mushola yang dapat digunakan pengunjung.",
    icon: mosqueIcon,
  },
];
