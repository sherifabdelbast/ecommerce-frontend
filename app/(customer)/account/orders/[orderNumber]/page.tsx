import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LuCheck, LuReceipt, LuRefreshCw, LuPackage } from "react-icons/lu";
import { formatPrice } from "../../../../_lib/format";
import {
  getOrderByNumber,
  STATUS_LABELS,
  addressField,
  type Order,
  type OrderStatus,
} from "../../../../_lib/orders";

type RouteParams = { orderNumber: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { orderNumber } = await params;
  return { title: `Order #${orderNumber} | ARCHITECT` };
}

function formatDateTime(iso: string | null): string | undefined {
  if (!iso) return undefined;
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Derives a simple 4-step timeline from status + timestamps we actually have. */
function buildTimeline(order: Order) {
  const cancelled = order.status === "cancelled";
  const order_ = [
    "pending",
    "processing",
    "shipped",
    "delivered",
  ] as OrderStatus[];
  const currentIndex = order_.indexOf(order.status);

  return [
    {
      label: "Order Placed",
      timestamp: formatDateTime(order.createdAt),
      complete: true,
    },
    {
      label: "Processing",
      timestamp:
        currentIndex >= 1 ? formatDateTime(order.createdAt) : undefined,
      complete: !cancelled && currentIndex >= 1,
    },
    {
      label: "Shipped",
      timestamp: formatDateTime(order.shippedAt),
      complete: !cancelled && currentIndex >= 2,
    },
    {
      label: "Delivered",
      timestamp: formatDateTime(order.deliveredAt),
      complete: !cancelled && currentIndex >= 3,
    },
  ];
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);
  if (!order) notFound();

  const positive = order.status === "shipped" || order.status === "processing";
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const timeline = buildTimeline(order);

  const shippingName =
    addressField(order.shippingAddress, "fullName", "full_name", "name") || "—";
  const shippingLines = [
    addressField(order.shippingAddress, "streetLine1", "street_line_1"),
    addressField(order.shippingAddress, "streetLine2", "street_line_2"),
    [
      addressField(order.shippingAddress, "city"),
      addressField(order.shippingAddress, "stateProvince", "state_province"),
      addressField(order.shippingAddress, "postalCode", "postal_code"),
    ]
      .filter(Boolean)
      .join(", "),
    addressField(order.shippingAddress, "country"),
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest ${
                positive
                  ? "bg-tertiary-fixed text-on-tertiary-fixed"
                  : "bg-surface-container-highest text-secondary"
              }`}
            >
              {STATUS_LABELS[order.status]}
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
              Order #{order.orderNumber}
            </span>
          </div>
          <h1 className="font-headline text-4xl font-light tracking-tighter text-primary sm:text-5xl">
            Order Details
          </h1>
          <p className="mt-2 font-body text-sm text-secondary">
            Placed on {formatDateTime(order.createdAt) ?? "—"}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-sm bg-surface-container-high px-5 py-3 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-70"
          >
            <LuReceipt className="text-base" />
            Download Invoice
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          >
            <LuRefreshCw className="text-base" />
            Buy Again
          </button>
        </div>
      </header>

      <div className="mb-12 rounded-xl bg-surface-container-low p-8 sm:p-10">
        <ol className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {timeline.map((step) => (
            <li key={step.label} className="flex flex-col items-start gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  step.complete
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant/40 text-outline-variant"
                }`}
              >
                <LuCheck className="text-base" />
              </span>
              <div>
                <p
                  className={`font-headline text-sm font-bold ${
                    step.complete ? "text-primary" : "text-secondary"
                  }`}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 font-body text-xs text-secondary">
                  {step.timestamp ?? "Pending"}
                </p>
                {step.label === "Shipped" && order.trackingNumber ? (
                  <p className="mt-1 font-label text-[10px] font-bold uppercase tracking-wider text-emerald-accent">
                    {order.shippingMethod?.name ?? "Tracking"}:{" "}
                    {order.trackingNumber}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="mb-6 font-headline text-2xl font-semibold text-primary">
            Items ({itemCount})
          </h2>
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-6 rounded-xl bg-surface-container-lowest p-6 shadow-ambient sm:flex-row"
              >
                <div className="flex aspect-[3/4] w-full shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-outline sm:h-56 sm:w-44">
                  <LuPackage className="text-4xl" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-headline text-xl font-bold text-primary">
                        {item.productName}
                      </h3>
                    </div>
                    <span className="font-headline text-lg font-bold text-primary">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <dl className="mt-auto flex gap-12 pt-6">
                    <div>
                      <dt className="font-label text-[10px] uppercase tracking-widest text-secondary">
                        Quantity
                      </dt>
                      <dd className="mt-1 font-body text-sm text-primary">
                        {String(item.quantity).padStart(2, "0")}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-label text-[10px] uppercase tracking-widest text-secondary">
                        SKU
                      </dt>
                      <dd className="mt-1 font-body text-sm text-primary">
                        {item.productSku}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="space-y-6 rounded-xl bg-primary-container p-8 text-white">
            <div>
              <h3 className="mb-3 font-label text-[11px] font-bold uppercase tracking-widest text-white/50">
                Shipping Address
              </h3>
              <address className="font-body text-sm not-italic leading-relaxed">
                <span className="font-semibold">{shippingName}</span>
                {shippingLines.map((line) => (
                  <span key={line} className="block text-white/80">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div className="border-t border-white/15 pt-6">
              <h3 className="mb-2 font-label text-[11px] font-bold uppercase tracking-widest text-white/50">
                Payment Method
              </h3>
              <p className="font-body text-sm">{order.paymentMethod ?? "—"}</p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-surface-container-low p-8">
            <h3 className="font-label text-[11px] font-bold uppercase tracking-widest text-secondary">
              Order Summary
            </h3>
            <dl className="space-y-3 font-body text-sm">
              <div className="flex justify-between">
                <dt className="text-secondary">Subtotal</dt>
                <dd className="text-primary">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary">Shipping</dt>
                <dd className="text-primary">
                  {formatPrice(order.shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary">Estimated Tax</dt>
                <dd className="text-primary">{formatPrice(order.tax)}</dd>
              </div>
            </dl>
            <div className="flex items-baseline justify-between border-t border-outline-variant/30 pt-4">
              <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
                Total
              </span>
              <span className="font-headline text-2xl font-bold text-primary">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-outline-variant/30 p-8">
            <h3 className="font-headline text-base font-bold text-primary">
              Need Assistance?
            </h3>
            <p className="font-body text-sm leading-relaxed text-secondary">
              Our curators are available 24/7 for returns, claims, or assembly
              guidance.
            </p>
            <button
              type="button"
              className="w-full rounded-sm border border-primary py-3 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary"
            >
              Contact Support
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
