/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, useEffect } from "react";

import type { ReactNode } from "react";

import {
  loginAdmin,
  logoutAdmin,
  type LoginPayload,
} from "../services/api/authApi";

interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error("Gagal membaca data user:", error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }

  async function login(payload: LoginPayload): Promise<User> {
    const response = await loginAdmin(payload);

    console.log("LOGIN RESPONSE:", response);

    const token = response.accessToken;
    const user = response.user;

    console.log("ACCESS TOKEN:", token);
    console.log("USER LOGIN:", user);

    if (!token) {
      throw new Error("Access token tidak ditemukan");
    }

    if (!user) {
      throw new Error("Data user tidak ditemukan");
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    return user;
  }

  async function logout() {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setUser(null);

      window.location.href = "/admin/login";
    }
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      checkAuth,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }

  return context;
}
