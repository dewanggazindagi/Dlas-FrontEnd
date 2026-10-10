/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

import { ArrowLeft, ChevronDown, Plus, Trash2, Upload } from "lucide-react";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import Button from "../../components/ui/Button";

import { formatter } from "../../utils/formatter";

import {
  createPackageTicket,
  createTicket,
  getTickets,
} from "../../services/api/ticketApi";

// =========================================================
// TYPE
// =========================================================

type TicketType = "package" | "regular";

interface TicketForm {
  name: string;
  weekdayPrice: string;
  weekendPrice: string;
  status: string;
  description: string;
  selectedItems: string[];
  terms: string[];
  images: File[];
}

interface RegularTicket {
  id: string;
  namaTiket: string;
  hargaWeekdays: string | number;
  jenisTiket: string;
}

type TextField =
  | "name"
  | "weekdayPrice"
  | "weekendPrice"
  | "status"
  | "description";

// =========================================================
// COMPONENT
// =========================================================

export default function AddTicket() {
  const navigate = useNavigate();

  const [type, setType] = useState<TicketType>("regular");

  const [form, setForm] = useState<TicketForm>({
    name: "",
    weekdayPrice: "",
    weekendPrice: "",
    status: "",
    description: "",
    selectedItems: [],
    terms: [""],
    images: [],
  });

  const [regularTickets, setRegularTickets] = useState<RegularTicket[]>([]);

  const [loading, setLoading] = useState(false);

  const [loadingWahana, setLoadingWahana] = useState(false);

  const [error, setError] = useState("");

  // =======================================================
  // LOAD TIKET SATUAN
  // =======================================================

  useEffect(() => {
    if (type !== "package") {
      return;
    }

    const fetchRegularTickets = async () => {
      try {
        setLoadingWahana(true);
        setError("");

        const response = await getTickets();

        const data =
          Array.isArray(response) ? response : (response?.data ?? []);

        const satuan = data.filter(
          (ticket: RegularTicket) => ticket.jenisTiket === "SATUAN",
        );

        setRegularTickets(satuan);
      } catch (error) {
        console.error("Gagal mengambil tiket satuan:", error);

        setError("Gagal mengambil daftar wahana.");
      } finally {
        setLoadingWahana(false);
      }
    };

    fetchRegularTickets();
  }, [type]);

  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleChange = (field: TextField, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =======================================================
  // TOGGLE WAHANA
  // =======================================================

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

  // =======================================================
  // KETENTUAN
  // =======================================================

  const handleAddTerm = () => {
    setForm((prev) => ({
      ...prev,
      terms: [...prev.terms, ""],
    }));
  };

  const handleTermChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,

      terms: prev.terms.map((term, itemIndex) =>
        itemIndex === index ? value : term,
      ),
    }));
  };

  const handleRemoveTerm = (index: number) => {
    setForm((prev) => {
      const terms = prev.terms.filter((_, itemIndex) => itemIndex !== index);

      return {
        ...prev,
        terms: terms.length > 0 ? terms : [""],
      };
    });
  };

  // =======================================================
  // GAMBAR
  // =======================================================

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    const selectedFiles = Array.from(files);

    setForm((prev) => ({
      ...prev,

      images: [...prev.images, ...selectedFiles],
    }));

    // Supaya file yang sama
    // bisa dipilih kembali.
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,

      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  // =======================================================
  // VALIDASI
  // =======================================================

  const validateForm = (): string => {
    if (!form.name.trim()) {
      return "Nama tiket wajib diisi.";
    }

    if (!form.weekdayPrice) {
      return "Harga weekdays wajib diisi.";
    }

    if (!form.weekendPrice) {
      return "Harga weekend wajib diisi.";
    }

    if (!form.status) {
      return "Status tiket wajib dipilih.";
    }

    if (!form.description.trim()) {
      return "Deskripsi tiket wajib diisi.";
    }

    if (type === "package" && form.selectedItems.length === 0) {
      return "Pilih minimal satu wahana untuk tiket paket.";
    }

    return "";
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const ketentuan = form.terms.map((term) => term.trim()).filter(Boolean);

      const basePayload = {
        namaTiket: form.name.trim(),

        hargaWeekdays: Number(form.weekdayPrice),

        hargaWeekend: Number(form.weekendPrice),

        deskripsi: form.description.trim(),

        status: form.status,

        ketentuan,

        // File[] langsung
        gambar: form.images,
      };

      console.log("================================");

      console.log("DATA TIKET:", basePayload);

      // ===================================================
      // TIKET SATUAN
      // ===================================================

      if (type === "regular") {
        const response = await createTicket(basePayload);

        console.log("TIKET SATUAN BERHASIL DIBUAT:", response);
      }

      // ===================================================
      // TIKET PAKET
      // ===================================================
      else {
        const response = await createPackageTicket({
          ...basePayload,

          wahanaIds: form.selectedItems,
        });

        console.log("TIKET PAKET BERHASIL DIBUAT:", response);
      }

      navigate("/admin/ticket");
    } catch (error: any) {
      console.error("Gagal menambahkan tiket:", error);

      console.error("Error response:", error?.response?.data);

      const message = error?.response?.data?.message;

      setError(
        Array.isArray(message) ?
          message.join(", ")
        : message || error?.message || "Gagal menambahkan tiket.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // RETURN
  // =======================================================

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="px-10 pb-10">
        {/* HEADER */}

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

        {/* TYPE */}

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

        {/* DATA UTAMA */}

        <div className="mt-7 grid grid-cols-4 gap-3">
          <FormField label="Nama Tiket">
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
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
              onChange={(event) =>
                handleChange("weekdayPrice", event.target.value)
              }
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
              onChange={(event) =>
                handleChange("weekendPrice", event.target.value)
              }
              placeholder="Masukan harga weekend"
              className="ticket-input"
              required
            />
          </FormField>

          <FormField label="Status">
            <div className="relative">
              <select
                value={form.status}
                onChange={(event) => handleChange("status", event.target.value)}
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

        {/* DESKRIPSI */}

        <div className="mt-5">
          <label className="mb-2 block text-sm text-gray-500">
            Tentang Tiket
          </label>

          <textarea
            value={form.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
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

        {/* WAHANA */}

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
              {loadingWahana && (
                <div className="px-4 py-5 text-sm text-gray-500">
                  Memuat daftar wahana...
                </div>
              )}

              {!loadingWahana && regularTickets.length === 0 && (
                <div className="px-4 py-5 text-sm text-gray-500">
                  Belum ada tiket satuan yang dapat dimasukkan ke paket.
                </div>
              )}

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
                          Harga tiket satuan:{" "}
                          {formatter.rupiah(Number(ticket.hargaWeekdays))}
                        </p>
                      </div>
                    </label>
                  );
                })}
            </div>

            {form.selectedItems.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                {form.selectedItems.length} wahana dipilih
              </p>
            )}
          </div>
        )}

        {/* KETENTUAN */}

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
                  onChange={(event) =>
                    handleTermChange(index, event.target.value)
                  }
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

        {/* GAMBAR */}

        <div className="mt-5 border-t border-border pt-5">
          <label className="mb-4 block text-sm text-gray-500">
            Kumpulan Foto
          </label>

          <div className="flex flex-wrap gap-3">
            {/* UPLOAD */}

            <label
              className="
                flex
                h-40
                w-40
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-border
                bg-white
                transition
                hover:bg-gray-50
              "
            >
              <Upload size={28} className="text-gray-500" />

              <span className="mt-3 text-sm text-gray-500">Unggah gambar</span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* PREVIEW GAMBAR */}

            {form.images.map((image, index) => (
              <div
                key={`${image.name}-${image.lastModified}-${index}`}
                className="
                    relative
                    h-40
                    w-40
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-gray-100
                  "
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Gambar ${index + 1}`}
                  className="
                      h-full
                      w-full
                      object-cover
                    "
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-danger
                      shadow
                      transition
                      hover:bg-gray-100
                    "
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Format JPG, PNG, atau WEBP.
          </p>
        </div>

        {/* ERROR */}

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

// =========================================================
// FORM FIELD
// =========================================================

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
