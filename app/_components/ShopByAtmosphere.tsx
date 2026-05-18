import Image from "next/image";

type Atmosphere = {
  kicker: string;
  title: string;
  span: string;
  image: string;
  alt: string;
  discover?: boolean;
};

const atmospheres: Atmosphere[] = [
  {
    kicker: "Sanctuary",
    title: "Living Spaces",
    span: "col-span-12 md:col-span-8",
    discover: true,
    alt: "Modern airy living room with minimal furniture",
    image: "/images/home/atmosphere-living-spaces.png",
  },
  {
    kicker: "Focus",
    title: "Office",
    span: "col-span-12 md:col-span-4",
    alt: "Sleek home office with architectural desk",
    image: "/images/home/atmosphere-office.png",
  },
  {
    kicker: "Ambiance",
    title: "Lighting",
    span: "col-span-12 md:col-span-4",
    alt: "Artistic pendant lighting in dark room",
    image: "/images/home/atmosphere-lighting.png",
  },
  {
    kicker: "Rest",
    title: "Bedroom",
    span: "col-span-12 md:col-span-8",
    alt: "Minimalist bedroom with soft linen textures",
    image: "/images/home/atmosphere-bedroom.png",
  },
];

function ShopByAtmosphere() {
  return (
    <section className="mt-16 bg-surface-container-low py-20 sm:mt-24 sm:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center sm:mb-20">
          <h2 className="mb-4 font-headline text-4xl font-light tracking-tighter text-primary sm:text-5xl">
            Shop by Atmosphere
          </h2>
          <div className="mx-auto h-px w-24 bg-primary" />
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:h-[800px]">
          {atmospheres.map((atmosphere) => (
            <article
              key={atmosphere.title}
              className={`group relative h-72 overflow-hidden sm:h-96 md:h-full ${atmosphere.span}`}
            >
              <Image
                src={atmosphere.image}
                alt={atmosphere.alt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover brightness-75 grayscale transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="mb-2 font-label text-[10px] uppercase tracking-[0.3em]">
                  {atmosphere.kicker}
                </p>
                <h3 className="font-headline text-3xl font-light">
                  {atmosphere.title}
                </h3>
                {atmosphere.discover && (
                  <a
                    href="#"
                    className="mt-4 inline-block border-b border-white pb-1 font-label text-[10px] uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Discover
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByAtmosphere;
