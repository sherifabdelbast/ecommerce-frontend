import Link from "next/link";
import { LuCheck } from "react-icons/lu";
import {
  CATEGORY_FACETS,
  MATERIAL_FACETS,
  type ProductFilters,
} from "../_lib/products";

type FilterSidebarProps = {
  filters: ProductFilters;
  /** Per-category result counts, keyed by category value. */
  categoryCounts: Record<string, number>;
};

/**
 * URL-driven filter sidebar. Every control is a plain `<Link>` that rewrites
 * the query string, so filtering needs zero client JS — the server re-renders
 * the grid. Clicking an active filter clears it (toggle behaviour).
 */
function FilterSidebar({ filters, categoryCounts }: FilterSidebarProps) {
  /** Build a /products href from the current filters plus a patch. */
  function hrefWith(patch: Partial<ProductFilters>): string {
    const next = { ...filters, ...patch };
    const params = new URLSearchParams();
    if (next.category) params.set("category", next.category);
    if (next.material) params.set("material", next.material);
    if (next.inStockOnly) params.set("in_stock", "1");
    if (next.sort) params.set("sort", next.sort);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  }

  return (
    <aside className="w-full flex-shrink-0 space-y-12 lg:w-64">
      {/* Category */}
      <div>
        <h3 className="mb-6 border-b border-outline-variant/20 pb-2 font-headline text-sm font-semibold uppercase tracking-widest text-primary">
          Category
        </h3>
        <ul className="space-y-4">
          {CATEGORY_FACETS.map((facet) => {
            const active = filters.category === facet.value;
            return (
              <li key={facet.value}>
                <Link
                  href={hrefWith({
                    category: active ? undefined : facet.value,
                  })}
                  className={`flex items-center justify-between text-sm transition-colors ${
                    active
                      ? "font-medium text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {facet.label}
                  <span className="font-label text-xs font-light text-outline">
                    {String(categoryCounts[facet.value] ?? 0).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Material */}
      <div>
        <h3 className="mb-6 border-b border-outline-variant/20 pb-2 font-headline text-sm font-semibold uppercase tracking-widest text-primary">
          Material
        </h3>
        <div className="space-y-3">
          {MATERIAL_FACETS.map((material) => {
            const active = filters.material === material;
            return (
              <Link
                key={material}
                href={hrefWith({ material: active ? undefined : material })}
                className="group flex items-center gap-3"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                    active
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant"
                  }`}
                >
                  {active ? <LuCheck className="text-[11px]" /> : null}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    active
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary"
                  }`}
                >
                  {material}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="mb-6 border-b border-outline-variant/20 pb-2 font-headline text-sm font-semibold uppercase tracking-widest text-primary">
          Availability
        </h3>
        <Link
          href={hrefWith({ inStockOnly: !filters.inStockOnly })}
          className="group flex items-center gap-3"
        >
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
              filters.inStockOnly
                ? "border-primary bg-primary text-on-primary"
                : "border-outline-variant"
            }`}
          >
            {filters.inStockOnly ? <LuCheck className="text-[11px]" /> : null}
          </span>
          <span
            className={`text-sm transition-colors ${
              filters.inStockOnly
                ? "text-primary"
                : "text-secondary group-hover:text-primary"
            }`}
          >
            In Stock Only
          </span>
        </Link>
      </div>

      {(filters.category || filters.material || filters.inStockOnly) ? (
        <Link
          href="/products"
          className="inline-block font-label text-[11px] uppercase tracking-widest text-emerald-accent hover:underline"
        >
          Clear all filters
        </Link>
      ) : null}
    </aside>
  );
}

export default FilterSidebar;
