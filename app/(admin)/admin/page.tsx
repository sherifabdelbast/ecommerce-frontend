import Link from "next/link";
import {
  LuArrowRight,
  LuCreditCard,
  LuShoppingCart,
  LuUsers,
  LuTrendingUp,
} from "react-icons/lu";
import type { IconType } from "react-icons";

/**
 * Admin dashboard — CSR, auth + role gated (CLAUDE.md).
 *
 * Stats are mocked. The live version needs a backend dashboard-stats
 * endpoint (currently absent — `GET /admin/dashboard` is commented out
 * server-side).
 */
type Stat = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: IconType;
  accent?: boolean;
};

const STATS: Stat[] = [
  { label: "Total Revenue", value: "$182,490.00", delta: "+12.4%", positive: true, icon: LuCreditCard, accent: true },
  { label: "Total Orders", value: "1,429", delta: "+8.2%", positive: true, icon: LuShoppingCart },
  { label: "Active Users", value: "8,102", delta: "-2.4%", positive: false, icon: LuUsers },
  { label: "Conversion Rate", value: "3.42%", delta: "+15.1%", positive: true, icon: LuTrendingUp },
];

type TxStatus = "Delivered" | "Shipped" | "Processing";

const TX_BADGE: Record<TxStatus, string> = {
  Delivered: "bg-emerald-50 text-emerald-600",
  Shipped: "bg-blue-50 text-blue-600",
  Processing: "bg-amber-50 text-amber-600",
};

const TRANSACTIONS: {
  id: string;
  customer: string;
  amount: string;
  status: TxStatus;
  date: string;
}[] = [
  { id: "#CR-9021", customer: "Julianne Sterling", amount: "$12,400.00", status: "Delivered", date: "Oct 12, 2026" },
  { id: "#CR-9020", customer: "Marcus Vane", amount: "$2,150.00", status: "Shipped", date: "Oct 11, 2026" },
  { id: "#CR-9019", customer: "Elena Rossi", amount: "$890.00", status: "Processing", date: "Oct 11, 2026" },
  { id: "#CR-9018", customer: "Thomas Chen", amount: "$5,600.00", status: "Delivered", date: "Oct 10, 2026" },
  { id: "#CR-9017", customer: "Sarah Jenkins", amount: "$1,200.00", status: "Processing", date: "Oct 10, 2026" },
];

const TOP_COLLECTIONS = [
  { name: "Brutalist Vase No. 12", category: "Architecture", price: "$4,200" },
  { name: "Luminous Spheres", category: "Lighting", price: "$1,850" },
  { name: "Obsidian Lounge Chair", category: "Furniture", price: "$8,900" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <header>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
          Performance Overview
        </h2>
        <p className="mt-1 font-body text-sm text-secondary">
          Real-time metrics for your curated collection ecosystem.
        </p>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-xl bg-surface-container-lowest p-6 shadow-ambient ${
                stat.accent ? "border-l-4 border-emerald-accent" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-primary">
                  <Icon className="text-lg" />
                </span>
                <span
                  className={`font-label text-xs font-bold ${
                    stat.positive ? "text-emerald-accent" : "text-error"
                  }`}
                >
                  {stat.delta}
                </span>
              </div>
              <p className="mt-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
                {stat.label}
              </p>
              <p className="mt-1 font-headline text-2xl font-extrabold text-primary">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Analytics row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-ambient lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-headline text-lg font-bold text-primary">
              Monthly Revenue Flux
            </h3>
            <div className="flex gap-3 font-label text-[11px] uppercase tracking-widest">
              <span className="font-bold text-primary underline underline-offset-4">
                Yearly
              </span>
              <span className="text-secondary">Monthly</span>
            </div>
          </div>
          {/* Mock area chart */}
          <svg viewBox="0 0 700 200" className="h-44 w-full" role="img" aria-label="Revenue trend">
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#009668" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#009668" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 150 L100 120 L200 140 L300 80 L400 100 L500 50 L600 70 L700 30 L700 200 L0 200 Z"
              fill="url(#rev)"
            />
            <path
              d="M0 150 L100 120 L200 140 L300 80 L400 100 L500 50 L600 70 L700 30"
              fill="none"
              stroke="#009668"
              strokeWidth="2.5"
            />
          </svg>
          <div className="mt-3 flex justify-between font-label text-[10px] uppercase tracking-widest text-secondary">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-primary-container p-8 text-white">
          <h3 className="mb-6 font-headline text-lg font-bold">
            Top Collections
          </h3>
          <ul className="flex-1 space-y-5">
            {TOP_COLLECTIONS.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-headline text-sm font-semibold">
                    {item.name}
                  </p>
                  <p className="font-label text-[10px] uppercase tracking-widest text-white/50">
                    {item.category}
                  </p>
                </div>
                <span className="font-headline text-sm font-bold text-emerald-bright">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/products"
            className="mt-6 rounded-md border border-white/20 py-3 text-center font-label text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-white/10"
          >
            View Inventory
          </Link>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-headline text-lg font-bold text-primary">
            Recent Transactions
          </h3>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 font-label text-[11px] font-bold uppercase tracking-widest text-secondary transition-colors hover:text-primary"
          >
            View All
            <LuArrowRight className="text-sm" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="pb-3 pr-4 font-bold">Order ID</th>
                <th className="pb-3 pr-4 font-bold">Customer</th>
                <th className="pb-3 pr-4 font-bold">Amount</th>
                <th className="pb-3 pr-4 font-bold">Status</th>
                <th className="pb-3 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {TRANSACTIONS.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-outline-variant/10 last:border-0"
                >
                  <td className="py-4 pr-4 font-headline font-bold text-primary">
                    {tx.id}
                  </td>
                  <td className="py-4 pr-4 text-on-surface">{tx.customer}</td>
                  <td className="py-4 pr-4 text-on-surface">{tx.amount}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${TX_BADGE[tx.status]}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-secondary">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
