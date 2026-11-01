import api from "./axios";

export interface PosTransactionPayload {
  ticket_id: string;
  quantity: number;
  total_price: number;
  payment_type: "tunai" | "non-tunai";
  non_cash_method?: string | null;
  officer_name: string;
  visit_date: string;
}

export const getPosTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};

export const createPosTransaction = async (payload: PosTransactionPayload) => {
  const response = await api.post("/transactions", payload);
  return response.data;
};