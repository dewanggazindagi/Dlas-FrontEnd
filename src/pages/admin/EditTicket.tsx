/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import Button from "../../components/ui/Button";

import { getTicketById, updateTicket } from "../../services/api/ticketApi";

import { mapTicketApiToTicket } from "../../services/api/ticketAdapter";

import type { Ticket, TicketGambar } from "../../types/ticket";

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

  /*
   * GAMBAR LAMA
   *
   * Tetap berupa TicketGambar[] karena data dari BE:
   *
   * {
   *   id: "...",
   *   urlGambar: "https://..."
   * }
   */
  const [existingImages, setExistingImages] = useState<TicketGambar[]>([]);

  /*
   * GAMBAR BARU
   *
   * File yang dipilih user tetapi belum dikirim ke BE.
   */
  const [newImages, setNewImages] = useState<File[]>([]);

  /* =========================================================
     AMBIL DETAIL TIKET
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

        /*
         * Beberapa API mengembalikan:
         *
         * response.data
         *
         * sedangkan sebagian langsung:
         *
         * response
         */
        const rawData = response?.data ?? response;

        console.log("=== DETAIL TIKET ===");
        console.log("RAW DATA:", rawData);

        /*
         * Adapter hanya digunakan untuk data umum tiket.
         */
        const ticket: Ticket = mapTicketApiToTicket(rawData);

        console.log("HASIL ADAPTER:", ticket);

        /* =========================
           DATA TIKET
        ========================= */

        setNamaTiket(ticket.name ?? "");

        setHargaWeekdays(
          ticket.weekdayPrice != null ? String(ticket.weekdayPrice) : "",
        );

        setHargaWeekend(
          ticket.weekendPrice != null ? String(ticket.weekendPrice) : "",
        );

        setStatus(ticket.status ?? "Tiket Aktif");

        setDeskripsi(ticket.description ?? "");

        /* =========================
           KETENTUAN
        ========================= */

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

        /* =========================
           GAMBAR LAMA
        ========================= */

        const oldImages: TicketGambar[] =
          Array.isArray(rawData?.gambar) ?
            rawData.gambar
              .filter((image: any) => image?.urlGambar)
              .map((image: any) => ({
                id: image.id,
                urlGambar: image.urlGambar,
              }))
          : [];

        console.log("GAMBAR LAMA DARI BE:", oldImages);

        setExistingImages(oldImages);

        /*
         * Pastikan setiap kali halaman edit dibuka,
         * gambar baru dikosongkan.
         */
        setNewImages([]);
      } catch (err: any) {
        console.error("Gagal mengambil data tiket:", err);

        console.error("ERROR RESPONSE:", err?.response?.data);

        setError(err?.response?.data?.message ?? "Gagal mengambil data tiket.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  /* =========================================================
     KETENTUAN
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
     GAMBAR BARU
  ========================================================= */

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    console.log("GAMBAR BARU DIPILIH:", files);

    setNewImages((prev) => [...prev, ...files]);

    /*
     * Supaya file yang sama bisa dipilih
     * kembali setelah dihapus.
     */
    event.target.value = "";
  };

  /* =========================================================
     HAPUS GAMBAR LAMA DARI TAMPILAN
  ========================================================= */

  const handleRemoveExistingImage = (imageId: string) => {
    setExistingImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  /* =========================================================
     HAPUS GAMBAR BARU
  ========================================================= */

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  /* =========================================================
     VALIDASI
  ========================================================= */

  const validateForm = (): string => {
    if (!namaTiket.trim()) {
      return "Nama tiket wajib diisi.";
    }

    if (!hargaWeekdays) {
      return "Harga weekdays wajib diisi.";
    }

    if (!hargaWeekend) {
      return "Harga weekend wajib diisi.";
    }

    if (!status) {
      return "Status tiket wajib dipilih.";
    }

    if (!deskripsi.trim()) {
      return "Deskripsi tiket wajib diisi.";
    }

    return "";
  };

  /* =========================================================
     SUBMIT UPDATE
  ========================================================= */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("ID tiket tidak ditemukan.");
      return;
    }

    setError("");

    /* =========================
       VALIDASI
    ========================= */

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      /*
       * ============================================
       * FORM DATA
       * ============================================
       */

      const formData = new FormData();

      /* =========================
         DATA TIKET
      ========================= */

      formData.append("namaTiket", namaTiket.trim());

      formData.append("hargaWeekdays", String(Number(hargaWeekdays)));

      formData.append("hargaWeekend", String(Number(hargaWeekend)));

      formData.append("deskripsi", deskripsi.trim());

      formData.append("status", status);

      /* =========================
         KETENTUAN
      ========================= */

      const validKetentuan = ketentuan
        .map((item) => item.trim())
        .filter(Boolean);

      validKetentuan.forEach((item) => {
        formData.append("ketentuan", item);
      });

      /*
       * ============================================
       * GAMBAR
       * ============================================
       *
       * PENTING:
       *
       * JANGAN kirim gambar lama sebagai File.
       *
       * Gambar lama sudah tersimpan di database.
       *
       * FE hanya mengirim File baru melalui:
       *
       * formData.append("gambar", file)
       *
       * ============================================
       */

      newImages.forEach((file) => {
        formData.append("gambar", file);
      });

      /* =========================
         DEBUG
      ========================= */

      console.log("================================");

      console.log("=== UPDATE TIKET ===");

      console.log("ID:", id);

      console.log("NAMA:", namaTiket);

      console.log("HARGA WEEKDAYS:", hargaWeekdays);

      console.log("HARGA WEEKEND:", hargaWeekend);

      console.log("STATUS:", status);

      console.log("KETENTUAN:", validKetentuan);

      console.log("GAMBAR LAMA YANG DIPERTAHANKAN:", existingImages);

      console.log("GAMBAR BARU:", newImages);

      console.log("JUMLAH GAMBAR LAMA:", existingImages.length);

      console.log("JUMLAH GAMBAR BARU:", newImages.length);

      /*
       * Tampilkan isi FormData.
       */
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log("FORM DATA:", key, value.name, value.type, value.size);
        } else {
          console.log("FORM DATA:", key, value);
        }
      }

      console.log("================================");

      /* =========================
         UPDATE KE BE
      ========================= */

      await updateTicket(id, formData);

      console.log("TIKET BERHASIL DIPERBARUI");

      /* =========================
         KEMBALI KE LIST
      ========================= */

      navigate("/admin/ticket");
    } catch (err: any) {
      console.error("Gagal update tiket:", err);

      console.error("ERROR RESPONSE:", err?.response?.data);

      const message = err?.response?.data?.message;

      if (Array.isArray(message)) {
        setError(message.join(", "));
      } else {
        setError(message ?? "Gagal memperbarui tiket.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     LOADING
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

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="grid gap-7 p-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/ticket")}
            className="
              flex
              items-center
              gap-2
              text-md
              font-semibold
              text-primary
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
            className="h-11 font-semibold"
            disabled={submitting}
          >
            {submitting ? "Memperbarui..." : "Perbarui Tiket"}
          </Button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="grid gap-7">
          {/* =================================================
              DATA UTAMA
          ================================================= */}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {/* NAMA */}

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Nama Tiket
              </label>

              <input
                type="text"
                value={namaTiket}
                onChange={(event) => setNamaTiket(event.target.value)}
                className="
                  h-11
                  w-full
                  rounded-full
                  border
                  border-border
                  px-4
                  text-sm
                  outline-none
                  focus:border-primary
                "
                required
              />
            </div>

            {/* WEEKDAYS */}

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Harga Weekdays
              </label>

              <input
                type="number"
                min="0"
                value={hargaWeekdays}
                onChange={(event) => setHargaWeekdays(event.target.value)}
                className="
                  h-11
                  w-full
                  rounded-full
                  border
                  border-border
                  px-4
                  text-sm
                  outline-none
                  focus:border-primary
                "
                required
              />
            </div>

            {/* WEEKEND */}

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Harga Weekend
              </label>

              <input
                type="number"
                min="0"
                value={hargaWeekend}
                onChange={(event) => setHargaWeekend(event.target.value)}
                className="
                  h-11
                  w-full
                  rounded-full
                  border
                  border-border
                  px-4
                  text-sm
                  outline-none
                  focus:border-primary
                "
                required
              />
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm text-dark-gray">
                Status
              </label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="
                  h-11
                  w-full
                  rounded-full
                  border
                  border-border
                  bg-white
                  px-4
                  text-sm
                  outline-none
                  focus:border-primary
                "
              >
                <option value="Tiket Aktif">Aktif</option>

                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>

          {/* =================================================
              DESKRIPSI
          ================================================= */}

          <div>
            <label className="mb-2 block text-sm text-dark-gray">
              Tentang Tiket
            </label>

            <textarea
              value={deskripsi}
              onChange={(event) => setDeskripsi(event.target.value)}
              rows={6}
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-border
                px-4
                py-3
                text-sm
                outline-none
                focus:border-primary
              "
              required
            />
          </div>

          {/* =================================================
              KETENTUAN
          ================================================= */}

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
                    onChange={(event) =>
                      handleChangeKetentuan(index, event.target.value)
                    }
                    placeholder="Masukkan ketentuan tiket"
                    className="
                        h-11
                        w-full
                        rounded-full
                        border
                        border-border
                        px-4
                        text-sm
                        outline-none
                        focus:border-primary
                      "
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveKetentuan(index)}
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        text-red-500
                        hover:text-red-600
                      "
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
              className="
                mt-3
                flex
                h-10
                items-center
                gap-2
                rounded-full
                border
                border-black
                px-4
                text-sm
                font-semibold
                text-black
                hover:bg-gray-50
              "
            >
              <Plus size={17} />
              Tambah Ketentuan
            </button>
          </div>

          {/* =================================================
              GAMBAR
          ================================================= */}

          <div>
            <label className="mb-3 block text-sm text-dark-gray">
              Kumpulan Foto
            </label>

            <div className="flex flex-wrap gap-3">
              {/* ============================================
                  BUTTON UPLOAD
              ============================================ */}

              <label
                htmlFor="ticket-images"
                className="
                  flex
                  h-28
                  w-28
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-border
                  bg-white
                  transition
                  hover:bg-gray-50
                "
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

              {/* ============================================
                  GAMBAR LAMA
              ============================================ */}

              {existingImages.map((image) => (
                <div
                  key={image.id}
                  className="
                      relative
                      h-28
                      w-28
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-gray-100
                    "
                >
                  <img
                    src={image.urlGambar}
                    alt="Gambar tiket"
                    className="h-full w-full object-cover"
                    onLoad={() => {
                      console.log("GAMBAR BERHASIL LOAD:", image.urlGambar);
                    }}
                    onError={(event) => {
                      console.error("GAMBAR GAGAL LOAD:", image.urlGambar);

                      console.error("CURRENT SRC:", event.currentTarget.src);
                    }}
                  />

                  {/* HAPUS GAMBAR LAMA */}

                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image.id)}
                    className="
                        absolute
                        right-1
                        top-1
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-red-500
                        shadow
                        hover:bg-red-50
                      "
                    aria-label="Hapus gambar lama"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* LABEL LAMA */}

                  <span
                    className="
                        absolute
                        bottom-1
                        left-1
                        rounded
                        bg-black/60
                        px-2
                        py-0.5
                        text-[10px]
                        text-white
                      "
                  >
                    Lama
                  </span>
                </div>
              ))}

              {/* ============================================
                  GAMBAR BARU
              ============================================ */}

              {newImages.map((file, index) => {
                const previewUrl = URL.createObjectURL(file);

                return (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                    className="
                        relative
                        h-28
                        w-28
                        overflow-hidden
                        rounded-xl
                        border
                        border-border
                        bg-gray-100
                      "
                  >
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="
                          h-full
                          w-full
                          object-cover
                        "
                    />

                    {/* HAPUS GAMBAR BARU */}

                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="
                          absolute
                          right-1
                          top-1
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-red-500
                          shadow
                          hover:bg-red-50
                        "
                      aria-label="Hapus gambar baru"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* LABEL BARU */}

                    <span
                      className="
                          absolute
                          bottom-1
                          left-1
                          rounded
                          bg-black/60
                          px-2
                          py-0.5
                          text-[10px]
                          text-white
                        "
                    >
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

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                rounded-xl
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-500
              "
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
