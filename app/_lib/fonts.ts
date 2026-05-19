import { Manrope, Inter } from "next/font/google";

/**
 * Shared font configuration — loaded once and reused by every route-group
 * layout so the subsets/weights are not redeclared per layout.
 */
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

/** Combined CSS-variable class string for the root `<html>` element. */
export const fontVariables = `${manrope.variable} ${inter.variable}`;
