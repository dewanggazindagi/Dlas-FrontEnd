import type { ReactNode } from "react";

import AdminHeader from "./AdminHeader";
import Footer from "./AdminFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
