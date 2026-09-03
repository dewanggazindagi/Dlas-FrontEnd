import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    console.log("=== AXIOS REQUEST ===");
    console.log("METHOD:", config.method?.toUpperCase());
    console.log("URL:", config.url);
    console.log("FULL URL:", `${config.baseURL}${config.url}`);
    console.log("TOKEN ADA:", !!token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;