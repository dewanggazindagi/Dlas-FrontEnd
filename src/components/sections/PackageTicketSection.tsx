import type { PackageTicket } from "../../types/packageTicket";
import RecommendationBanner from "../cards/RecommendationBanner";
import PackageTicketCard from "../cards/PackageTicketCard";

interface Props {
  data: PackageTicket[];
  onGetRecommendation: () => void;
}

export default function PackageTicketSection({ data, onGetRecommendation }: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-3.5">
      <RecommendationBanner onGetRecommendation={onGetRecommendation} />
      <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-3">
        {data.map((pkg) => (
          <PackageTicketCard key={pkg.id} packageTicket={pkg} />
        ))}
      </div>
    </div>
  );
}
