import Image from "next/image";

const HERO_IMG = "/images/home/hero-interior.png";

function Hero() {
  return (
    <section className="relative h-[min(90vh,921px)] w-full overflow-hidden bg-surface-container-low">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMG}
          alt="Minimalist modern interior with architectural lines"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-center px-6 sm:px-8 lg:px-12">
        <p className="mb-4 font-label text-xs uppercase tracking-widest text-secondary">
          AESTHETIC NO. 04
        </p>
        <h1 className="mb-8 max-w-4xl font-headline text-5xl font-light leading-[0.9] tracking-tighter text-primary sm:text-7xl lg:text-[7rem]">
          Structured <br />
          <span className="ml-8 font-extralight italic sm:ml-16 lg:ml-24">
            Simplicity
          </span>
        </h1>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <button className="rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary px-10 py-4 font-label text-xs uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container">
            Explore Collection
          </button>
          <div className="hidden h-px w-24 bg-outline-variant sm:block" />
          <p className="max-w-xs font-body text-sm italic text-secondary">
            Defining the boundaries of modern living through curated
            materiality.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
