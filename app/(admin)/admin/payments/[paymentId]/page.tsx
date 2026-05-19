import { notFound } from "next/navigation";
import Link from "next/link";
import { LuArrowLeft, LuRotateCcw, LuFileDown } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { formatPrice } from "@/app/_lib/format";
import { getPaymentById, type PaymentStatus } from "@/app/_lib/payments";

type RouteParams = { paymentId: string };

const STATUS_BADGE: Record<PaymentStatus, string> = {
  captured: "bg-tertiary-fixed text-on-tertiary-fixed",
  pending: "bg-surface-container-highest text-on-surface-variant",
  refunded: "bg-surface-container-highest text-on-surface-variant",
  failed: "bg-error-container text-error",
};

const METHOD_LABEL = {
  card: "Card",
  wire: "Bank Transfer",
  paypal: "PayPal",
} as const;

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function PaymentDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { paymentId } = await params;
  const payment = await getPaymentById(Number(paymentId));
  if (!payment) notFound();

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
        eyebrow={`Processed ${payment.processedOn}`}
        title={`Payment #${payment.id}`}
      >
        <span
          className={`rounded-full px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-widest ${STATUS_BADGE[payment.status]}`}
        >
          {payment.status}
        </span>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuFileDown className="text-base" />
          Receipt
        </button>
        {payment.status === "captured" ? (
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-error-container px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-error transition-opacity hover:opacity-70"
          >
            <LuRotateCcw className="text-base" />
            Refund
          </button>
        ) : null}
      </AdminPageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Provider trail */}
        <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient lg:col-span-2">
          <h3 className="mb-6 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
            Provider Trail
          </h3>
          <ol className="space-y-4">
            {payment.events.map((event) => (
              <li key={event.timestamp} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-accent" />
                <div className="flex-1">
                  <p className="font-body text-sm text-primary">{event.label}</p>
                  <p className="font-label text-[10px] uppercase tracking-wider text-secondary">
                    {event.timestamp}
                  </p>
                  {event.detail ? (
                    <p className="mt-1 font-body text-sm text-on-surface">
                      {event.detail}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 border-t border-outline-variant/20 pt-6">
            <h4 className="mb-2 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Provider Reference
            </h4>
            <p className="font-mono text-xs text-on-surface break-all">
              {payment.reference}
            </p>
          </div>
        </section>

        {/* Summary panels */}
        <aside className="space-y-6">
          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Amount
            </h3>
            <p className="font-headline text-3xl font-extrabold tracking-tight text-primary">
              {formatPrice(payment.amount)}
            </p>
            <p className="mt-1 font-label text-[10px] uppercase tracking-widest text-secondary">
              {payment.currency}
            </p>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Order
            </h3>
            <Link
              href={`/admin/orders/${payment.orderNumber}`}
              className="font-mono text-xs font-bold text-primary hover:underline"
            >
              {payment.orderNumber}
            </Link>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Customer
            </h3>
            <p className="font-headline font-bold text-primary">
              {payment.customerName}
            </p>
            <p className="font-body text-sm text-secondary">
              {payment.customerEmail}
            </p>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
            <h3 className="mb-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
              Method
            </h3>
            <p className="font-body text-sm text-primary">
              {METHOD_LABEL[payment.method]}
            </p>
            <p className="mt-1 font-mono text-xs text-secondary">
              {payment.source}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
