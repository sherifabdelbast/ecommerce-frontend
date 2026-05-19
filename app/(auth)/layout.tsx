import type { Metadata } from "next";
import "../_styles/globals.css";
import { fontVariables } from "../_lib/fonts";

export const metadata: Metadata = {
  title: "Account | ARCHITECT",
  description: "Access your ARCHITECT curated collection and archives.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-surface text-on-surface font-body selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
        {children}
      </body>
    </html>
  );
}
