import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type FeaturedObject = {
  name: string;
  material: string;
  price: string;
  image: string;
  alt: string;
  inStock?: boolean;
  offset?: boolean;
};

const objects: FeaturedObject[] = [
  {
    name: "Obsidian Vessel No. 1",
    material: "Hand-thrown stoneware",
    price: "$420",
    inStock: true,
    alt: "Matte black ceramic vase on concrete surface",
    image: "/images/products/product-obsidian-vessel.png",
  },
  {
    name: "Orbital Desk Lamp",
    material: "Brushed Steel / LED",
    price: "$890",
    offset: true,
    alt: "Brushed metal table lamp with soft glow",
    image: "/images/products/product-orbital-lamp.png",
  },
  {
    name: "Form Lounge Chair",
    material: "Bouclé / Oak Frame",
    price: "$2,400",
    alt: "Modern sculptural chair in cream boucle fabric",
    image: "/images/products/product-form-chair.png",
  },
];

function FeaturedObjects() {
  return (
    <section className="mx-auto max-w-screen-2xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mb-10 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-headline text-4xl font-semibold tracking-tight text-primary">
            Featured Objects
          </h2>
          <p className="mt-2 font-body text-secondary">
            Selected works from our Antwerp studio.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            aria-label="Previous"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/20 transition-colors hover:bg-primary hover:text-on-primary"
          >
            <LuChevronLeft className="text-xl" />
          </button>
          <button
            aria-label="Next"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/20 transition-colors hover:bg-primary hover:text-on-primary"
          >
            <LuChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {objects.map((object) => (
          <article
            key={object.name}
            className={`group cursor-pointer rounded-lg bg-surface-container-low p-4 transition-all duration-500 hover:bg-surface-container-lowest hover:shadow-ambient ${object.offset ? "md:translate-y-12" : ""}`}
          >
            <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-surface-container">
              <Image
                src={object.image}
                alt={object.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              />
              {object.inStock && (
                <div className="absolute right-4 top-4 rounded-sm bg-tertiary-fixed-dim/90 px-3 py-1">
                  <span className="font-label text-[10px] font-bold uppercase tracking-widest text-on-tertiary-fixed">
                    In Stock
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-headline text-lg font-medium text-primary">
                  {object.name}
                </h3>
                <p className="mt-1 font-body text-xs uppercase tracking-tighter text-secondary">
                  {object.material}
                </p>
              </div>
              <p className="rounded-sm bg-tertiary-fixed-dim px-2.5 py-1 font-label text-sm font-bold text-on-tertiary-fixed">
                {object.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedObjects;
