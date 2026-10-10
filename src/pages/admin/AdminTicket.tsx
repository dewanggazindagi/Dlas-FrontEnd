import { allTicketData } from './../../services/data/allTicketData';

import AdminLayout from "../../components/layout/Admin/AdminLayout";
import AdminTicketSummaryCard from "../../components/cards/AdminTicketSummaryCard";
import AdminTicketList from "../../components/cards/AdminTicketList";

export default function AdminTicket() {
  return (
    <AdminLayout>
      <div className="grid gap-7 p-10">
        <AdminTicketSummaryCard data={allTicketData} />
        <AdminTicketList />
      </div>
    </AdminLayout>
  );
}
