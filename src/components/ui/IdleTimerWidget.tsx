import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface IdleTimerWidgetProps {
  remainingSeconds: number;
  showWarningThreshold?: number; // Tampilkan popup khusus warning jika sisa detik <= threshold (default 120 detik / 2 menit)
}

export default function IdleTimerWidget({
  remainingSeconds,
  showWarningThreshold = 120,
}: IdleTimerWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  // Format detik ke MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString().padStart(2, "0")}`;
  };

  const isWarning = remainingSeconds <= showWarningThreshold;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 font-sans select-none">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 ${
          isWarning
            ? "bg-red-500/90 text-white border-red-600 animate-pulse"
            : "bg-gray-900/85 text-white border-gray-700 hover:bg-gray-900"
        }`}
      >
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 text-yellow-300 animate-bounce" />
        ) : (
          <Clock className="w-5 h-5 text-primary" />
        )}

        <div className="flex flex-col">
          <span className="text-[11px] font-medium opacity-80 uppercase tracking-wider">
            {isWarning ? "Sesi Akan Berakhir!" : "Sesi Aktif"}
          </span>
          <span className="text-sm font-bold tracking-mono">
            Auto Logout: {formatTime(remainingSeconds)}
          </span>
        </div>

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="ml-2 text-xs opacity-60 hover:opacity-100 transition"
          title={isMinimized ? "Perbesar" : "Kecilkan"}
        >
          {isMinimized ? "▲" : "▼"}
        </button>
      </div>

      {!isMinimized && isWarning && (
        <p className="text-[11px] bg-red-100 text-red-700 px-3 py-1 rounded-md border border-red-200 shadow-sm">
          Gerakkan kursor / klik apa saja untuk memperpanjang sesi.
        </p>
      )}
    </div>
  );
}