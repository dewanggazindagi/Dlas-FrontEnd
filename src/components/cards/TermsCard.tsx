import termsImage from "../../assets/images/ketentuanSection-Image.png";
import type { Term } from "../../types/terms";
import NumberedPoint from "../ui/NumberedPoint";

interface Props {
  terms: Term[];
  className?: string;
}

export default function TermsCard({ terms, className = "" }: Props) {
  return (
    <div
      className={`flex w-full flex-col items-start justify-center rounded-2xl border border-border bg-white p-[18px] md:rounded-[32px] md:px-[94px] md:py-[42px] ${className}`}
    >
      <div className="flex w-full flex-col gap-8 md:gap-12">
        <img
          src={termsImage}
          alt="Suasana pendopo dan penginapan D'Las Lembah Asri"
          className="h-[243px] w-[327px] object-contain md:h-[288px] md:w-[390px]"
        />
        <div className="flex w-full flex-col gap-6 md:gap-8">
          <p className="w-full text-t1 font-semibold text-black capitalize md:text-h3">
            Apa saja ketentuan yang berlaku di D'las Lembah Asri?
          </p>
          <div className="flex w-full flex-col gap-4">
            {terms.map((term) => (
              <NumberedPoint key={term.id} number={term.number}>
                {term.description}
              </NumberedPoint>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
