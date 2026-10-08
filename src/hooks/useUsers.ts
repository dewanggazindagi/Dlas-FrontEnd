// src/hooks/useUsers.ts
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api/userService";
import type { UserTable } from "../../src/types/userTable";

export default function useUsers() {
  const [data, setData] = useState<UserTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await fetchUsers();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Gagal memuat data pengguna");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}