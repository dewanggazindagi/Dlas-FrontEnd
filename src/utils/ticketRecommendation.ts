import type { PackageTicket } from "../types/packageTicket";
import type { Ticket } from "../types/ticket";

export function getRecommendedPackages(
  selectedNames: string[],
  packages: PackageTicket[],
  limit = 3,
): PackageTicket[] {
  return packages
    .map((pkg) => ({
      pkg,
      matchCount: selectedNames.filter((name) => pkg.includedRides.includes(name)).length,
    }))
    .filter((entry) => entry.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((entry) => entry.pkg);
}

export function getSelectedRegularTickets(selectedNames: string[], allTickets: Ticket[]): Ticket[] {
  return allTickets.filter((ticket) => selectedNames.includes(ticket.name));
}
