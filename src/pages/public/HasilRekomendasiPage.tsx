import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import SectionHeading from "../../components/ui/SectionHeading";
import SelectionSummaryBar from "../../components/ui/SelectionSummaryBar";
import PackageTicketCard from "../../components/cards/PackageTicketCard";
import TicketCard from "../../components/cards/TicketCard";
import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";
import { getRecommendedPackages, getSelectedRegularTickets } from "../../utils/ticketRecommendation";

function WahanaDiinginkanBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`w-fit shrink-0 items-center gap-2 rounded-full bg-primary-soft px-3 py-0.5 ${className}`}>
      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
      <span className="text-t5 font-medium whitespace-nowrap text-primary">Wahana diinginkan</span>
    </div>
  );
}

export default function HasilRekomendasiPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedNames = useMemo(
    () => searchParams.get("wahana")?.split(",").map(decodeURIComponent).filter(Boolean) ?? [],
    [searchParams],
  );

  const recommendedPackages = useMemo(
    () => getRecommendedPackages(selectedNames, packageTicketData),
    [selectedNames],
  );
  const selectedTickets = useMemo(() => getSelectedRegularTickets(selectedNames, ticketData), [selectedNames]);

  const handleEdit = () => {
    const query = selectedNames.map(encodeURIComponent).join(",");
    navigate(`/tiket/rekomendasi?wahana=${query}`);
  };

  useEffect(() => {
    if (selectedNames.length === 0) navigate("/tiket/rekomendasi", { replace: true });
  }, [selectedNames, navigate]);

  if (selectedNames.length === 0) return null;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-[84px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-center gap-6 md:gap-[42px]">
          <div className="flex w-full flex-col items-start">
            <BackLink label="Kembali" to="/tiket" />
          </div>
          <SectionHeading
            title="Pesan Tiket Wisata"
            description="Temukan tiket dengan mudah dan jelajahi beragam aktivitas serta wahana seru yang ditawarkan D'Las Lembah Asri."
          />
          <SelectionSummaryBar count={selectedNames.length} onEdit={handleEdit} />
        </div>

        <div className="flex w-full max-w-[1336px] flex-col items-center gap-14 md:gap-12 md:px-[42px]">
          {recommendedPackages.length > 0 && (
            <section className="flex w-full flex-col items-start gap-6 md:gap-[38px]">
              <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div className="flex flex-col gap-1.5">
                  <div className="flex w-full items-center justify-between gap-3 md:justify-start">
                    <h2 className="text-t2 font-semibold text-black capitalize md:text-h6">Tiket Paket Murah</h2>
                    <WahanaDiinginkanBadge className="flex md:hidden" />
                  </div>
                  <p className="text-t5 text-dark-gray md:text-t3">
                    Rekomendasi tiket dimana semua/mayoritas wahana yang diingini termasuk dalam paket namun secara
                    keseluruhan mendapat harga lebih murah
                  </p>
                </div>
                <WahanaDiinginkanBadge className="hidden md:flex" />
              </div>
              <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-3">
                {recommendedPackages.map((pkg) => (
                  <PackageTicketCard key={pkg.id} packageTicket={pkg} highlightedRides={selectedNames} />
                ))}
              </div>
            </section>
          )}

          {selectedTickets.length > 0 && (
            <section className="flex w-full flex-col items-start gap-6 md:gap-[38px]">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-t2 font-semibold text-black capitalize md:text-h6">Tiket Regular/Satuan</h2>
                <p className="text-t5 text-dark-gray md:text-t3">
                  Jika anda ingin membeli satuan namun dengan harga yang lebih mahal dibanding paket murah dan/atau
                  wahana yang anda inginkan yang tidak termasuk ke paket
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-3">
                {selectedTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
