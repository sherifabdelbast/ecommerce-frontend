"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuSearch, LuBell, LuCircleUser, LuLogOut, LuUser } from "react-icons/lu";
import { useUser } from "@/app/_lib/auth-context";

/**
 * Admin top bar — fixed, sits to the right of the sidebar. Wires the
 * notifications and account icons to dropdowns and the search form to
 * `/admin/orders?q=…`.
 */
export default function AdminTopBar() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [accountOpen, setAccountOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Click-away + Escape close for both menus.
  useEffect(() => {
    if (!accountOpen && !notifOpen) return;
    function onClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAccountOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountOpen, notifOpen]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = String(data.get("q") ?? "").trim();
    if (q) router.push(`/admin/orders?q=${encodeURIComponent(q)}`);
  }

  async function handleLogout() {
    setAccountOpen(false);
    try {
      await logout();
    } catch {
      // Surface later via toast.
    }
    router.push("/login");
  }

  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/20 bg-surface/80 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <h1 className="font-headline text-lg font-bold text-primary">
          Admin Console
        </h1>
        <span className="hidden h-5 w-px bg-outline-variant/30 sm:block" />
        <nav className="hidden gap-5 font-label text-[11px] uppercase tracking-widest text-secondary sm:flex">
          <Link href="/" className="transition-colors hover:text-emerald-accent">
            View Site
          </Link>
          <Link
            href="/admin/orders"
            className="transition-colors hover:text-emerald-accent"
          >
            Orders
          </Link>
          <Link
            href="/admin/reviews"
            className="transition-colors hover:text-emerald-accent"
          >
            Reviews
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-secondary" />
          <input
            type="search"
            name="q"
            placeholder="Search orders..."
            className="w-64 rounded-full bg-surface-container px-9 py-2 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent"
          />
        </form>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notifOpen}
            aria-haspopup="menu"
            onClick={() => {
              setAccountOpen(false);
              setNotifOpen((v) => !v);
            }}
            className="relative text-secondary transition-colors hover:text-primary"
          >
            <LuBell className="text-xl" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-emerald-accent" />
          </button>
          {notifOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-ambient"
            >
              <div className="border-b border-outline-variant/10 px-5 py-3">
                <p className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Notifications
                </p>
              </div>
              <p className="px-5 py-6 text-center font-body text-sm text-secondary">
                No notifications yet.
              </p>
            </div>
          ) : null}
        </div>

        {/* Account */}
        <div ref={accountRef} className="relative">
          <button
            type="button"
            aria-label="Account menu"
            aria-expanded={accountOpen}
            aria-haspopup="menu"
            onClick={() => {
              setNotifOpen(false);
              setAccountOpen((v) => !v);
            }}
            className="text-secondary transition-colors hover:text-primary"
          >
            <LuCircleUser className="text-2xl" />
          </button>
          {accountOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-ambient"
            >
              {user ? (
                <div className="border-b border-outline-variant/10 px-5 py-4">
                  <p className="font-headline text-sm font-bold text-primary">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-secondary">{user.email}</p>
                </div>
              ) : null}
              <nav className="py-2">
                <Link
                  role="menuitem"
                  href="/account/profile"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 font-body text-sm text-on-surface transition-colors hover:bg-surface-container"
                >
                  <LuUser className="text-base text-secondary" />
                  Profile
                </Link>
              </nav>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-outline-variant/10 px-5 py-3 text-left font-body text-sm text-error transition-colors hover:bg-error-container"
              >
                <LuLogOut className="text-base" />
                Sign Out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
