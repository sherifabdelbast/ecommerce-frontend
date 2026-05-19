import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../../../_components/NavBar";
import Footer from "../../../_components/Footer";
import ProductCard from "../../../_components/ProductCard";
import {
  getCategoryBySlug,
  getCategoryProducts,
  getAllCategorySlugs,
} from "../../../_lib/categories";

// ISR: category copy and curated products change occasionally, SEO matters
// for these landing pages (CLAUDE.md).
export const revalidate = 600;

type RouteParams = { slug: string };

/** Pre-render every known category at build time. */
export function generateStaticParams(): RouteParams[] {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Not Found | ARCHITECT" };

  return {
    title: `${category.name} | ARCHITECT`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  // Category and its curated products are independent reads — fetch in
  // parallel (vercel async-parallel).
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryProducts(slug),
  ]);

  if (!category) notFound();

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        {/* Editorial category hero */}
        <section className="mb-16 grid grid-cols-1 items-end gap-8 lg:mb-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav className="mb-6 flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary">
              <Link href="/categories" className="transition-opacity hover:opacity-70">
                Categories
              </Link>
              <span aria-hidden>/</span>
              <span className="text-primary">{category.name}</span>
            </nav>
            <span className="mb-4 block font-label text-[11px] uppercase tracking-widest text-secondary">
              {category.index} — {category.meta}
            </span>
            <h1 className="font-headline text-5xl font-light leading-[1.05] tracking-tighter text-primary md:text-[5rem]">
              {category.name}
            </h1>
            <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-secondary">
              {category.description}
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-high shadow-ambient lg:col-span-5">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </section>

        {/* Curated product grid */}
        {products.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-surface-container-low text-center">
            <p className="font-headline text-xl font-semibold text-primary">
              No objects in this collection yet
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
              {products.length} {products.length === 1 ? "object" : "objects"} curated
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
