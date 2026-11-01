import type { PackageTicket } from "../../types/packageTicket";
import { formatter } from "../../utils/formatter";
import Button from "../ui/Button";
import NumberedPoint from "../ui/NumberedPoint";
import TicketThumbnail from "../ui/TicketThumbnail";

interface Props {
  packageTicket: PackageTicket;
  highlightedRides?: string[];
  onDetailClick?: (pkg: PackageTicket) => void;
}

export default function PackageTicketCard({ packageTicket, highlightedRides = [], onDetailClick }: Props) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-border bg-white p-2.5">
      <div className="flex w-full items-start gap-4">
        <TicketThumbnail image={packageTicket.images[0]} alt={packageTicket.name} />
        <div className="flex flex-1 flex-col justify-between self-stretch py-1">
          <div className="flex flex-col gap-1">
            <p className="text-t3 font-semibold text-black">{packageTicket.name}</p>
            <p className="line-clamp-2 text-t5 text-dark-gray">{packageTicket.description}</p>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-t4 font-medium text-black">{formatter.rupiah(packageTicket.price)}</p>
            <p className="text-t5 text-dark-gray">/tiket</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-soft-gray p-3">
        {packageTicket.includedRides.map((ride, index) => (
          <div key={ride} className="flex w-full flex-col gap-3">
            {index > 0 && <div className="h-px w-full border-t border-border" />}
            <NumberedPoint
              number={String(index + 1).padStart(2, "0")}
              variant={highlightedRides.includes(ride) ? "recommend" : "default"}
            >
              {ride}
            </NumberedPoint>
          </div>
        ))}
      </div>
      <Button
        to={`/tiket/${packageTicket.id}`}
        variant="outline"
        size="sm"
        fullWidth
        onClick={() => onDetailClick?.(packageTicket)}
      >
        Lihat Detail Paket Hemat
      </Button>
    </div>
  );
}
