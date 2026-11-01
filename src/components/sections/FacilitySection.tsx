import { Map } from "lucide-react";
import type { Facility } from "../../types/facility";
import SectionHeading from "../ui/SectionHeading";
import FacilityCard from "../cards/FacilityCard";
import Button from "../ui/Button";

interface Props {
  data: Facility[];
}

export default function FacilitySection({ data }: Props) {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 py-8 md:gap-12 md:px-[52px] md:py-[84px]">
      <SectionHeading title="Fasilitas/Area Yang Tersedia" description="Di area D'las Lembah Asri terdapat berbagai fasilitas/area yang dapat anda gunakan/kunjungi" />
      <div className="flex w-full justify-center">
        <FacilityCard facilities={data} />
      </div>
      <Button to="/denah" variant="primary" fullWidth className="w-full max-w-[742px]">
        <Map className="size-5" />
        Lihat Denah
      </Button>
    </section>
  );
}
