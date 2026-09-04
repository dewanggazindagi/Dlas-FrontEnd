import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
  className?: string;
}

export default function TicketGallery({ images, alt, className = "" }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-soft-gray md:aspect-auto md:h-[610px] md:rounded-[20px]">
        <img src={images[activeIndex]} alt={alt} className="size-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex w-full items-start gap-2">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`size-[72px] shrink-0 cursor-pointer overflow-hidden rounded-xl border-[2.5px] md:size-[100px] md:rounded-xl ${
                index === activeIndex ? "border-primary shadow-[0px_0px_0px_3px_rgba(35,131,2,0.1)]" : "border-transparent"
              }`}
            >
              <img src={image} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
