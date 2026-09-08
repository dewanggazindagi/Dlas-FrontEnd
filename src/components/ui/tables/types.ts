// src/components/ui/tables/types.ts
import type { ReactNode } from "react";

export interface TableColumn<T> {
  // keyof T tetap dapat autocomplete field asli,
  // (string & {}) mengizinkan key custom seperti "action" tanpa melebur jadi `string` polos
  key: keyof T | (string & {});
  header: string;
  width?: string;
  align?: "left" | "center" | "right";

  render?: (row: T) => ReactNode;
}

export interface BaseTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];

  toolbar?: ReactNode;
  pagination?: ReactNode;

  emptyMessage?: string;
}