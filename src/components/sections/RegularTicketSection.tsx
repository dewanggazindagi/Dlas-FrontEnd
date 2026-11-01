import type { Ticket } from "../../types/ticket";
import RecommendationBanner from "../cards/RecommendationBanner";
import EntryTicketCard from "../cards/EntryTicketCard";
import TicketCard from "../cards/TicketCard";

interface Props {
  data: Ticket[];
  onGetRecommendation: () => void;
}

export default function RegularTicketSection({ data, onGetRecommendation }: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-3.5">
      <RecommendationBanner onGetRecommendation={onGetRecommendation} />
      <EntryTicketCard className="md:hidden" />
      <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-3">
        {data.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
