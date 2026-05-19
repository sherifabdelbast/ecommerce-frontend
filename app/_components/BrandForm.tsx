import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { Brand } from "../_lib/brands";

type BrandFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing brand when editing; omitted when creating. */
  brand?: Brand;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Shared admin brand form — backs the create and edit routes. */
export default function BrandForm({
  heading,
  subtitle,
  submitLabel,
  brand,
}: BrandFormProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/brands"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Brands
      </Link>

      <header className="mb-8">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
          {heading}
        </h2>
        <p className="mt-1 font-body text-sm text-secondary">{subtitle}</p>
      </header>

      <form className="space-y-6 rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={LABEL}>
              Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={brand?.name}
              placeholder="Atelier Vauban"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="slug" className={LABEL}>
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={brand?.slug}
              placeholder="atelier-vauban"
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={LABEL}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={brand?.description}
            placeholder="Editorial description shown on the brand hero."
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="discipline" className={LABEL}>
              Discipline
            </label>
            <input
              id="discipline"
              name="discipline"
              defaultValue={brand?.discipline}
              placeholder="Cast Concrete"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="founded" className={LABEL}>
              Founded
            </label>
            <input
              id="founded"
              name="founded"
              defaultValue={brand?.founded}
              placeholder="Est. 2009"
              className={FIELD}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="website" className={LABEL}>
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              defaultValue={brand?.website ?? ""}
              placeholder="https://"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="sort_order" className={LABEL}>
              Sort Order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              min="0"
              defaultValue={brand?.sortOrder ?? 0}
              className={FIELD}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="logo_url" className={LABEL}>
              Logo URL
            </label>
            <input
              id="logo_url"
              name="logo_url"
              defaultValue={brand?.logoUrl ?? ""}
              placeholder="/images/brands/..."
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="status" className={LABEL}>
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={brand?.status ?? "active"}
              className={FIELD}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 border-t border-outline-variant/20 pt-6">
          <button
            type="submit"
            className="rounded-md bg-primary px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          >
            {submitLabel}
          </button>
          <Link
            href="/admin/brands"
            className="rounded-md border border-outline-variant/30 px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
