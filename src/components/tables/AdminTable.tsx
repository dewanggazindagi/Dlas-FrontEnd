import BaseTable from "../ui/tables/BaseTable";
import { columns } from "../ui/tables/TicketsColumn";
//import { transactionData } from "../../services/data/transactionData";
import { useEffect, useState } from "react";
import TableFilter from "../ui/tables/TableFilter";
import TableSearch from "../ui/tables/TableSearch";
import TablePagination from "../ui/tables/TablePagination";
import usePagination from "../../hooks/usePagination";
import type { TopTicket } from "../../types/dashboard";

interface AdminTableProps {
  data: TopTicket[];
}

export default function AdminTable({ data }: AdminTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("sold-desc");
  const sortOptions = [
    {
      label: "Penjualan Terbanyak",
      value: "sold-desc",
    },
    {
      label: "Tiket Terjual Terbanyak",
      value: "ticket-desc",
    },
    {
      label: "Abjad A-Z",
      value: "alphabet",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.namaTiket.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "sold-desc":
        return b.totalPendapatan - a.totalPendapatan;

      case "ticket-desc":
        return b.tiketTerjual - a.tiketTerjual;

      case "alphabet":
        return a.namaTiket.localeCompare(b.namaTiket);

      default:
        return 0;
    }
  });

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination(sortedData, 5);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, sortBy, setCurrentPage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <TableSearch
          value={searchValue}
          placeholder="Cari Nama Tiket"
          onChange={(value) => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
        />
        <TableFilter
          value={sortBy}
          options={sortOptions}
          onChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <BaseTable columns={columns} data={currentData} />
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
