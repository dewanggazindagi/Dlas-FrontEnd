import Button from "../ui/Button";
import NumberedPoint from "../ui/NumberedPoint";
import TicketThumbnail from "../ui/TicketThumbnail";
import { formatter } from "../../utils/formatter";

interface Props {
  name: string;
  image: string;
  price: number;
  orderId: string;
  visitDate: string;
  quantity: number;
  detailHref: string;
  ctaLabel?: string;
  includedRides?: string[];
}

export default function OrderCard({
  name,
  image,
  price,
  orderId,
  visitDate,
  quantity,
  detailHref,
  ctaLabel = "Lihat Detail Tiket Anda",
  includedRides = [],
}: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5 rounded-2xl border border-border bg-white p-2.5 md:w-[408px]">
      <div className="flex w-full items-start gap-4">
        <TicketThumbnail image={image} alt={name} />
        <div className="flex flex-1 flex-col items-start justify-between gap-2 self-stretch py-1">
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-t3 font-semibold text-black capitalize">{name}</p>
            <div className="flex flex-col items-start gap-0.5 text-t5 text-dark-gray">
              <p>ID Pesanan : {orderId}</p>
              <p>Berlibur pada : {formatter.dateLong(visitDate)}</p>
            </div>
          </div>
          <div className="flex w-full items-end justify-between gap-1">
            <p className="text-t4 font-medium text-black">{formatter.rupiah(price)}</p>
            <p className="text-t5 text-dark-gray">{quantity} Tiket</p>
          </div>
        </div>
      </div>

      {includedRides.length > 0 && (
        <div className="flex w-full flex-col items-start gap-3 rounded-xl border border-border bg-soft-gray p-3">
          {includedRides.map((ride, index) => (
            <div key={ride} className="flex w-full flex-col gap-3">
              {index > 0 && <div className="h-px w-full border-t border-border" />}
              <NumberedPoint number={String(index + 1).padStart(2, "0")} textClassName="text-t4 font-medium text-black">
                {ride}
              </NumberedPoint>
            </div>
          ))}
        </div>
      )}

      <Button to={detailHref} variant="outline" size="sm" fullWidth>
        {ctaLabel}
      </Button>
    </div>
  );
}
