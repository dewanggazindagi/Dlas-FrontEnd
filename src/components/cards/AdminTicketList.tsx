import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TicketCard from "./TicketCard";
import Button from "../ui/Button";

import type { Ticket } from "../../types/ticket";

import { getTickets, getPackageTickets } from "../../services/api/ticketApi";

import { mapTicketApiToTicket } from "../../services/api/ticketAdapter";

type Category = "Paket Hemat" | "Regular/Satuan";

interface AdminTicketListProps {
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
}

export default function AdminTicketList({ onDelete }: AdminTicketListProps) {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>("Regular/Satuan");

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [packageTickets, setPackageTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        // ==========================================
        // AMBIL TIKET SATUAN
        // ==========================================

        const regularResponse = await getTickets();

        console.log("RESPONSE TIKET SATUAN:", regularResponse);

        const regularData =
          Array.isArray(regularResponse) ? regularResponse : (
            (regularResponse?.data ?? [])
          );

        const mappedRegular = regularData.map(mapTicketApiToTicket);

        setTickets(mappedRegular);

        // ==========================================
        // AMBIL TIKET PAKET
        // ==========================================

        const packageResponse = await getPackageTickets();

        console.log("RESPONSE TIKET PAKET:", packageResponse);

        const packageData =
          Array.isArray(packageResponse) ? packageResponse : (
            (packageResponse?.data ?? [])
          );

        const mappedPackage = packageData.map(mapTicketApiToTicket);

        setPackageTickets(mappedPackage);
      } catch (error) {
        console.error("Gagal mengambil data tiket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // ==========================================
  // DATA YANG DITAMPILKAN
  // ==========================================

  const data = category === "Paket Hemat" ? packageTickets : tickets;

  return (
    <div>
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-4 flex items-center justify-between">
        {/* CATEGORY */}

        <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategory("Paket Hemat")}
            className={`h-11 ${
              category === "Paket Hemat" ?
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
            onClick={() => setCategory("Regular/Satuan")}
            className={`h-11 ${
              category === "Regular/Satuan" ?
                "border border-border bg-dark-gray font-semibold text-black"
              : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }`}
          >
            Tiket Regular/Satuan
          </Button>
        </div>

        {/* TAMBAH */}

        <Button
          variant="primary"
          size="sm"
          className="h-11 font-semibold"
          onClick={() => navigate("/admin/ticket/add")}
        >
          Tambah Tiket
        </Button>
      </div>

      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {loading && (
        <div className="py-10 text-center text-sm text-dark-gray">
          Memuat data tiket...
        </div>
      )}

      {/* ================================= */}
      {/* DATA */}
      {/* ================================= */}

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
              onEdit={(ticket) => navigate(`/admin/ticket/edit/${ticket.id}`)}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* ================================= */}
      {/* EMPTY */}
      {/* ================================= */}

      {!loading && data.length === 0 && (
        <div className="py-10 text-center text-sm text-dark-gray">
          Belum ada tiket pada kategori ini.
        </div>
      )}
    </div>
  );
}
