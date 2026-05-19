"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowLeft,
  LuArrowRight,
  LuMinus,
  LuPlus,
  LuShieldCheck,
  LuTruck,
} from "react-icons/lu";
import NavBar from "../../_components/NavBar";
import Footer from "../../_components/Footer";
import { formatPrice } from "../../_lib/format";
import { MOCK_CART, TAX_RATE, type CartItem } from "../../_lib/cart";

/**
 * Cart — CSR, auth-gated real-time state (CLAUDE.md).
 *
 * Seeded from the mock cart. Quantity and removal mutate local state; the
 * live version persists each change via `apiFetch` (PUT/DELETE `/cart`).
 */
export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART.items);

  function setQuantity(id: number, next: number) {
    if (next < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: next, subtotal: item.price * next }
          : item,
      ),
    );
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  // Totals are derived during render — no effect, no duplicate state.
  const { subtotal, tax, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.subtotal, 0);
    const estimatedTax = Math.round(sub * TAX_RATE);
    return { subtotal: sub, tax: estimatedTax, total: sub + estimatedTax };
  }, [items]);

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        <header className="mb-12">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-primary sm:text-6xl">
            Cart
          </h1>
          <p className="mt-3 font-body text-sm text-secondary">
            Curated selections awaiting their place in your architectural
            landscape.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="flex min-h-96 flex-col items-center justify-center gap-4 bg-surface-container-low text-center">
            <h2 className="font-headline text-2xl font-semibold text-primary">
              Your collection is empty
            </h2>
            <p className="max-w-sm font-body text-sm text-secondary">
              Curate your space with objects that define your architectural
              vision.
            </p>
            <Link
              href="/products"
              className="mt-2 inline-flex items-center gap-2 bg-primary px-8 py-4 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
            >
              Explore Atelier
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Line items */}
            <div className="lg:col-span-8">
              <ul className="divide-y divide-outline-variant/30 border-y border-outline-variant/30">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-6 py-8 md:flex-row md:items-center"
                  >
                    <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-surface-container-low md:h-32 md:w-24">
                      <Image
                        src={item.product.image}
                        alt={item.product.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 96px"
                        className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="md:w-2/5">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-headline text-lg font-semibold text-primary transition-opacity hover:opacity-70"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 font-label text-[11px] uppercase tracking-widest text-secondary">
                          {item.product.series} / {item.product.material}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-3 font-label text-[10px] font-bold uppercase tracking-widest text-error transition-opacity hover:opacity-70"
                        >
                          Remove
                        </button>
                      </div>

                      <p className="font-body text-sm text-secondary md:w-1/5">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity stepper */}
                      <div className="flex w-fit items-center gap-4 rounded-full border border-outline-variant/30 px-3 py-2 md:w-1/5">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          className="text-on-surface transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <LuMinus className="text-sm" />
                        </button>
                        <span className="min-w-4 text-center font-label text-sm font-bold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                          className="text-on-surface transition-opacity hover:opacity-70"
                        >
                          <LuPlus className="text-sm" />
                        </button>
                      </div>

                      <p className="font-headline text-base font-bold text-primary md:w-1/5 md:text-right">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
              >
                <LuArrowLeft className="text-base" />
                Back to Atelier
              </Link>
            </div>

            {/* Order summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div className="space-y-6 bg-surface-container-low p-8">
                  <h2 className="font-headline text-xl font-bold text-primary">
                    Summary
                  </h2>

                  <dl className="space-y-4 font-body text-sm">
                    <div className="flex justify-between">
                      <dt className="text-secondary">Subtotal</dt>
                      <dd className="text-primary">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-secondary">Shipping</dt>
                      <dd>
                        <span className="rounded-sm bg-emerald-accent/10 px-2 py-0.5 font-label text-[10px] font-bold uppercase tracking-wider text-emerald-accent">
                          Complimentary
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-secondary">Tax Estimation</dt>
                      <dd className="text-primary">{formatPrice(tax)}</dd>
                    </div>
                  </dl>

                  <div className="flex items-baseline justify-between border-t border-outline-variant/30 pt-6">
                    <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
                      Total Amount
                    </span>
                    <span className="font-headline text-3xl font-light tracking-tight text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98]"
                  >
                    Proceed to Checkout
                    <LuArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                  </Link>

                  <ul className="space-y-3 pt-2">
                    <li className="flex items-center gap-3 font-body text-xs text-secondary">
                      <LuShieldCheck className="text-base text-emerald-accent" />
                      Secure encrypted transaction
                    </li>
                    <li className="flex items-center gap-3 font-body text-xs text-secondary">
                      <LuTruck className="text-base text-emerald-accent" />
                      Insured express delivery
                    </li>
                  </ul>
                </div>

                {/* Promo code */}
                <div className="space-y-3 bg-surface-container-low p-8">
                  <label
                    htmlFor="promo"
                    className="font-label text-[11px] font-bold uppercase tracking-widest text-primary"
                  >
                    Promo Code
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="promo"
                      name="promo"
                      type="text"
                      placeholder="ENTER CODE"
                      className="flex-1 border border-outline-variant/30 bg-surface px-4 py-3 font-label text-[11px] uppercase tracking-widest text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      className="bg-primary px-6 py-3 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
