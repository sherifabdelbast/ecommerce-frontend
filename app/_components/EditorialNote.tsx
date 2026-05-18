import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";

const EDITORIAL_IMG = "/images/home/editorial-lighting.png";

function EditorialNote() {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-6 py-20 sm:px-8 sm:py-32 lg:px-12 lg:py-48">
      <div className="grid grid-cols-12 items-center">
        <div className="relative z-0 col-span-12 aspect-[16/10] lg:col-span-7">
          <Image
            src={EDITORIAL_IMG}
            alt="Designer lighting fixture details"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="z-10 col-span-12 bg-surface-container-lowest p-8 shadow-ambient sm:p-12 lg:col-span-6 lg:col-start-7 lg:-mt-40 lg:p-16">
          <p className="mb-6 font-label text-xs uppercase tracking-[0.4em] text-secondary">
            Atelier Notes
          </p>
          <h2 className="mb-8 font-headline text-4xl font-bold leading-tight tracking-tighter text-primary sm:text-5xl">
            Materiality in <br />
            the Modern Age.
          </h2>
          <p className="mb-10 font-body text-lg leading-relaxed text-secondary">
            Our latest editorial explores the tension between industrial metals
            and organic silicates. Discover how ARCHITECT is redefining the
            tactile experience of home through raw, unrefined finishes.
          </p>
          <button className="group flex items-center gap-4">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">
              Read the Editorial
            </span>
            <LuArrowRight className="text-xl text-primary transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default EditorialNote;
