export interface DashboardSummary {
  pendapatanPenjualanTiket: number;
  penjualanTunai: number;
  penjualanNonTunai: number;
  penjualanOnline: number;
  totalTiketTerjual: number;
}

export interface ChartData {
  month?: string;
  year?: string; 
  totalTiket: string | number; 
}

export interface TopTicket {
  idTiket: string;
  namaTiket: string;
  kategori: string;
  tiketTerjual: number;
  pendapatanNonTunai: number;
  pendapatanTunai: number;
  totalPendapatan: number;
}

export interface DashboardResponse<T> {
  success: boolean;
  data: T;
}