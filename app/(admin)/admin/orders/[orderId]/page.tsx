import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuMail, LuPrinter } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { formatPrice } from "@/app/_lib/format";
import {
  getOrderByNumber,
  STATUS_LABELS,
  type OrderStatus,
} from "@/app/_lib/orders";

type RouteParams = { orderId: string };

const STATUS_BADGE: Record<OrderStatus, string> = {
  processing: "bg-surface-container-highest text-on-surface-variant",
  shipped: "bg-tertiary-fixed text-on-tertiary-fixed",
  delivered: "bg-tertiary-fixed text-on-tertiary-fixed",
  cancelled: "bg-error-container text-error",
};

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { orderId } = await params;
  const order = await getOrderByNumber(orderId);
  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Orders
      </Link>

      <AdminPageHeader
        eyebrow={`Placed ${order.placedOn}`}
        title={`Order ${order.orderNumber}`}
      >
        <span
          className={`rounded-full px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-widest ${STATUS_BADGE[order.status]}`}
        >
          {STATUS_LABELS[order.status]}
        </span>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuMail className="text-base" />
          Email Customer
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuPrinter className="text-base" />
          Print Invoice
        </button>
      </AdminPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-6 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Line Items
            </h3>
            <ul className="divide-y divide-outline-variant/10">
              {order.items.map((item) => (
                <li key={item.sku} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-surface-container">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-headline font-bold text-primary">
                      {item.name}
                    </p>
                    <p className="font-label text-[10px] uppercase tracking-wider text-secondary">
                      {item.variant}
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-wider text-outline">
                      {item.sku} · ×{item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-6 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Timeline
            </h3>
            <ol className="space-y-4">
              {order.timeline.map((step) => (
                <li key={step.label} className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      step.complete ? "bg-emerald-accent" : "bg-outline-variant"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-body text-sm text-primary">{step.label}</p>
                    {step.timestamp ? (
                      <p className="font-label text-[10px] uppercase tracking-wider text-secondary">
                        {step.timestamp}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Summary
            </h3>
            <dl className="space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <dt className="text-secondary">Subtotal</dt>
                <dd className="text-on-surface">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary">Shipping</dt>
                <dd className="text-on-surface">{formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary">Tax</dt>
                <dd className="text-on-surface">{formatPrice(order.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-outline-variant/20 pt-3 font-semibold">
                <dt className="text-primary">Total</dt>
                <dd className="text-primary">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Customer
            </h3>
            <p className="font-headline font-bold text-primary">
              {order.shippingAddress.name}
            </p>
            <address className="mt-3 not-italic font-body text-sm leading-relaxed text-secondary">
              {order.shippingAddress.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Payment
            </h3>
            <p className="font-body text-sm text-on-surface">{order.paymentLabel}</p>
            {order.carrier ? (
              <p className="mt-2 font-label text-[11px] uppercase tracking-wider text-secondary">
                {order.carrier}
                {order.tracking ? ` · ${order.tracking}` : ""}
              </p>
            ) : null}
          </section>
        </aside>
      </div>
    </div>
  );
}
