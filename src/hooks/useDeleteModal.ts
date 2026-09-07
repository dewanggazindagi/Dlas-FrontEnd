import { useState } from "react";
import type { Ticket } from "../types/ticket";

/**
 * Hook untuk manage delete modal state
 */
export const useDeleteModal = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleOpenDeleteModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTicket(null);
  };

  return {
    deleteModalOpen,
    selectedTicket,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
};