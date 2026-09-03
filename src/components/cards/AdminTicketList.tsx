import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import TicketCard from "./TicketCard";
import Button from "../ui/Button";
import DeleteTicketModal from "../modal/DeleteTicketModal";

import type { Ticket } from "../../types/ticket";

import {
  getTickets,
  getPackageTickets,
  deleteTicket,
} from "../../services/api/ticketApi";

import { mapTicketApiToTicket } from "../../services/api/ticketAdapter";

type Category = "Paket Hemat" | "Regular/Satuan";

export default function AdminTicketList() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>("Regular/Satuan");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [packageTickets, setPackageTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  /*
   * ============================================================
   * GET DATA TIKET
   * ============================================================
   */

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        /*
         * --------------------------------------------------------
         * TIKET REGULAR / SATUAN
         * --------------------------------------------------------
         */

        const regularResponse = await getTickets();

        const regularData =
          Array.isArray(regularResponse) ? regularResponse : (
            (regularResponse?.data ?? [])
          );

        const mappedRegular = regularData.map(mapTicketApiToTicket);

        console.log("====================================");
        console.log("=== TIKET SATUAN ===");
        console.log("RAW API:", regularData);
        console.log("SETELAH ADAPTER:", mappedRegular);
        console.log("====================================");

        setTickets(mappedRegular);

        /*
         * --------------------------------------------------------
         * TIKET PAKET
         * --------------------------------------------------------
         */

        const packageResponse = await getPackageTickets();

        const packageData =
          Array.isArray(packageResponse) ? packageResponse : (
            (packageResponse?.data ?? [])
          );

        const mappedPackage = packageData.map(mapTicketApiToTicket);

        console.log("====================================");
        console.log("=== TIKET PAKET ===");
        console.log("RAW API:", packageData);
        console.log("SETELAH ADAPTER:", mappedPackage);
        console.log("====================================");

        setPackageTickets(mappedPackage);
      } catch (error) {
        console.error("Gagal mengambil data tiket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  /*
   * ============================================================
   * DATA YANG DITAMPILKAN
   * ============================================================
   */

  const data = category === "Paket Hemat" ? packageTickets : tickets;

  /*
   * ============================================================
   * MAPPING TIKET SATUAN
   * ============================================================
   *
   * Ini digunakan oleh TicketCard untuk mencari:
   *
   * ticket.items
   *      ↓
   * ID tiket satuan
   *      ↓
   * itemTickets[id]
   *      ↓
   * gambar tiket satuan
   *
   * Contoh:
   *
   * itemTickets["abc-123"] = {
   *   id: "abc-123",
   *   name: "D'las Zoo",
   *   gambar: [...]
   * }
   */

  const itemTickets = useMemo<Record<string, Ticket>>(() => {
    return tickets.reduce<Record<string, Ticket>>((acc, ticket) => {
      acc[String(ticket.id)] = ticket;

      return acc;
    }, {});
  }, [tickets]);

  /*
   * ============================================================
   * MAPPING NAMA TIKET SATUAN
   * ============================================================
   *
   * Digunakan untuk menampilkan nama wahana pada
   * daftar isi tiket paket.
   */

  const itemNames = useMemo<Record<string, string>>(() => {
    return tickets.reduce<Record<string, string>>((acc, ticket) => {
      acc[String(ticket.id)] = ticket.name;

      return acc;
    }, {});
  }, [tickets]);

  /*
   * ============================================================
   * DEBUG MAPPING
   * ============================================================
   */

  console.log("=== ITEM TICKETS ===");
  console.log(itemTickets);

  console.log("=== ITEM NAMES ===");
  console.log(itemNames);

  /*
   * ============================================================
   * DELETE
   * ============================================================
   */

  const handleDeleteTicket = async (ticket: Ticket) => {
    try {
      await deleteTicket(ticket.id, ticket.category);

      if (ticket.category === "Regular/Satuan") {
        setTickets((prev) => prev.filter((item) => item.id !== ticket.id));
      }

      if (ticket.category === "Paket Hemat") {
        setPackageTickets((prev) =>
          prev.filter((item) => item.id !== ticket.id),
        );
      }

      setDeleteModalOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("Gagal menghapus tiket:", error);
    }
  };

  /*
   * ============================================================
   * OPEN DELETE MODAL
   * ============================================================
   */

  const handleOpenDeleteModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDeleteModalOpen(true);
  };

  /*
   * ============================================================
   * CLOSE DELETE MODAL
   * ============================================================
   */

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTicket(null);
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div>
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="mb-4 flex items-center justify-between">
        {/* TAB */}
        <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategory("Paket Hemat")}
            className={`
              h-11
              ${
                category === "Paket Hemat" ?
                  "border border-border bg-dark-gray font-semibold text-black"
                : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
              }
            `}
          >
            Tiket Paket Hemat
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategory("Regular/Satuan")}
            className={`
              h-11
              ${
                category === "Regular/Satuan" ?
                  "border border-border bg-dark-gray font-semibold text-black"
                : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
              }
            `}
          >
            Tiket Regular/Satuan
          </Button>
        </div>

        {/* TAMBAH TIKET */}

        <Button
          type="button"
          variant="primary"
          size="sm"
          className="h-11 font-semibold"
          onClick={() => navigate("/admin/ticket/add")}
        >
          Tambah Tiket
        </Button>
      </div>

      {/* ====================================================== */}
      {/* LOADING */}
      {/* ====================================================== */}

      {loading && (
        <div className="py-10 text-center text-sm text-dark-gray">
          Memuat data tiket...
        </div>
      )}

      {/* ====================================================== */}
      {/* LIST TICKET */}
      {/* ====================================================== */}

      {!loading && data.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {data.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              itemTickets={itemTickets}
              onEdit={(ticket) => {
                if (ticket.category === "Paket Hemat") {
                  navigate(`/admin/ticket/edit-package/${ticket.id}`);
                  return;
                }

                navigate(`/admin/ticket/edit/${ticket.id}`);
              }}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      )}

      {/* ====================================================== */}
      {/* EMPTY STATE */}
      {/* ====================================================== */}

      {!loading && data.length === 0 && (
        <div className="py-10 text-center text-sm text-dark-gray">
          Belum ada tiket pada kategori ini.
        </div>
      )}

      {/* ====================================================== */}
      {/* DELETE MODAL */}
      {/* ====================================================== */}

      <DeleteTicketModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        ticket={selectedTicket}
        onConfirm={handleDeleteTicket}
      />
    </div>
  );
}
