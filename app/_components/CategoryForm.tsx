import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { Category } from "../_lib/categories";

type CategoryFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing category when editing; omitted when creating. */
  category?: Category;
  /** Parent options for the parent_id select. */
  parents: Array<Pick<Category, "id" | "name">>;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Shared admin category form — backs the create and edit routes. */
export default function CategoryForm({
  heading,
  subtitle,
  submitLabel,
  category,
  parents,
}: CategoryFormProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/categories"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Categories
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
              defaultValue={category?.name}
              placeholder="Objects"
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
              defaultValue={category?.slug}
              placeholder="objects"
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
            defaultValue={category?.description}
            placeholder="Editorial description shown on the category hero."
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="parent_id" className={LABEL}>
              Parent Category
            </label>
            <select
              id="parent_id"
              name="parent_id"
              defaultValue={category?.parentId ?? ""}
              className={FIELD}
            >
              <option value="">None (top level)</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className={LABEL}>
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={category?.status ?? "active"}
              className={FIELD}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="image_url" className={LABEL}>
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            defaultValue={category?.imageUrl}
            placeholder="/images/categories/..."
            className={FIELD}
          />
        </div>

        <div className="flex gap-4 border-t border-outline-variant/20 pt-6">
          <button
            type="submit"
            className="rounded-md bg-primary px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          >
            {submitLabel}
          </button>
          <Link
            href="/admin/categories"
            className="rounded-md border border-outline-variant/30 px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
