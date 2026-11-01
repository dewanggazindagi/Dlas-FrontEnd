import { Info } from "lucide-react";
import { formatter } from "../../utils/formatter";
import Button from "../ui/Button";

interface Props {
  className?: string;
}

export default function EntryTicketCard({ className = "" }: Props) {
  return (
    <div className={`flex w-full flex-col gap-2 rounded-2xl border border-border pb-3 ${className}`}>
      <div className="flex w-full flex-col gap-3 rounded-2xl bg-white px-[18px] py-3">
        <div className="flex flex-col gap-1">
          <p className="text-t3 font-semibold text-black">Tiket Masuk</p>
          <p className="text-t5 text-dark-gray">Tiket masuk yang wajib dimiliki setiap pengunjung D'las Lembah Asri.</p>
        </div>
        <div className="flex items-end gap-1">
          <p className="text-t4 font-medium text-black">{formatter.rupiah(10000)}</p>
          <p className="text-t5 text-dark-gray">/tiket</p>
        </div>
        <Button variant="outline" size="sm" fullWidth>
          Beli Tiket Masuk
        </Button>
      </div>
      <div className="flex items-center gap-1.5 px-[18px]">
        <Info size={16} className="shrink-0 text-dark-gray" />
        <p className="text-t6 text-dark-gray">Wajib dibeli sebelum membeli tiket wahana lainnya.</p>
      </div>
    </div>
  );
}
