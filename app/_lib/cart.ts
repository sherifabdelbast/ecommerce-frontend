/**
 * Cart data layer.
 *
 * Currently a static mock. The cart is an authenticated, real-time resource
 * (CLAUDE.md → CSR), so the live version calls the API from the client:
 *
 *   apiFetch<{ data: ApiCart }>("/cart", { token })
 *
 * The `Cart` / `CartItem` types mirror the API response
 * (`{ items: [{ id, quantity, price, subtotal, product }], subtotal,
 * item_count }`) so the swap stays local to this file and the cart page.
 */

export type CartProduct = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  /** Editorial attribute line, e.g. "Series 01 / Raw Concrete". */
  series: string;
  material: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  /** Unit price, whole dollars. */
  price: number;
  /** Line total — `price * quantity`. */
  subtotal: number;
  product: CartProduct;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
};

/** Mock cart — replace with the authenticated `/cart` fetch. */
export const MOCK_CART: Cart = {
  items: [
    {
      id: 1,
      quantity: 1,
      price: 1850,
      subtotal: 1850,
      product: {
        slug: "monolith-chair",
        name: "Monolith Chair",
        image: "/images/products/monolith-chair.png",
        alt: "White concrete U-shaped monolith chair in a minimalist studio",
        series: "Series 01",
        material: "Raw Concrete",
      },
    },
    {
      id: 2,
      quantity: 1,
      price: 3200,
      subtotal: 3200,
      product: {
        slug: "vestige-table",
        name: "Vestige Table",
        image: "/images/products/vestige-table.png",
        alt: "Geometric dining table with a travertine pedestal base",
        series: "Series 03",
        material: "Travertine",
      },
    },
  ],
  subtotal: 5050,
  itemCount: 2,
};

/** Frontend-side tax estimate until checkout returns the real figure. */
export const TAX_RATE = 0.06;
