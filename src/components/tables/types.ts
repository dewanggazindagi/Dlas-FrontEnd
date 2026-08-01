import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T;
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