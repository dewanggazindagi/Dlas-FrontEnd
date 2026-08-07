import { useEffect, useState } from "react";

import BaseTable from "../tables/BaseTable";
import { columns } from "../tables/TransactionColumn";
import TableFilter from "../tables/TableFilter";
import TablePagination from "../tables/TablePagination";
import TableSearch from "../tables/TableSearch";
import DatePicker from "../ui/DatePicker";

import usePagination from "../../hooks/usePagination";

import { transactionTableData } from "../../services/data/transactionTableData";
import { filterTransactionByDate } from "../../utils/filterTransactionByDate";

interface AdminTransactionTableProps {
  data: typeof transactionTableData;
}

export default function AdminTransactionTable({
  data,
}: AdminTransactionTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const statusOptions = [
    {
      label: "Status",
      value: "all",
    },
    {
      label: "Dibayar",
      value: "Dibayar",
    },
    {
      label: "Menunggu",
      value: "Menunggu",
    },
    {
      label: "Dibatalkan",
      value: "Dibatalkan",
    },
  ];

  const searchedData = data.filter((item) => {
    const keyword = searchValue.toLowerCase();

    return (
      item.id.toLowerCase().includes(keyword) ||
      item.ticket.toLowerCase().includes(keyword) ||
      item.customer.toLowerCase().includes(keyword)
    );
  });

  const filteredData =
    status === "all" ? searchedData : (
      searchedData.filter((item) => item.status === status)
    );

  const dateFilteredData = filterTransactionByDate(filteredData, selectedDate);

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination(dateFilteredData, 8);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, status, selectedDate, setCurrentPage]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <TableSearch
          value={searchValue}
          placeholder="Cari ID, Nama Pemesan"
          onChange={(value) => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
        />

        <div className="flex items-center gap-3">
          <TableFilter
            value={status}
            showPrefix={false}
            options={statusOptions}
            onChange={(value) => {
              setStatus(value);
              setCurrentPage(1);
            }}
          />

          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
          />
        </div>
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
