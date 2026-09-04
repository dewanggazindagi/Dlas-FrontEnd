import type { Term } from "../../types/terms";
import NumberedPoint from "../ui/NumberedPoint";

interface Props {
  title: string;
  terms: Term[];
}

export default function TicketTermsBox({ title, terms }: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-3.5 rounded-xl border border-border bg-soft-gray p-3">
      <p className="text-t3 font-semibold text-black">{title}</p>
      <div className="flex w-full flex-col items-start gap-3">
        {terms.map((term) => (
          <NumberedPoint key={term.id} number={term.number}>
            {term.description}
          </NumberedPoint>
        ))}
      </div>
    </div>
  );
}
