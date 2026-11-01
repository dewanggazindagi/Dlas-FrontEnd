/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/Admin/AdminLayout";
import api from "../../services/api/axios";

export default function AdminContent() {
  const navigate = useNavigate();

  // State Ketentuan Umum (Menggunakan LocalStorage / Dummy State agar aman & bisa CRUD)
  const [terms] = useState<string[]>(() => {
    const saved = localStorage.getItem("dummy_terms");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      "Anak tinggi badan <90cm tidak perlu membeli tiket, namun jika dalam masuk ke tempat wisata memiliki tinggi badan lebih dari itu, wajib membeli tiket di lokasi.",
      "Batas waktu wisatawan masuk pada jam 16.00 dan jika datang lebih jam yang ditentukan, tidak dapat kami layani untuk masuk ke kawasan.",
      "Meskipun jam 16.00 wisatawan terakhir boleh masuk, penutupan area sekitar jam 18.00."
    ];
  });

  // State untuk Denah (TIDAK DISENTUH SAMA SEKALI - TETAP DARI DATABASE)
  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null);
  const [loadingMap, setLoadingMap] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    fetchDenah();
  }, []);

  const fetchDenah = async () => {
    try {
      setLoadingMap(true);
      const response = await api.get("/content/denah");
      if (response.data && response.data.denahUrl) {
        setMapImageUrl(response.data.denahUrl);
      }
    } catch (error) {
      console.error("Gagal memuat denah:", error);
    } finally {
      setLoadingMap(false);
    }
  };

  // Handler Update Denah (TIDAK DISENTUH SAMA SEKALI)
  const handleUpdateDenah = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
          setUploading(true);
          const response = await api.patch("/content/denah", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (response.data && response.data.denahUrl) {
            setMapImageUrl(response.data.denahUrl);
            alert("Denah berhasil diperbarui dan tersimpan di database!");
          }
        } catch (error) {
          console.error("Gagal mengunggah denah:", error);
          alert("Terjadi kesalahan saat mengunggah denah.");
        } finally {
          setUploading(false);
        }
      }
    };
    input.click();
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Berbagai Konten Website</h1>
          <p className="text-sm text-gray-500">Kelola beberapa konten untuk website anda</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Card 1: Ketentuan Umum (Dummy Frontend CRUD) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Ketentuan Umum di D'las Lembah Asri</h2>

            <div className="space-y-4">
              {terms.length > 0 ? (
                terms.map((term, index) => (
                  <div key={index} className="flex items-start gap-4 text-sm text-gray-700">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 border border-gray-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-1 leading-relaxed">{term}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">Belum ada ketentuan.</p>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate("/admin/websitecontent/edit-terms")}
                className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
              >
                Edit Ketentuan
              </button>
            </div>
          </div>

          {/* Card 2: Denah D'las Lembah Asri (ASLI DATABASE - TIDAK DISENTUH) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-center">
            <h2 className="text-lg font-bold text-gray-900 text-left">Denah D'las Lembah Asri</h2>

            <div className="flex justify-center py-2">
              <div className="max-w-md w-full border rounded-xl overflow-hidden bg-white p-2 shadow-sm min-h-50 flex items-center justify-center">
                {loadingMap ? (
                  <p className="text-sm text-gray-400">Memuat denah dari database...</p>
                ) : mapImageUrl ? (
                  <img
                    src={mapImageUrl}
                    alt="Denah D'las Lembah Asri"
                    className="w-full h-auto object-contain rounded-lg"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <p className="text-sm text-gray-400">Belum ada denah yang diunggah.</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleUpdateDenah}
                disabled={uploading}
                className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm disabled:opacity-50"
              >
                {uploading ? "Mengunggah..." : "Update Denah"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}