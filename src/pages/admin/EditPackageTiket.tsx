/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

import { ArrowLeft, ChevronDown, Plus, Trash2, Upload } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import Button from "../../components/ui/Button";

import { formatter } from "../../utils/formatter";

import {
  getPackageTicketById,
  updatePackageTicket,
  getTickets,
} from "../../services/api/ticketApi";

// =========================================================
// TYPE
// =========================================================

type TicketImage = string | File;

interface TicketForm {
  name: string;
  weekdayPrice: string;
  weekendPrice: string;
  status: string;
  description: string;
  selectedItems: string[];
  terms: string[];
  images: TicketImage[];
}

interface RegularTicket {
  id: string;
  namaTiket: string;
  hargaWeekdays: string | number;
  jenisTiket: string;
}

// =========================================================
// COMPONENT
// =========================================================

export default function EditPackageTicket() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  // =======================================================
  // STATE
  // =======================================================

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

  const [loading, setLoading] = useState(true);

  const [loadingWahana, setLoadingWahana] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // =======================================================
  // LOAD DATA
  // =======================================================

  useEffect(() => {
    if (!id) {
      setError("ID tiket tidak ditemukan.");

      setLoading(false);
      setLoadingWahana(false);

      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadingWahana(true);
        setError("");

        const [ticketResponse, wahanaResponse] = await Promise.all([
          getPackageTicketById(id),
          getTickets(),
        ]);

        const ticket = ticketResponse?.data ?? ticketResponse;

        console.log("================================");

        console.log("DETAIL TIKET PAKET:", ticket);

        console.log("GAMBAR RAW:", ticket?.gambar);

        console.log("WAHANA RAW:", ticket?.wahana);

        console.log("ITEMS RAW:", ticket?.items);

        console.log("DETAIL TIKET RAW:", ticket?.detailTiket);

        // =================================================
        // WAHANA
        // =================================================

        const wahanaData =
          Array.isArray(wahanaResponse) ? wahanaResponse : (
            (wahanaResponse?.data ?? [])
          );

        const satuan = wahanaData.filter(
          (item: RegularTicket) => item.jenisTiket === "SATUAN",
        );

        // =================================================
        // NORMALIZE
        // =================================================

        const selectedItems = normalizeSelectedItems(ticket);

        const terms = normalizeTerms(ticket?.ketentuan);

        const images = normalizeImages(ticket?.gambar);

        console.log("WAHANA TERPILIH:", selectedItems);

        console.log("GAMBAR HASIL NORMALISASI:", images);

        // =================================================
        // SET STATE
        // =================================================

        setRegularTickets(satuan);

        setForm({
          name: ticket?.namaTiket ?? "",

          weekdayPrice:
            ticket?.hargaWeekdays != null ? String(ticket.hargaWeekdays) : "",

          weekendPrice:
            ticket?.hargaWeekend != null ? String(ticket.hargaWeekend) : "",

          status: ticket?.status ?? "",

          description: ticket?.deskripsi ?? "",

          selectedItems,

          terms: terms.length > 0 ? terms : [""],

          images,
        });
      } catch (err: any) {
        console.error("GAGAL MENGAMBIL DATA TIKET PAKET:", err);

        console.error("ERROR RESPONSE:", err?.response?.data);

        const message =
          err?.response?.data?.message ??
          err?.message ??
          "Gagal mengambil data tiket paket.";

        setError(Array.isArray(message) ? message.join(", ") : message);
      } finally {
        setLoading(false);
        setLoadingWahana(false);
      }
    };

    fetchData();
  }, [id]);

  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleChange = (
    field: "name" | "weekdayPrice" | "weekendPrice" | "status" | "description",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =======================================================
  // TOGGLE WAHANA
  // =======================================================

  const handleToggleItem = (ticketId: string) => {
    const normalizedId = String(ticketId).trim();

    setForm((prev) => {
      const exists = prev.selectedItems.some(
        (item) => String(item).trim() === normalizedId,
      );

      const selectedItems =
        exists ?
          prev.selectedItems.filter(
            (item) => String(item).trim() !== normalizedId,
          )
        : [...prev.selectedItems, normalizedId];

      return {
        ...prev,
        selectedItems,
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
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    setForm((prev) => ({
      ...prev,

      images: [...prev.images, ...files],
    }));

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

    if (form.selectedItems.length === 0) {
      return "Pilih minimal satu wahana untuk tiket paket.";
    }

    return "";
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("ID tiket tidak ditemukan.");

      return;
    }

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      // =================================================
      // DATA TIKET
      // =================================================

      formData.append("namaTiket", form.name.trim());

      formData.append("hargaWeekdays", String(Number(form.weekdayPrice)));

      formData.append("hargaWeekend", String(Number(form.weekendPrice)));

      formData.append("deskripsi", form.description.trim());

      formData.append("status", form.status);

      // =================================================
      // KETENTUAN
      // =================================================

      const ketentuan = form.terms.map((term) => term.trim()).filter(Boolean);

      ketentuan.forEach((term) => {
        formData.append("ketentuan", term);
      });

      // =================================================
      // WAHANA
      // =================================================

      form.selectedItems.forEach((ticketId) => {
        formData.append("wahanaIds", String(ticketId));
      });

      // =================================================
      // GAMBAR
      // =================================================
      //
      // HANYA FILE BARU yang dikirim.
      //
      // String = gambar lama
      // File   = gambar baru
      //
      // Gambar lama tidak perlu dikirim
      // kembali sebagai "gambar".
      // =================================================

      form.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("gambar", image);
        }
      });

      // =================================================
      // DEBUG FORMDATA
      // =================================================

      console.log("================================");

      console.log("PATCH TIKET PAKET");

      console.log("ID:", id);

      console.log("FORM DATA:");

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, {
            name: value.name,

            type: value.type,

            size: value.size,
          });
        } else {
          console.log(key, value);
        }
      }

      // =================================================
      // PATCH
      // =================================================

      const response = await updatePackageTicket(id, formData);

      console.log("================================");

      console.log("UPDATE TIKET PAKET BERHASIL:", response);

      navigate("/admin/ticket");
    } catch (err: any) {
      console.error("================================");

      console.error("GAGAL UPDATE TIKET PAKET:", err);

      console.error("ERROR RESPONSE:", err?.response?.data);

      const message =
        err?.response?.data?.message ??
        err?.message ??
        "Gagal memperbarui tiket paket.";

      setError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-125 items-center justify-center">
          <p className="text-sm text-dark-gray">Memuat data tiket paket...</p>
        </div>
      </AdminLayout>
    );
  }

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

        {/* DATA UTAMA */}

        <div className="grid grid-cols-4 gap-3">
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

        {/* PILIH WAHANA */}

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
                const checked = form.selectedItems.some(
                  (selectedId) =>
                    String(selectedId).trim() === String(ticket.id).trim(),
                );

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
                      <p className="text-sm font-medium">{ticket.namaTiket}</p>

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

            {/* GAMBAR */}

            {form.images.map((image, index) => {
              const imageUrl = getPreviewUrl(image);

              return (
                <div
                  key={`${index}-${getImageKey(image)}`}
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
                  {imageUrl ?
                    <img
                      src={imageUrl}
                      alt={`Gambar ${index + 1}`}
                      className="
                          h-full
                          w-full
                          object-cover
                        "
                      onError={(event) => {
                        console.error("GAGAL LOAD GAMBAR:", imageUrl);

                        event.currentTarget.style.display = "none";
                      }}
                    />
                  : <div
                      className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          px-2
                          text-center
                          text-xs
                          text-gray-400
                        "
                    >
                      Preview tidak tersedia
                    </div>
                  }

                  {/* DELETE */}

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

                  {/* LABEL */}

                  <span
                    className="
                        absolute
                        bottom-2
                        left-2
                        rounded-full
                        bg-black/60
                        px-2
                        py-1
                        text-[9px]
                        text-white
                      "
                  >
                    {image instanceof File ? "Baru" : "Lama"}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-gray-400">
            JPG, PNG, atau WEBP. Gambar lama tetap ditampilkan. Gambar baru akan
            dikirim saat tiket diperbarui.
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
// NORMALIZE SELECTED ITEMS
// =========================================================

function normalizeSelectedItems(ticket: any): string[] {
  const candidates = [
    ticket?.wahanaIds,
    ticket?.wahana,
    ticket?.items,
    ticket?.detailTiket,
    ticket?.detailTiketPaket,
    ticket?.tiketPaket,
  ];

  for (const value of candidates) {
    if (!Array.isArray(value)) {
      continue;
    }

    const ids = value
      .map((item: any) => {
        if (typeof item === "string") {
          return item;
        }

        return (
          item?.id ??
          item?.tiketId ??
          item?.wahanaId ??
          item?.ticketId ??
          item?.idTiket ??
          item?.idWahana ??
          ""
        );
      })
      .map((item: unknown) => String(item).trim())
      .filter(Boolean);

    if (ids.length > 0) {
      return [...new Set(ids)];
    }
  }

  return [];
}

// =========================================================
// NORMALIZE IMAGES
// =========================================================

function normalizeImages(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item: any) => {
      if (typeof item === "string") {
        return item;
      }

      return (
        item?.urlGambar ??
        item?.url ??
        item?.gambar ??
        item?.imageUrl ??
        item?.path ??
        item?.src ??
        ""
      );
    })
    .filter(
      (image): image is string =>
        typeof image === "string" && image.trim() !== "",
    );
}

// =========================================================
// NORMALIZE TERMS
// =========================================================

function normalizeTerms(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .sort((a: any, b: any) => Number(a?.urutan ?? 0) - Number(b?.urutan ?? 0))
    .map((item: any) => {
      if (typeof item === "string") {
        return item;
      }

      return item?.deskripsi ?? item?.description ?? "";
    })
    .filter(
      (term): term is string => typeof term === "string" && term.trim() !== "",
    );
}

// =========================================================
// IMAGE PREVIEW
// =========================================================

function getPreviewUrl(image: TicketImage): string {
  if (typeof image === "string") {
    return image;
  }

  return URL.createObjectURL(image);
}

// =========================================================
// IMAGE KEY
// =========================================================

function getImageKey(image: TicketImage): string {
  if (typeof image === "string") {
    return image;
  }

  return `${image.name}-${image.size}-${image.lastModified}`;
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
