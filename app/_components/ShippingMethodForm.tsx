import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { ShippingMethod } from "@/app/_lib/shipping-methods";

type ShippingMethodFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing method when editing; omitted when creating. */
  method?: ShippingMethod;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Shared admin shipping-method form — backs the create and edit routes. */
export default function ShippingMethodForm({
  heading,
  subtitle,
  submitLabel,
  method,
}: ShippingMethodFormProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/shipping-methods"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Shipping Methods
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
              defaultValue={method?.name}
              placeholder="White Glove Standard"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="carrier" className={LABEL}>
              Carrier
            </label>
            <input
              id="carrier"
              name="carrier"
              defaultValue={method?.carrier}
              placeholder="Atelier Logistics"
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
            rows={3}
            defaultValue={method?.description}
            placeholder="Customer-facing description shown at checkout."
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="price" className={LABEL}>
              Price (USD)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              defaultValue={method?.price}
              placeholder="0"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="free_above" className={LABEL}>
              Free Above
            </label>
            <input
              id="free_above"
              name="free_above"
              type="number"
              min="0"
              defaultValue={method?.freeAbove ?? ""}
              placeholder="Never"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="estimated_days" className={LABEL}>
              Estimate
            </label>
            <input
              id="estimated_days"
              name="estimated_days"
              defaultValue={method?.estimatedDays}
              placeholder="5 – 7 days"
              className={FIELD}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="sort_order" className={LABEL}>
              Sort Order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              min="0"
              defaultValue={method?.sortOrder ?? 0}
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
              defaultValue={method?.status ?? "active"}
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
            href="/admin/shipping-methods"
            className="rounded-md border border-outline-variant/30 px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
