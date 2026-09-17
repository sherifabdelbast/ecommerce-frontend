import { apiFetch, Resource } from "./api";
import type { Product } from "./products";

/**
 * Wishlist data layer — backed by the Laravel API.
 *
 * `/wishlist` requires auth:sanctum, so these are called client-side
 * (browser sends the session cookie automatically), same pattern as
 * auth-context.tsx — not wrapped in React's server `cache()`.
 */

export type WishlistEntry = {
  id: number;
  product: Product;
  addedAt: string | null;
};

export async function getWishlist(): Promise<WishlistEntry[]> {
  const res = await apiFetch<Resource<WishlistEntry[]>>("/wishlist");
  return res.data;
}

export async function addToWishlist(productId: number): Promise<WishlistEntry> {
  const res = await apiFetch<Resource<WishlistEntry>>("/wishlist", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
  return res.data;
}

export async function removeFromWishlist(wishlistId: number): Promise<void> {
  await apiFetch(`/wishlist/${wishlistId}`, { method: "DELETE" });
}

export async function isInWishlist(productId: number): Promise<boolean> {
  const res = await apiFetch<Resource<{ isInWishlist: boolean }>>(
    `/wishlist/check/${productId}`,
  );
  return res.data.isInWishlist;
}
