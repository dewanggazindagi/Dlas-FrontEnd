import { ArrowRight } from "lucide-react";
import type { Ticket } from "../../types/ticket";
import SectionHeading from "../ui/SectionHeading";
import TicketCard from "../cards/TicketCard";
import Button from "../ui/Button";

interface Props {
  data: Ticket[];
}

export default function TicketSection({ data }: Props) {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-gradient-to-b from-white to-soft-gray px-4 py-8 md:gap-12 md:px-[52px] md:py-[126px]">
      <SectionHeading
        title="Berbagai layanan yang tersedia"
        description="Pilih layanan favorit Anda dan rasakan pengalaman wisata yang lebih seru dan menyenangkan."
        className="hidden md:flex"
      />
      <SectionHeading
        title="Berbagai Wahana yang tersedia"
        description="Terdapat berbagai pilihan wahana yang ada di D'las Lembah Asri yang dapat dikunjungi sesuai tujuan anda"
        className="flex md:hidden"
      />
      <div className="flex w-full flex-col gap-3.5 md:grid md:grid-cols-3">
        {data.map((ticket, index) => (
          <div key={ticket.id} className={index >= 3 ? "hidden md:block" : undefined}>
            <TicketCard ticket={ticket} />
          </div>
        ))}
      </div>
      <Button to="/tiket?tab=regular" variant="primary" size="lg">
        Lihat Wahana Lainnya
        <ArrowRight className="size-6" />
      </Button>
    </section>
  );
}
