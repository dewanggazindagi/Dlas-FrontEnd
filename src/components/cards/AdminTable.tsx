import BaseTable from "../tables/BaseTable";
import { columns } from "../tables/TicketsColumn";
import { transactionData } from "../../services/data/transactionData";
import { useEffect, useState } from "react";
import TableFilter from "../tables/TableFilter";
import TableSearch from "../tables/TableSearch";
import TablePagination from "../tables/TablePagination";
import usePagination from "../../hooks/usePagination";

interface AdminTable {
  data: typeof transactionData;
}

export default function AdminTable({ data }: AdminTable) {
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
      item.ticket.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "sold-desc":
        return b.total - a.total;

      case "ticket-desc":
        return b.sold - a.sold;

      case "alphabet":
        return a.ticket.localeCompare(b.ticket);

      default:
        return 0;
    }
  });

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination(sortedData, 2);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, sortBy, setCurrentPage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <TableSearch
          value={searchValue}
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
