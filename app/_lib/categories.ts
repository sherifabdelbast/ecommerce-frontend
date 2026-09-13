import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";
import { getProducts, type Product } from "./products";

/**
 * Category data layer — backed by the Laravel API.
 */

export type CategoryStatus = "active" | "inactive";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parentId: number | null;
  imageUrl: string | null;
  icon: string | null;
  status: CategoryStatus;
  level: number;
  sortOrder: number;
  displayIndex: string | null;
  meta: string | null;
  productsCount: number;
};

const fetchAllCategories = cache(async (): Promise<Category[]> => {
  const res = await apiFetch<Paginated<Category>>("/categories?per_page=50", {
    cache: "no-store",
  });
  return res.data;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  return fetchAllCategories();
});

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    try {
      const res = await apiFetch<Resource<Category>>(`/categories/${slug}`, {
        cache: "no-store",
      });
      return res.data;
    } catch {
      return null;
    }
  },
);

/**
 * Products belonging to a category — filters the live catalogue by the
 * category's slug rather than a curated list, since every product already
 * carries its real category relationship from the API.
 */
export const getCategoryProducts = cache(
  async (slug: string): Promise<Product[]> => {
    return getProducts({ category: slug });
  },
);

export const getAllCategorySlugs = cache(async (): Promise<string[]> => {
  const categories = await fetchAllCategories();
  return categories.map((c) => c.slug);
});
