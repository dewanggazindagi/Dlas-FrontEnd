/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import DeleteTicketModal from "../modal/DeleteTicketModal";

import { useTicketManagement } from "../../hooks/useTicketManagement";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useDeleteModal } from "../../hooks/useDeleteModal";

import TicketListHeader from "../ticket/TicketListHeader";
import TicketListContent from "../ticket/TicketListContent";

/**
 * Component untuk menampilkan list tiket dengan filter kategori
 * Orchestrator utama yang menggabungkan semua sub-components dan hooks
 */
export default function AdminTicketList() {
  const navigate = useNavigate();

  // Fetch & manage data tiket
  const { tickets, packageTickets, loading, itemTickets, handleDeleteTicket } =
    useTicketManagement();

  // Filter berdasarkan kategori
  const { category, filteredData, handleCategoryChange } = useCategoryFilter(
    tickets,
    packageTickets,
  );

  // Delete modal state
  const {
    deleteModalOpen,
    selectedTicket,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useDeleteModal();

  /**
   * Handle edit tiket
   */
  const handleEdit = (ticket: any) => {
    if (ticket.jenisTiket === "Paket Hemat") {
      navigate(`/admin/ticket/edit-package/${ticket.id}`);
      return;
    }

    navigate(`/admin/ticket/edit/${ticket.id}`);
  };

  /**
   * Handle delete konfirmasi
   */
  const handleDeleteConfirm = async (ticket: any) => {
    const success = await handleDeleteTicket(ticket);
    if (success) {
      handleCloseDeleteModal();
    }
  };

  return (
    <div>
      {/* HEADER */}
      <TicketListHeader
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* CONTENT */}
      <TicketListContent
        data={filteredData}
        loading={loading}
        itemTickets={itemTickets}
        onEdit={handleEdit}
        onDelete={handleOpenDeleteModal}
      />

      {/* DELETE MODAL */}
      <DeleteTicketModal
        open={deleteModalOpen}
        loading={loading}
        onClose={handleCloseDeleteModal}
        ticket={selectedTicket}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
