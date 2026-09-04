import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import DateField from "../../components/ui/DateField";
import QuantityStepper from "../../components/ui/QuantityStepper";
import TicketGallery from "../../components/ui/TicketGallery";
import NumberedPoint from "../../components/ui/NumberedPoint";
import TicketTermsBox from "../../components/cards/TicketTermsBox";
import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";
import { termsData } from "../../services/data/termsData";
import { regularTicketTermsData, packageTicketTermsData } from "../../services/data/ticketTermsData";
import { formatter } from "../../utils/formatter";

export default function DetailTiketPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const ticket = ticketData.find((item) => item.id === id);
  const packageTicket = packageTicketData.find((item) => item.id === id);

  const includedTickets = useMemo(() => {
    if (!packageTicket) return [];
    return packageTicket.includedRides.map((ride) => ({
      name: ride,
      ticket: ticketData.find((item) => item.name === ride),
    }));
  }, [packageTicket]);

  if (!ticket && !packageTicket) {
    return <Navigate to="/tiket" replace />;
  }

  const item = (ticket ?? packageTicket)!;
  const isPackage = Boolean(packageTicket);
  const totalPayment = item.price * quantity;
  const priceLabel = isPackage ? "Harga Tiket Paket" : "Harga Tiket Satuan";
  const categoryTerms = isPackage ? packageTicketTermsData : regularTicketTermsData;

  const confirmationParams = new URLSearchParams({ qty: String(quantity) });
  if (selectedDate) confirmationParams.set("date", selectedDate.toISOString());
  const confirmationUrl = `/tiket/${item.id}/konfirmasi?${confirmationParams.toString()}`;

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-[42px] md:px-[52px] md:pt-[26px] md:pb-[84px]">
        <div className="flex w-full max-w-[1336px] flex-col items-start">
          <BackLink label="Kembali" to="/tiket" className="md:hidden" />
          <BackLink label="Kembali ke Beranda" to="/" className="hidden md:flex" />
        </div>

        <div className="flex w-full max-w-[1336px] flex-col items-start gap-8 md:flex-row md:gap-12">
          <div className="w-full md:sticky md:top-4 md:w-auto md:flex-1">
            <TicketGallery images={item.images} alt={item.name} />
          </div>

          <div className="flex w-full flex-col items-start gap-8 md:w-auto md:flex-1">
            <div className="flex w-full flex-col items-start gap-5">
              <p className="w-full text-h7 font-semibold text-black capitalize md:text-h6">{item.name}</p>
              <div className="flex items-end gap-1">
                <p className="text-t3 font-medium text-black">{formatter.rupiah(item.price)}</p>
                <p className="text-t5 text-dark-gray">/tiket</p>
              </div>
              <div className="flex w-full flex-col items-start gap-5">
                <p className="text-t3 font-medium text-black">Deskripsi Tiket</p>
                <p className="w-full text-t4 text-dark-gray">{item.description}</p>
              </div>

              {isPackage && (
                <div className="flex w-full flex-col items-start gap-5">
                  <p className="text-t3 font-medium text-black">Wahana Apa saja yang termasuk?</p>
                  <div className="flex w-full flex-col items-start gap-3.5 rounded-2xl border border-border bg-white p-4">
                    {includedTickets.map((included, index) => (
                      <div key={included.name} className="flex w-full flex-col gap-3.5">
                        {index > 0 && <div className="h-px w-full border-t border-border" />}
                        {included.ticket ? (
                          <Link
                            to={`/tiket/${included.ticket.id}`}
                            className="flex w-full cursor-pointer items-center gap-2.5"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-soft-gray text-t6 font-semibold text-dark-gray">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-t4 font-medium text-black">{included.name}</span>
                            <ArrowRight size={18} className="shrink-0 text-black" />
                          </Link>
                        ) : (
                          <NumberedPoint
                            number={String(index + 1).padStart(2, "0")}
                            textClassName="text-t4 font-medium text-dark-gray"
                          >
                            {included.name}
                          </NumberedPoint>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-3 rounded-2xl border border-border bg-white p-2.5 shadow-card">
              <div className="flex w-full flex-col items-start gap-2.5">
                <TicketTermsBox title="Ketentuan Tiket" terms={categoryTerms} />
                <TicketTermsBox title="Ketentuan D'las Lembah Asri" terms={termsData} />
              </div>

              <div className="flex w-full flex-col items-start gap-5 px-1.5">
                <DateField label="Kapan anda berlibur?" date={selectedDate} onDateChange={setSelectedDate} />

                <div className="flex w-full items-center gap-5">
                  <p className="flex-1 text-t4 font-medium text-black">Jumlah tiket yang dibeli</p>
                  <QuantityStepper value={quantity} onChange={setQuantity} />
                </div>

                <div className="h-px w-full border-t border-border" />

                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-start gap-5">
                    <p className="flex-1 text-t4 text-dark-gray">{priceLabel}</p>
                    <div className="flex items-center gap-5">
                      <p className="text-t4 text-dark-gray">x{quantity}</p>
                      <p className="text-t4 text-black">{formatter.rupiah(item.price)}</p>
                    </div>
                  </div>
                  <div className="h-px w-full border-t border-border" />
                  <div className="flex w-full items-start gap-5">
                    <p className="flex-1 text-t4 text-dark-gray">Total Pembayaran</p>
                    <p className="text-t4 font-medium text-black">{formatter.rupiah(totalPayment)}</p>
                  </div>
                </div>

                <div className="h-px w-full border-t border-border" />

                <button
                  type="button"
                  onClick={() => setConfirmed((prev) => !prev)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5 text-left"
                >
                  <Checkbox checked={confirmed} className="shrink-0" />
                  <span className="flex-1">
                    <span className="hidden text-t5 text-dark-gray md:inline">
                      Ya, saya sudah memastikan data pesanan sudah benar & Membaca ketentuan
                    </span>
                    <span className="text-t5 text-dark-gray md:hidden">
                      Klik untuk checklist jika anda sudah memastikan data pesanan sudah benar & menyetujui ketentuan
                    </span>
                  </span>
                </button>
              </div>

              <Button variant="primary" fullWidth disabled={!confirmed} to={confirmationUrl}>
                Beli Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
