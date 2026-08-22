import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import HeroSection from "../../components/sections/HeroSection";
import TicketSection from "../../components/sections/TicketSection";
import TermsSection from "../../components/sections/TermsSection";
import FacilitySection from "../../components/sections/FacilitySection";
import GallerySection from "../../components/sections/GallerySection";
import BookingBar from "../../components/ui/BookingBar";
import { ticketData } from "../../services/data/ticketData";
import { facilityData } from "../../services/data/facilityData";
import { termsData } from "../../services/data/termsData";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleSearch = () => {
    const params = new URLSearchParams({ tab: "regular" });
    if (selectedDate) params.set("date", selectedDate.toISOString().slice(0, 10));
    navigate(`/tiket?${params.toString()}`);
  };

  return (
    <PublicLayout headerVariant="overlay">
      <HeroSection />
      <BookingBar selectedDate={selectedDate} onDateChange={setSelectedDate} onSearch={handleSearch} />
      <TicketSection data={ticketData} />
      <TermsSection data={termsData} />
      <FacilitySection data={facilityData} />
      <GallerySection />
    </PublicLayout>
  );
}
