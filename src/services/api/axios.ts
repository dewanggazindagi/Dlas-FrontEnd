import axios from "axios";

// 1. Sesuaikan baseURL untuk mode DEV (Proxy Vite) dan PROD (URL Render langsung)
const API_BASE_URL = import.meta.env.DEV
  ? "/api/v1"
  : "https://dlas-backend.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // 2. Gunakan `config.baseURL` dan `config.url` secara aman
    const fullUrl = `${config.baseURL || ""}${config.url || ""}`;

    console.log("=== AXIOS REQUEST ===");
    console.log("METHOD:", config.method?.toUpperCase());
    console.log("RELATIVE URL:", config.url);
    console.log("FULL PATH:", fullUrl);
    console.log("TOKEN ADA:", !!token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;