import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import DenahSection from "../../components/sections/DenahSection";

export default function DenahPage() {
  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-[84px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-start gap-6 md:gap-[42px]">
          <BackLink label="Kembali ke Beranda" to="/" />
        </div>
        <DenahSection />
      </div>
    </PublicLayout>
  );
}
