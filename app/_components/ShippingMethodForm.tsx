import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { ShippingMethod } from "@/app/_lib/shipping-methods";

type ShippingMethodFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  method?: ShippingMethod;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

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
          <label htmlFor="description" className={LABEL}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={method?.description ?? ""}
            placeholder="Customer-facing description shown at checkout."
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="cost" className={LABEL}>
              Cost (USD)
            </label>
            <input
              id="cost"
              name="cost"
              type="number"
              min="0"
              step="0.01"
              defaultValue={method?.cost}
              placeholder="0"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="estimated_days_min" className={LABEL}>
              Min Days
            </label>
            <input
              id="estimated_days_min"
              name="estimated_days_min"
              type="number"
              min="0"
              defaultValue={method?.estimatedDaysMin ?? ""}
              placeholder="5"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="estimated_days_max" className={LABEL}>
              Max Days
            </label>
            <input
              id="estimated_days_max"
              name="estimated_days_max"
              type="number"
              min="0"
              defaultValue={method?.estimatedDaysMax ?? ""}
              placeholder="7"
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
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-3 font-body text-sm text-on-surface">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                defaultChecked={method?.isActive ?? true}
                className="h-4 w-4 rounded border-outline-variant"
              />
              Active
            </label>
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
