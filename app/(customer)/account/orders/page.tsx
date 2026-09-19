"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LuChevronRight, LuChevronDown, LuPackage } from "react-icons/lu";
import { formatPrice } from "../../../_lib/format";
import { getOrders, STATUS_LABELS, type Order } from "../../../_lib/orders";

function StatusBadge({ status }: { status: Order["status"] }) {
  const positive = status === "shipped" || status === "processing";
  return (
    <span
      className={`rounded-sm px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest ${
        positive
          ? "bg-tertiary-fixed text-on-tertiary-fixed"
          : "bg-surface-container-highest text-secondary"
      }`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function orderTitle(order: Order): string {
  if (order.items.length === 0) return `Order #${order.orderNumber}`;
  const first = order.items[0].productName;
  const rest = order.items.length - 1;
  return rest > 0 ? `${first} + ${rest} more` : first;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getOrders();
        if (!cancelled) setOrders(data);
      } catch {
        if (!cancelled) setError("Couldn't load your orders.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-12">
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl">
          Order History
        </h1>
        <p className="mt-3 max-w-xl font-body text-sm text-secondary">
          View and manage your architectural curation acquisitions. Every piece
          is handled with the precision of its design intent.
        </p>
      </header>

      <div className="mb-10 flex flex-wrap gap-6">
        {[
          { label: "Filter by Period", value: "Last 6 Months" },
          { label: "Status", value: "All Deliveries" },
        ].map((filter) => (
          <div key={filter.label}>
            <span className="mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              {filter.label}
            </span>
            <button
              type="button"
              className="flex h-12 min-w-52 items-center justify-between gap-4 bg-surface-container-low px-4 font-body text-sm text-on-surface"
            >
              {filter.value}
              <LuChevronDown className="text-base text-secondary" />
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="font-body text-sm text-secondary">Loading your orders…</p>
      ) : error ? (
        <p className="font-body text-sm text-error">{error}</p>
      ) : orders.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-surface-container-low text-center">
          <p className="font-headline text-xl font-semibold text-primary">
            No orders yet
          </p>
          <Link
            href="/products"
            className="font-label text-[11px] uppercase tracking-widest text-primary underline-offset-4 hover:underline"
          >
            Begin your curation
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.orderNumber}
              className="bg-surface-container-low p-8 transition-colors hover:bg-surface-container"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                    Order #{order.orderNumber}
                  </span>
                  <h2 className="mt-1 font-headline text-xl font-semibold text-primary">
                    {orderTitle(order)}
                  </h2>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className="flex -space-x-4">
                  {order.items.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm bg-surface-container-highest text-outline ring-2 ring-surface-container-low"
                    >
                      <LuPackage className="text-xl" />
                    </div>
                  ))}
                </div>

                <dl className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3">
                  <div>
                    <dt className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      Placed On
                    </dt>
                    <dd className="mt-1 font-body text-sm text-primary">
                      {formatDate(order.createdAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      {order.status === "delivered" ? "Delivered On" : "Status"}
                    </dt>
                    <dd className="mt-1 font-body text-sm text-primary">
                      {order.status === "delivered"
                        ? formatDate(order.deliveredAt)
                        : STATUS_LABELS[order.status]}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      Total Amount
                    </dt>
                    <dd className="mt-1 font-headline text-sm font-bold text-primary">
                      {formatPrice(order.total)}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/account/orders/${order.orderNumber}`}
                  className="flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
                >
                  View Details
                  <LuChevronRight className="text-base" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
