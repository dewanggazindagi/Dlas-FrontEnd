import api from "./axios";

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

  return response.data;
}

export async function getPackageTickets() {
  const response = await api.get("/tiket/paket");

  return response.data;
}

export async function getTicketById(id: string) {
  const response = await api.get(`/tiket-wahana/${id}`);

  return response.data;
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

  return response.data;
}

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

export async function createPackageTicket(
  payload: CreatePackageTicketPayload,
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

  return response.data;
}

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
  );

  return response.data;
}