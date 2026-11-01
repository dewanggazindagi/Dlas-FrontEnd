import type { TicketPackage } from "../../services/data/posTicketData";

interface TicketPackageCardProps {
  pkg: TicketPackage;
  onSelect: (pkg: TicketPackage) => void;
  onDetail: (pkg: TicketPackage) => void;
}

export default function TicketPackageCard({
  pkg,
  onSelect,
  onDetail,
}: TicketPackageCardProps) {
  if (!pkg) return null;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between max-w-[360px] w-full">
      <div>
        <h3 className="font-semibold text-lg text-gray-900 tracking-tight">
          {pkg.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed font-normal">
          {pkg.description || "Kumpulan wahana dan juga sudah termasuk tiket masuk"}
        </p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-semibold text-lg text-gray-900">
            Rp{pkg.price?.toLocaleString("id-ID")}
          </span>
          <span className="text-xs text-gray-500 font-normal">/tiket</span>
        </div>

        <div className="mt-4 bg-[#F8F9FA] rounded-2xl p-3 border border-gray-100/60 space-y-1">
          {pkg.attractions?.map((item, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 py-2 ${
                  idx !== pkg.attractions.length - 1
                    ? "border-b border-gray-200/50"
                    : ""
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-gray-100 text-[11px] font-semibold text-gray-600 shadow-2xs">
                  {num}
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDetail(pkg);
          }}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer"
        >
          Lihat Detail
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pkg);
          }}
          className="w-full bg-[#2E9310] hover:bg-green-700 text-white py-2.5 rounded-full text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          Pilih & Lanjutkan
        </button>
      </div>
    </div>
  );
}