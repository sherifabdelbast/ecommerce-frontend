import { cache } from "react";

/**
 * Shipping methods data layer.
 *
 * Mock today. Live version reads admin endpoints GET /v1/admin/shipping-methods
 * and GET /v1/admin/shipping-methods/{method}. Types mirror the planned
 * `ShippingMethodResource` so the swap stays local here.
 */

export type ShippingMethodStatus = "active" | "inactive";

export type ShippingMethod = {
  id: number;
  name: string;
  description: string;
  /** Carrier label shown alongside the method. */
  carrier: string;
  /** Flat rate in USD. */
  price: number;
  /** Free above this cart subtotal; null = never. */
  freeAbove: number | null;
  estimatedDays: string;
  sortOrder: number;
  status: ShippingMethodStatus;
};

const METHODS: readonly ShippingMethod[] = [
  {
    id: 1,
    name: "White Glove Standard",
    description:
      "Two-person delivery, unboxing and on-site placement included.",
    carrier: "Atelier Logistics",
    price: 250,
    freeAbove: 5000,
    estimatedDays: "10 – 14 days",
    sortOrder: 1,
    status: "active",
  },
  {
    id: 2,
    name: "International Express",
    description: "Climate-controlled freight to all major EU and Asian hubs.",
    carrier: "DHL Express",
    price: 480,
    freeAbove: null,
    estimatedDays: "5 – 7 days",
    sortOrder: 2,
    status: "active",
  },
  {
    id: 3,
    name: "Studio Pickup",
    description: "Collect from the New York or Milan ateliers by appointment.",
    carrier: "ARCHITECT",
    price: 0,
    freeAbove: 0,
    estimatedDays: "Schedule",
    sortOrder: 3,
    status: "active",
  },
  {
    id: 4,
    name: "Domestic Ground",
    description: "Insured ground transport within the contiguous US.",
    carrier: "FedEx Freight",
    price: 95,
    freeAbove: 2500,
    estimatedDays: "4 – 6 days",
    sortOrder: 4,
    status: "inactive",
  },
];

export const getShippingMethods = cache(async (): Promise<ShippingMethod[]> => {
  return METHODS.slice();
});

export const getShippingMethodById = cache(
  async (id: number): Promise<ShippingMethod | null> => {
    return METHODS.find((m) => m.id === id) ?? null;
  },
);
