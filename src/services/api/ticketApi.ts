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

<<<<<<< HEAD
/**
 * =========================================================
 * GET ENDPOINTS
 * =========================================================
 */
=======
// =========================================================
// TYPES
// =========================================================

export interface CreateTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: File[];
}

export interface CreatePackageTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: File[];
  wahanaIds: string[];
}

// =========================================================
// GET TICKETS
// =========================================================

export async function getTickets() {
  const response = await api.get("/tiket-wahana");
>>>>>>> arthur/main

/**
 * Fetch semua tiket satuan
 * @returns List tiket satuan
 */
export const getTickets = async () => {
  const response = await api.get(TICKET_ENDPOINTS.SATUAN);
  return response.data;
<<<<<<< HEAD
};
=======
}

export async function getPackageTickets() {
  const response = await api.get("/tiket/paket");
>>>>>>> arthur/main

/**
 * Fetch semua tiket paket
 * @returns List tiket paket
 */
export const getPackageTickets = async () => {
  const response = await api.get(TICKET_ENDPOINTS.PAKET);
  return response.data;
<<<<<<< HEAD
};
=======
}

export async function getTicketById(id: string) {
  const response = await api.get(`/tiket-wahana/${id}`);
>>>>>>> arthur/main

/**
 * Fetch tiket satuan berdasarkan ID
 * @param id - ID tiket satuan
 * @returns Detail tiket satuan
 */
export const getTicketById = async (id: string): Promise<TicketResponse> => {
  const response = await api.get(TICKET_ENDPOINTS.SATUAN_BY_ID(id));
  return response.data;
<<<<<<< HEAD
};
=======
}

export async function getPackageTicketById(id: string) {
  const response = await api.get(`/tiket/paket/${id}`);

  return response.data;
}

// =========================================================
// CREATE TICKET SATUAN
// =========================================================

export async function createTicket(
  payload: CreateTicketPayload,
) {
  const formData = new FormData();

  formData.append(
    "namaTiket",
    payload.namaTiket,
  );

  formData.append(
    "hargaWeekdays",
    String(payload.hargaWeekdays),
  );

  formData.append(
    "hargaWeekend",
    String(payload.hargaWeekend),
  );

  formData.append(
    "deskripsi",
    payload.deskripsi,
  );

  formData.append(
    "status",
    payload.status,
  );

  payload.ketentuan.forEach((item) => {
    formData.append(
      "ketentuan",
      item,
    );
  });

  payload.gambar.forEach((file) => {
    formData.append(
      "gambar",
      file,
    );
  });

  const response = await api.post(
    "/tiket-wahana",
    formData,
  );
>>>>>>> arthur/main

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

<<<<<<< HEAD
/**
 * =========================================================
 * CREATE ENDPOINTS
 * =========================================================
 */
=======
// =========================================================
// UPDATE TICKET SATUAN
// =========================================================

export async function updateTicket(
  id: string,
  formData: FormData,
) {
  const response = await api.patch(
    `/tiket-wahana/${id}`,
    formData,
  );

  return response.data;
}

// =========================================================
// CREATE PACKAGE TICKET
// =========================================================
>>>>>>> arthur/main

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

<<<<<<< HEAD
export const updateTicket = async (id: string, payload: FormData) => {
  // 💡 Ganti dari `/admin/tickets/${id}` menjadi `/tiket-wahana/${id}`
  const response = await api.patch(`/tiket-wahana/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

=======
  formData.append(
    "deskripsi",
    payload.deskripsi,
  );

  formData.append(
    "status",
    payload.status,
  );

  // KETENTUAN
  payload.ketentuan.forEach((item) => {
    formData.append(
      "ketentuan",
      item,
    );
  });

  // GAMBAR
  payload.gambar.forEach((file) => {
    formData.append(
      "gambar",
      file,
    );
  });

  // WAHANA
  payload.wahanaIds.forEach((id) => {
    formData.append(
      "wahanaIds",
      id,
    );
  });

  const response = await api.post(
    "/tiket/paket",
    formData,
  );

>>>>>>> arthur/main
  return response.data;
};

<<<<<<< HEAD
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
=======
// =========================================================
// UPDATE PACKAGE TICKET
// =========================================================

export async function updatePackageTicket(
  id: string,
  formData: FormData,
) {
  const response = await api.patch(
    `/tiket/paket/${id}`,
    formData,
  );

  return response.data;
}

// =========================================================
// DELETE TICKET
// =========================================================

export async function deleteTicket(
  id: string,
  jenisTiket: string,
) {
  const endpoint =
    jenisTiket === "Paket Hemat"
      ? `/tiket/paket/${id}`
      : `/tiket-wahana/${id}`;

  const response = await api.delete(
    endpoint,
>>>>>>> arthur/main
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