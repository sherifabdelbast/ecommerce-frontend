import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { Coupon } from "@/app/_lib/coupons";

type CouponFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing coupon when editing; omitted when creating. */
  coupon?: Coupon;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Shared admin coupon form — backs the create and edit routes. */
export default function CouponForm({
  heading,
  subtitle,
  submitLabel,
  coupon,
}: CouponFormProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/coupons"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Coupons
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
            <label htmlFor="code" className={LABEL}>
              Code
            </label>
            <input
              id="code"
              name="code"
              defaultValue={coupon?.code}
              placeholder="WELCOME15"
              className={`${FIELD} font-mono uppercase tracking-wider`}
            />
          </div>
          <div>
            <label htmlFor="type" className={LABEL}>
              Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue={coupon?.type ?? "percentage"}
              className={FIELD}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
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
            defaultValue={coupon?.description}
            placeholder="Internal note shown to admins."
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="value" className={LABEL}>
              Value
            </label>
            <input
              id="value"
              name="value"
              type="number"
              min="0"
              defaultValue={coupon?.value}
              placeholder="15"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="min_subtotal" className={LABEL}>
              Min. Subtotal
            </label>
            <input
              id="min_subtotal"
              name="min_subtotal"
              type="number"
              min="0"
              defaultValue={coupon?.minSubtotal ?? ""}
              placeholder="0"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="usage_limit" className={LABEL}>
              Usage Limit
            </label>
            <input
              id="usage_limit"
              name="usage_limit"
              type="number"
              min="0"
              defaultValue={coupon?.usageLimit ?? ""}
              placeholder="Unlimited"
              className={FIELD}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="starts_on" className={LABEL}>
              Starts On
            </label>
            <input
              id="starts_on"
              name="starts_on"
              type="date"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="ends_on" className={LABEL}>
              Ends On
            </label>
            <input
              id="ends_on"
              name="ends_on"
              type="date"
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className={LABEL}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={coupon?.status ?? "scheduled"}
            className={FIELD}
          >
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="flex gap-4 border-t border-outline-variant/20 pt-6">
          <button
            type="submit"
            className="rounded-md bg-primary px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          >
            {submitLabel}
          </button>
          <Link
            href="/admin/coupons"
            className="rounded-md border border-outline-variant/30 px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
