"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineShoppingBag } from "react-icons/md";
import AccountMenu from "./AccountMenu";

const links = [
  { label: "Collections", href: "/categories" },
  { label: "Editorial", href: "#" },
  { label: "Objects", href: "/categories/objects" },
  { label: "Atelier", href: "/categories/atelier" },
  { label: "Archives", href: "/categories/archives" },
];

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-[20px]">
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-headline text-2xl font-bold uppercase tracking-tighter text-primary"
        >
          ARCHITECT
        </Link>

        <div className="hidden items-center space-x-12 md:flex">
          {links.map(({ label, href }) => {
            const active = href !== "#" && pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={
                  active
                    ? "border-b-2 border-primary pb-1 font-headline text-sm font-medium uppercase tracking-tight text-primary"
                    : "font-headline text-sm font-medium uppercase tracking-tight text-secondary transition-colors hover:text-primary"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/cart"
            aria-label="Cart"
            className="text-primary transition-opacity duration-300 hover:opacity-70 active:scale-90"
          >
            <MdOutlineShoppingBag className="text-xl" />
          </Link>
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
