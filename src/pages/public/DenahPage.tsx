import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import DenahSection from "../../components/sections/DenahSection";

export default function DenahPage() {
  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-21 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-start gap-6 md:gap-10.5">
          <BackLink label="Kembali ke Beranda" to="/" />
        </div>
        <DenahSection />
      </div>
    </PublicLayout>
  );
}
