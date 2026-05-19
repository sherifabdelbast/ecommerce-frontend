import { cache } from "react";
import { getProducts, type Product } from "./products";

/**
 * Category data layer.
 *
 * Currently backed by an in-module mock index. When the Laravel API is ready,
 * swap the bodies of `getCategories` / `getCategoryBySlug` for `apiFetch`
 * calls to `/categories` and `/categories/{slug}` — the exported `Category`
 * type mirrors the API model (`id`, `name`, `slug`, `description`,
 * `parentId`, `imageUrl`, `icon`, `status`), so the swap stays local here.
 */

export type CategoryStatus = "active" | "inactive";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number | null;
  imageUrl: string;
  icon: string | null;
  status: CategoryStatus;
  /** Editorial copy shown in the category hero. */
  index: string;
  meta: string;
  /** Curated catalogue — product slugs belonging to this category. */
  productSlugs: string[];
};

const CATEGORIES: readonly Category[] = [
  {
    id: 1,
    name: "Objects",
    slug: "objects",
    description:
      "Essential elements for the modern interior — sculptural furniture and lighting that prioritise geometric purity.",
    parentId: null,
    imageUrl: "/images/categories/objects.png",
    icon: null,
    status: "active",
    index: "01",
    meta: "Sculptural Elements",
    productSlugs: ["monolith-chair", "cemento-lamp", "pillar-pedestal"],
  },
  {
    id: 2,
    name: "Atelier",
    slug: "atelier",
    description:
      "Limited editions and handcrafted masterworks — a celebration of material honesty and artisan dedication.",
    parentId: null,
    imageUrl: "/images/categories/atelier.png",
    icon: null,
    status: "active",
    index: "02",
    meta: "Artisan Works",
    productSlugs: ["slat-screen", "vestige-table"],
  },
  {
    id: 3,
    name: "Collections",
    slug: "collections",
    description:
      "Thematic curations and seasonal narratives — each collection a story of spatial harmony and evolved living.",
    parentId: null,
    imageUrl: "/images/categories/collections.png",
    icon: null,
    status: "active",
    index: "03",
    meta: "Thematic Series",
    productSlugs: ["vestige-table", "grid-storage", "monolith-chair"],
  },
  {
    id: 4,
    name: "Archives",
    slug: "archives",
    description:
      "A retrospective of foundational pieces and rare finds — access to our library of design history.",
    parentId: null,
    imageUrl: "/images/categories/archives.png",
    icon: null,
    status: "active",
    index: "04",
    meta: "Legacy",
    productSlugs: ["pillar-pedestal", "grid-storage"],
  },
];

/** Index query. `cache()` dedups within a single server render. */
export const getCategories = cache(async (): Promise<Category[]> => {
  return CATEGORIES.slice();
});

/** Detail query — `cache()`-wrapped so metadata + page share one lookup. */
export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    return CATEGORIES.find((c) => c.slug === slug) ?? null;
  },
);

/**
 * Products curated into a category, preserving the listed order.
 * Returns an empty array for an unknown slug.
 */
export const getCategoryProducts = cache(
  async (slug: string): Promise<Product[]> => {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];

    const bySlug = new Map(
      (await getProducts()).map((p) => [p.slug, p]),
    );
    return category.productSlugs
      .map((s) => bySlug.get(s))
      .filter((p): p is Product => p !== undefined);
  },
);

/** All slugs — used by `generateStaticParams` for the detail route. */
export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}
