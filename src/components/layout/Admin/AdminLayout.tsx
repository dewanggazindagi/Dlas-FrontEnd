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
      <main className="z-0 mt-22.5">{children}</main>
      <Footer />
    </div>
  );
}
