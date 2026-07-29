import { Dot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-5 text-center px-10">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>© 2025 D`LAS Purbalingga.</div>
        <div className="flex items-center">
          Terdapat kendala/Bantuan?
          <a href="#" className="text-primary hover:underline ml-2">
            Telepon
          </a>
          <Dot className="text-primary" />
          <a href="#" className="text-primary hover:underline">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
