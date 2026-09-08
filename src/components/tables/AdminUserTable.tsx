/* eslint-disable react-hooks/set-state-in-effect */
// AdminUserTable.tsx
import { useEffect, useState } from "react";

import BaseTable from "../ui/tables/BaseTable";
import { getUserColumns } from "../ui/tables/UserColumn";
import TableFilter from "../ui/tables/TableFilter";
import TablePagination from "../ui/tables/TablePagination";
import TableSearch from "../ui/tables/TableSearch";

import AddLoketModal from "../modal/AddLoketModal";
import DeleteUserModal from "../modal/DeleteUserModal";

import usePagination from "../../hooks/usePagination";

import type { UserTable } from "../../types/userTable";
import { fetchUsers, deleteUser } from "../../services/api/userService";

interface AdminUserTableProps {
  data: UserTable[];
  loading: boolean;
}

export default function AdminUserTable({ data, loading }: AdminUserTableProps) {
  const [users, setUsers] = useState<UserTable[]>(data);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState("all");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserTable | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const roleOptions = [
    { label: "Semua Role/Peran", value: "all" },
    { label: "Loket", value: "Loket" },
    { label: "Pengunjung", value: "Pengunjung" },
  ];

  const handleDelete = (user: UserTable) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const searchedData = users.filter((item) => {
    const keyword = searchValue.toLowerCase();

    return (
      (item.id ?? "").toLowerCase().includes(keyword) ||
      (item.namaPengguna ?? "").toLowerCase().includes(keyword) ||
      (item.email ?? "").toLowerCase().includes(keyword) ||
      (item.noHp ?? "").toLowerCase().includes(keyword) ||
      (item.role ?? "").toLowerCase().includes(keyword)
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

  const handleConfirmDelete = async (user: UserTable) => {
    try {
      setDeleting(true);
      setDeleteError(null);

      await deleteUser(user.id);

      // refetch dari GET, sama seperti pola create tadi — supaya data selalu sinkron dengan backend
      const refreshedUsers = await fetchUsers();
      setUsers(refreshedUsers);

      setOpenDeleteModal(false);
      setSelectedUser(null);
      setCurrentPage(1);
    } catch (err) {
      setDeleteError(
        err instanceof Error ?
          err.message
        : "Gagal menghapus pengguna. Coba lagi.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleAddUser = async () => {
    const refreshedUsers = await fetchUsers(); // sekarang valid, sudah di-import
    setUsers(refreshedUsers);
    setOpenAddModal(false);
    setCurrentPage(1);
  };

  const columns = getUserColumns(handleDelete);

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-dark-gray">
        Memuat data pengguna...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-dark-gray">
        Belum ada tiket pada kategori ini.
      </div>
    );
  }

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
            className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Tambah Pengguna Loket
          </button>
        </div>
      </div>

      <BaseTable columns={columns} data={currentData} />

      <DeleteUserModal
        open={openDeleteModal}
        user={selectedUser}
        loading={deleting}
        error={deleteError}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedUser(null);
          setDeleteError(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <AddLoketModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
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
