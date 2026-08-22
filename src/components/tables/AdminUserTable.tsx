import { useEffect, useState } from "react";

import BaseTable from "../ui/tables/BaseTable";
import { getUserColumns } from "../ui/tables/UserColumn";
import TableFilter from "../ui/tables/TableFilter";
import TablePagination from "../ui/tables/TablePagination";
import TableSearch from "../ui/tables/TableSearch";

import AddLoketModal from "../modal/AddLoketModal";
import DeleteUserModal from "../modal/DeleteUserModal";

import usePagination from "../../hooks/usePagination";

import { userTableData } from "../../services/data/userTableData";

interface AdminUserTableProps {
  data: typeof userTableData;
}

export default function AdminUserTable({ data }: AdminUserTableProps) {
  const [users, setUsers] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState("all");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<
    (typeof userTableData)[number] | null
  >(null);

  const [openAddModal, setOpenAddModal] = useState(false);

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
    setOpenDeleteModal(true);
  };

  const searchedData = users.filter((item) => {
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

  const handleConfirmDelete = (user: (typeof userTableData)[number]) => {
    setUsers((prev) => prev.filter((item) => item.id !== user.id));

    setOpenDeleteModal(false);
    setSelectedUser(null);

    setCurrentPage(1);
  };

  const handleAddUser = (newUser: (typeof userTableData)[number]) => {
    setUsers((prev) => [...prev, newUser]);

    setOpenAddModal(false);
    setCurrentPage(1);
  };

  const columns = getUserColumns(handleDelete);

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
            onClick={() => setOpenAddModal(true)}
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

      <DeleteUserModal
        open={openDeleteModal}
        user={selectedUser}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <AddLoketModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
        }}
        onSubmit={handleAddUser}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
