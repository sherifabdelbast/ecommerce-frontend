"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuUser,
  LuPackage,
  LuHeart,
  LuMapPin,
  LuLogOut,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { MOCK_USER, initials } from "../_lib/account";

type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/account/profile", label: "Profile", icon: LuUser },
  { href: "/account/orders", label: "Order History", icon: LuPackage },
  { href: "/account/wishlist", label: "Wishlist", icon: LuHeart },
  { href: "/account/addresses", label: "Address Book", icon: LuMapPin },
];

/**
 * Shared account-area side navigation. Desktop: a sticky full-height panel
 * with the signed-in user's header. Mobile: a horizontal scrolling nav row.
 */
export default function AccountSideNav() {
  const pathname = usePathname();
  const user = MOCK_USER;

  return (
    <aside className="border-b border-outline-variant/20 bg-surface-container-low md:w-72 md:shrink-0 md:border-b-0 md:border-r">
      <div className="md:sticky md:top-20 md:flex md:h-[calc(100vh-5rem)] md:flex-col md:px-8 md:py-12">
        {/* User header — desktop only */}
        <div className="hidden items-center gap-4 md:flex">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-headline text-sm font-bold text-on-primary">
            {initials(user)}
          </span>
          <div>
            <p className="font-headline text-lg font-bold text-primary">
              {user.firstName} {user.lastName}
            </p>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary">
              {user.tier}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex gap-1 overflow-x-auto px-4 py-3 md:mt-10 md:flex-col md:overflow-visible md:px-0 md:py-0">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 whitespace-nowrap px-4 py-3 font-label text-[11px] font-bold uppercase tracking-widest transition-colors md:border-l-2 ${
                  active
                    ? "border-emerald-accent text-primary md:bg-surface-container"
                    : "border-transparent text-secondary hover:text-primary md:hover:bg-surface-container"
                }`}
              >
                <Icon
                  className={`text-base ${active ? "text-emerald-accent" : ""}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout — pinned to bottom on desktop */}
        <button
          type="button"
          className="mt-auto hidden items-center gap-3 border-t border-outline-variant/20 pt-6 font-label text-[11px] font-bold uppercase tracking-widest text-error transition-opacity hover:opacity-70 md:flex"
        >
          <LuLogOut className="text-base" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
