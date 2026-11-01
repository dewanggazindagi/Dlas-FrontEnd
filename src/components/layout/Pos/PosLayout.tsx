import type { ReactNode } from "react";

import PosHeader from "./PosHeader";
import PosFooter from "./PosFooter";

interface PosLayoutProps {
  children: ReactNode;
}

export default function PosLayout({ children }: PosLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <PosHeader />
      <main className="flex-1 pt-28 px-10 pb-10 w-full">{children}</main>
      <PosFooter />
    </div>
  );
}