import type { ReactNode } from "react";

import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AdminHeader />
      <main className="flex-1 pt-22.5">{children}</main>
      <AdminFooter />
    </div>
  );
}
