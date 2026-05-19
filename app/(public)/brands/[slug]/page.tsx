import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import NavBar from "../../../_components/NavBar";
import Footer from "../../../_components/Footer";
import ProductCard from "../../../_components/ProductCard";
import {
  getBrandBySlug,
  getBrandProducts,
  getAllBrandSlugs,
} from "../../../_lib/brands";

// ISR: brand copy and catalogue change occasionally, SEO matters for these
// landing pages (CLAUDE.md).
export const revalidate = 600;

type RouteParams = { slug: string };

/** Pre-render every known brand at build time. */
export function generateStaticParams(): RouteParams[] {
  return getAllBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Not Found | ARCHITECT" };

  return {
    title: `${brand.name} | ARCHITECT`,
    description: brand.description,
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  // Brand and its products are independent reads — fetch in parallel
  // (vercel async-parallel).
  const [brand, products] = await Promise.all([
    getBrandBySlug(slug),
    getBrandProducts(slug),
  ]);

  if (!brand) notFound();

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        {/* Typographic brand hero */}
        <section className="mb-16 border-b border-outline-variant/30 pb-16 lg:mb-24 lg:pb-24">
          <nav className="mb-8 flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary">
            <Link href="/products" className="transition-opacity hover:opacity-70">
              Catalogue
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">{brand.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="mb-4 block font-label text-[11px] uppercase tracking-widest text-secondary">
                {brand.founded} — {brand.discipline}
              </span>
              <h1 className="font-headline text-6xl font-light leading-[0.95] tracking-tighter text-primary md:text-[7rem]">
                {brand.name}
              </h1>
            </div>

            <div className="lg:col-span-4">
              <p className="font-body text-lg leading-relaxed text-secondary">
                {brand.description}
              </p>
              {brand.website ? (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 border-b border-primary pb-1 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-70"
                >
                  Visit Maker
                  <LuArrowUpRight className="text-sm" />
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* Brand product grid */}
        {products.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-surface-container-low text-center">
            <p className="font-headline text-xl font-semibold text-primary">
              No objects from this maker yet
            </p>
            <p className="font-body text-sm text-secondary">
              Browse the{" "}
              <Link href="/products" className="underline transition-opacity hover:opacity-70">
                full catalogue
              </Link>{" "}
              instead.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  priority={index < 3}
                />
              ))}
            </div>
            <p className="mt-24 text-center font-label text-[11px] uppercase tracking-widest text-secondary">
              {products.length} {products.length === 1 ? "object" : "objects"} by{" "}
              {brand.name}
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
