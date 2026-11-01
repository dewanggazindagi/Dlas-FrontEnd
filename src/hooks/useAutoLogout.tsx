import { useEffect, useRef, useState, useCallback } from "react";

interface UseAutoLogoutOptions {
  timeoutInMinutes?: number;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export function useAutoLogout({
  timeoutInMinutes = 15,
  onLogout,
  isLoggedIn,
}: UseAutoLogoutOptions) {
  const timeoutMs = timeoutInMinutes * 60 * 1000;
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    timeoutInMinutes * 60
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastResetTimeRef = useRef<number>(Date.now());

  // Fungsi untuk memulai timer dan interval countdown
  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isLoggedIn) return;

    setRemainingSeconds(timeoutInMinutes * 60);
    lastResetTimeRef.current = Date.now();

    // Interval countdown 1 detik sekali
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Timeout auto logout saat waktu habis
    timerRef.current = setTimeout(() => {
      console.warn("User idle 15 menit. Melakukan logout otomatis...");
      onLogout();
    }, timeoutMs);
  }, [isLoggedIn, timeoutInMinutes, timeoutMs, onLogout]);

  // Handler aktivitas user dengan Throttling (hanya reset jika jeda aksi > 2 detik)
  const handleUserActivity = useCallback(() => {
    const now = Date.now();
    // Jika belum 2 detik dari reset terakhir, abaikan biar timer gak ke-reset terus tiap milidetik
    if (now - lastResetTimeRef.current < 2000) {
      return;
    }

    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (!isLoggedIn) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // EVENT DIKURANGI: Hapus 'mousemove' biar timer bisa jalan lancar!
    const events = ["click", "keydown", "scroll", "touchstart", "mousedown"];

    // Jalankan timer saat pertama kali masuk/login
    startTimer();

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isLoggedIn, startTimer, handleUserActivity]);

  return { remainingSeconds };
}