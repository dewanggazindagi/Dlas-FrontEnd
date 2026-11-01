import type { Term } from "../../types/terms";
import TermsCard from "../cards/TermsCard";
import LocationCard from "../cards/LocationCard";

interface Props {
  data: Term[];
}

export default function TermsSection({ data }: Props) {
  return (
    <section className="flex w-full flex-col items-stretch gap-4 bg-soft-gray px-4 py-[42px] md:flex-row md:justify-center md:gap-4">
      <TermsCard terms={data} className="md:flex-1" />
      <LocationCard />
    </section>
  );
}
