import { cache } from "react";

/**
 * Payments data layer.
 *
 * Mock today. Live version reads GET /v1/admin/payments/{payment}. Types
 * mirror the planned `PaymentResource` so the swap stays local here.
 */

export type PaymentStatus = "captured" | "pending" | "refunded" | "failed";
export type PaymentMethod = "card" | "wire" | "paypal";

export type PaymentEvent = {
  label: string;
  timestamp: string;
  detail?: string;
};

export type Payment = {
  id: number;
  /** Provider reference (Stripe pi_…, Adyen psp_…, etc.). */
  reference: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  /** Last 4 digits for card, IBAN tail for wire, email for paypal. */
  source: string;
  processedOn: string;
  events: PaymentEvent[];
};

const PAYMENTS: readonly Payment[] = [
  {
    id: 1,
    reference: "pi_3PWqVm2eZvKYlo2C0pZxNkR8",
    orderNumber: "ARC-99281-Z",
    customerName: "Julian Abernathy",
    customerEmail: "curator@architect-atelier.com",
    amount: 2450,
    currency: "USD",
    status: "captured",
    method: "card",
    source: "Visa •••• 4242",
    processedOn: "October 14, 2026 · 14:08",
    events: [
      { label: "Created", timestamp: "Oct 14, 2026 14:06" },
      { label: "Authorized", timestamp: "Oct 14, 2026 14:07", detail: "3DS challenge cleared" },
      { label: "Captured", timestamp: "Oct 14, 2026 14:08", detail: "$2,450.00 USD" },
    ],
  },
  {
    id: 2,
    reference: "pi_3PXr01ZvKYlo2C19aBC4WkP2",
    orderNumber: "ARC-98114-X",
    customerName: "Eloise Marchetti",
    customerEmail: "eloise@studio-marchetti.it",
    amount: 6820,
    currency: "USD",
    status: "captured",
    method: "wire",
    source: "IBAN •••• 9921",
    processedOn: "September 28, 2026 · 09:42",
    events: [
      { label: "Created", timestamp: "Sep 26, 2026 11:00" },
      { label: "Funds received", timestamp: "Sep 28, 2026 09:42", detail: "$6,820.00 USD" },
    ],
  },
  {
    id: 3,
    reference: "pi_3PXr01ZvKYlo2C19failedX",
    orderNumber: "ARC-97550-A",
    customerName: "Henri Volk",
    customerEmail: "h.volk@volk-architecture.de",
    amount: 1850,
    currency: "USD",
    status: "refunded",
    method: "card",
    source: "Mastercard •••• 5454",
    processedOn: "August 03, 2026 · 16:11",
    events: [
      { label: "Created", timestamp: "Aug 01, 2026 10:14" },
      { label: "Captured", timestamp: "Aug 01, 2026 10:15", detail: "$1,850.00 USD" },
      { label: "Refunded", timestamp: "Aug 03, 2026 16:11", detail: "Customer cancellation" },
    ],
  },
];

export const getPaymentById = cache(
  async (id: number): Promise<Payment | null> => {
    return PAYMENTS.find((p) => p.id === id) ?? null;
  },
);
