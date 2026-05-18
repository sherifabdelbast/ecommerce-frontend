import { cache } from "react";

/**
 * Product data layer.
 *
 * Currently backed by an in-module mock catalog. When the Laravel API is
 * ready, swap the bodies of `getProducts` / `getProductBySlug` for `apiFetch`
 * calls — the exported types and signatures are the contract the pages depend
 * on, so the swap stays local to this file.
 */

export type ProductCategory = "living-room" | "workspace" | "outdoor" | "objects";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  series: string;
  material: string;
  /** Whole-dollar amount. */
  price: number;
  category: ProductCategory;
  image: string;
  alt: string;
  inStock: boolean;
  /** ISO date — drives "New Arrivals" sort. */
  releasedAt: string;
  badge?: string;
  /** Detail-page fields (optional — listing cards never read these). */
  description?: string;
  gallery?: GalleryImage[];
  specs?: ProductSpec[];
  atelierNote?: string;
  relatedSlugs?: string[];
};

const CATALOG: readonly Product[] = [
  {
    slug: "monolith-chair",
    name: "Monolith Chair",
    series: "Series 01",
    material: "Raw Concrete",
    price: 1850,
    category: "living-room",
    image: "/images/products/monolith-chair.png",
    alt: "White concrete U-shaped monolith chair in a minimalist studio",
    inStock: true,
    releasedAt: "2026-04-02",
    badge: "Limited Edition",
    description:
      "A physical dialogue between industrial gravity and architectural grace. Cast in a single pour, hand-refined to a singular geometric tension.",
    gallery: [
      {
        src: "/images/product-detail/monolith-tower.png",
        alt: "Monolith Chair full silhouette against an alpine backdrop",
      },
      {
        src: "/images/product-detail/monolith-frame-detail.png",
        alt: "Detail of the chair's structural oak frame joinery",
      },
      {
        src: "/images/product-detail/monolith-texture-detail.png",
        alt: "Close texture study of the cast concrete surface",
      },
    ],
    specs: [
      { label: "Dimensions", value: "78cm H × 64cm W × 60cm D" },
      { label: "Mass", value: "92kg / 203lbs" },
      { label: "Composition", value: "Reinforced concrete, acid-washed finish." },
    ],
    atelierNote:
      "We left the surface slightly porous to absorb light rather than reflect it, creating a deep, grounded presence.",
    relatedSlugs: ["cemento-lamp", "pillar-pedestal", "slat-screen"],
  },
  {
    slug: "cemento-lamp",
    name: "Cemento Lamp",
    series: "Series 02",
    material: "Cast Grey",
    price: 420,
    category: "workspace",
    image: "/images/products/cemento-lamp.png",
    alt: "Architectural concrete desk lamp with a warm glow",
    inStock: true,
    releasedAt: "2026-03-18",
    description:
      "A task lamp distilled to its structural essentials — a cast concrete base anchoring a single curved arm.",
    gallery: [
      {
        src: "/images/products/cemento-lamp.png",
        alt: "Cemento Lamp lit on a wooden desk",
      },
    ],
    specs: [
      { label: "Dimensions", value: "44cm H × 18cm W × 24cm D" },
      { label: "Mass", value: "3.1kg / 6.8lbs" },
      { label: "Composition", value: "Cast grey concrete, brushed-steel arm." },
    ],
    relatedSlugs: ["monolith-chair", "pillar-pedestal", "grid-storage"],
  },
  {
    slug: "vestige-table",
    name: "Vestige Table",
    series: "Series 03",
    material: "Travertine",
    price: 3200,
    category: "living-room",
    image: "/images/products/vestige-table.png",
    alt: "Geometric dining table with a travertine pedestal base",
    inStock: true,
    releasedAt: "2026-05-01",
    badge: "Limited",
    description:
      "A single travertine plane balanced on a monolithic pedestal — mass and lightness held in quiet equilibrium.",
    gallery: [
      {
        src: "/images/products/vestige-table.png",
        alt: "Vestige Table viewed at an angle",
      },
    ],
    specs: [
      { label: "Dimensions", value: "74cm H × 200cm W × 95cm D" },
      { label: "Mass", value: "180kg / 397lbs" },
      { label: "Composition", value: "Solid travertine, honed matte finish." },
    ],
    relatedSlugs: ["monolith-chair", "slat-screen", "pillar-pedestal"],
  },
  {
    slug: "grid-storage",
    name: "Grid Storage",
    series: "Atelier",
    material: "Brushed Steel",
    price: 1150,
    category: "workspace",
    image: "/images/products/grid-storage.png",
    alt: "Modular brushed-steel grid shelving unit",
    inStock: true,
    releasedAt: "2026-02-10",
    description:
      "An open steel grid system that treats storage as architecture — every shelf a deliberate horizontal line.",
    gallery: [
      {
        src: "/images/products/grid-storage.png",
        alt: "Grid Storage unit against a grey wall",
      },
      {
        src: "/images/product-detail/grid-storage-setting.png",
        alt: "Grid Storage in a warehouse interior setting",
      },
    ],
    specs: [
      { label: "Dimensions", value: "210cm H × 160cm W × 40cm D" },
      { label: "Mass", value: "64kg / 141lbs" },
      { label: "Composition", value: "Brushed steel, powder-coated joints." },
    ],
    relatedSlugs: ["cemento-lamp", "pillar-pedestal", "monolith-chair"],
  },
  {
    slug: "pillar-pedestal",
    name: "Pillar Pedestal",
    series: "Archives",
    material: "Nero Marquina",
    price: 890,
    category: "objects",
    image: "/images/products/pillar-pedestal.png",
    alt: "Black marble display pedestal with gold veining",
    inStock: false,
    releasedAt: "2026-01-22",
    description:
      "A display plinth cut from Nero Marquina marble — a dark stage built to elevate a single object.",
    gallery: [
      {
        src: "/images/products/pillar-pedestal.png",
        alt: "Pillar Pedestal against a dark backdrop",
      },
    ],
    specs: [
      { label: "Dimensions", value: "100cm H × 40cm W × 40cm D" },
      { label: "Mass", value: "120kg / 265lbs" },
      { label: "Composition", value: "Nero Marquina marble, polished." },
    ],
    relatedSlugs: ["monolith-chair", "vestige-table", "cemento-lamp"],
  },
  {
    slug: "slat-screen",
    name: "Slat Screen",
    series: "Series 04",
    material: "Smoked Oak",
    price: 2400,
    category: "living-room",
    image: "/images/products/slat-screen.png",
    alt: "Architectural smoked-oak folding room divider screen",
    inStock: true,
    releasedAt: "2026-04-20",
    description:
      "A folding screen of vertical smoked-oak slats — a room divider that filters light rather than blocking it.",
    gallery: [
      {
        src: "/images/products/slat-screen.png",
        alt: "Slat Screen folding divider",
      },
    ],
    specs: [
      { label: "Dimensions", value: "180cm H × 200cm W (open)" },
      { label: "Mass", value: "28kg / 62lbs" },
      { label: "Composition", value: "Smoked oak slats, brass hinges." },
    ],
    relatedSlugs: ["vestige-table", "monolith-chair", "grid-storage"],
  },
];

