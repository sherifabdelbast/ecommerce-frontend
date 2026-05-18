import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../../_components/NavBar";
import Footer from "../../_components/Footer";

export const metadata: Metadata = {
  title: "Categories | ARCHITECT",
  description:
    "A definitive index of architectural elements — sculptural objects, artisan ateliers, thematic collections and archival legacies.",
};

// ISR: category tiles and counts change rarely; SEO matters for this index.
export const revalidate = 3600;

type Category = {
  slug: string;
  name: string;
  index: string;
  meta: string;
  blurb: string;
  cta: string;
  image: string;
  alt: string;
  badge?: string;
  grayscale?: boolean;
  offset?: boolean;
};

const categories: Category[] = [
  {
    slug: "objects",
    name: "Objects",
    index: "01",
    meta: "248 ITEMS",
    badge: "New Arrivals",
    blurb:
      "Essential elements for the modern interior. Curated furniture and lighting that prioritize geometric purity.",
    cta: "Explore Collection",
    image: "/images/categories/objects.png",
    alt: "Sleek modern minimalist chair and designer lighting",
  },
  {
    slug: "atelier",
    name: "Atelier",
    index: "02",
    meta: "42 ITEMS",
    offset: true,
    blurb:
      "Limited editions and handcrafted masterworks. A celebration of material honesty and artisan dedication.",
    cta: "View Artisan Works",
    image: "/images/categories/atelier.png",
    alt: "Close up of handmade ceramic artisan pottery",
  },
  {
    slug: "collections",
    name: "Collections",
    index: "03",
    meta: "12 SERIES",
    blurb:
      "Thematic curations and seasonal narratives. Each collection tells a story of spatial harmony and evolved living.",
    cta: "Browse Series",
    image: "/images/categories/collections.png",
    alt: "Interior gallery with emerald tone walls and velvet furniture",
  },
  {
    slug: "archives",
    name: "Archives",
    index: "04",
    meta: "LEGACY",
    offset: true,
    grayscale: true,
    blurb:
      "A retrospective look at past projects and foundational pieces. Access to our library of design history and rare finds.",
    cta: "Enter Library",
    image: "/images/categories/archives.png",
    alt: "Monochromatic workspace architecture from a past project",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <NavBar />
      <main className="pb-24 pt-32">
        {/* Editorial header */}
        <section className="mx-auto mb-24 max-w-screen-2xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="relative z-10 col-span-12 lg:col-span-7">
              <h1 className="mb-8 font-headline text-5xl font-light leading-[1.1] tracking-tighter text-primary md:text-[5.5rem]">
                The <span className="font-extralight italic">Curation</span> of
                Space &amp; Form
              </h1>
              <p className="max-w-md font-body text-lg leading-relaxed text-secondary">
                A definitive index of architectural elements, ranging from
                sculptural objects to archival legacies. Selected for the
                discerning eye.
              </p>
            </div>

            <div className="relative col-span-12 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-high shadow-ambient">
                <Image
                  src="/images/categories/editorial-header.png"
                  alt="Minimalist architectural concrete structure with shadow play"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 hidden max-w-[280px] rounded-lg bg-surface-container-lowest p-8 shadow-ambient lg:block">
                <span className="mb-2 block font-label text-[11px] uppercase tracking-wider text-on-tertiary-container">
                  Featured Now
                </span>
                <h2 className="mb-3 font-headline text-xl font-bold text-primary">
                  Spring Atelier Series
                </h2>
                <p className="font-body text-sm leading-relaxed text-secondary">
                  Artisan pieces that redefine the boundary between function and
                  art.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category grid */}
        <section className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
            {categories.map((category) => (
              <article
                key={category.slug}
                className={`group ${category.offset ? "md:mt-24" : ""}`}
              >
                <Link href={`/categories/${category.slug}`} className="block">
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg bg-surface-container-low">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        category.grayscale ? "grayscale" : ""
                      }`}
                    />
                    {category.badge && (
                      <div className="absolute right-6 top-6 rounded-full bg-tertiary-fixed px-3 py-1 font-label text-[11px] uppercase tracking-wider text-on-tertiary-fixed">
                        {category.badge}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="font-headline text-[1.75rem] font-semibold text-primary">
                      {category.name}
                    </h2>
                    <span className="font-label text-[11px] uppercase tracking-wider text-outline">
                      {category.index} — {category.meta}
                    </span>
                  </div>
                  <p className="mb-6 max-w-sm font-body text-sm leading-relaxed text-secondary">
                    {category.blurb}
                  </p>
                  <span className="inline-flex items-center border-b border-primary pb-1 font-label text-xs font-bold uppercase tracking-widest text-primary transition-colors group-hover:border-tertiary-fixed-dim group-hover:text-tertiary-fixed-dim">
                    {category.cta}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-32 px-6 sm:px-8 lg:px-12">
          <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center overflow-hidden rounded-lg bg-primary-container p-16 text-center md:p-24">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #6ffbbe 0%, transparent 50%)",
              }}
            />
            <h2 className="relative z-10 mb-8 max-w-2xl font-headline text-3xl font-light leading-tight text-white md:text-5xl">
              Join the Curator&rsquo;s <span className="italic">Circle</span>
            </h2>
            <p className="relative z-10 mb-12 max-w-lg font-body text-white/70">
              Receive first access to atelier drops and seasonal archives. No
              noise, just architectural insight.
            </p>
            <form className="relative z-10 flex w-full max-w-md flex-col gap-4 md:flex-row">
              <label htmlFor="circle-email" className="sr-only">
                Email address
              </label>
              <input
                id="circle-email"
                name="email"
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 border border-white/10 bg-white/5 px-6 py-4 font-label text-[11px] text-white transition-colors placeholder:text-white/40 focus:border-tertiary-fixed focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white px-10 py-4 font-label text-[11px] font-bold tracking-widest text-black transition-colors hover:bg-tertiary-fixed"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
