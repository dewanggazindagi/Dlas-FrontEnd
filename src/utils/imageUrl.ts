const BACKEND_URL = "https://dlas-backend.onrender.com";

export function getImageUrl(url?: string | null): string {
  if (!url) {
    return "/images/default-ticket.webp";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.origin === BACKEND_URL) {
        return `/backend-image${parsedUrl.pathname}`;
      }

      return url;
    } catch {
      return "/images/default-ticket.webp";
    }
  }

  if (url.startsWith("/public/")) {
    return `/backend-image${url}`;
  }

  if (url.startsWith("/")) {
    return `/backend-image${url}`;
  }

  return url;
}