import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import WahanaSelectItem from "../../components/cards/WahanaSelectItem";
import { ticketData } from "../../services/data/ticketData";

export default function RekomendasiTiketPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSelected = searchParams.get("wahana")?.split(",").filter(Boolean).map(decodeURIComponent) ?? [];
  const [selectedNames, setSelectedNames] = useState<string[]>(initialSelected);

  const toggle = (id: string) => {
    const ticket = ticketData.find((t) => t.id === id);
    if (!ticket) return;
    setSelectedNames((prev) =>
      prev.includes(ticket.name) ? prev.filter((n) => n !== ticket.name) : [...prev, ticket.name],
    );
  };

  const handleSubmit = () => {
    const query = selectedNames.map(encodeURIComponent).join(",");
    navigate(`/tiket/hasil-rekomendasi?wahana=${query}`);
  };

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-[84px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-center gap-6 md:gap-[42px]">
          <div className="flex w-full flex-col items-start">
            <BackLink label="Kembali" to="/" className="md:hidden" />
            <BackLink label="Kembali ke Beranda" to="/" className="hidden md:flex" />
          </div>
          <SectionHeading
            title="Rekomendasi Tiket"
            description="Pilih wahana yang ingin anda kunjungi di D'las Lembah Asri, lalu kami akan memberikan rekomendasi tiket yang sesuai"
          />
        </div>

        <div className="flex w-full max-w-[1336px] flex-col items-center gap-8 md:px-[42px]">
          <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-2">
            {ticketData.map((ticket) => (
              <WahanaSelectItem
                key={ticket.id}
                ticket={ticket}
                checked={selectedNames.includes(ticket.name)}
                onToggle={toggle}
              />
            ))}
          </div>
          <Button
            variant="primary"
            fullWidth
            disabled={selectedNames.length === 0}
            onClick={handleSubmit}
          >
            Dapatkan Rekomendasi
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
