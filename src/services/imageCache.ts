/* eslint-disable @typescript-eslint/no-unused-vars */
const CACHE_NAME = "ticket-images-v1";
const DEFAULT_IMAGE = "/placeholder-ticket.png";

/**
 * Download dan cache image dengan fallback yang aman
 */
export const getCachedImageUrl = async (
  imageUrl: string | undefined
): Promise<string> => {
  if (!imageUrl || !imageUrl.trim()) {
    return DEFAULT_IMAGE;
  }

  try {
    // 1. Cek apakah browser mendukung Cache API
    if (!("caches" in window)) {
      return imageUrl;
    }

    const cache = await caches.open(CACHE_NAME);

    // 2. Cek cache terlebih dahulu
    const cachedResponse = await cache.match(imageUrl);
    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      return URL.createObjectURL(blob);
    }

    // 3. Fetch image dari server (Tanpa mode: 'no-cors' agar blob dapat dibaca)
    const response = await fetch(imageUrl, {
      credentials: "omit",
    });

    // Jika server mengembalikan status 404 / error HTTP lainnya
    if (!response.ok) {
      return DEFAULT_IMAGE;
    }

    // 4. Simpan response valid ke Cache
    await cache.put(imageUrl, response.clone());
    const blob = await response.blob();
    return URL.createObjectURL(blob);

  } catch (error) {
    // Tangani error secara silent (CORS/Network error) tanpa memicu log merah di console
    // Kembalikan URL asli sebagai fallback terakhir agar tag <img> mencoba merender langsung
    return imageUrl;
  }
};

/**
 * Clear cache (optional - untuk development)
 */
export const clearImageCache = async () => {
  try {
    if ("caches" in window) {
      await caches.delete(CACHE_NAME);
      console.log("Cache cleared");
    }
  } catch (error) {
    // Silent catch
  }
};