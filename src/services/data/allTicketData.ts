import { getTickets, getPackageTickets } from "../api/ticketApi";
import { mapTicketArrayApiToTickets } from "../api/mappers/ticketAdapter";
import type { Ticket } from "../../types/ticket";

/**
 * Fetch semua data tiket (satuan + paket)
 * Digabung menjadi satu array
 */
export const fetchAllTickets = async (): Promise<Ticket[]> => {
  try {
    const [satuanResponse, paketResponse] = await Promise.all([
      getTickets(),
      getPackageTickets(),
    ]);

    // Map ke interface Ticket
    const satuanTickets = mapTicketArrayApiToTickets(
      Array.isArray(satuanResponse) ? satuanResponse : satuanResponse?.data ?? []
    );

    const paketTickets = mapTicketArrayApiToTickets(
      Array.isArray(paketResponse) ? paketResponse : paketResponse?.data ?? []
    );

    // Gabung semua
    return [...satuanTickets, ...paketTickets];
  } catch (error) {
    console.error("Gagal fetch semua tiket:", error);
    return [];
  }
};

/**
 * Fetch hanya tiket paket
 */
export const fetchPackageTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await getPackageTickets();
    const data = Array.isArray(response) ? response : response?.data ?? [];
    return mapTicketArrayApiToTickets(data);
  } catch (error) {
    console.error("Gagal fetch tiket paket:", error);
    return [];
  }
};

/**
 * Fetch hanya tiket satuan
 */
export const fetchRegularTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await getTickets();
    const data = Array.isArray(response) ? response : response?.data ?? [];
    return mapTicketArrayApiToTickets(data);
  } catch (error) {
    console.error("Gagal fetch tiket satuan:", error);
    return [];
  }
};