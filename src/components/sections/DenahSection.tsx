import { Download } from "lucide-react";
import denahImage from "../../assets/images/denah.png";
import Button from "../ui/Button";

interface Props {
  className?: string;
}

export default function DenahSection({ className = "" }: Props) {
  return (
    <div className={`flex w-full flex-col items-center gap-8 md:gap-[38px] ${className}`}>
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="text-h6 font-semibold text-black capitalize md:text-h2">Denah D'las Lembah Asri</h1>
        <p className="text-t5 text-dark-gray md:w-[622px] md:text-t3">
          Berikut adalah denah terbaru yang ada di lokasi wisata D'las Lembah Asri
        </p>
      </div>
      <div className="mx-auto w-full rounded-2xl border border-border bg-white p-3 md:max-w-[742px] md:rounded-[32px] md:p-[18px]">
        <img
          src={denahImage}
          alt="Denah D'las Lembah Asri"
          className="aspect-[700/951] w-full rounded-xl object-cover"
        />
      </div>
      <Button
        as="a"
        href={denahImage}
        download="Denah-Dlas-Lembah-Asri.png"
        variant="primary"
        fullWidth
        className="mx-auto md:max-w-[742px]"
      >
        <Download size={20} />
        Download & Simpan Denah
      </Button>
    </div>
  );
}
