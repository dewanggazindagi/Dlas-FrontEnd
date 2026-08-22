import logo from "../../../assets/images/logo.png";
import facebookIcon from "../../../assets/icons/Facebook.svg";
import instagramIcon from "../../../assets/icons/Instagram.svg";
import tiktokIcon from "../../../assets/icons/TikTok.svg";
import linkedinIcon from "../../../assets/icons/LinkedIn.svg";
import Button from "../../ui/Button";

const socialLinks = [
  { name: "TikTok", icon: tiktokIcon, href: "#" },
  { name: "LinkedIn", icon: linkedinIcon, href: "#" },
  { name: "Facebook", icon: facebookIcon, href: "#" },
  { name: "Instagram", icon: instagramIcon, href: "#" },
];

export default function PublicFooter() {
  return (
    <footer className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-8 pb-6 md:gap-[42px] md:px-[52px] md:pt-[84px] md:pb-5">
      <div className="flex w-full flex-col items-center gap-6 border-b border-border pb-6 md:gap-10 md:pb-[42px]">
        <div className="flex w-full flex-col items-center gap-4 text-center md:w-[768px]">
          <h3 className="text-h6 font-semibold text-black capitalize md:text-h4">
            Kunjungi D'las Lembah Asri & Nikmati Keindahannya
          </h3>
          <p className="text-t5 text-dark-gray md:w-[482px] md:text-t3">
            Jangan lewatkan kesempatan untuk menjelajahi keindahan alam dan berbagai wahana menarik di sini.
          </p>
        </div>
        <Button variant="primary" size="lg">
          Beli Tiket Sekarang
        </Button>
      </div>

      <div className="flex w-full flex-col items-start gap-8 md:flex-row md:justify-between">
        <div className="flex w-full flex-col items-start gap-3 md:w-[456px]">
          <img src={logo} alt="D'Las Lembah Asri" className="h-[94px] w-[90px]" />
          <p className="text-t4 text-dark-gray">
            Area rekreasi dengan kebun stroberi, ladang bunga & tempat makan lokal, yang populer di kalangan
            keluarga.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-8 text-t4 text-dark-gray md:w-[548px] md:flex-row md:gap-8">
          <div className="flex flex-1 flex-col items-start gap-6">
            <p className="font-semibold text-black">Kontak</p>
            <div className="flex flex-col items-start gap-4">
              <p>WA : 0812-2933-4485</p>
              <p>SMS : 028-1510-0004</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start gap-6">
            <p className="font-semibold text-black">Alamat</p>
            <div className="flex flex-col items-start gap-5">
              <p>Jl. Raya Serang, Krajan, Serang, Kec. Karangreja, Kabupaten Purbalingga, Jawa Tengah 5335</p>
              <a
                href="https://maps.app.goo.gl/Gnq9n4DYYp1hoFix7"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium text-black underline"
              >
                Buka Google Map
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start border-t border-border pt-8">
        <div className="flex w-full items-center gap-8">
          <p className="flex-1 text-t4 text-dark-gray">© 2025 D`LAS Purbalingga.</p>
          <div className="hidden items-center gap-6 md:flex">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} aria-label={social.name} className="cursor-pointer">
                <img src={social.icon} alt="" className="size-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
