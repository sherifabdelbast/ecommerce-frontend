import Link from "next/link";
import { LuListFilter, LuDownload, LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { formatPrice } from "@/app/_lib/format";
import { getCoupons, type CouponStatus } from "@/app/_lib/coupons";

const STATUS_BADGE: Record<CouponStatus, string> = {
  active: "bg-tertiary-fixed text-on-tertiary-fixed",
  scheduled: "bg-surface-container-highest text-on-surface-variant",
  expired: "bg-error-container text-error",
};

/**
 * Admin coupons table — CSR, auth + role gated (CLAUDE.md). Reads the admin
 * coupons endpoint later; currently the mock register.
 */
export default async function AdminCouponsPage() {
  const coupons = await getCoupons();

  return (
    <div>
      <AdminPageHeader eyebrow="System / Promotions" title="Coupon Register">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuListFilter className="text-base" />
          Filters
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuDownload className="text-base" />
          Export
        </button>
        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
        >
          <LuPlus className="text-base" />
          Add Coupon
        </Link>
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Code</th>
                <th className="px-6 py-4 font-bold">Value</th>
                <th className="px-6 py-4 font-bold">Min. Subtotal</th>
                <th className="px-6 py-4 font-bold">Usage</th>
                <th className="px-6 py-4 font-bold">Window</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {coupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      {coupon.code}
                    </p>
                    <p className="mt-0.5 text-[11px] text-secondary line-clamp-1">
                      {coupon.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {coupon.type === "percentage"
                      ? `${coupon.value}%`
                      : formatPrice(coupon.value)}
                  </td>
                  <td className="px-6 py-4 text-on-surface">
                    {coupon.minSubtotal === null ? "—" : formatPrice(coupon.minSubtotal)}
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    {coupon.usageCount} / {coupon.usageLimit ?? "∞"}
                  </td>
                  <td className="px-6 py-4 text-[11px] text-secondary">
                    {coupon.startsOn}
                    <br />
                    {coupon.endsOn}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[coupon.status]}`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/admin/coupons/${coupon.id}/edit`}
                        aria-label={`Edit ${coupon.code}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuPencil className="text-sm" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${coupon.code}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-error-container hover:text-error"
                      >
                        <LuTrash2 className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/20 px-6 py-4 font-label text-[11px] uppercase tracking-widest text-secondary">
          <span>
            Showing 1 - {coupons.length} of {coupons.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
