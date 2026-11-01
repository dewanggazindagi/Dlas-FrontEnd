import { Search } from "lucide-react";
import Button from "../ui/Button";

interface Props {
  onGetRecommendation?: () => void;
  className?: string;
}

export default function RecommendationBanner({ onGetRecommendation, className = "" }: Props) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-4 rounded-2xl border border-primary-soft bg-primary-soft p-4 md:flex-row md:items-center ${className}`}
    >
      <div className="flex flex-1 items-center gap-2.5">
        <div className="flex shrink-0 items-center justify-center rounded-full border border-primary-soft bg-primary-soft p-3">
          <Search className="size-5 text-primary" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-t4 font-medium text-black">Bingung pesan tiket apa?</p>
          <p className="text-t5 text-dark-gray">Kami akan berikan saran sesuai kebutuhan anda</p>
        </div>
      </div>
      <Button variant="primary" size="sm" fullWidth onClick={onGetRecommendation} className="md:w-auto">
        Dapatkan Rekomendasi
      </Button>
    </div>
  );
}
