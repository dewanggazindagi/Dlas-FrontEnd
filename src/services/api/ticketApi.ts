import api from "./axios";

// =====================================================
// TIKET SATUAN
// =====================================================

export interface CreateTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: string[];
}

// =====================================================
// TIKET PAKET
// =====================================================

export interface CreatePackageTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: string[];
  wahanaIds: string[];
}

// =====================================================
// GET SEMUA TIKET SATUAN
// =====================================================

export async function getTickets() {
  const response = await api.get("/tiket-wahana");

  return response.data;
}

// =====================================================
// GET SEMUA TIKET PAKET
// =====================================================

export async function getPackageTickets() {
  const response = await api.get("/tiket/paket");

  return response.data;
}

// =====================================================
// GET DETAIL TIKET SATUAN
// =====================================================

export async function getTicketById(id: string) {
  const response = await api.get(
    `/tiket-wahana/${id}`,
  );

  return response.data;
}

// =====================================================
// CREATE TIKET SATUAN
// =====================================================

export async function createTicket(
  payload: CreateTicketPayload,
) {
  const response = await api.post(
    "/tiket-wahana",
    payload,
  );

  return response.data;
}

// =====================================================
// CREATE TIKET PAKET
// =====================================================

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

  // ============================
  // KETENTUAN
  // ============================

  payload.ketentuan.forEach((term) => {
    formData.append(
      "ketentuan",
      term,
    );
  });

  // ============================
  // GAMBAR
  // ============================

  payload.gambar.forEach((image) => {
    formData.append(
      "gambar",
      image,
    );
  });

  // ============================
  // WAHANA DALAM PAKET
  // ============================

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

// =====================================================
// UPDATE TIKET SATUAN
// =====================================================

export async function updateTicket(
  id: string,
  payload: CreateTicketPayload,
) {
  const response = await api.patch(
    `/tiket-wahana/${id}`,
    payload,
  );

  return response.data;
}