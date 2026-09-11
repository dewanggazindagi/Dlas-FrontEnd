import type { ReactNode } from "react";
import logo from "../../../assets/images/logo.png";
import BackLink from "../../ui/BackLink";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-4 pt-6 pb-5 md:px-[42px] md:pt-[26px]">
      <div className="flex w-full max-w-[381px] flex-1 flex-col items-center justify-center gap-7">
        <BackLink label="Kembali" to="/" className="mb-[15px] w-full self-start md:hidden" />

        <img src={logo} alt="D'Las Lembah Asri" className="size-16" />

        <div className="flex w-full flex-col items-center gap-2 text-center">
          <p className="text-h6 font-semibold text-black capitalize">{title}</p>
          <p className="text-t5 text-dark-gray">{subtitle}</p>
        </div>

        {children}
      </div>

      <div className="flex w-full flex-col items-start gap-2 border-t border-border pt-4 md:flex-row md:items-center md:gap-8">
        <p className="flex-1 text-t5 text-dark-gray">© 2025 D`LAS Purbalingga.</p>
        <div className="flex flex-wrap items-center gap-1.5 text-t5">
          <p className="text-dark-gray">Terdapat kendala/Bantuan?</p>
          <a href="tel:+622815100004" className="font-semibold text-primary">
            Telepon
          </a>
          <span className="text-dark-gray">•</span>
          <a href="https://wa.me/6281229334485" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
