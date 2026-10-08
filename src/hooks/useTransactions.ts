// src/hooks/useTransactions.ts
import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api/transactionService";
import type { TransactionTable } from "../../src/types/transactionTable";

export default function useTransactions() {
  const [data, setData] = useState<TransactionTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await fetchTransactions();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Gagal memuat data transaksi");
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