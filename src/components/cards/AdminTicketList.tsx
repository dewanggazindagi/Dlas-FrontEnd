import { useState } from "react";

import TicketCard from "./TicketCard";

import { ticketData } from "../../services/data/ticketData";
import { packageTicketData } from "../../services/data/packageTicketData";

import type { Ticket } from "../../types/ticket";
import Button from "../ui/Button";

type Category = "Paket Hemat" | "Regular/Satuan";

interface AdminTicketListProps {
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
}

export default function AdminTicketList({
  onEdit,
  onDelete,
}: AdminTicketListProps) {
  const [category, setCategory] = useState<Category>("Paket Hemat");

  const data = category === "Paket Hemat" ? packageTicketData : ticketData;

  const itemNames = Object.fromEntries(
    ticketData.map((ticket) => [ticket.id, ticket.name]),
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCategory("Paket Hemat")}
            className={`h-11
              ${
                category === "Paket Hemat" ?
                  "bg-dark-gray text-black font-semibold border border-border"
                : "bg-white text-dark-gray hover:bg-gray-50 font-medium border border-white"
              }`}
          >
            Tiket Paket Hemat
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCategory("Regular/Satuan")}
            className={`h-11
              ${
                category === "Regular/Satuan" ?
                  "bg-dark-gray text-black font-semibold border border-border"
                : "bg-white text-dark-gray hover:bg-gray-50 font-medium border border-white"
              }`}
          >
            Tiket Regular/Satuan
          </Button>
        </div>

        <Button variant="primary" size="sm" className="h-11 font-semibold">
          Tambah Tiket
        </Button>
      </div>

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
            itemNames={itemNames}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
