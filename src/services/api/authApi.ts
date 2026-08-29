import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  name?: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: LoginUser;
}

export async function loginAdmin(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/manajemen/login",
    payload,
  );

  console.log("LOGIN API RESPONSE:", response.data);

  return response.data;
}

export async function logoutAdmin() {
  const response = await api.post("/logout");

  return response.data;
}