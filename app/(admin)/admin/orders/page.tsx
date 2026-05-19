import Link from "next/link";
import { LuListFilter, LuDownload, LuEye } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { formatPrice } from "@/app/_lib/format";
import { getOrders, STATUS_LABELS, type OrderStatus } from "@/app/_lib/orders";

// Badge color per status — keyed once at module scope (avoids per-row work).
const STATUS_BADGE: Record<OrderStatus, string> = {
  processing: "bg-surface-container-highest text-on-surface-variant",
  shipped: "bg-tertiary-fixed text-on-tertiary-fixed",
  delivered: "bg-tertiary-fixed text-on-tertiary-fixed",
  cancelled: "bg-error-container text-error",
};

/**
 * Admin orders table — CSR, auth + role gated (CLAUDE.md). Reads the
 * admin orders endpoint later; currently the mock order set.
 */
export default async function AdminOrdersPage() {
  const orders = await getOrders();
  const itemCount = (items: { quantity: number }[]) =>
    items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div>
      <AdminPageHeader eyebrow="System / Commerce" title="Order Ledger">
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
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Order</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Placed</th>
                <th className="px-6 py-4 font-bold">Items</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {orders.map((order) => (
                <tr
                  key={order.orderNumber}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-semibold text-primary">
                      {order.orderNumber}
                    </p>
                    <p className="mt-0.5 text-[11px] text-secondary line-clamp-1">
                      {order.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-on-surface">
                    {order.shippingAddress.name}
                  </td>
                  <td className="px-6 py-4 text-secondary">{order.placedOn}</td>
                  <td className="px-6 py-4 text-on-surface">
                    {itemCount(order.items)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[order.status]}`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/admin/orders/${order.orderNumber}`}
                        aria-label={`View ${order.orderNumber}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuEye className="text-sm" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/20 px-6 py-4 font-label text-[11px] uppercase tracking-widest text-secondary">
          <span>
            Showing 1 - {orders.length} of {orders.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
