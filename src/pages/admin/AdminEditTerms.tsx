import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/Admin/AdminLayout";
import { FiArrowLeft, FiTrash2, FiPlus } from "react-icons/fi";

export default function AdminEditTerms() {
  const navigate = useNavigate();
  
  // Ambil data ketentuan dari LocalStorage (Dummy State CRUD)
  const [terms, setTerms] = useState<string[]>(() => {
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
  
  const [saving, setSaving] = useState<boolean>(false);

  const handleTermChange = (index: number, value: string) => {
    const updatedTerms = [...terms];
    updatedTerms[index] = value;
    setTerms(updatedTerms);
  };

  const handleAddTerm = () => {
    setTerms([...terms, ""]);
  };

  const handleDeleteTerm = (index: number) => {
    const updatedTerms = terms.filter((_, i) => i !== index);
    setTerms(updatedTerms);
  };

  const handleSaveTerms = () => {
    setSaving(true);
    // Simpan bersih tanpa baris kosong ke LocalStorage
    const cleanedTerms = terms.map(t => t.trim()).filter(t => t !== "");
    localStorage.setItem("dummy_terms", JSON.stringify(cleanedTerms));
    
    setTimeout(() => {
      setSaving(false);
      alert("Ketentuan umum berhasil diperbarui secara lokal!");
      navigate("/admin/websitecontent");
    }, 300);
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Top Header / Navigation */}
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/admin/websitecontent")}
            style={{ color: "#238302" }}
            className="flex items-center gap-2 font-semibold transition text-sm hover:opacity-85"
          >
            <FiArrowLeft className="text-lg" /> Kembali
          </button>

          <button
            onClick={handleSaveTerms}
            disabled={saving}
            style={{ backgroundColor: "#238302" }}
            className="px-6 py-2.5 text-white rounded-full text-sm font-medium transition shadow-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Perbarui Ketentuan"}
          </button>
        </div>

        {/* Main Wrapper Content */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Ketentuan Umum D’las Lembah Asri</h1>

          <div className="space-y-4">
            {terms.length === 0 ? (
              <p className="text-sm text-gray-400 italic bg-white p-4 rounded-xl border border-gray-200">
                Belum ada ketentuan. Tambahkan ketentuan baru di bawah.
              </p>
            ) : (
              terms.map((term, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-white px-6 py-4 rounded-full shadow-sm border border-gray-200/80 gap-4"
                >
                  <textarea
                    value={term}
                    onChange={(e) => handleTermChange(index, e.target.value)}
                    rows={1}
                    className="w-full text-sm text-gray-800 bg-transparent focus:outline-none resize-none overflow-hidden pt-1"
                    placeholder="Tulis ketentuan umum di sini..."
                  />
                  <button
                    onClick={() => handleDeleteTerm(index)}
                    className="text-red-500 hover:text-red-700 transition flex-shrink-0 p-1"
                    title="Hapus Ketentuan"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              ))
            )}

            {/* Tombol Tambah Ketentuan */}
            <div className="pt-2">
              <button
                onClick={handleAddTerm}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm w-full"
              >
                <FiPlus className="text-lg text-gray-600" /> Tambah Ketentuan
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}