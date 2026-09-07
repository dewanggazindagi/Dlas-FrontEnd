/**
 * API endpoint untuk proxy image
 * Bypass CORS issues dengan route image melalui backend yang sudah authenticated
 */

const API_BASE_URL = "https://dlas-backend.onrender.com";

/**
 * Get image melalui API endpoint (jika backend support)
 * @param imageUrl - URL gambar external
 * @returns Proxied URL
 */
export const getProxiedImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "/images/default-ticket.webp";

  // Jika sudah bisa diakses, return langsung
  if (imageUrl.startsWith("data:")) return imageUrl;

  // Proxy melalui backend endpoint (jika tersedia)
  try {
    const encoded = encodeURIComponent(imageUrl);
    return `${API_BASE_URL}/api/proxy-image?url=${encoded}`;
  } catch {
    return "/images/default-ticket.webp";
  }
};