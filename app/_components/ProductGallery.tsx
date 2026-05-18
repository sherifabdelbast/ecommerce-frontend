import Image from "next/image";
import type { GalleryImage } from "../_lib/products";

type ProductGalleryProps = {
  images: GalleryImage[];
};

/**
 * Asymmetric editorial gallery: one wide lead image, then a narrow portrait
 * and a landscape shot offset beneath it. Degrades gracefully — with a single
 * image only the lead frame renders. Server component (no client JS).
 */
function ProductGallery({ images }: ProductGalleryProps) {
  const [lead, portrait, landscape] = images;

  if (!lead) return null;

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-low">
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      </div>

      {portrait ? (
        <div className="col-span-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      {landscape ? (
        <div className="col-span-4 self-end">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
            <Image
              src={landscape.src}
              alt={landscape.alt}
              fill
              sizes="(max-width: 1024px) 66vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductGallery;
