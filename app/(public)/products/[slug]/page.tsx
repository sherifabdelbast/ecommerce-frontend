import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LuArrowRight } from "react-icons/lu";
import NavBar from "../../../_components/NavBar";
import Footer from "../../../_components/Footer";
import ProductCard from "../../../_components/ProductCard";
import ProductGallery from "../../../_components/ProductGallery";
import { formatPrice } from "../../../_lib/format";
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProductSlugs,
} from "../../../_lib/products";

// ISR: product copy changes occasionally, SEO matters (CLAUDE.md).
export const revalidate = 600;

type RouteParams = { slug: string };

/** Pre-render every known product at build time. */
export function generateStaticParams(): RouteParams[] {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found | ARCHITECT" };

  return {
    title: `${product.name} | ARCHITECT`,
    description: product.description ?? `${product.name} — ${product.material}.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  // Product and its related items are independent reads — fetch in parallel.
  const [product, related] = await Promise.all([
    getProductBySlug(slug),
    getRelatedProducts(slug),
  ]);

  if (!product) notFound();

  const gallery = product.gallery ?? [
    { src: product.image, alt: product.alt },
  ];

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-2xl px-6 pb-32 pt-32 sm:px-8 lg:px-12">
        {/* Gallery + purchase panel */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProductGallery images={gallery} />
          </div>

          <div className="space-y-12 lg:col-span-5 lg:pl-8">
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                <span
                  className={`font-label text-[10px] font-bold uppercase tracking-widest ${
                    product.inStock ? "text-emerald-accent" : "text-error"
                  }`}
                >
                  {product.inStock ? "Available" : "Sold Out"}
                </span>
                <span className="h-px w-8 bg-outline-variant" />
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                  {product.series} / {product.material}
                </span>
              </div>

              <h1 className="font-headline text-5xl font-extrabold leading-[0.95] tracking-tighter text-primary sm:text-6xl">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-6 pt-2">
                <p className="font-headline text-3xl font-light tracking-tight text-primary">
                  {formatPrice(product.price)}
                </p>
                {product.badge ? (
                  <p className="font-label text-[11px] uppercase tracking-widest text-secondary">
                    {product.badge}
                  </p>
                ) : null}
              </div>
            </header>

            {product.description ? (
              <p className="max-w-lg font-body text-lg leading-relaxed text-secondary">
                {product.description}
              </p>
            ) : null}

            {product.specs && product.specs.length > 0 ? (
              <details className="group border-t border-outline-variant/20 pt-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-label text-[11px] font-bold uppercase tracking-widest text-primary">
                  Materials &amp; Specification
                  <LuArrowRight className="text-base transition-transform group-open:rotate-90" />
                </summary>
                <dl className="mt-6 space-y-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="font-label text-[10px] uppercase tracking-widest text-secondary">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 font-body text-sm text-primary">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            ) : null}

            {/* Cart wiring lands with the authenticated /v1/cart endpoint. */}
            <div className="space-y-4">
              <button
                type="button"
                disabled={!product.inStock}
                className="w-full rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-outline-variant/20 py-5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
              >
                Custom Inquiry
              </button>
            </div>

            {product.atelierNote ? (
              <div className="bg-primary-container p-8">
                <h2 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-emerald-bright">
                  Atelier Note
                </h2>
                <p className="font-body text-sm italic leading-relaxed text-white/80">
                  {product.atelierNote}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 ? (
          <section className="mt-40">
            <div className="mb-16">
              <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-primary">
                Curated Objects
              </h2>
              <p className="mt-2 font-label text-[11px] uppercase tracking-widest text-secondary">
                Complementary pieces for your collection
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
