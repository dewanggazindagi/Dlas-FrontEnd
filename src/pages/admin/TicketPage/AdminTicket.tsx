import AdminLayout from "../../../components/layout/Admin/AdminLayout";
import AdminTicketSummaryCard from "../../../components/cards/AdminTicketSummaryCard";
import AdminTicketList from "../../../components/cards/AdminTicketList";

import { useTicketsData } from "../../../hooks/useTicketsData";

/**
 * Page untuk admin melihat dan manage tiket
 */
export default function AdminTicket() {
  const { tickets, loading, error } = useTicketsData();

  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        {/* SUMMARY CARD */}
        <AdminTicketSummaryCard data={tickets} loading={loading} />

        {/* ERROR MESSAGE */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-500">{error}</div>
        )}

        {/* TICKET LIST */}
        <AdminTicketList />
      </div>
    </AdminLayout>
  );
}
