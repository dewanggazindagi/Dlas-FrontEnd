import { useEffect, useState } from "react";
import { getTickets } from "../services/api/ticketApi";
import type { RegularTicket } from "../types/ticket";

/**
 * Hook untuk mengelola daftar wahana/tiket satuan
 */
export const useWahanaSelection = (type: string) => {
  const [regularTickets, setRegularTickets] = useState<RegularTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type !== "package") {
      return;
    }

    const fetchRegularTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTickets();
        const data = Array.isArray(response) ? response : (response?.data ?? []);
        const satuan = data.filter(
          (ticket: RegularTicket) => ticket.jenisTiket === "SATUAN"
        );

        setRegularTickets(satuan);
      } catch (error) {
        console.error("Gagal mengambil tiket satuan:", error);
        setError("Gagal mengambil daftar wahana.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegularTickets();
  }, [type]);

  return { regularTickets, loading, error };
};