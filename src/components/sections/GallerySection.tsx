import gallery1 from "../../assets/images/gallery-1.png";
import gallery2 from "../../assets/images/gallery-2.jpg";
import gallery3 from "../../assets/images/gallery-3.png";
import gallery4 from "../../assets/images/gallery-4.jpg";
import SectionHeading from "../ui/SectionHeading";

export default function GallerySection() {
  return (
    <section className="flex w-full flex-col items-center gap-[72px] bg-soft-gray px-4 pt-8 pb-14 md:px-[52px] md:pt-[84px] md:pb-[126px]">
      <SectionHeading
        title="Bukti Keseruan Dari Wisata Kami"
        description="Kami abadikan momen-momen indah dan penuh tawa dari para pengunjung setia D'Las. Lihat keseruan mereka dan jadilah bagian dari cerita kami selanjutnya!"
      />

      <div className="hidden h-[620px] w-full gap-4 px-[42px] md:flex">
        <div className="h-full w-[384px] shrink-0 overflow-hidden rounded-[20px] bg-border">
          <img src={gallery1} alt="Wahana D'Las Zoo" className="size-full object-cover" />
        </div>
        <div className="flex h-full min-h-0 flex-1 flex-col gap-4">
          <div className="min-h-0 flex-1 overflow-hidden rounded-[20px] bg-border">
            <img src={gallery2} alt="Area camping D'Las Lembah Asri" className="size-full object-cover" />
          </div>
          <div className="flex min-h-0 flex-1 gap-4">
            <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-[20px] bg-border">
              <img src={gallery3} alt="Wahana Dino Land" className="size-full object-cover" />
            </div>
            <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-[20px] bg-border">
              <img src={gallery4} alt="Penginapan glamping D'Las Lembah Asri" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:hidden">
        {[
          { src: gallery1, alt: "Wahana D'Las Zoo" },
          { src: gallery2, alt: "Area camping D'Las Lembah Asri" },
          { src: gallery3, alt: "Wahana Dino Land" },
        ].map((item) => (
          <div key={item.alt} className="h-[227px] w-full overflow-hidden rounded-[15px] bg-border">
            <img src={item.src} alt={item.alt} className="size-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
