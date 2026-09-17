"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuX, LuPlus } from "react-icons/lu";
import { formatPrice } from "../../../_lib/format";
import {
  getWishlist,
  removeFromWishlist,
  type WishlistEntry,
} from "../../../_lib/wishlist";

/**
 * Wishlist — CSR, auth-gated (CLAUDE.md).
 *
 * Fetches the authenticated user's real wishlist on mount. Removal calls
 * DELETE /v1/wishlist/{id}; add-to-cart is wired once cart.ts is real.
 */
export default function WishlistPage() {
  const [items, setItems] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getWishlist();
        if (!cancelled) setItems(data);
      } catch {
        if (!cancelled) setError("Couldn't load your wishlist.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRemove(wishlistId: number) {
    const previous = items;
    setItems((current) => current.filter((entry) => entry.id !== wishlistId));
    try {
      await removeFromWishlist(wishlistId);
    } catch {
      setItems(previous);
    }
  }

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-16">
        <h1 className="font-headline text-4xl font-light tracking-tighter text-primary sm:text-5xl">
          The Objects
        </h1>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-secondary">
          A curated collection of your personal interests. Each piece is held in
          your archival space until you are ready for acquisition.
        </p>
      </header>

      {loading ? (
        <p className="font-body text-sm text-secondary">
          Loading your archive…
        </p>
      ) : error ? (
        <p className="font-body text-sm text-error">{error}</p>
      ) : items.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-surface-container-low text-center">
          <p className="font-headline text-xl font-semibold text-primary">
            Your archive is empty
          </p>
          <Link
            href="/products"
            className="font-label text-[11px] uppercase tracking-widest text-primary underline-offset-4 hover:underline"
          >
            Discover objects
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ id, product }) => (
            <article key={id} className="group">
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-[3/4] overflow-hidden bg-surface-container-high"
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </Link>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-headline text-lg font-semibold uppercase tracking-tight text-primary">
                    {product.name}
                  </h2>
                  <p className="mt-1 font-body text-sm text-secondary">
                    {product.category.name}
                  </p>
                </div>
                <span className="shrink-0 rounded-sm bg-tertiary-fixed-dim px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-on-tertiary-fixed">
                  {formatPrice(product.finalPrice)}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary py-3 font-label text-[10px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
                >
                  <LuPlus className="text-sm" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="flex items-center justify-center gap-1.5 rounded-sm border border-outline-variant/30 px-3 py-3 font-label text-[10px] font-bold uppercase tracking-widest text-secondary transition-colors hover:border-error hover:text-error"
                >
                  <LuX className="text-sm" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
