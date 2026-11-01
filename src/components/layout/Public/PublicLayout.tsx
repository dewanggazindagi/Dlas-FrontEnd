import type { ReactNode } from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

interface Props {
  children: ReactNode;
  headerVariant?: "overlay" | "static";
}

export default function PublicLayout({ children, headerVariant = "static" }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <PublicHeader variant={headerVariant} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
