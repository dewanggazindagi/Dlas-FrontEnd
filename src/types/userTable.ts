export interface UserTable {
  id: string;
  namaPengguna: string;
  email: string;
  noHp: string;
  role: "Loket" | "Pengunjung";
  password: string;
}