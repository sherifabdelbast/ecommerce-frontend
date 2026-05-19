/**
 * Wishlist data layer.
 *
 * Currently a static mock. The live version reads GET /v1/wishlist (an
 * authenticated endpoint) and removes via DELETE /v1/wishlist/{id}. The
 * `WishlistItem` type mirrors the intended API shape so the swap stays local.
 */

export type WishlistItem = {
  id: number;
  /** Product slug — links to the detail page. */
  slug: string;
  name: string;
  /** Editorial category line. */
  attribute: string;
  price: number;
  image: string;
  alt: string;
};

/** Mock wishlist — replace with the authenticated `/wishlist` fetch. */
export const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: 1,
    slug: "monolith-chair",
    name: "Monolith Chair",
    attribute: "Sculptural Form",
    price: 1850,
    image: "/images/products/monolith-chair.png",
    alt: "White concrete U-shaped monolith chair",
  },
  {
    id: 2,
    slug: "slat-screen",
    name: "Slat Screen",
    attribute: "Wall Architecture",
    price: 2400,
    image: "/images/products/slat-screen.png",
    alt: "Architectural smoked-oak folding room divider screen",
  },
  {
    id: 3,
    slug: "cemento-lamp",
    name: "Cemento Lamp",
    attribute: "Light Sculpture",
    price: 420,
    image: "/images/products/cemento-lamp.png",
    alt: "Architectural concrete desk lamp",
  },
  {
    id: 4,
    slug: "pillar-pedestal",
    name: "Pillar Pedestal",
    attribute: "Decorative Art",
    price: 890,
    image: "/images/products/pillar-pedestal.png",
    alt: "Black marble display pedestal with gold veining",
  },
  {
    id: 5,
    slug: "grid-storage",
    name: "Grid Storage",
    attribute: "Modular System",
    price: 1150,
    image: "/images/products/grid-storage.png",
    alt: "Modular brushed-steel grid shelving unit",
  },
];
