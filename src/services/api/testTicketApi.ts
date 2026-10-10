import api from "./axios";

export async function testTicketApi() {
  try {
    const response = await api.get("/tiket-wahana");

    console.log("TIKET WAHANA API:", response.data);

    return response.data;
  } catch (error) {
    console.error("TIKET WAHANA API ERROR:", error);

    throw error;
  }
}