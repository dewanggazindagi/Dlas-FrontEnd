/**
 * API Endpoints untuk tiket
 */
export const TICKET_ENDPOINTS = {
  // Regular/Satuan tickets
  SATUAN: "/tiket-wahana",
  SATUAN_BY_ID: (id: string) => `/tiket-wahana/${id}`,

  // Package tickets
  PAKET: "/tiket/paket",
  PAKET_BY_ID: (id: string) => `/tiket/paket/${id}`,
} as const;

/**
 * Determine endpoint berdasarkan jenis tiket
 * @param jenisTiket - Jenis tiket ("Paket Hemat" atau lainnya)
 * @param id - ID tiket (opsional)
 * @returns Endpoint URL
 */
export const getTicketEndpoint = (
  jenisTiket: string,
  id?: string
): string => {
  const isPacket = jenisTiket === "Paket Hemat";

  if (id) {
    return isPacket
      ? TICKET_ENDPOINTS.PAKET_BY_ID(id)
      : TICKET_ENDPOINTS.SATUAN_BY_ID(id);
  }

  return isPacket ? TICKET_ENDPOINTS.PAKET : TICKET_ENDPOINTS.SATUAN;
};