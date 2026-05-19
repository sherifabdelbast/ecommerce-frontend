import { LuSearch, LuBell, LuCircleUser } from "react-icons/lu";

/** Admin top bar — fixed, sits to the right of the sidebar. */
export default function AdminTopBar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/20 bg-surface/80 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <h1 className="font-headline text-lg font-bold text-primary">
          Admin Console
        </h1>
        <span className="hidden h-5 w-px bg-outline-variant/30 sm:block" />
        <nav className="hidden gap-5 font-label text-[11px] uppercase tracking-widest text-secondary sm:flex">
          <a href="/" className="transition-colors hover:text-emerald-accent">
            View Site
          </a>
          <a href="/" className="transition-colors hover:text-emerald-accent">
            Support
          </a>
          <a href="/" className="transition-colors hover:text-emerald-accent">
            Docs
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-secondary" />
          <input
            type="search"
            placeholder="Search orders..."
            className="w-64 rounded-full bg-surface-container px-9 py-2 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-secondary transition-colors hover:text-primary"
        >
          <LuBell className="text-xl" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-emerald-accent" />
        </button>
        <button
          type="button"
          aria-label="Account menu"
          className="text-secondary transition-colors hover:text-primary"
        >
          <LuCircleUser className="text-2xl" />
        </button>
      </div>
    </header>
  );
}
