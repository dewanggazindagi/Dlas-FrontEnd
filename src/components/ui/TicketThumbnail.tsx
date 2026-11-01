interface Props {
  image: string;
  alt: string;
  className?: string;
}

export default function TicketThumbnail({ image, alt, className = "" }: Props) {
  return (
    <div className={`relative size-[120px] shrink-0 ${className}`}>
      <div className="absolute top-1/2 left-1/2 h-[104px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-soft-gray shadow-[2px_4px_24px_0px_rgba(0,0,0,0.1)]" />
      <div className="absolute top-0 left-1/2 h-[120px] w-[105px] -translate-x-1/2 overflow-hidden rounded-xl border-[1.5px] border-black/4">
        <img src={image} alt={alt} className="size-full object-cover" />
      </div>
    </div>
  );
}
