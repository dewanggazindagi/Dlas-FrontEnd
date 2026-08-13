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
  // =====================================
  // DATA USER
  // =====================================

  const [users, setUsers] = useState(data);

  // =====================================
  // SEARCH
  // =====================================

  const [searchValue, setSearchValue] = useState("");

  // =====================================
  // FILTER ROLE
  // =====================================

  const [role, setRole] = useState("all");

  // =====================================
  // DELETE MODAL
  // =====================================

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<
    (typeof userTableData)[number] | null
  >(null);

  // =====================================
  // ADD USER MODAL
  // =====================================

  const [openAddModal, setOpenAddModal] = useState(false);

  // =====================================
  // ROLE OPTIONS
  // =====================================

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

  // =====================================
  // DELETE USER
  // =====================================

  const handleDelete = (user: (typeof userTableData)[number]) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  // =====================================
  // SEARCH
  // =====================================

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

  // =====================================
  // FILTER ROLE
  // =====================================

  const filteredData =
    role === "all" ? searchedData : (
      searchedData.filter((item) => item.role === role)
    );

  // =====================================
  // PAGINATION
  // =====================================

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination(filteredData, 8);

  // =====================================
  // RESET PAGINATION
  // =====================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, role, setCurrentPage]);

  // =====================================
  // CONFIRM DELETE
  // =====================================

  const handleConfirmDelete = (user: (typeof userTableData)[number]) => {
    setUsers((prev) => prev.filter((item) => item.id !== user.id));

    setOpenDeleteModal(false);
    setSelectedUser(null);

    setCurrentPage(1);
  };

  // =====================================
  // ADD USER
  // =====================================

  const handleAddUser = (newUser: (typeof userTableData)[number]) => {
    setUsers((prev) => [...prev, newUser]);

    setOpenAddModal(false);
    setCurrentPage(1);
  };

  // =====================================
  // TABLE COLUMNS
  // =====================================

  const columns = getUserColumns(handleDelete);

  return (
    <div>
      {/* =================================
          TOOLBAR
      ================================= */}

      <div className="mb-6 flex items-center justify-between">
        {/* SEARCH */}

        <TableSearch
          value={searchValue}
          placeholder="Cari ID, Nama Pengguna"
          onChange={(value) => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
        />

        {/* FILTER + ADD */}

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

      {/* =================================
          TABLE
      ================================= */}

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
