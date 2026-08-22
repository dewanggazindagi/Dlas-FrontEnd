import type { ReactNode } from "react";

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: ReactNode | string;
}
