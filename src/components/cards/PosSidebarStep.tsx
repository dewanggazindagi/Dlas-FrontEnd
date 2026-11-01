const SOP_STEPS = [
  {
    number: "01",
    title: "Salam & Sapa",
    desc: "Berikan salam & sapa yang ramah",
  },
  {
    number: "02",
    title: "Menjelaskan Jenis Tiket",
    desc: "Jelaskan berbagai jenis tiket",
  },
  {
    number: "03",
    title: "Menanyakan Keinginan",
    desc: "Tanya keinginan wahana/tiket",
  },
  {
    number: "04",
    title: "Rekomendasi",
    desc: "Jika wahana, berikan rekomendasi",
  },
  {
    number: "05",
    title: "Memilih Tiket Yang Diinginkan",
    desc: "Anda klik tiket sesuai keinginan",
  },
  {
    number: "06",
    title: "Menjelaskan Tiket",
    desc: "Jelaskan tentang & ketentuan tiket",
  },
  {
    number: "07",
    title: "Proses Pembayaran",
    desc: "Selesaikan proses pembayaran",
  },
  {
    number: "08",
    title: "Ucapan Terimakasih",
    desc: "Terimakasih sudah berkunjung",
  },
];

export default function PosSidebarStep() {
  return (
    <div className="bg-[#1C1E21] text-white p-6 rounded-3xl flex flex-col justify-between">
      {/* Header Sidebar */}
      <div>
        <h2 className="text-xl font-medium tracking-tight">
          Langkah Layanan Tiket
        </h2>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Langkah aturan ketika anda melayani pembelian tiket pengunjung
        </p>
      </div>

      {/* List Steps dengan Garis Sekat */}
      <div className="mt-6 space-y-0 relative">
        {SOP_STEPS.map((step, index) => {
          const isLast = index === SOP_STEPS.length - 1;

          return (
            <div key={step.number} className="relative flex gap-4 items-start pb-5">
              {/* Line Penghubung */}
              {!isLast && (
                <span
                  className="absolute left-[17px] top-[36px] w-[1px] bg-white/15 h-[calc(100%-20px)]"
                  aria-hidden="true"
                />
              )}

              {/* Buletan Nomor */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-xs font-medium text-white">
                {step.number}
              </div>

              {/* Teks Informasi */}
              <div className="pt-1 min-w-0">
                <h3 className="text-xs font-medium text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}