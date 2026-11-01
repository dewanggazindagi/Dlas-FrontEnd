interface Props {
  icon: string;
  name: string;
  description: string;
  className?: string;
}

export default function FacilityPoint({ icon, name, description, className = "" }: Props) {
  return (
    <div className={`flex w-full items-center gap-2.5 ${className}`}>
      <div className="flex shrink-0 items-center justify-center rounded-full border border-border bg-soft-gray p-3">
        <img src={icon} alt="" className="size-5 md:size-[22px]" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-t4 font-medium text-black md:text-t3">{name}</p>
        <p className="text-t5 text-dark-gray">{description}</p>
      </div>
    </div>
  );
}
