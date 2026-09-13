import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";

/**
 * Product data layer — backed by the Laravel API.
 * The API returns camelCase fields directly, so no normalization layer
 * is needed here (see the API standardization notes in api.ts).
 */

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type ProductBrand = {
  id: number;
  name: string;
  slug: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: number;
  sku: string;
  slug: string;
  name: string;
  series: string;
  material: string;
  shortDescription: string | null;
  description: string | null;
  price: number;
  discountPrice: number | null;
  discountPercentage: number;
  finalPrice: number;
  image: string;
  alt: string;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  stockStatus: string;
  inStock: boolean;
  releasedAt: string;
  badge: string | null;
  atelierNote: string | null;
  specs: ProductSpec[] | null;
  gallery: GalleryImage[] | null;
  relatedSlugs: string[] | null;
  category: ProductCategory;
  brand: ProductBrand;
};

export type SortOption = "new" | "price-asc" | "price-desc";

export type ProductFilters = {
  category?: string;
  brand?: string;
  material?: string;
  inStockOnly?: boolean;
  sort?: SortOption;
  page?: number;
};

export const CATEGORY_FACETS: { value: string; label: string }[] = [
  { value: "living-room", label: "Living Room" },
  { value: "workspace", label: "Workspace" },
  { value: "outdoor", label: "Outdoor" },
  { value: "objects", label: "Objects" },
];

export const MATERIAL_FACETS = [
  "Raw Concrete",
  "Brushed Steel",
  "Travertine",
  "Smoked Oak",
] as const;

export const SORT_LABELS: Record<SortOption, string> = {
  new: "New Arrivals",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

/**
 * NOTE: the backend does not support filter/sort/pagination query params
 * yet on `/products` — this fetches the full first page and filters/sorts
 * client-side until that's added server-side.
 */
const fetchAllProducts = cache(async (): Promise<Product[]> => {
  const res = await apiFetch<Paginated<Product>>("/products", {
    next: { revalidate: 300 },
  });
  return res.data;
});

export const getProducts = cache(
  async (filters: ProductFilters = {}): Promise<Product[]> => {
    let result = await fetchAllProducts();

    if (filters.category) {
      result = result.filter((p) => p.category.slug === filters.category);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand.slug === filters.brand);
    }
    if (filters.material) {
      result = result.filter((p) => p.material === filters.material);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    result = result.slice();
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
    }

    return result;
  },
);

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    try {
      const res = await apiFetch<Resource<Product>>(`/products/${slug}`, {
        next: { revalidate: 300 },
      });
      return res.data;
    } catch {
      return null;
    }
  },
);

export const getRelatedProducts = cache(
  async (slug: string): Promise<Product[]> => {
    const product = await getProductBySlug(slug);
    if (!product?.relatedSlugs?.length) return [];

    const results = await Promise.all(
      product.relatedSlugs.map((s) => getProductBySlug(s)),
    );
    return results.filter((p): p is Product => p !== null);
  },
);

export const getAllProductSlugs = cache(async (): Promise<string[]> => {
  const products = await fetchAllProducts();
  return products.map((p) => p.slug);
});
