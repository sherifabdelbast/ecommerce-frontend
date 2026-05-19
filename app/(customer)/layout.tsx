import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "../_styles/globals.css";

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
  title: "Your Account | ARCHITECT",
  description: "Manage your ARCHITECT cart, orders and curated collection.",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-surface text-on-surface font-body selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
        {children}
      </body>
    </html>
  );
}
