"use client";

import Image from "next/image";
import Link from "next/link";
import { LuLock, LuWallet, LuCreditCard } from "react-icons/lu";
import NavBar from "../../_components/NavBar";
import Footer from "../../_components/Footer";
import { formatPrice } from "../../_lib/format";
import { MOCK_CART, TAX_RATE } from "../../_lib/cart";

/**
 * Checkout — CSR, auth-gated (CLAUDE.md). Single-page review-and-pay.
 *
 * Order summary is seeded from the mock cart. Submitting wires to
 * POST /v1/orders (address + shipping method) then POST /v1/payments.
 */
const FIELD_CLASS =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-4 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary";
const LABEL_CLASS =
  "mb-2 block font-label text-[11px] font-bold uppercase tracking-wider text-on-surface-variant";

export default function CheckoutPage() {
  // The mock cart is a module constant — totals are plain derived values.
  const items = MOCK_CART.items;
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form column */}
          <div className="lg:col-span-7">
            <header className="mb-12">
              <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-primary">
                Secure Checkout
              </h1>
              <p className="mt-3 font-label text-[11px] uppercase tracking-widest text-secondary">
                Final Review
              </p>
            </header>

            <form className="space-y-16">
              {/* Section 1 — shipping */}
              <section>
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-label text-xs font-bold text-on-primary">
                    1
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-primary">
                    Shipping Destination
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className={LABEL_CLASS}>
                      First Name
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      autoComplete="given-name"
                      placeholder="Alexander"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className={LABEL_CLASS}>
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      autoComplete="family-name"
                      placeholder="V."
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={LABEL_CLASS}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@studio.com"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className={LABEL_CLASS}>
                      Address Line
                    </label>
                    <input
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      placeholder="1245 Obsidian Plaza, Suite 400"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className={LABEL_CLASS}>
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      placeholder="New York"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="postal_code" className={LABEL_CLASS}>
                      Postal Code
                    </label>
                    <input
                      id="postal_code"
                      name="postal_code"
                      autoComplete="postal-code"
                      placeholder="10001"
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>
              </section>

              {/* Section 2 — payment */}
              <section>
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest font-label text-xs font-bold text-secondary">
                    2
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-primary">
                    Payment Method
                  </h2>
                </div>

                {/* Card visual */}
                <div className="relative overflow-hidden rounded-xl bg-primary-container p-8">
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20"
                    style={{
                      background:
                        "radial-gradient(circle, #6ffbbe 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative space-y-8">
                    <div>
                      <label htmlFor="card_number" className="mb-2 block font-label text-[10px] uppercase tracking-widest text-white/50">
                        Card Number
                      </label>
                      <input
                        id="card_number"
                        name="card_number"
                        inputMode="numeric"
                        placeholder="•••• •••• •••• 8842"
                        className="w-full border-none bg-transparent font-headline text-xl tracking-widest text-white placeholder:text-white/40 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between gap-8">
                      <div>
                        <span className="block font-label text-[10px] uppercase tracking-widest text-white/50">
                          Card Holder
                        </span>
                        <span className="font-body text-sm text-white">
                          ALEXANDER V.
                        </span>
                      </div>
                      <div>
                        <span className="block font-label text-[10px] uppercase tracking-widest text-white/50">
                          Expires
                        </span>
                        <span className="font-body text-sm text-white">
                          12 / 26
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 rounded-md border border-outline-variant/20 bg-surface-container-lowest px-4 py-4 transition-colors hover:bg-surface-container-high"
                  >
                    <LuWallet className="text-lg text-on-surface-variant" />
                    <span className="font-label text-[11px] font-semibold uppercase tracking-tight text-primary">
                      Digital Wallet
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 rounded-md border border-outline-variant/20 bg-surface-container-lowest px-4 py-4 transition-colors hover:bg-surface-container-high"
                  >
                    <LuCreditCard className="text-lg text-on-surface-variant" />
                    <span className="font-label text-[11px] font-semibold uppercase tracking-tight text-primary">
                      Alternative Card
                    </span>
                  </button>
                </div>
              </section>
            </form>
          </div>

          {/* Order summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-32 space-y-6 rounded-xl bg-surface-container-low p-8 lg:p-10">
              <h2 className="font-headline text-xl font-bold text-primary">
                Order Summary
              </h2>

              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-container">
                      <Image
                        src={item.product.image}
                        alt={item.product.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="font-headline text-sm font-semibold text-primary">
                        {item.product.name}
                      </p>
                      <p className="mt-1 font-label text-[10px] uppercase tracking-widest text-secondary">
                        {item.product.series} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="self-center font-body text-sm text-primary">
                      {formatPrice(item.subtotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 border-t border-outline-variant/30 pt-6 font-body text-sm">
                <div className="flex justify-between">
                  <dt className="text-secondary">Subtotal</dt>
                  <dd className="text-primary">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Shipping</dt>
                  <dd className="font-label text-[11px] font-bold uppercase tracking-wider text-emerald-accent">
                    Complimentary
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Estimated Tax</dt>
                  <dd className="text-primary">{formatPrice(tax)}</dd>
                </div>
              </dl>

              <div className="flex items-baseline justify-between border-t border-outline-variant/30 pt-6">
                <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
                  Total
                </span>
                <span className="font-headline text-3xl font-light tracking-tight text-primary">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout/success"
                className="flex w-full items-center justify-center rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98]"
              >
                Complete Purchase
              </Link>

              <p className="text-center font-body text-xs leading-relaxed text-secondary">
                By placing this order, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="flex items-center justify-center gap-2 rounded-md bg-emerald-accent/10 py-3">
                <LuLock className="text-sm text-emerald-accent" />
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-emerald-accent">
                  Encrypted SSL Transaction
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
