import { Navigate, useParams, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import TicketTermsBox from "../../components/cards/TicketTermsBox";
import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";
import { termsData } from "../../services/data/termsData";
import { regularTicketTermsData, packageTicketTermsData } from "../../services/data/ticketTermsData";
import { formatter } from "../../utils/formatter";

export default function KonfirmasiPembelianPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const ticket = ticketData.find((item) => item.id === id);
  const packageTicket = packageTicketData.find((item) => item.id === id);

  if (!ticket && !packageTicket) {
    return <Navigate to="/tiket" replace />;
  }

  const item = (ticket ?? packageTicket)!;
  const isPackage = Boolean(packageTicket);
  const quantity = Math.max(1, Number(searchParams.get("qty")) || 1);
  const dateParam = searchParams.get("date");
  const dateLabel = dateParam ? formatter.dateLong(dateParam) : "-";
  const totalPayment = item.price * quantity;
  const categoryTerms = isPackage ? packageTicketTermsData : regularTicketTermsData;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-[42px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-start">
          <BackLink label="Kembali" to={`/tiket/${item.id}`} />
        </div>

        <div className="flex w-full max-w-[742px] flex-col items-center gap-8 md:gap-[38px]">
          <div className="flex w-full flex-col items-center gap-2 text-center md:gap-4">
            <p className="text-h6 font-semibold text-black capitalize md:text-h2">Konfirmasi Pembelian</p>
            <p className="text-t5 text-dark-gray md:text-t3">Selesaikan transaksi anda dan nikmati liburan anda</p>
          </div>

          <div className="flex w-full flex-col items-start rounded-2xl border border-border bg-white p-2.5">
            <div className="flex w-full items-start gap-4">
              <div className="size-[120px] shrink-0 overflow-hidden rounded-xl border border-border bg-soft-gray">
                <img src={item.images[0]} alt={item.name} className="size-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col items-start justify-between gap-4 self-stretch py-1">
                <div className="flex w-full flex-col items-start gap-1">
                  <p className="w-full text-t3 font-semibold text-black capitalize">{item.name}</p>
                  <p className="line-clamp-2 w-full text-t5 text-dark-gray">{item.description}</p>
                </div>
                <div className="flex items-end gap-1">
                  <p className="text-t4 font-medium text-black">{formatter.rupiah(item.price)}</p>
                  <p className="text-t5 text-dark-gray">/tiket</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-5">
            <p className="text-t2 font-medium text-black">Detail Pemesanan</p>

            <div className="flex w-full flex-col items-start gap-3">
              <div className="flex w-full flex-col items-start gap-5 rounded-2xl border border-border bg-white p-4">
                <div className="flex w-full items-start gap-5 text-t4">
                  <p className="flex-1 text-dark-gray">Berlibur pada</p>
                  <p className="text-dark-gray">{dateLabel}</p>
                </div>

                <div className="h-px w-full border-t border-border" />

                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-start gap-5">
                    <p className="flex-1 text-t4 text-dark-gray">Harga Tiket</p>
                    <div className="flex items-center gap-5">
                      <p className="text-t4 text-dark-gray">x{quantity}</p>
                      <p className="text-t4 text-dark-gray">{formatter.rupiah(item.price)}</p>
                    </div>
                  </div>
                  <div className="h-px w-full border-t border-border" />
                  <div className="flex w-full items-start gap-5">
                    <p className="flex-1 text-t4 text-dark-gray">Total Pembayaran</p>
                    <p className="text-t4 font-medium text-black">{formatter.rupiah(totalPayment)}</p>
                  </div>
                </div>

                <Button variant="primary" fullWidth>
                  Bayar Sekarang
                </Button>
              </div>

              <TicketTermsBox title="Ketentuan Tiket" terms={categoryTerms} />
              <TicketTermsBox title="Ketentuan D'las Lembah Asri" terms={termsData} />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
