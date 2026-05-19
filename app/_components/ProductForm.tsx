import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { CATEGORY_FACETS, type Product } from "../_lib/products";

type ProductFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing product when editing; omitted when creating. */
  product?: Product;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Shared admin product form — backs the create and edit routes. */
export default function ProductForm({
  heading,
  subtitle,
  submitLabel,
  product,
}: ProductFormProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Products
      </Link>

      <header className="mb-8">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
          {heading}
        </h2>
        <p className="mt-1 font-body text-sm text-secondary">{subtitle}</p>
      </header>

      <form className="space-y-6 rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
        <div>
          <label htmlFor="name" className={LABEL}>
            Product Name
          </label>
          <input id="name" name="name" defaultValue={product?.name} placeholder="Product name" className={FIELD} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={LABEL}>
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={product?.category}
              className={FIELD}
            >
              {CATEGORY_FACETS.map((facet) => (
                <option key={facet.value} value={facet.value}>
                  {facet.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price" className={LABEL}>
              Price (USD)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              defaultValue={product?.price}
              placeholder="0"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="series" className={LABEL}>
              Series
            </label>
            <input id="series" name="series" defaultValue={product?.series} placeholder="Series 01" className={FIELD} />
          </div>
          <div>
            <label htmlFor="material" className={LABEL}>
              Material
            </label>
            <input id="material" name="material" defaultValue={product?.material} placeholder="Raw Concrete" className={FIELD} />
          </div>
        </div>

        <div>
          <label htmlFor="image" className={LABEL}>
            Image URL
          </label>
          <input id="image" name="image" defaultValue={product?.image} placeholder="/images/products/..." className={FIELD} />
        </div>

        <div>
          <label htmlFor="description" className={LABEL}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description}
            placeholder="Product description"
            className={FIELD}
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="in_stock"
            defaultChecked={product?.inStock ?? true}
            className="h-4 w-4 rounded-sm text-emerald-accent focus:ring-emerald-accent"
          />
          <span className="font-body text-sm text-on-surface">In stock</span>
        </label>

        <div className="flex gap-4 border-t border-outline-variant/20 pt-6">
          <button
            type="submit"
            className="rounded-md bg-primary px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          >
            {submitLabel}
          </button>
          <Link
            href="/admin/products"
            className="rounded-md border border-outline-variant/30 px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
