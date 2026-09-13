import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { Coupon } from "@/app/_lib/coupons";

type CouponFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  coupon?: Coupon;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

function toDateInputValue(iso: string | null | undefined): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

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
            defaultValue={coupon?.description ?? ""}
            placeholder="Internal note shown to admins."
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
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
            <label htmlFor="min_purchase" className={LABEL}>
              Min. Purchase
            </label>
            <input
              id="min_purchase"
              name="min_purchase"
              type="number"
              min="0"
              defaultValue={coupon?.minPurchase ?? ""}
              placeholder="0"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="max_discount" className={LABEL}>
              Max Discount
            </label>
            <input
              id="max_discount"
              name="max_discount"
              type="number"
              min="0"
              defaultValue={coupon?.maxDiscount ?? ""}
              placeholder="No cap"
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
            <label htmlFor="valid_from" className={LABEL}>
              Valid From
            </label>
            <input
              id="valid_from"
              name="valid_from"
              type="date"
              defaultValue={toDateInputValue(coupon?.validFrom)}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="valid_to" className={LABEL}>
              Valid To
            </label>
            <input
              id="valid_to"
              name="valid_to"
              type="date"
              defaultValue={toDateInputValue(coupon?.validTo)}
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 font-body text-sm text-on-surface">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              defaultChecked={coupon?.isActive ?? true}
              className="h-4 w-4 rounded border-outline-variant"
            />
            Active
          </label>
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
