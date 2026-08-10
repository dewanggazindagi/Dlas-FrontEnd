import { useEffect, useState } from "react";

import BaseTable from "../ui/tables/BaseTable";
import { getTransactionColumns } from "../ui/tables/TransactionColumn";
import TableFilter from "../ui/tables/TableFilter";
import TablePagination from "../ui/tables/TablePagination";
import TableSearch from "../ui/tables/TableSearch";
import DatePicker from "../ui/DatePicker";
import TransactionDetailModal from "../modal/TransactionDetailModal";

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

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof transactionTableData)[number] | null
  >(null);

  const handleDetail = (transaction: (typeof transactionTableData)[number]) => {
    setSelectedTransaction(transaction);
    setOpenDetail(true);
  };

  const columns = getTransactionColumns(handleDetail);

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
      <TransactionDetailModal
        open={openDetail}
        transaction={selectedTransaction}
        onClose={() => {
          setOpenDetail(false);
          setSelectedTransaction(null);
        }}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
