"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut, LuUser, LuShoppingBag, LuHeart, LuMapPin } from "react-icons/lu";
import { useUser } from "@/app/_lib/auth-context";

/**
 * Storefront account dropdown. Anchored to the NavBar's user button.
 *
 * Anonymous users see Sign In + Create Account links; signed-in users see
 * profile shortcuts and a logout action that hits the AuthProvider.
 */
export default function AccountMenu() {
  const { user, loading, logout } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Click-away + Escape close.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleLogout() {
    setOpen(false);
    try {
      await logout();
    } catch {
      // Surface later via toast; clearing the menu is enough for now.
    }
    router.push("/");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Account"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="text-primary transition-opacity duration-300 hover:opacity-70 active:scale-90"
      >
        <FaRegUser className="text-lg" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-ambient"
        >
          {loading ? (
            <p className="px-5 py-4 font-body text-sm text-secondary">Loading…</p>
          ) : user ? (
            <>
              <div className="border-b border-outline-variant/10 px-5 py-4">
                <p className="font-headline text-sm font-bold text-primary">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-secondary">{user.email}</p>
              </div>
              <nav className="py-2">
                <MenuLink href="/account/profile" icon={LuUser} label="Profile" onClick={() => setOpen(false)} />
                <MenuLink href="/account/orders" icon={LuShoppingBag} label="Orders" onClick={() => setOpen(false)} />
                <MenuLink href="/account/wishlist" icon={LuHeart} label="Wishlist" onClick={() => setOpen(false)} />
                <MenuLink href="/account/addresses" icon={LuMapPin} label="Addresses" onClick={() => setOpen(false)} />
              </nav>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-outline-variant/10 px-5 py-3 text-left font-body text-sm text-error transition-colors hover:bg-error-container"
              >
                <LuLogOut className="text-base" />
                Sign Out
              </button>
            </>
          ) : (
            <nav className="py-2">
              <MenuLink href="/login" icon={LuUser} label="Sign In" onClick={() => setOpen(false)} />
              <MenuLink href="/register" icon={LuUser} label="Create Account" onClick={() => setOpen(false)} />
            </nav>
          )}
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      role="menuitem"
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-2.5 font-body text-sm text-on-surface transition-colors hover:bg-surface-container"
    >
      <Icon className="text-base text-secondary" />
      {label}
    </Link>
  );
}
