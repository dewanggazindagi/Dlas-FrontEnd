/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { ArrowLeft, ChevronDown, Plus, Trash2, Upload } from "lucide-react";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import Button from "../../components/ui/Button";

import { formatter } from "../../utils/formatter";

import {
  createTicket,
  createPackageTicket,
  getTickets,
} from "../../services/api/ticketApi";

type TicketType = "package" | "regular";

interface TicketForm {
  name: string;
  weekdayPrice: string;
  weekendPrice: string;
  status: string;
  description: string;
  selectedItems: string[];
  terms: string[];
  images: string[];
}

export default function AddTicket() {
  const navigate = useNavigate();

  // =====================================================
  // TYPE
  // =====================================================

  const [type, setType] = useState<TicketType>("regular");

  // =====================================================
  // FORM
  // =====================================================

  const [form, setForm] = useState<TicketForm>({
    name: "",
    weekdayPrice: "",
    weekendPrice: "",
    status: "",
    description: "",
    selectedItems: [],
    terms: [""],
    images: [""],
  });

  // =====================================================
  // STATE
  // =====================================================

  const [loading, setLoading] = useState(false);

  const [loadingWahana, setLoadingWahana] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // DATA TIKET SATUAN
  // =====================================================

  const [regularTickets, setRegularTickets] = useState<any[]>([]);

  // =====================================================
  // GET TIKET SATUAN
  // =====================================================

  useEffect(() => {
    const fetchRegularTickets = async () => {
      try {
        setLoadingWahana(true);

        const response = await getTickets();

        console.log("TIKET SATUAN DARI API:", response);

        const data =
          Array.isArray(response) ? response : (response?.data ?? []);

        // Hanya ambil tiket SATUAN
        const satuan = data.filter(
          (ticket: any) => ticket.jenisTiket === "SATUAN",
        );

        console.log("WAHANA SATUAN:", satuan);

        setRegularTickets(satuan);
      } catch (error) {
        console.error("Gagal mengambil tiket satuan:", error);

        setError("Gagal mengambil daftar wahana.");
      } finally {
        setLoadingWahana(false);
      }
    };

    fetchRegularTickets();
  }, []);

  // =====================================================
  // CHANGE FORM
  // =====================================================

  const handleChange = (field: keyof TicketForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // PILIH WAHANA
  // =====================================================

  const handleToggleItem = (id: string) => {
    setForm((prev) => {
      const exists = prev.selectedItems.includes(id);

      return {
        ...prev,

        selectedItems:
          exists ?
            prev.selectedItems.filter((item) => item !== id)
          : [...prev.selectedItems, id],
      };
    });
  };

  // =====================================================
  // KETENTUAN
  // =====================================================

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

  // =====================================================
  // GAMBAR
  // =====================================================

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
    setForm((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);

      return {
        ...prev,

        images: newImages.length > 0 ? newImages : [""],
      };
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    // ===================================================
    // VALIDASI
    // ===================================================

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

    // ===================================================
    // VALIDASI PAKET
    // ===================================================

    if (type === "package" && form.selectedItems.length === 0) {
      setError("Pilih minimal satu wahana untuk tiket paket.");
      return;
    }

    // ===================================================
    // KETENTUAN
    // ===================================================

    const ketentuan = form.terms
      .map((term) => term.trim())
      .filter((term) => term !== "");

    // ===================================================
    // GAMBAR
    // ===================================================

    const gambar = form.images
      .map((image) => image.trim())
      .filter((image) => image !== "");

    setLoading(true);

    try {
      // =================================================
      // TIKET SATUAN
      // =================================================

      if (type === "regular") {
        const payload = {
          namaTiket: form.name.trim(),

          hargaWeekdays: Number(form.weekdayPrice),

          hargaWeekend: Number(form.weekendPrice),

          deskripsi: form.description.trim(),

          status: form.status,

          ketentuan,

          gambar,
        };

        console.log("DATA TIKET SATUAN:", payload);

        const response = await createTicket(payload);

        console.log("RESPONSE TIKET SATUAN:", response);

        navigate("/admin/ticket");

        return;
      }

      // =================================================
      // TIKET PAKET
      // =================================================

      if (type === "package") {
        const payload = {
          namaTiket: form.name.trim(),

          hargaWeekdays: Number(form.weekdayPrice),

          hargaWeekend: Number(form.weekendPrice),

          deskripsi: form.description.trim(),

          status: form.status,

          ketentuan,

          gambar,

          // ID tiket SATUAN
          // yang dipilih
          wahanaIds: form.selectedItems,
        };

        console.log("DATA TIKET PAKET:", payload);

        const response = await createPackageTicket(payload);

        console.log("RESPONSE TIKET PAKET:", response);

        navigate("/admin/ticket");

        return;
      }
    } catch (error: any) {
      console.error("GAGAL MENAMBAHKAN TIKET:", error);

      console.error("ERROR RESPONSE:", error?.response?.data);

      const message = error?.response?.data?.message;

      setError(
        Array.isArray(message) ?
          message.join(", ")
        : message || "Gagal menambahkan tiket.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="px-10 pb-10">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

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
            disabled={loading}
            className="
              h-11
              rounded-full
              px-5
            "
          >
            {loading ? "Menyimpan..." : "Tambahkan Tiket"}
          </Button>
        </div>

        {/* ================================================= */}
        {/* TYPE */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-1
            rounded-full
            border
            border-border
            bg-white
            p-1
            shadow-md
          "
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setType("package")}
            className={`h-11 w-full ${
              type === "package" ?
                "border border-border bg-dark-gray font-semibold text-black"
              : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }`}
          >
            Tiket Paket Hemat
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setType("regular")}
            className={`h-11 w-full ${
              type === "regular" ?
                "border border-border bg-dark-gray font-semibold text-black"
              : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }`}
          >
            Tiket Regular/Satuan
          </Button>
        </div>

        {/* ================================================= */}
        {/* FORM UTAMA */}
        {/* ================================================= */}

        <div className="mt-7 grid grid-cols-4 gap-3">
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

        {/* ================================================= */}
        {/* DESKRIPSI */}
        {/* ================================================= */}

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

        {/* ================================================= */}
        {/* PILIH WAHANA */}
        {/* HANYA MUNCUL UNTUK PAKET */}
        {/* ================================================= */}

        {type === "package" && (
          <div className="mt-5 border-t border-border pt-5">
            <label className="mb-4 block text-sm text-gray-500">
              Pilih Wahana Yang Termasuk
            </label>

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border
              "
            >
              {/* LOADING */}

              {loadingWahana && (
                <div className="px-4 py-5 text-sm text-gray-500">
                  Memuat daftar wahana...
                </div>
              )}

              {/* EMPTY */}

              {!loadingWahana && regularTickets.length === 0 && (
                <div className="px-4 py-5 text-sm text-gray-500">
                  Belum ada tiket satuan yang dapat dimasukkan ke paket.
                </div>
              )}

              {/* DATA */}

              {!loadingWahana &&
                regularTickets.map((ticket) => {
                  const checked = form.selectedItems.includes(ticket.id);

                  return (
                    <label
                      key={ticket.id}
                      className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          border-b
                          border-border
                          px-3
                          py-3
                          last:border-b-0
                          hover:bg-gray-50
                        "
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleItem(ticket.id)}
                        className="
                            h-4
                            w-4
                            accent-primary
                          "
                      />

                      <div>
                        <p className="text-sm font-medium">
                          {ticket.namaTiket}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          Harga tiket satuan :{" "}
                          {formatter.rupiah(Number(ticket.hargaWeekdays))}
                        </p>
                      </div>
                    </label>
                  );
                })}
            </div>

            {/* JUMLAH PILIHAN */}

            {form.selectedItems.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                {form.selectedItems.length} wahana dipilih
              </p>
            )}
          </div>
        )}

        {/* ================================================= */}
        {/* KETENTUAN */}
        {/* ================================================= */}

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

        {/* ================================================= */}
        {/* GAMBAR */}
        {/* ================================================= */}

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

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

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

// =====================================================
// FORM FIELD
// =====================================================

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
