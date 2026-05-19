import Link from "next/link";
import { LuListFilter, LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { formatPrice } from "@/app/_lib/format";
import { getShippingMethods, type ShippingMethodStatus } from "@/app/_lib/shipping-methods";

const STATUS_BADGE: Record<ShippingMethodStatus, string> = {
  active: "bg-tertiary-fixed text-on-tertiary-fixed",
  inactive: "bg-surface-container-highest text-on-surface-variant",
};

/**
 * Admin shipping-methods table — CSR, auth + role gated (CLAUDE.md). Reads
 * the admin shipping endpoint later; currently the mock register.
 */
export default async function AdminShippingMethodsPage() {
  const methods = await getShippingMethods();

  return (
    <div>
      <AdminPageHeader eyebrow="System / Logistics" title="Shipping Methods">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuListFilter className="text-base" />
          Filters
        </button>
        <Link
          href="/admin/shipping-methods/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
        >
          <LuPlus className="text-base" />
          Add Method
        </Link>
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Method</th>
                <th className="px-6 py-4 font-bold">Carrier</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Free Above</th>
                <th className="px-6 py-4 font-bold">Estimate</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {methods.map((method) => (
                <tr
                  key={method.id}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <p className="font-headline font-bold text-primary">
                      {method.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-secondary line-clamp-1">
                      {method.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-on-surface">{method.carrier}</td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {method.price === 0 ? "Free" : formatPrice(method.price)}
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    {method.freeAbove === null ? "—" : formatPrice(method.freeAbove)}
                  </td>
                  <td className="px-6 py-4 text-secondary">{method.estimatedDays}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[method.status]}`}
                    >
                      {method.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/admin/shipping-methods/${method.id}/edit`}
                        aria-label={`Edit ${method.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuPencil className="text-sm" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${method.name}`}
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
            Showing 1 - {methods.length} of {methods.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
