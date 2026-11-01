import heroImage from "../../assets/images/HeroLP.jpg";

export default function HeroSection() {
  return (
    <section className="w-full bg-white p-4">
      <div className="relative flex h-[560px] w-full items-start justify-center overflow-hidden rounded-xl md:h-[875px] md:rounded-[20px]">
        <img
          src={heroImage}
          alt="Pendopo utama D'Las Lembah Asri"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/80 via-white/20 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-3 px-6 pt-14 text-center md:gap-[18px] md:pt-[121px]">
          <h1 className="text-h6 font-semibold text-black capitalize md:text-h1">Wisata D'las Lembah Asri</h1>
          <p className="max-w-[824px] text-t5 text-dark-gray md:text-t3">
            Temukan keseruan wisata alam dan berbagai aktivitas menarik di D'las Lembah Asri. Tempat yang tepat
            untuk berlibur, bersantai, dan menikmati kebersamaan.
          </p>
        </div>
      </div>
    </section>
  );
}
