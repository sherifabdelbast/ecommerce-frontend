"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { LuChevronDown } from "react-icons/lu";
import { SORT_LABELS, type SortOption } from "../_lib/products";

const SORT_OPTIONS = Object.keys(SORT_LABELS) as SortOption[];

/**
 * Sort control — the one interactive island on the listing page. Writes the
 * choice into the URL so the server re-renders the grid; `useTransition`
 * keeps the select responsive while that navigation is pending.
 */
function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const current = searchParams.get("sort") ?? "new";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", event.target.value);

    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="flex items-center gap-4">
      <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
        Sort by
      </span>
      <div className="relative">
        <select
          value={current}
          onChange={handleChange}
          aria-label="Sort products"
          className={`appearance-none rounded-md bg-surface-container-low py-2 pl-4 pr-10 font-body text-sm text-primary transition-colors hover:bg-surface-container-highest focus:outline-none focus:ring-1 focus:ring-primary ${
            isPending ? "opacity-60" : ""
          }`}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {SORT_LABELS[option]}
            </option>
          ))}
        </select>
        <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-secondary" />
      </div>
    </div>
  );
}

export default SortSelect;
