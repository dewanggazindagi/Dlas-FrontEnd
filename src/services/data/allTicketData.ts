import { ticketData } from "./ticketData";
import { packageTicketData } from "./packageTicketData";

export const allTicketData = [
  ...packageTicketData,
  ...ticketData,
];