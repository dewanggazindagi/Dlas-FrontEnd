import { useMemo } from "react";
import type { Ticket } from "../types/ticket";

interface UsePackageItemsProps {
  ticket: Ticket;
  itemTickets: Record<string, Ticket>;
  itemNames: Record<string, string>;
}

interface PackageItem {
  id: string;
  name: string;
  ticket: Ticket | undefined;
  imageUrl: string | undefined;
}

/**
 * Hook untuk manage package tiket items
 */
export const usePackageItems = ({
  ticket,
  itemTickets,
  itemNames,
}: UsePackageItemsProps) => {
  const packageItems = useMemo<PackageItem[]>(() => {
    if (ticket.jenisTiket !== "Paket Hemat" || !Array.isArray(ticket.wahanaIds)) {
      return [];
    }

    return ticket.wahanaIds
      .map((itemId) => {
        const id = String(itemId);
        const itemTicket = itemTickets[id];
        const itemName = itemTicket?.namaTiket ?? itemNames[id] ?? id;
        const imageUrl = itemTicket?.gambar?.[0]?.urlGambar;

        return {
          id,
          name: itemName,
          ticket: itemTicket,
          imageUrl,
        };
      })
      .filter((item) => item.ticket);
  }, [ticket, itemTickets, itemNames]);

  const packageImages = useMemo<string[]>(() => {
    return packageItems
      .map((item) => item.imageUrl)
      .filter((url): url is string => Boolean(url));
  }, [packageItems]);

  return {
    packageItems,
    packageImages,
  };
};