/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../../components/layout/Admin/AdminLayout";
import Button from "../../../components/ui/Button";

import { getTicketById, updateTicket } from "../../../services/api/ticketApi";
import { mapTicketApiToTicket } from "../../../services/api/mappers/ticketAdapter";
import { getImageUrl } from "../../../utils/imageHelper";

import type { Ticket, TicketGambar } from "../../../types/ticket";

export default function EditTicket() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /* =========================================================
      STATE
  ========================================================= */
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [namaTiket, setNamaTiket] = useState("");
  const [hargaWeekdays, setHargaWeekdays] = useState("");
  const [hargaWeekend, setHargaWeekend] = useState("");
  const [status, setStatus] = useState("Tiket Aktif");
  const [deskripsi, setDeskripsi] = useState("");

  const [ketentuan, setKetentuan] = useState<string[]>([""]);

  // Gambar eksisting yang masih dipertahankan
  const [existingImages, setExistingImages] = useState<TicketGambar[]>([]);

  // File gambar baru yang siap diupload
  const [newImages, setNewImages] = useState<File[]>([]);

  /* =========================================================
      FETCH DETAIL TIKET
  ========================================================= */
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
        const rawData = response?.data ?? response;

        console.log("=== DETAIL TIKET RAW ===", rawData);

        const ticket: Ticket = mapTicketApiToTicket(rawData);

        // Populate Form Fields
        setNamaTiket(ticket.namaTiket ?? "");
        setHargaWeekdays(
          ticket.hargaWeekdays != null ? String(ticket.hargaWeekdays) : "",
        );
        setHargaWeekend(
          ticket.hargaWeekend != null ? String(ticket.hargaWeekend) : "",
        );
        setStatus(ticket.status ?? "Tiket Aktif");
        setDeskripsi(ticket.deskripsi ?? "");

        // Ketentuan
        const ticketKetentuan =
          Array.isArray(rawData?.ketentuan) ?
            [...rawData.ketentuan]
              .sort(
                (a: any, b: any) =>
                  Number(a?.urutan ?? 0) - Number(b?.urutan ?? 0),
              )
              .map((item: any) => item?.deskripsi ?? item?.description ?? "")
              .filter((item: string) => item.trim() !== "")
          : [];

        setKetentuan(ticketKetentuan.length > 0 ? ticketKetentuan : [""]);

        // Gambar Eksisting
        const oldImages: TicketGambar[] =
          Array.isArray(rawData?.gambar) ?
            rawData.gambar
              .filter((image: any) => image?.urlGambar)
              .map((image: any) => ({
                id: image.id,
                urlGambar: image.urlGambar,
              }))
          : [];

        setExistingImages(oldImages);
        setNewImages([]);
      } catch (err: any) {
        console.error("Gagal mengambil data tiket:", err);
        setError(err?.response?.data?.message ?? "Gagal mengambil data tiket.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  /* =========================================================
      HANDLER: KETENTUAN
  ========================================================= */
  const handleAddKetentuan = () => {
    setKetentuan((prev) => [...prev, ""]);
  };

  const handleChangeKetentuan = (index: number, value: string) => {
    setKetentuan((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const handleRemoveKetentuan = (index: number) => {
    setKetentuan((prev) => {
      const result = prev.filter((_, itemIndex) => itemIndex !== index);
      return result.length > 0 ? result : [""];
    });
  };

  /* =========================================================
      HANDLER: GAMBAR
  ========================================================= */
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setNewImages((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const handleRemoveExistingImage = (imageId: string) => {
    setExistingImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  /* =========================================================
      VALIDASI FORM
  ========================================================= */
  const validateForm = (): string => {
    if (!namaTiket.trim()) return "Nama tiket wajib diisi.";
    if (!hargaWeekdays) return "Harga weekdays wajib diisi.";
    if (!hargaWeekend) return "Harga weekend wajib diisi.";
    if (!status) return "Status tiket wajib dipilih.";
    if (!deskripsi.trim()) return "Deskripsi tiket wajib diisi.";
    return "";
  };

  /* =========================================================
      SUBMIT UPDATE TIKET
  ========================================================= */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!id) {
      setError("ID tiket tidak valid.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("namaTiket", namaTiket);
      formData.append("hargaWeekdays", hargaWeekdays);
      formData.append("hargaWeekend", hargaWeekend);
      formData.append("status", status);
      formData.append("deskripsi", deskripsi);

      // Filter ketentuan kosong
      const cleanKetentuan = ketentuan.filter((item) => item.trim() !== "");
      cleanKetentuan.forEach((item, index) => {
        formData.append(`ketentuan[${index}]`, item);
      });

      // File Gambar Baru
      newImages.forEach((file) => {
        formData.append("gambar", file);
      });

      await updateTicket(id, formData);

      navigate("/admin/ticket");
    } catch (err: any) {
      console.error("Gagal memperbarui tiket:", err);
      setError(
        err?.response?.data?.message ??
          "Terjadi kesalahan saat memperbarui tiket.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
      RENDER LOADING
  ========================================================= */
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-125 items-center justify-center">
          <p className="text-sm text-dark-gray">Memuat data tiket...</p>
        </div>
      </AdminLayout>
    );
  }

  /* =========================================================
      RENDER MAIN UI
  ========================================================= */
  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="grid gap-7 p-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/ticket")}
            className="flex items-center gap-2 text-md font-semibold text-primary hover:opacity-80"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="h-11 font-semibold"
            disabled={submitting}
          >
            {submitting ? "Memperbarui..." : "Perbarui Tiket"}
          </Button>
        </div>

        {/* FORM FIELDS */}
        <div className="grid gap-7">
          {/* DATA UTAMA */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Nama Tiket
              </label>
              <input
                type="text"
                value={namaTiket}
                onChange={(e) => setNamaTiket(e.target.value)}
                className="h-11 w-full rounded-full border border-border px-4 text-sm outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Harga Weekdays
              </label>
              <input
                type="number"
                min="0"
                value={hargaWeekdays}
                onChange={(e) => setHargaWeekdays(e.target.value)}
                className="h-11 w-full rounded-full border border-border px-4 text-sm outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Harga Weekend
              </label>
              <input
                type="number"
                min="0"
                value={hargaWeekend}
                onChange={(e) => setHargaWeekend(e.target.value)}
                className="h-11 w-full rounded-full border border-border px-4 text-sm outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-full border border-border bg-white px-4 text-sm outline-none focus:border-primary"
              >
                <option value="Tiket Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="mb-2 block text-sm text-dark-gray">
              Tentang Tiket
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={6}
              className="w-full resize-none rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
              required
            />
          </div>

          {/* KETENTUAN */}
          <div>
            <label className="mb-3 block text-sm text-dark-gray">
              Ketentuan Tiket
            </label>
            <div className="grid gap-3">
              {ketentuan.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleChangeKetentuan(index, e.target.value)
                    }
                    placeholder="Masukkan ketentuan tiket"
                    className="h-11 w-full rounded-full border border-border px-4 text-sm outline-none focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveKetentuan(index)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-red-500 hover:text-red-600"
                    aria-label="Hapus ketentuan"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddKetentuan}
              className="mt-3 flex h-10 items-center gap-2 rounded-full border border-black px-4 text-sm font-semibold text-black hover:bg-gray-50"
            >
              <Plus size={17} />
              Tambah Ketentuan
            </button>
          </div>

          {/* GAMBAR */}
          <div>
            <label className="mb-3 block text-sm text-dark-gray">
              Kumpulan Foto
            </label>

            <div className="flex flex-wrap gap-3">
              {/* BUTTON UPLOAD */}
              <label
                htmlFor="ticket-images"
                className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-border bg-white transition hover:bg-gray-50"
              >
                <Upload size={22} className="text-dark-gray" />
                <span className="mt-2 text-xs text-dark-gray">
                  Unggah gambar
                </span>
                <input
                  id="ticket-images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* GAMBAR LAMA */}
              {existingImages.map((image) => (
                <div
                  key={image.id}
                  className="relative h-28 w-28 overflow-hidden rounded-xl border border-border bg-gray-100"
                >
                  <img
                    src={getImageUrl(image.urlGambar)}
                    alt="Gambar tiket"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image.id)}
                    className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-500 shadow hover:bg-red-50"
                    aria-label="Hapus gambar lama"
                  >
                    <Trash2 size={14} />
                  </button>
                  <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                    Lama
                  </span>
                </div>
              ))}

              {/* GAMBAR BARU */}
              {newImages.map((file, index) => {
                const previewUrl = URL.createObjectURL(file);
                return (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                    className="relative h-28 w-28 overflow-hidden rounded-xl border border-border bg-gray-100"
                  >
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-500 shadow hover:bg-red-50"
                      aria-label="Hapus gambar baru"
                    >
                      <Trash2 size={14} />
                    </button>
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                      Baru
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-2 text-xs text-dark-gray">
              JPG, PNG, atau WEBP. Gambar lama tetap ditampilkan selama belum
              dihapus. Gambar baru akan dikirim saat tiket diperbarui.
            </p>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