export type SortOption = "new" | "price-asc" | "price-desc";

export type ProductFilters = {
  category?: ProductCategory;
  material?: string;
  inStockOnly?: boolean;
  sort?: SortOption;
};

/** Facet definitions — single source of truth for the filter sidebar. */
export const CATEGORY_FACETS: { value: ProductCategory; label: string }[] = [
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
 * Listing query. `cache()` dedups the call within a single server render so
 * the page and any sibling component can both ask without a double fetch.
 */
export const getProducts = cache(
  async (filters: ProductFilters = {}): Promise<Product[]> => {
    let result = CATALOG.slice();

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.material) {
      result = result.filter((p) => p.material === filters.material);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

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

/** Detail query. `cache()`-wrapped so metadata + page share one lookup. */
export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    return CATALOG.find((p) => p.slug === slug) ?? null;
  },
);

/** Resolve a product's related items, preserving the curated order. */
export const getRelatedProducts = cache(
  async (slug: string): Promise<Product[]> => {
    const product = await getProductBySlug(slug);
    if (!product?.relatedSlugs) return [];

    const bySlug = new Map(CATALOG.map((p) => [p.slug, p]));
    return product.relatedSlugs
      .map((s) => bySlug.get(s))
      .filter((p): p is Product => p !== undefined);
  },
);

/** All slugs — used by `generateStaticParams` for the detail route. */
export function getAllProductSlugs(): string[] {
  return CATALOG.map((p) => p.slug);
}
