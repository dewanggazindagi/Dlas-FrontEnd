export interface UserTable {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Loket" | "Pengunjung";
  password: string;
}