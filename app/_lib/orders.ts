import { cache } from "react";

/**
 * Orders data layer.
 *
 * Currently a static mock. The live version reads the authenticated
 * endpoints GET /v1/orders and GET /v1/orders/{order}. The exported types
 * mirror the intended API shape so the swap stays local to this file.
 */

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type OrderItem = {
  name: string;
  image: string;
  alt: string;
  /** Variant / edition line. */
  variant: string;
  price: number;
  quantity: number;
  sku: string;
};

export type TimelineStep = {
  label: string;
  /** Human timestamp, omitted while the step is still pending. */
  timestamp?: string;
  complete: boolean;
};

export type ShippingAddress = {
  name: string;
  lines: string[];
};

export type Order = {
  orderNumber: string;
  placedOn: string;
  status: OrderStatus;
  /** Headline product label for the history card. */
  title: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentLabel: string;
  carrier?: string;
  tracking?: string;
  estimatedArrival?: string;
  deliveredOn?: string;
  timeline: TimelineStep[];
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "In Transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const ORDERS: readonly Order[] = [
  {
    orderNumber: "ARC-99281-Z",
    placedOn: "October 14, 2026",
    status: "shipped",
    title: "The Monolith Chair & Cemento Set",
    subtotal: 2270,
    shipping: 25,
    tax: 155,
    total: 2450,
    items: [
      {
        name: "Monolith Chair",
        image: "/images/products/monolith-chair.png",
        alt: "White concrete U-shaped monolith chair",
        variant: "Series 01 • Raw Concrete",
        price: 1850,
        quantity: 1,
        sku: "CHR-MONO-01",
      },
      {
        name: "Cemento Lamp",
        image: "/images/products/cemento-lamp.png",
        alt: "Architectural concrete desk lamp",
        variant: "Series 02 • Cast Grey",
        price: 420,
        quantity: 1,
        sku: "LMP-CEM-02",
      },
    ],
    shippingAddress: {
      name: "Julian Abernathy",
      lines: [
        "112 Hudson Street, Suite 4B",
        "New York, NY 10013",
        "United States",
      ],
    },
    paymentLabel: "Visa ending in •••• 9012",
    carrier: "FedEx",
    tracking: "9283746501",
    estimatedArrival: "Oct 22 — Oct 24",
    timeline: [
      { label: "Order Placed", timestamp: "Oct 14, 14:32", complete: true },
      { label: "Processing", timestamp: "Oct 14, 16:45", complete: true },
      { label: "Shipped", timestamp: "Oct 15, 09:12", complete: true },
      { label: "Delivered", complete: false },
    ],
  },
  {
    orderNumber: "ARC-98114-X",
    placedOn: "September 02, 2026",
    status: "delivered",
    title: "Vestige Table",
    subtotal: 7925,
    shipping: 45,
    tax: 150,
    total: 8120,
    items: [
      {
        name: "Vestige Table",
        image: "/images/products/vestige-table.png",
        alt: "Geometric dining table with a travertine pedestal base",
        variant: "Series 03 • Travertine",
        price: 3200,
        quantity: 2,
        sku: "TBL-VES-03",
      },
    ],
    shippingAddress: {
      name: "Julian Abernathy",
      lines: [
        "112 Hudson Street, Suite 4B",
        "New York, NY 10013",
        "United States",
      ],
    },
    paymentLabel: "Visa ending in •••• 9012",
    carrier: "DHL",
    tracking: "5519028374",
    deliveredOn: "September 08, 2026",
    timeline: [
      { label: "Order Placed", timestamp: "Sep 02, 10:05", complete: true },
      { label: "Processing", timestamp: "Sep 02, 13:20", complete: true },
      { label: "Shipped", timestamp: "Sep 03, 08:40", complete: true },
      { label: "Delivered", timestamp: "Sep 08, 11:30", complete: true },
    ],
  },
  {
    orderNumber: "ARC-97550-A",
    placedOn: "August 21, 2026",
    status: "delivered",
    title: "Grid Storage System",
    subtotal: 4380,
    shipping: 25,
    tax: 95,
    total: 4500,
    items: [
      {
        name: "Grid Storage",
        image: "/images/products/grid-storage.png",
        alt: "Modular brushed-steel grid shelving unit",
        variant: "Atelier • Brushed Steel",
        price: 1150,
        quantity: 3,
        sku: "STG-GRID-AT",
      },
    ],
    shippingAddress: {
      name: "Julian Abernathy",
      lines: [
        "112 Hudson Street, Suite 4B",
        "New York, NY 10013",
        "United States",
      ],
    },
    paymentLabel: "Visa ending in •••• 9012",
    carrier: "FedEx",
    tracking: "7740088821",
    deliveredOn: "August 30, 2026",
    timeline: [
      { label: "Order Placed", timestamp: "Aug 21, 09:15", complete: true },
      { label: "Processing", timestamp: "Aug 21, 12:00", complete: true },
      { label: "Shipped", timestamp: "Aug 22, 07:55", complete: true },
      { label: "Delivered", timestamp: "Aug 30, 15:10", complete: true },
    ],
  },
];

/** Order history list. */
export const getOrders = cache(async (): Promise<Order[]> => {
  return ORDERS.slice();
});

/** Single order by its order number. */
export const getOrderByNumber = cache(
  async (orderNumber: string): Promise<Order | null> => {
    return ORDERS.find((o) => o.orderNumber === orderNumber) ?? null;
  },
);

/** All order numbers — used by `generateStaticParams` for the detail route. */
export function getAllOrderNumbers(): string[] {
  return ORDERS.map((o) => o.orderNumber);
}
