import type { Facility } from "../../types/facility";
import FacilityPoint from "../ui/FacilityPoint";

interface Props {
  facilities: Facility[];
  className?: string;
}

export default function FacilityCard({ facilities, className = "" }: Props) {
  return (
    <div
      className={`flex w-full max-w-[742px] flex-col items-start justify-center gap-4 rounded-2xl border border-border bg-white p-4 ${className}`}
    >
      {facilities.map((facility, index) => (
        <div key={facility.id} className="flex w-full flex-col gap-4">
          {index > 0 && <div className="h-px w-full border-t border-border" />}
          <FacilityPoint icon={facility.icon as string} name={facility.name} description={facility.description} />
        </div>
      ))}
    </div>
  );
}
