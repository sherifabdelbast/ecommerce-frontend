import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";

/**
 * Orders data layer — backed by the Laravel API.
 */

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";

export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  price: number;
  subtotal: number;
};

/**
 * Raw JSON snapshot taken at checkout time — shape isn't strictly typed
 * server-side, so this is read defensively rather than assumed exact.
 */
export type ShippingAddressSnapshot = Record<string, unknown>;

export type Order = {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string | null;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddressSnapshot;
  billingAddress: ShippingAddressSnapshot | null;
  trackingNumber: string | null;
  customerNotes: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  itemsCount: number | null;
  items: OrderItem[];
  shippingMethod: { id: number; name: string } | null;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  createdAt: string | null;
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "In Transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

/** Reads a value out of the raw address snapshot under any of several likely key names. */
export function addressField(
  address: ShippingAddressSnapshot,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = address[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return "";
}

/** Order history list for the signed-in customer. */
export const getOrders = cache(async (): Promise<Order[]> => {
  const res = await apiFetch<Paginated<Order>>("/orders?per_page=50", {
    cache: "no-store",
  });
  return res.data;
});

/** Single order by its order number (customer-scoped). */
export const getOrderByNumber = cache(
  async (orderNumber: string): Promise<Order | null> => {
    try {
      const res = await apiFetch<Resource<Order>>(`/orders/${orderNumber}`, {
        cache: "no-store",
      });
      return res.data;
    } catch {
      return null;
    }
  },
);

/** All order numbers — used by `generateStaticParams` for the detail route. */
export const getAllOrderNumbers = cache(async (): Promise<string[]> => {
  const orders = await getOrders();
  return orders.map((o) => o.orderNumber);
});

/** Admin: all orders, any customer. */
export const getAdminOrders = cache(async (): Promise<Order[]> => {
  const res = await apiFetch<Paginated<Order>>("/admin/orders?per_page=100", {
    cache: "no-store",
  });
  return res.data;
});

/** Admin: single order by id. */
export const getAdminOrderById = cache(
  async (id: number): Promise<Order | null> => {
    try {
      const res = await apiFetch<Resource<Order>>(`/admin/orders/${id}`, {
        cache: "no-store",
      });
      return res.data;
    } catch {
      return null;
    }
  },
);
