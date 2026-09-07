import { useEffect, useMemo, useState } from "react";
import type { Ticket } from "../types/ticket";
import {
  getTickets,
  getPackageTickets,
  deleteTicket,
} from "../services/api/ticketApi";
import { mapTicketApiToTicket } from "../services/api/mappers/ticketAdapter";

/**
 * Hook untuk manage semua data tiket (fetch, delete, filter)
 */
export const useTicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [packageTickets, setPackageTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch tiket satuan dan paket
   */
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        // Fetch tiket satuan
        const regularResponse = await getTickets();
        const regularData = Array.isArray(regularResponse)
          ? regularResponse
          : regularResponse?.data ?? [];
        const mappedRegular = regularData.map(mapTicketApiToTicket);

        console.log("=== TIKET SATUAN ===");
        console.log("RAW API:", regularData);
        console.log("SETELAH ADAPTER:", mappedRegular);

        setTickets(mappedRegular);

        // Fetch tiket paket
        const packageResponse = await getPackageTickets();
        const packageData = Array.isArray(packageResponse)
          ? packageResponse
          : packageResponse?.data ?? [];
        const mappedPackage = packageData.map(mapTicketApiToTicket);

        console.log("=== TIKET PAKET ===");
        console.log("RAW API:", packageData);
        console.log("SETELAH ADAPTER:", mappedPackage);

        setPackageTickets(mappedPackage);
      } catch (error) {
        console.error("Gagal mengambil data tiket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  /**
   * Mapping tiket satuan untuk referensi
   * Digunakan untuk mencari gambar tiket satuan dalam paket
   */
  const itemTickets = useMemo<Record<string, Ticket>>(() => {
    return tickets.reduce<Record<string, Ticket>>((acc, ticket) => {
      acc[String(ticket.id)] = ticket;
      return acc;
    }, {});
  }, [tickets]);

  /**
   * Mapping nama tiket satuan
   * Digunakan untuk menampilkan nama wahana dalam paket
   */
  const itemNames = useMemo<Record<string, string>>(() => {
    return tickets.reduce<Record<string, string>>((acc, ticket) => {
      acc[String(ticket.id)] = ticket.namaTiket;
      return acc;
    }, {});
  }, [tickets]);

  /**
   * Delete tiket
   */
  const handleDeleteTicket = async (ticket: Ticket): Promise<boolean> => {
    try {
      await deleteTicket(ticket.id, ticket.jenisTiket);

      if (ticket.jenisTiket === "Regular/Satuan") {
        setTickets((prev) => prev.filter((item) => item.id !== ticket.id));
      } else if (ticket.jenisTiket === "Paket Hemat") {
        setPackageTickets((prev) =>
          prev.filter((item) => item.id !== ticket.id)
        );
      }

      return true;
    } catch (error) {
      console.error("Gagal menghapus tiket:", error);
      return false;
    }
  };

  return {
    tickets,
    packageTickets,
    loading,
    itemTickets,
    itemNames,
    handleDeleteTicket,
  };
};