/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowLeft, ChevronDown, Plus, Trash2, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import Button from "../../components/ui/Button";

import { getTicketById, updateTicket } from "../../services/api/ticketApi";

interface TicketForm {
  name: string;
  weekdayPrice: string;
  weekendPrice: string;
  status: string;
  description: string;
  terms: string[];
  images: string[];
}

export default function EditTicket() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<TicketForm>({
    name: "",
    weekdayPrice: "",
    weekendPrice: "",
    status: "",
    description: "",
    terms: [""],
    images: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // AMBIL DATA TIKET
  // ==========================================

  useEffect(() => {
    if (!id) {
      setError("ID tiket tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTicketById(id);

        console.log("DETAIL TIKET:", response);

        /*
         * Beberapa API mengembalikan:
         *
         * response.data
         *
         * atau langsung:
         *
         * response
         *
         */

        const ticket = response?.data ?? response;

        setForm({
          name: ticket.namaTiket ?? "",

          weekdayPrice:
            ticket.hargaWeekdays != null ? String(ticket.hargaWeekdays) : "",

          weekendPrice:
            ticket.hargaWeekend != null ? String(ticket.hargaWeekend) : "",

          status: ticket.status ?? "",

          description: ticket.deskripsi ?? "",

          terms:
            Array.isArray(ticket.ketentuan) && ticket.ketentuan.length > 0 ?
              ticket.ketentuan.map((item: any) => {
                /*
                 * Jika API mengembalikan:
                 *
                 * { deskripsi: "..." }
                 *
                 * ambil deskripsi.
                 *
                 * Jika langsung string,
                 * gunakan string tersebut.
                 */
                if (typeof item === "string") {
                  return item;
                }

                return item?.deskripsi ?? "";
              })
            : [""],

          images:
            Array.isArray(ticket.gambar) ?
              ticket.gambar
                .map((item: any) => {
                  /*
                   * API bisa mengembalikan:
                   *
                   * "https://..."
                   *
                   * atau:
                   *
                   * { url: "https://..." }
                   *
                   * atau:
                   *
                   * { gambar: "https://..." }
                   */

                  if (typeof item === "string") {
                    return item;
                  }

                  return item?.url ?? item?.gambar ?? "";
                })
                .filter((image: string) => image.trim() !== "")
            : [],
        });
      } catch (error: any) {
        console.error("GAGAL MENGAMBIL DETAIL TIKET:", error);

        console.error("ERROR RESPONSE:", error?.response?.data);

        setError(
          error?.response?.data?.message || "Gagal mengambil data tiket.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  // ==========================================
  // CHANGE FORM
  // ==========================================

  const handleChange = (field: keyof TicketForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // KETENTUAN
  // ==========================================

  const handleAddTerm = () => {
    setForm((prev) => ({
      ...prev,
      terms: [...prev.terms, ""],
    }));
  };

  const handleTermChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      terms: prev.terms.map((term, i) => (i === index ? value : term)),
    }));
  };

  const handleRemoveTerm = (index: number) => {
    setForm((prev) => {
      const newTerms = prev.terms.filter((_, i) => i !== index);

      return {
        ...prev,
        terms: newTerms.length > 0 ? newTerms : [""],
      };
    });
  };

  // ==========================================
  // GAMBAR
  // ==========================================

  const handleAddImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((image, i) => (i === index ? value : image)),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // SUBMIT UPDATE
  // ==========================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("ID tiket tidak ditemukan.");
      return;
    }

    setError("");

    // ========================================
    // VALIDASI
    // ========================================

    if (!form.name.trim()) {
      setError("Nama tiket wajib diisi.");
      return;
    }

    if (!form.weekdayPrice) {
      setError("Harga weekdays wajib diisi.");
      return;
    }

    if (!form.weekendPrice) {
      setError("Harga weekend wajib diisi.");
      return;
    }

    if (!form.status) {
      setError("Status tiket wajib dipilih.");
      return;
    }

    if (!form.description.trim()) {
      setError("Deskripsi tiket wajib diisi.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        namaTiket: form.name.trim(),

        hargaWeekdays: Number(form.weekdayPrice),

        hargaWeekend: Number(form.weekendPrice),

        deskripsi: form.description.trim(),

        status: form.status,

        ketentuan: form.terms
          .map((term) => term.trim())
          .filter((term) => term !== ""),

        gambar: form.images
          .map((image) => image.trim())
          .filter((image) => image !== ""),
      };

      console.log("DATA UPDATE TIKET:", payload);

      const response = await updateTicket(id, payload);

      console.log("RESPONSE UPDATE TIKET:", response);

      navigate("/admin/ticket");
    } catch (error: any) {
      console.error("GAGAL UPDATE TIKET:", error);

      console.error("ERROR RESPONSE:", error?.response?.data);

      setError(error?.response?.data?.message || "Gagal memperbarui tiket.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-125 items-center justify-center">
          <p className="text-sm text-dark-gray">Memuat data tiket...</p>
        </div>
      </AdminLayout>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="px-10 pb-10">
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex
              items-center
              gap-2
              font-semibold
              text-primary
              transition
              hover:opacity-80
            "
          >
            <ArrowLeft size={20} />
            Kembali
          </button>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={saving}
            className="
              h-11
              rounded-full
              px-5
            "
          >
            {saving ? "Menyimpan..." : "Perbarui Tiket"}
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="Nama Tiket">
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Masukan nama tiket"
              className="ticket-input"
              required
            />
          </FormField>

          <FormField label="Harga Weekdays">
            <input
              type="number"
              min="0"
              value={form.weekdayPrice}
              onChange={(e) => handleChange("weekdayPrice", e.target.value)}
              placeholder="Masukan harga weekdays"
              className="ticket-input"
              required
            />
          </FormField>

          <FormField label="Harga Weekend">
            <input
              type="number"
              min="0"
              value={form.weekendPrice}
              onChange={(e) => handleChange("weekendPrice", e.target.value)}
              placeholder="Masukan harga weekend"
              className="ticket-input"
              required
            />
          </FormField>

          <FormField label="Status">
            <div className="relative">
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="
                  h-11
                  w-full
                  appearance-none
                  rounded-full
                  border
                  border-border
                  bg-white
                  px-4
                  text-sm
                  text-gray-500
                  outline-none
                  focus:border-primary
                "
                required
              >
                <option value="">Pilih Status</option>

                <option value="Tiket Aktif">Aktif</option>

                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>

              <ChevronDown
                size={18}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </FormField>
        </div>

        {/* ================================= */}
        {/* DESKRIPSI */}
        {/* ================================= */}

        <div className="mt-5">
          <label className="mb-2 block text-sm text-gray-500">
            Tentang Tiket
          </label>

          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Tambahkan deskripsi tiket"
            className="
              min-h-28.75
              w-full
              resize-none
              rounded-2xl
              border
              border-border
              p-4
              text-sm
              outline-none
              placeholder:text-gray-400
              focus:border-primary
            "
            required
          />
        </div>

        {/* ================================= */}
        {/* KETENTUAN */}
        {/* ================================= */}

        <div className="mt-5 border-t border-border pt-5">
          <label className="mb-4 block text-sm text-gray-500">
            Ketentuan Tiket
          </label>

          <div className="space-y-3">
            {form.terms.map((term, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="text"
                  value={term}
                  onChange={(e) => handleTermChange(index, e.target.value)}
                  placeholder="Masukan poin ketentuan"
                  className="
                      h-11
                      flex-1
                      rounded-full
                      border
                      border-border
                      px-4
                      text-sm
                      outline-none
                      placeholder:text-gray-400
                      focus:border-primary
                    "
                />

                <button
                  type="button"
                  onClick={() => handleRemoveTerm(index)}
                  className="
                      text-danger
                      transition
                      hover:opacity-70
                    "
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddTerm}
            startIcon={<Plus size={18} />}
            className="
              mt-3
              h-10
              rounded-full
              px-4
              font-semibold
            "
          >
            Tambah Ketentuan
          </Button>
        </div>

        {/* ================================= */}
        {/* GAMBAR */}
        {/* ================================= */}

        <div className="mt-5 border-t border-border pt-5">
          <label className="mb-4 block text-sm text-gray-500">
            Kumpulan Foto
          </label>

          <div className="flex flex-wrap gap-3">
            {form.images.map((image, index) => (
              <div
                key={index}
                className="
                    relative
                    w-64
                    rounded-2xl
                    border
                    border-border
                    bg-white
                    p-4
                  "
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Upload size={18} />
                  URL Gambar
                </div>

                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://..."
                  className="
                      h-11
                      w-full
                      rounded-full
                      border
                      border-border
                      px-4
                      text-xs
                      outline-none
                      focus:border-primary
                    "
                />

                {image && (
                  <img
                    src={image}
                    alt={`Gambar ${index + 1}`}
                    className="
                        mt-3
                        h-32
                        w-full
                        rounded-xl
                        object-cover
                      "
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                  className="
                      mt-3
                      h-9
                      w-full
                      border-border
                      text-danger
                    "
                  startIcon={false}
                >
                  <Trash2 size={15} />
                  Hapus Gambar
                </Button>
              </div>
            ))}

            {/* TAMBAH GAMBAR */}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddImage}
              className="
                h-64
                w-64
                flex-col
                gap-3
                border-border
                text-dark-gray
              "
              startIcon={false}
            >
              <Upload size={28} />

              <span className="text-sm">Tambahkan gambar</span>
            </Button>
          </div>
        </div>

        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (
          <div
            className="
              mt-6
              rounded-xl
              bg-red-50
              px-5
              py-3
              text-sm
              text-red-500
            "
          >
            {error}
          </div>
        )}
      </form>
    </AdminLayout>
  );
}

// ==========================================
// FORM FIELD
// ==========================================

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-500">{label}</label>

      {children}
    </div>
  );
}
