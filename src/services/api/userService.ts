// src/services/api/userService.ts
import api from "./axios";
import type { UserTable } from "../../types/userTable";

interface UserApiItem {
  idPengguna: string;
  namaPengguna: string;
  email: string;
  noHp: string;
  role: string; // bisa "Superadmin" | "Loket" | "Pengunjung"
}

interface UserApiResponse {
  data: UserApiItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

function mapUserResponse(item: UserApiItem): UserTable {
  return {
    id: item.idPengguna,
    namaPengguna: item.namaPengguna,
    email: item.email,
    noHp: item.noHp,
    role: item.role as UserTable["role"], // lihat catatan di bawah soal "Superadmin"
    password: "",
  };
}

export async function fetchUsers(): Promise<UserTable[]> {
  const response = await api.get<UserApiResponse>("/admin/users", {
    params: { limit: 1000 }, // supaya tidak kepotong pagination backend (itemsPerPage: 8)
  });
  return response.data.data.map(mapUserResponse);
}

interface CreateLoketPayload {
  fullName: string;
  email: string;
  password: string;
}

export async function createLoketUser(
  payload: CreateLoketPayload,
): Promise<UserTable> {
  const response = await api.post<UserApiItem>("/admin/users/loket", payload);
  return mapUserResponse(response.data);
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}