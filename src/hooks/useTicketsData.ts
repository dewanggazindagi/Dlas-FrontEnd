import { useEffect, useState } from "react";
import { fetchAllTickets } from "../services/data/allTicketData";
import type { Ticket } from "../types/ticket";

/**
 * Hook untuk fetch dan manage data tiket
 */
export const useTicketsData = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchAllTickets();
        setTickets(data);
      } catch (err) {
        console.error("Error loading tickets:", err);
        setError("Gagal mengambil data tiket");
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  return { tickets, loading, error };
};