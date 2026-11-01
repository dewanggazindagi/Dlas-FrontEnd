import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import SectionHeading from "../../components/ui/SectionHeading";
import DateSearchBar from "../../components/ui/DateSearchBar";
import TicketTabs, { type TicketTab } from "../../components/ui/TicketTabs";
import PackageTicketSection from "../../components/sections/PackageTicketSection";
import RegularTicketSection from "../../components/sections/RegularTicketSection";
import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";

export default function TiketPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = (searchParams.get("tab") as TicketTab) || "regular";
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : undefined,
  );

  const handleTabChange = (tab: TicketTab) =>
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });

  const handleSearch = () =>
    setSearchParams((prev) => {
      if (selectedDate) prev.set("date", selectedDate.toISOString().slice(0, 10));
      return prev;
    });

  const handleGetRecommendation = () => navigate("/tiket/rekomendasi");

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-[84px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-center gap-6 md:gap-[42px]">
          <div className="flex w-full flex-col items-start">
            <BackLink label="Kembali ke Beranda" to="/" />
          </div>
          <div className="flex w-full flex-col items-center gap-8 md:gap-[38px]">
            <SectionHeading
              title="Pesan Tiket Wisata"
              description="Temukan tiket dengan mudah dan jelajahi beragam aktivitas serta wahana seru yang ditawarkan D'Las Lembah Asri."
            />
            <div className="flex w-full flex-col items-center gap-5">
              <DateSearchBar selectedDate={selectedDate} onDateChange={setSelectedDate} onSearch={handleSearch} />
              <TicketTabs activeTab={activeTab} onChange={handleTabChange} />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1336px] md:px-[42px]">
          {activeTab === "paket-hemat" ? (
            <PackageTicketSection data={packageTicketData} onGetRecommendation={handleGetRecommendation} />
          ) : (
            <RegularTicketSection data={ticketData} onGetRecommendation={handleGetRecommendation} />
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
