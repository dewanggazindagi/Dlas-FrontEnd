/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ticket } from "../../types/ticket";
import { useImageLoader } from "../../hooks/useImageLoader";
import { usePackageItems } from "../../hooks/usePackageItems";
import { getTicketImage, getImageUrl } from "../../utils/imageHelper";
import Button from "../ui/Button";
import { useState } from "react";

interface TicketCardProps {
  ticket: Ticket;
  itemNames?: Record<string, string>;
  itemTickets?: Record<string, Ticket>;
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
}

/**
 * Component untuk menampilkan kartu tiket dengan image caching
 */
export default function TicketCard({
  ticket,
  itemNames = {},
  itemTickets = {},
  onEdit,
  onDelete,
}: TicketCardProps) {
  // Ambil URL gambar pertama langsung dari array gambar backend
  const mainImageUrl = getTicketImage(ticket.gambar, 0);

  const { currentImageUrl, handleImageError, isLoading } = useImageLoader({
    imageUrl: mainImageUrl,
    useCaching: false,
  });

  // Pengecekan jenis tiket yang fleksibel (mendukung "PAKET" maupun "Paket Hemat")
  const isPackageTicket =
    ticket.jenisTiket === "PAKET" || ticket.jenisTiket === "Paket Hemat";

  // Ambil list URL gambar
  // Jika tiket paket, gabungkan semua gambar dari wahanaSatuan dan ambil maksimal 4 untuk grid
  const packageImages =
    isPackageTicket && ticket.wahanaSatuan ?
      ticket.wahanaSatuan
        .flatMap((wahana: any) => wahana.gambar || [])
        .map((img: any) => getImageUrl(img.urlGambar))
        .filter(Boolean)
        .slice(0, 4)
    : ticket.gambar?.map((img) => getImageUrl(img.urlGambar)) || [];

  const showPackageGrid = isPackageTicket && packageImages.length > 0;

  // Package items loader
  const { packageItems } = usePackageItems({
    ticket,
    itemTickets,
    itemNames,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white p-3">
      {/* HEADER: IMAGE + INFO */}
      <div className="flex gap-3">
        {/* IMAGE SECTION */}
        {showPackageGrid ?
          <PackageImageGrid
            images={packageImages}
            ticketName={ticket.namaTiket}
            ticketId={ticket.id}
          />
        : <MainImage
            src={currentImageUrl}
            alt={ticket.namaTiket}
            onError={handleImageError}
            isLoading={isLoading}
          />
        }

        {/* INFO SECTION */}
        <div className="grid min-w-0 flex-1 justify-between">
          <div>
            <h3 className="truncate text-[18px] font-semibold text-gray-900">
              {ticket.namaTiket}
            </h3>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                ticket.status === "Tiket Aktif" ?
                  "bg-green-100 text-primary"
                : "bg-gray-100 text-gray-500"
              }`}
            >
              {ticket.status === "Tiket Aktif" ? "Tiket Aktif" : "Tidak Aktif"}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            <span className="text-md font-medium text-black">
              {formatRupiah(ticket.hargaWeekdays)}
            </span>
            <span className="ml-1 text-xs text-dark-gray">/tiket</span>
          </div>
        </div>
      </div>

      {/* PACKAGE ITEMS LIST */}
      {isPackageTicket && packageItems.length > 0 && (
        <PackageItemsList items={packageItems} ticketId={ticket.id} />
      )}

      {/* ACTION BUTTONS */}
      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          onClick={() => onDelete?.(ticket)}
          variant="outline"
          size="sm"
          className="h-11 flex-1 border-border font-semibold text-danger hover:bg-danger-soft"
          startIcon={false}
        >
          Hapus Tiket
        </Button>

        <Button
          type="button"
          onClick={() => onEdit?.(ticket)}
          variant="outline"
          size="sm"
          className="h-11 flex-1 border-border font-semibold text-black hover:bg-primary-soft"
          startIcon={false}
        >
          Edit Tiket
        </Button>
      </div>
    </div>
  );
}

/**
 * Component untuk main image (tiket satuan) dengan penanganan fallback 404
 */
function MainImage({
  src,
  alt,
  onError,
  isLoading,
}: {
  src: string;
  alt: string;
  onError: () => void;
  isLoading?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleLocalError = () => {
    // Mengganti ke gambar placeholder lokal jika server mengembalikan 404 / error
    setImgSrc("/placeholder-ticket.png");
    onError?.();
  };

  return (
    <div className="relative h-35 w-35 shrink-0 overflow-hidden rounded-xl bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50">
          <span className="text-xs text-gray-600">Loading...</span>
        </div>
      )}
      <img
        src={imgSrc || src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={handleLocalError}
      />
    </div>
  );
}

/**
 * Component untuk package image grid (2x2)
 */
function PackageImageGrid({
  images,
  ticketName,
  ticketId,
}: {
  images: string[];
  ticketName: string;
  ticketId: string;
}) {
  return (
    <div className="grid h-35 w-35 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-xl bg-gray-100">
      {images.slice(0, 4).map((src, index) => (
        <PackageGridImage
          key={`${ticketId}-image-${index}`}
          src={src}
          alt={`${ticketName} ${index + 1}`}
        />
      ))}
    </div>
  );
}

/**
 * Component untuk single image di package grid
 */
function PackageGridImage({ src, alt }: { src: string; alt: string }) {
  const { currentImageUrl, handleImageError } = useImageLoader({
    imageUrl: src,
    useCaching: false,
  });

  const [imgSrc, setImgSrc] = useState(currentImageUrl);

  const handleLocalError = () => {
    setImgSrc("/placeholder-ticket.png");
    handleImageError();
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <img
        src={imgSrc || currentImageUrl}
        alt={alt}
        className="h-full w-full object-cover"
        onError={handleLocalError}
      />
    </div>
  );
}

/**
 * Component untuk package items list
 */
function PackageItemsList({
  items,
  ticketId,
}: {
  items: Array<{ id: string; name: string }>;
  ticketId: string;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-border bg-gray-50">
      {items.map((item, index) => (
        <div
          key={`${ticketId}-${item.id}`}
          className="flex items-center gap-2 border-b border-border px-2 py-2 last:border-b-0"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-dark-gray">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="truncate text-md text-black">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Helper function untuk format rupiah (Aman menerima tipe string "10000.00" atau number 10000)
 */
function formatRupiah(value: number | string): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
}
