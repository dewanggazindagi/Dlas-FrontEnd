import axiosInstance from './axios';
import type { DashboardSummary, ChartData, TopTicket, DashboardResponse } from '../../types/dashboard';

export const dashboardApi = {
  getSummary: async () => {
    const response = await axiosInstance.get<DashboardResponse<DashboardSummary>>('/dashboard/transactions-analytics/summary');
    return response.data.data;
  },

  getMonthlyChart: async () => {
    const response = await axiosInstance.get<DashboardResponse<ChartData[]>>('/dashboard/transactions-analytics/monthly-chart');
    return response.data.data;
  },

  getYearlyChart: async () => {
    const response = await axiosInstance.get<DashboardResponse<ChartData[]>>('/dashboard/transactions-analytics/yearly-chart');
    return response.data.data;
  },

  getTopTickets: async (search?: string) => {
    const response = await axiosInstance.get<DashboardResponse<TopTicket[]>>('/dashboard/transactions-analytics/top-tickets', {
      params: { search },
    });
    return response.data.data;
  },
};