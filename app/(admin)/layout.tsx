import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "../_styles/globals.css";
import AdminSidebar from "../_components/AdminSidebar";
import AdminTopBar from "../_components/AdminTopBar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

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
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full`}>
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
