import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";

/**
 * Payments data layer — backed by the Laravel API's admin endpoints.
 */

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type Payment = {
  id: number;
  transactionId: string | null;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  refundedAmount: number | null;
  paidAt: string | null;
  order: {
    id: number;
    orderNumber: string;
    customer: { id: number; name: string; email: string } | null;
  } | null;
};

export const getPayments = cache(async (): Promise<Payment[]> => {
  const res = await apiFetch<Paginated<Payment>>(
    "/admin/payments?per_page=100",
    { cache: "no-store" },
  );
  return res.data;
});

export const getPaymentById = cache(
  async (id: number): Promise<Payment | null> => {
    try {
      const res = await apiFetch<Resource<Payment>>(`/payments/${id}`, {
        cache: "no-store",
      });
      return res.data;
    } catch {
      return null;
    }
  },
);
