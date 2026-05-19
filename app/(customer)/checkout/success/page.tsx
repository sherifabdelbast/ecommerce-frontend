"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCheck, LuCreditCard, LuPrinter } from "react-icons/lu";
import NavBar from "../../../_components/NavBar";
import Footer from "../../../_components/Footer";
import { formatPrice } from "../../../_lib/format";
import { MOCK_CART, TAX_RATE } from "../../../_lib/cart";

/**
 * Checkout success — CSR, auth-gated (CLAUDE.md). Order-confirmation view.
 *
 * Order details are mocked. The live version reads the order returned by
 * POST /v1/orders (or GET /v1/orders/{order}) for the just-placed order.
 */
const ORDER_NUMBER = "ARC-20948331";
const SHIPPING_COST = 45;

export default function CheckoutSuccessPage() {
  const items = MOCK_CART.items;
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING_COST + tax;

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        {/* Success header */}
        <header className="mb-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-accent/10 px-4 py-1.5 font-label text-[11px] font-bold uppercase tracking-wider text-emerald-accent">
              <LuCheck className="text-sm" />
              Order Confirmed
            </span>
            <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
              #{ORDER_NUMBER}
            </span>
          </div>
          <h1 className="font-headline text-[3.5rem] font-light leading-none tracking-tighter text-primary md:text-[5rem]">
            Thank You
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-secondary">
            Your acquisition has been processed. We are preparing your pieces
            for their new environment with the utmost care.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left — items + delivery */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-6 bg-surface-container-lowest p-8 shadow-ambient">
              <h2 className="font-label text-[11px] font-bold uppercase tracking-widest text-secondary">
                Acquired Pieces
              </h2>
              <ul className="divide-y divide-outline-variant/20">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-6 py-5 first:pt-0 last:pb-0">
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-surface-container-low">
                      <Image
                        src={item.product.image}
                        alt={item.product.alt}
                        fill
                        sizes="96px"
                        className="object-cover grayscale"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="font-headline text-lg font-semibold text-primary">
                        {item.product.name}
                      </p>
                      <p className="mt-1 font-body text-sm text-secondary">
                        {item.product.material} · Qty {item.quantity}
                      </p>
                      <p className="mt-2 font-headline text-sm font-bold text-primary">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-outline-variant/20 pt-5 font-body text-xs text-secondary">
                <LuCheck className="text-base text-emerald-accent" />
                Verified Authenticity
              </div>
            </div>

            {/* Delivery status */}
            <div className="flex flex-col gap-6 bg-primary-container p-8 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="block font-label text-[10px] uppercase tracking-widest text-white/50">
                  Estimated Delivery
                </span>
                <span className="mt-1 block font-headline text-lg font-semibold">
                  October 14 — 18, 2026
                </span>
              </div>
              <div className="hidden h-10 w-px bg-white/15 sm:block" />
              <div>
                <span className="block font-label text-[10px] uppercase tracking-widest text-white/50">
                  Carrier
                </span>
                <span className="mt-1 block font-headline text-lg font-semibold">
                  Global Curated Logistics
                </span>
              </div>
            </div>
          </div>

          {/* Right — details + totals */}
          <aside className="space-y-8 lg:col-span-5">
            <div className="space-y-6 bg-surface-container-low p-8">
              <div>
                <h3 className="mb-3 font-label text-[11px] font-bold uppercase tracking-widest text-secondary">
                  Shipping Destination
                </h3>
                <address className="font-body text-sm not-italic leading-relaxed text-on-surface">
                  <span className="font-semibold text-primary">
                    Julian Abernathy
                  </span>
                  <br />
                  1248 Highcrest Avenue
                  <br />
                  Floor 4, Suite 201
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </address>
              </div>
              <div className="border-t border-outline-variant/30 pt-6">
                <h3 className="mb-3 font-label text-[11px] font-bold uppercase tracking-widest text-secondary">
                  Payment Method
                </h3>
                <p className="flex items-center gap-3 font-body text-sm text-on-surface">
                  <LuCreditCard className="text-base text-secondary" />
                  Visa ending in •••• 9012
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-surface-container-lowest p-8 shadow-ambient">
              <dl className="space-y-4 font-body text-sm">
                <div className="flex justify-between">
                  <dt className="text-secondary">Subtotal</dt>
                  <dd className="text-primary">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Shipping (Premium Insured)</dt>
                  <dd className="text-primary">{formatPrice(SHIPPING_COST)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Estimated Tax</dt>
                  <dd className="text-primary">{formatPrice(tax)}</dd>
                </div>
              </dl>
              <div className="flex items-baseline justify-between border-t border-outline-variant/30 pt-4">
                <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
                  Total
                </span>
                <span className="font-headline text-2xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/products"
                className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98]"
              >
                Continue Browsing
                <LuArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-outline-variant/30 py-5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
              >
                <LuPrinter className="text-base" />
                Print Receipt
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
