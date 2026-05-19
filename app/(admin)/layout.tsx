import type { Metadata } from "next";
import "../_styles/globals.css";
import { fontVariables } from "../_lib/fonts";
import AdminSidebar from "../_components/AdminSidebar";
import AdminTopBar from "../_components/AdminTopBar";

export const metadata: Metadata = {
  title: "Admin Console | ARCHITECT",
  description: "ARCHITECT platform management suite.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-background font-body text-on-surface">
        <AdminSidebar />
        <div className="ml-64">
          <AdminTopBar />
          <main className="min-h-screen px-8 pb-12 pt-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
