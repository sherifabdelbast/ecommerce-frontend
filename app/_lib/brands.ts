import { cache } from "react";
import { getProducts, type Product } from "./products";

/**
 * Brand data layer.
 *
 * Currently backed by an in-module mock index. When the Laravel API is ready,
 * swap the bodies of `getBrands` / `getBrandBySlug` for `apiFetch` calls to
 * `/brands` and `/brands/{slug}` — the exported `Brand` type mirrors the API
 * model (`id`, `name`, `slug`, `description`, `logoUrl`, `website`,
 * `sortOrder`, `status`), so the swap stays local here.
 */

export type BrandStatus = "active" | "inactive";

export type Brand = {
  id: number;
  name: string;
  slug: string;
  description: string;
  logoUrl: string | null;
  website: string | null;
  sortOrder: number;
  status: BrandStatus;
  /** Editorial copy shown in the brand hero. */
  founded: string;
  discipline: string;
  /** Curated catalogue — product slugs made by this brand. */
  productSlugs: string[];
};

const BRANDS: readonly Brand[] = [
  {
    id: 1,
    name: "Atelier Vauban",
    slug: "atelier-vauban",
    description:
      "A Paris workshop casting raw concrete into furniture that holds light rather than reflects it. Every piece is poured once and refined by hand.",
    logoUrl: null,
    website: "https://example.com/atelier-vauban",
    sortOrder: 1,
    status: "active",
    founded: "Est. 2009",
    discipline: "Cast Concrete",
    productSlugs: ["monolith-chair", "cemento-lamp"],
  },
  {
    id: 2,
    name: "Forge Nord",
    slug: "forge-nord",
    description:
      "A Copenhagen metalworks treating storage as architecture — brushed steel grids and screens built on the discipline of the horizontal line.",
    logoUrl: null,
    website: "https://example.com/forge-nord",
    sortOrder: 2,
    status: "active",
    founded: "Est. 2014",
    discipline: "Brushed Steel",
    productSlugs: ["grid-storage", "slat-screen"],
  },
  {
    id: 3,
    name: "Studio Monolith",
    slug: "studio-monolith",
    description:
      "A stone studio working travertine and Nero Marquina marble — mass and lightness held in quiet equilibrium across tables and pedestals.",
    logoUrl: null,
    website: "https://example.com/studio-monolith",
    sortOrder: 3,
    status: "active",
    founded: "Est. 2006",
    discipline: "Natural Stone",
    productSlugs: ["vestige-table", "pillar-pedestal"],
  },
];

/** Index query. `cache()` dedups within a single server render. */
export const getBrands = cache(async (): Promise<Brand[]> => {
  return BRANDS.slice();
});

/** Detail query — `cache()`-wrapped so metadata + page share one lookup. */
export const getBrandBySlug = cache(
  async (slug: string): Promise<Brand | null> => {
    return BRANDS.find((b) => b.slug === slug) ?? null;
  },
);

/**
 * Products made by a brand, preserving the listed order.
 * Returns an empty array for an unknown slug.
 */
export const getBrandProducts = cache(
  async (slug: string): Promise<Product[]> => {
    // Brand lookup and the catalogue are independent — fetch in parallel.
    const [brand, products] = await Promise.all([
      getBrandBySlug(slug),
      getProducts(),
    ]);
    if (!brand) return [];

    const bySlug = new Map(products.map((p) => [p.slug, p]));
    return brand.productSlugs
      .map((s) => bySlug.get(s))
      .filter((p): p is Product => p !== undefined);
  },
);

/** All slugs — used by `generateStaticParams` for the detail route. */
export function getAllBrandSlugs(): string[] {
  return BRANDS.map((b) => b.slug);
}
