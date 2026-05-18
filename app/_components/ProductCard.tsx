import Image from "next/image";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { formatPrice } from "../_lib/format";
import type { Product } from "../_lib/products";

type ProductCardProps = {
  product: Product;
  /** Set on above-the-fold cards so the image is not lazy-loaded. */
  priority?: boolean;
};

/**
 * Shared catalog card — used by the products grid and the detail page's
 * related-products section. Server component: no interactivity beyond the
 * link, so it ships zero client JS.
 */
function ProductCard({ product, priority = false }: ProductCardProps) {
  const accented = product.badge !== undefined;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-surface-container-low">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.badge ? (
          <span className="absolute left-4 top-4 bg-primary px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-on-primary">
            {product.badge}
          </span>
        ) : null}

        {!product.inStock ? (
          <span className="absolute left-4 top-4 bg-surface-container-highest px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
            Sold Out
          </span>
        ) : null}

        <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-surface-container-lowest/80 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <LuPlus className="text-lg text-on-surface" />
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-headline text-lg font-semibold tracking-tight text-primary">
            {product.name}
          </h3>
          <p className="mt-1 font-body text-sm text-secondary">
            {product.series} / {product.material}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-sm px-2.5 py-1 font-label text-sm font-bold ${
            accented
              ? "bg-tertiary-fixed-dim text-on-tertiary-fixed"
              : "bg-surface-container-highest text-on-surface"
          }`}
        >
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
