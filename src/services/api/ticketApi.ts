/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./axios";
import type {
  CreatePackageTicketPayload,
  CreateTicketPayload,
  TicketResponse,
} from "../../types/api";
import {
  buildPackageTicketFormData,
  buildTicketFormData,
} from "./helpers/formDataBuilder";
import {
  TICKET_ENDPOINTS,
  getTicketEndpoint,
} from "./helpers/endpoints";

/**
 * =========================================================
 * GET ENDPOINTS
 * =========================================================
 */

/**
 * Fetch semua tiket satuan
 * @returns List tiket satuan
 */
export const getTickets = async () => {
  const response = await api.get(TICKET_ENDPOINTS.SATUAN);
  return response.data;
};

/**
 * Fetch semua tiket paket
 * @returns List tiket paket
 */
export const getPackageTickets = async () => {
  const response = await api.get(TICKET_ENDPOINTS.PAKET);
  return response.data;
};

/**
 * Fetch tiket satuan berdasarkan ID
 * @param id - ID tiket satuan
 * @returns Detail tiket satuan
 */
export const getTicketById = async (id: string): Promise<TicketResponse> => {
  const response = await api.get(TICKET_ENDPOINTS.SATUAN_BY_ID(id));
  return response.data;
};

/**
 * Fetch tiket paket berdasarkan ID
 * @param id - ID tiket paket
 * @returns Detail tiket paket
 */
export const getPackageTicketById = async (
  id: string
): Promise<TicketResponse> => {
  const response = await api.get(TICKET_ENDPOINTS.PAKET_BY_ID(id));
  return response.data;
};

/**
 * =========================================================
 * CREATE ENDPOINTS
 * =========================================================
 */

/**
 * Create tiket satuan baru
 * @param payload - Data tiket satuan
 * @returns Created ticket response
 */
export const createTicket = async (
  payload: CreateTicketPayload
): Promise<TicketResponse> => {
  const formData = buildTicketFormData(payload);
  const response = await api.post(TICKET_ENDPOINTS.SATUAN, formData);
  return response.data;
};

/**
 * Create tiket paket baru
 * @param payload - Data tiket paket
 * @returns Created package ticket response
 */
export const createPackageTicket = async (
  payload: CreatePackageTicketPayload
): Promise<TicketResponse> => {
  const formData = buildPackageTicketFormData(payload);
  const response = await api.post(TICKET_ENDPOINTS.PAKET, formData);
  return response.data;
};

/**
 * =========================================================
 * UPDATE ENDPOINTS
 * =========================================================
 */

// ticketApi.ts

export const updateTicket = async (id: string, payload: FormData) => {
  // 💡 Ganti dari `/admin/tickets/${id}` menjadi `/tiket-wahana/${id}`
  const response = await api.patch(`/tiket-wahana/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Update tiket paket
 * @param id - ID tiket paket
 * @param formData - FormData dengan data yang diupdate
 * @returns Updated package ticket response
 */
export const updatePackageTicket = async (
  id: string,
  formData: FormData
): Promise<TicketResponse> => {
  const response = await api.patch(
    TICKET_ENDPOINTS.PAKET_BY_ID(id),
    formData
  );
  return response.data;
};

/**
 * =========================================================
 * DELETE ENDPOINTS
 * =========================================================
 */

/**
 * Delete tiket (satuan atau paket)
 * @param id - ID tiket
 * @param jenisTiket - Jenis tiket ("Paket Hemat" atau lainnya)
 * @returns Delete response
 */
export const deleteTicket = async (
  id: string,
  jenisTiket: string
): Promise<any> => {
  const endpoint = getTicketEndpoint(jenisTiket, id);
  const response = await api.delete(endpoint);
  return response.data;
};