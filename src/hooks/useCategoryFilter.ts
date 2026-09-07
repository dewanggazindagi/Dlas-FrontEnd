import { useState, useMemo } from "react";
import type { Ticket } from "../types/ticket";

type Category = "Paket Hemat" | "Regular/Satuan";

/**
 * Hook untuk manage category filter
 */
export const useCategoryFilter = (
  tickets: Ticket[],
  packageTickets: Ticket[]
) => {
  const [category, setCategory] = useState<Category>("Regular/Satuan");

  /**
   * Filter data berdasarkan category
   */
  const filteredData = useMemo<Ticket[]>(() => {
    return category === "Paket Hemat" ? packageTickets : tickets;
  }, [category, tickets, packageTickets]);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
  };

  return {
    category,
    filteredData,
    handleCategoryChange,
  };
};