"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuPackage,
  LuLayers,
  LuTag,
  LuShoppingCart,
  LuUsers,
  LuTicket,
  LuTruck,
  LuStar,
  LuLogOut,
} from "react-icons/lu";
import type { IconType } from "react-icons";

type NavItem = { href: string; label: string; icon: IconType };
type NavSection = { heading: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    heading: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LuLayoutDashboard }],
  },
  {
    heading: "Catalog",
    items: [
      { href: "/admin/products", label: "Products", icon: LuPackage },
      { href: "/admin/categories", label: "Categories", icon: LuLayers },
      { href: "/admin/brands", label: "Brands", icon: LuTag },
    ],
  },
  {
    heading: "Sales",
    items: [
      { href: "/admin/orders", label: "Orders", icon: LuShoppingCart },
      { href: "/admin/coupons", label: "Coupons", icon: LuTicket },
      { href: "/admin/shipping-methods", label: "Shipping", icon: LuTruck },
      { href: "/admin/reviews", label: "Reviews", icon: LuStar },
    ],
  },
  {
    heading: "People",
    items: [{ href: "/admin/users", label: "Users", icon: LuUsers }],
  },
];

/** Returns true when `href` is the active route (exact for /admin, prefix otherwise). */
function isActive(pathname: string, href: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

/** Dark admin side navigation — fixed full-height panel. */
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-slate-950 text-slate-300">
      <div className="px-8 py-8">
        <p className="font-headline text-xl font-black uppercase tracking-tighter text-white">
          ARCHITECT
        </p>
        <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Management Suite
        </p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        {NAV.map((section) => (
          <div key={section.heading}>
            <p className="px-4 pb-2 font-label text-[10px] font-bold uppercase tracking-widest text-slate-600">
              {section.heading}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 border-r-2 px-4 py-3 font-label text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                        active
                          ? "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                          : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className="text-base" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 px-6 py-5">
        <button
          type="button"
          className="flex items-center gap-3 font-label text-[11px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-error"
        >
          <LuLogOut className="text-base" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
