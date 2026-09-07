import type { TicketGambar } from "../types/ticket";

const DEFAULT_IMAGE = "/images/default-ticket.webp";
const BACKEND_URL = "https://dlas-backend.onrender.com";

/**
 * Memproses URL Gambar agar melewati Proxy Vite saat Dev (Bypass CORS/NotSameOrigin)
 */
export const getImageUrl = (
  imageUrl: string | undefined,
  fallback: string = DEFAULT_IMAGE
): string => {
  if (!imageUrl || !imageUrl.trim()) {
    return fallback;
  }

  // Jika di mode Development dan URL berasal dari Backend Render,
  // alihkan lewat Proxy /backend-image yang ada di vite.config.ts
  if (import.meta.env.DEV && imageUrl.startsWith(BACKEND_URL)) {
    return imageUrl.replace(BACKEND_URL, "/backend-image");
  }

  return imageUrl;
};

/**
 * Helper untuk mengambil URL gambar tiket berdasarkan index
 */
export const getTicketImage = (
  images: TicketGambar[] | undefined,
  index: number = 0,
  fallback: string = DEFAULT_IMAGE
): string => {
  const rawUrl = images?.[index]?.urlGambar;
  return getImageUrl(rawUrl, fallback);
};