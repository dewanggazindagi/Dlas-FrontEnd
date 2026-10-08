/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useCallback, useEffect } from "react";
import { getCachedImageUrl } from "../services/imageCache";

const DEFAULT_IMAGE = "/images/default-ticket.webp";
const MAX_IMAGE_LOAD_ATTEMPTS = 1;

interface UseImageLoaderProps {
  imageUrl: string | undefined;
  fallbackUrl?: string;
  useCaching?: boolean; // Enable image caching
}

/**
 * Hook untuk manage image loading dengan retry logic & caching
 */
export const useImageLoader = ({
  imageUrl,
  fallbackUrl = DEFAULT_IMAGE,
  useCaching = true, // Default enable caching
}: UseImageLoaderProps) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    imageUrl || fallbackUrl
  );
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [isImageError, setIsImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cached image on mount
  useEffect(() => {
    if (!imageUrl || !useCaching) {
      setIsLoading(false);
      return;
    }

    const loadCachedImage = async () => {
      try {
        setIsLoading(true);
        const cachedUrl = await getCachedImageUrl(imageUrl);
        setCurrentImageUrl(cachedUrl);
        setIsImageError(false);
      } catch (error) {
        console.error("Error loading cached image:", error);
        setCurrentImageUrl(fallbackUrl);
        setIsImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCachedImage();
  }, [imageUrl, useCaching, fallbackUrl]);

  const handleImageError = useCallback(() => {
    const newAttempts = loadAttempts + 1;
    setLoadAttempts(newAttempts);

    if (newAttempts >= MAX_IMAGE_LOAD_ATTEMPTS) {
      setCurrentImageUrl(fallbackUrl);
      setIsImageError(true);
      return;
    }

    setCurrentImageUrl((prev) => `${prev}?retry=${newAttempts}`);
  }, [loadAttempts, fallbackUrl]);

  return {
    currentImageUrl,
    handleImageError,
    isImageError,
    isLoading,
  };
};