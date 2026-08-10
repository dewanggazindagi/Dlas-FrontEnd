import { useEffect, useState } from "react";

import BaseTable from "../ui/tables/BaseTable";
import { getUserColumns } from "../ui/tables/UserColumn";
import TableFilter from "../ui/tables/TableFilter";
import TablePagination from "../ui/tables/TablePagination";
import TableSearch from "../ui/tables/TableSearch";

import usePagination from "../../hooks/usePagination";

import { userTableData } from "../../services/data/userTableData";

interface AdminUserTableProps {
  data: typeof userTableData;
}

export default function AdminUserTable({ data }: AdminUserTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState("all");

  const [selectedUser, setSelectedUser] = useState<
    (typeof userTableData)[number] | null
  >(null);

  const roleOptions = [
    {
      label: "Semua Role/Peran",
      value: "all",
    },
    {
      label: "Loket",
      value: "Loket",
    },
    {
      label: "Pengunjung",
      value: "Pengunjung",
    },
  ];

  const handleDelete = (user: (typeof userTableData)[number]) => {
    setSelectedUser(user);

    console.log("Delete user:", user);
  };

  const columns = getUserColumns(handleDelete);

  const searchedData = data.filter((item) => {
    const keyword = searchValue.toLowerCase();

    return (
      item.id.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      item.phone.toLowerCase().includes(keyword) ||
      item.role.toLowerCase().includes(keyword)
    );
  });

  const filteredData =
    role === "all" ? searchedData : (
      searchedData.filter((item) => item.role === role)
    );

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination(filteredData, 8);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, role, setCurrentPage]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <TableSearch
          value={searchValue}
          placeholder="Cari ID, Nama Pengguna"
          onChange={(value) => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
        />
        <div className="flex items-center gap-3">
          <TableFilter
            value={role}
            showPrefix={false}
            options={roleOptions}
            onChange={(value) => {
              setRole(value);
              setCurrentPage(1);
            }}
          />
          <button
            type="button"
            className="
              h-11
              rounded-full
              bg-primary
              px-5
              text-sm
              font-semibold
              text-white
              shadow-md
              transition
              hover:opacity-90
            "
          >
            Tambah Pengguna Loket
          </button>
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
