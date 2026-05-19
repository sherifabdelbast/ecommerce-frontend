import type { Metadata } from "next";
import "../_styles/globals.css";
import { fontVariables } from "../_lib/fonts";
import { AuthProvider } from "@/app/_lib/auth-context";

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
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-surface text-on-surface font-body selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
