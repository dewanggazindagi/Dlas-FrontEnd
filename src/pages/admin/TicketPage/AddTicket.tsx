/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../components/layout/Admin/AdminLayout";
import Button from "../../../components/ui/Button";

import {
  createPackageTicket,
  createTicket,
} from "../../../services/api/ticketApi";

import { useTicketForm } from "../../../hooks/useTicketForm";
import { useTicketValidation } from "../../../hooks/useTicketValidation";
import { useWahanaSelection } from "../../../hooks/useWahanaSelection";

import TicketTypeSelector from "../../../components/ticket/TicketTypeSelector";
import TicketBasicInfo from "../../../components/ticket/TicketBasicInfo";
import TicketDescription from "../../../components/ticket/TicketDescription";
import WahanaSelection from "../../../components/ticket/WahanaSelection";
import TermsManagement from "../../../components/ticket/TermsManagement";
import ImageUpload from "../../../components/ticket/ImageUpload";
import ErrorAlert from "../../../components/ticket/ErrorAlert";

import type { TicketType } from "../../../types/ticket";

/**
 * Page untuk menambahkan tiket baru
 * Menggabungkan berbagai sub-component dan hooks
 */
export default function AddTicket() {
  const navigate = useNavigate();

  const [type, setType] = useState<TicketType>("regular");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    form,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    handleToggleItem,
    handleAddTerm,
    handleTermChange,
    handleRemoveTerm,
  } = useTicketForm();

  const { validateForm } = useTicketValidation();
  const { regularTickets, loading: loadingWahana } = useWahanaSelection(type);

  /**
   * Handle perubahan tipe tiket
   */
  const handleTypeChange = (newType: TicketType) => {
    setType(newType);
  };

  /**
   * Handle perubahan deskripsi tiket
   */
  const handleDescriptionChange = (description: string) => {
    handleChange("description", description);
  };

  /**
   * Handle submit form
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const validationError = validateForm(form, type);
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
        gambar: form.images,
      };

      console.log("================================");
      console.log("DATA TIKET:", basePayload);

      if (type === "regular") {
        const response = await createTicket(basePayload);
        console.log("TIKET SATUAN BERHASIL DIBUAT:", response);
      } else {
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

        {/* TYPE SELECTOR */}
        <TicketTypeSelector type={type} onTypeChange={handleTypeChange} />

        {/* BASIC INFO */}
        <TicketBasicInfo form={form} onChange={handleChange} />

        {/* DESCRIPTION */}
        <TicketDescription
          description={form.description}
          onChange={handleDescriptionChange}
        />

        {/* WAHANA SELECTION (Hanya untuk tiket paket) */}
        {type === "package" && (
          <WahanaSelection
            regularTickets={regularTickets}
            selectedItems={form.selectedItems}
            loading={loadingWahana}
            onToggleItem={handleToggleItem}
          />
        )}

        {/* TERMS MANAGEMENT */}
        <TermsManagement
          terms={form.terms}
          onAddTerm={handleAddTerm}
          onTermChange={handleTermChange}
          onRemoveTerm={handleRemoveTerm}
        />

        {/* IMAGE UPLOAD */}
        <ImageUpload
          images={form.images}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />

        {/* ERROR ALERT */}
        <ErrorAlert error={error} />
      </form>
    </AdminLayout>
  );
}
