/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import SectionHeading from "../../components/ui/SectionHeading";
import SelectionSummaryBar from "../../components/ui/SelectionSummaryBar";
import PackageTicketCard from "../../components/cards/PackageTicketCard";
import TicketCard from "../../components/cards/TicketCard";
import { getPackageTickets, getTickets } from "../../services/api/ticketApi";
import {
  getRecommendedPackages,
  getSelectedRegularTickets,
} from "../../utils/ticketRecommendation";

/**
 * Bentuk data tiket (sama dengan bentuk data dummy lama) supaya
 * util rekomendasi dan komponen kartu tetap bisa dipakai tanpa diubah.
 * Jika TypeScript protes, ganti dengan type bawaan project (mis. Ticket / PackageTicket).
 */
interface TicketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  includedRides: string[];
}

/**
 * Ambil array dari response list API (bisa langsung array, atau dibungkus { data: [...] }).
 */
function extractList(response: any): any[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

/**
 * Ubah satu item tiket dari API menjadi TicketItem.
 * Harga yang dipakai di kartu adalah harga weekdays.
 * Sesuaikan nama field di sini jika response backend berbeda.
 */
function normalizeTicket(raw: any): TicketItem {
  const rawImages: any[] = raw?.gambar ?? raw?.images ?? [];
  const images = rawImages
    .map((img) =>
      typeof img === "string" ? img : (img?.url ?? img?.path ?? ""),
    )
    .filter(Boolean);

  const rides: any[] = raw?.wahana ?? raw?.wahanas ?? raw?.includedRides ?? [];
  const includedRides = rides
    .map((ride) =>
      typeof ride === "string" ? ride : (
        (ride?.namaWahana ?? ride?.nama ?? ride?.name ?? "")
      ),
    )
    .filter(Boolean);

  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.namaTiket ?? raw?.name ?? "",
    description: raw?.deskripsi ?? raw?.description ?? "",
    price: Number(raw?.hargaWeekdays ?? raw?.harga ?? raw?.price ?? 0),
    images,
    includedRides,
  };
}

function WahanaDiinginkanBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-fit shrink-0 items-center gap-2 rounded-full bg-primary-soft px-3 py-0.5 ${className}`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
      <span className="text-t5 font-medium whitespace-nowrap text-primary">
        Wahana diinginkan
      </span>
    </div>
  );
}

export default function HasilRekomendasiPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedNames = useMemo(
    () =>
      searchParams
        .get("wahana")
        ?.split(",")
        .map(decodeURIComponent)
        .filter(Boolean) ?? [],
    [searchParams],
  );

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [packageTickets, setPackageTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const [satuanRes, paketRes] = await Promise.all([
          getTickets(),
          getPackageTickets(),
        ]);

        if (!cancelled) {
          setTickets(extractList(satuanRes).map(normalizeTicket));
          setPackageTickets(extractList(paketRes).map(normalizeTicket));
        }
      } catch (err) {
        console.error("Gagal memuat data tiket:", err);
        if (!cancelled) {
          setError("Gagal memuat data tiket. Silakan coba lagi.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTickets();

    return () => {
      cancelled = true;
    };
  }, []);

  const recommendedPackages = useMemo(
    () => getRecommendedPackages(selectedNames, packageTickets),
    [selectedNames, packageTickets],
  );
  const selectedTickets = useMemo(
    () =>
      getSelectedRegularTickets(
        selectedNames,
        tickets as unknown as Parameters<typeof getSelectedRegularTickets>[1],
      ),
    [selectedNames, tickets],
  );

  const handleEdit = () => {
    const query = selectedNames.map(encodeURIComponent).join(",");
    navigate(`/tiket/rekomendasi?wahana=${query}`);
  };

  useEffect(() => {
    if (selectedNames.length === 0)
      navigate("/tiket/rekomendasi", { replace: true });
  }, [selectedNames, navigate]);

  if (selectedNames.length === 0) return null;

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex w-full items-center justify-center bg-soft-gray px-4 py-24">
          <p className="text-t4 text-dark-gray">Memuat rekomendasi tiket...</p>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 py-24">
          <p className="text-t4 text-danger">{error}</p>
          <BackLink label="Kembali" to="/tiket" />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-8 bg-soft-gray px-4 pt-6 pb-8 md:gap-21 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-center gap-6 md:gap-10.5">
          <div className="flex w-full flex-col items-start">
            <BackLink label="Kembali" to="/tiket" />
          </div>
          <SectionHeading
            title="Pesan Tiket Wisata"
            description="Temukan tiket dengan mudah dan jelajahi beragam aktivitas serta wahana seru yang ditawarkan D'Las Lembah Asri."
          />
          <SelectionSummaryBar
            count={selectedNames.length}
            onEdit={handleEdit}
          />
        </div>

        <div className="flex w-full max-w-334 flex-col items-center gap-14 md:gap-12 md:px-10.5">
          {recommendedPackages.length > 0 && (
            <section className="flex w-full flex-col items-start gap-6 md:gap-9.5">
              <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div className="flex flex-col gap-1.5">
                  <div className="flex w-full items-center justify-between gap-3 md:justify-start">
                    <h2 className="text-t2 font-semibold text-black capitalize md:text-h6">
                      Tiket Paket Murah
                    </h2>
                    <WahanaDiinginkanBadge className="flex md:hidden" />
                  </div>
                  <p className="text-t5 text-dark-gray md:text-t3">
                    Rekomendasi tiket dimana semua/mayoritas wahana yang
                    diingini termasuk dalam paket namun secara keseluruhan
                    mendapat harga lebih murah
                  </p>
                </div>
                <WahanaDiinginkanBadge className="hidden md:flex" />
              </div>
              <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-3">
                {recommendedPackages.map((pkg) => (
                  <PackageTicketCard
                    key={pkg.id}
                    packageTicket={pkg}
                    highlightedRides={selectedNames}
                  />
                ))}
              </div>
            </section>
          )}

          {selectedTickets.length > 0 && (
            <section className="flex w-full flex-col items-start gap-6 md:gap-9.5">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-t2 font-semibold text-black capitalize md:text-h6">
                  Tiket Regular/Satuan
                </h2>
                <p className="text-t5 text-dark-gray md:text-t3">
                  Jika anda ingin membeli satuan namun dengan harga yang lebih
                  mahal dibanding paket murah dan/atau wahana yang anda inginkan
                  yang tidak termasuk ke paket
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-3">
                {selectedTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
