import Button from "../ui/Button";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/Gnq9n4DYYp1hoFix7";
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps?q=-7.2423866,109.2911912&z=17&output=embed";

interface Props {
  className?: string;
}

export default function LocationCard({ className = "" }: Props) {
  return (
    <div
      className={`relative flex h-[505px] w-full flex-col items-start justify-end overflow-hidden rounded-2xl shadow-card md:h-auto md:flex-1 md:rounded-[32px] ${className}`}
    >
      <iframe
        title="Peta lokasi D'Las Lembah Asri"
        src={GOOGLE_MAPS_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0"
      />
      <div className="relative flex w-full flex-col items-start justify-end gap-2.5 bg-gradient-to-b from-black/0 to-black/20 px-2.5 pt-8 pb-2.5 backdrop-blur-[5px] md:gap-5 md:px-5 md:pt-15 md:pb-5">
        <div className="flex w-full flex-col gap-3 rounded-[14px] bg-white p-3 md:gap-5 md:p-5">
          <div className="flex w-full flex-col gap-1.5">
            <p className="text-t3 font-semibold text-black md:text-t2">Lokasi D'las Lembah Asri</p>
            <p className="line-clamp-2 text-t6 text-dark-gray md:text-t5">
              Jl. Raya Serang, Krajan, Serang, Kec. Karangreja, Kabupaten Purbalingga, Jawa Tengah 53357
            </p>
          </div>
          <div className="flex w-full items-center justify-center rounded-[10px] border border-primary-soft bg-primary-soft px-2 py-1.5 shadow-[2px_3px_14px_0px_rgba(0,0,0,0.05)]">
            <p className="text-t6 text-primary md:text-t5">Buka Setiap hari jam 08.00 - 16.00 (Area Ditutup jam 18.00)</p>
          </div>
        </div>
        <Button
          as="a"
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          fullWidth
          className="text-center"
        >
          Buka di Google Map
        </Button>
      </div>
    </div>
  );
}
