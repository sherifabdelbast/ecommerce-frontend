import { Suspense } from "react";
import type { Metadata } from "next";
import NavBar from "../../_components/NavBar";
import Footer from "../../_components/Footer";
import ProductCard from "../../_components/ProductCard";
import FilterSidebar from "../../_components/FilterSidebar";
import SortSelect from "../../_components/SortSelect";
import {
  getProducts,
  CATEGORY_FACETS,
  MATERIAL_FACETS,
  SORT_LABELS,
  type ProductCategory,
  type ProductFilters,
  type SortOption,
} from "../../_lib/products";

const CATALOG_DESCRIPTION =
  "The full ARCHITECT catalogue — architectural objects in concrete, steel, stone and oak.";

// SSR: filters and sort live in the URL, so the listing must render per
// request for correct SEO on filtered views (DESIGN.md / CLAUDE.md).
export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

/** Collapse a possibly-repeated query param to its first value. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Parse raw search params into a validated filter object. */
function parseFilters(params: SearchParams): ProductFilters {
  const category = first(params.category);
  const material = first(params.material);
  const sort = first(params.sort);

  const isCategory = CATEGORY_FACETS.some((f) => f.value === category);
  const isMaterial = (MATERIAL_FACETS as readonly string[]).includes(
    material ?? "",
  );
  const isSort = sort !== undefined && sort in SORT_LABELS;

  return {
    category: isCategory ? (category as ProductCategory) : undefined,
    material: isMaterial ? material : undefined,
    inStockOnly: first(params.in_stock) === "1",
    sort: isSort ? (sort as SortOption) : undefined,
  };
}

/** Per-filter SEO: a filtered view gets a title reflecting the facet. */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const filters = parseFilters(await searchParams);
  const facet =
    CATEGORY_FACETS.find((f) => f.value === filters.category)?.label ??
    filters.material;

  return {
    title: facet ? `${facet} | ARCHITECT` : "All Series | ARCHITECT",
    description: CATALOG_DESCRIPTION,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = parseFilters(await searchParams);

  // Filtered grid and the full catalogue (for facet counts) run in parallel.
  const [products, allProducts] = await Promise.all([
    getProducts(filters),
    getProducts(),
  ]);

  const categoryCounts = allProducts.reduce<Record<string, number>>(
    (counts, product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        {/* Breadcrumb + sort */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block font-label text-[11px] uppercase tracking-widest text-secondary">
              Catalog / Objects
            </span>
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-primary sm:text-[3.5rem] sm:leading-none">
              All Series
            </h1>
          </div>
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <FilterSidebar filters={filters} categoryCounts={categoryCounts} />

          <div className="flex-grow">
            {products.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-surface-container-low text-center">
                <p className="font-headline text-xl font-semibold text-primary">
                  No objects match these filters
                </p>
                <p className="font-body text-sm text-secondary">
                  Try clearing a filter to widen the selection.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      priority={index < 3}
                    />
                  ))}
                </div>

                {/* Pagination is a no-op until the API's meta.last_page is
                    wired in; the catalogue currently fits one page. */}
                <p className="mt-24 text-center font-label text-[11px] uppercase tracking-widest text-secondary">
                  {products.length}{" "}
                  {products.length === 1 ? "object" : "objects"} shown
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
