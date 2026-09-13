import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";

/**
 * Shipping methods data layer — backed by the Laravel API.
 *
 * Public `/shipping-methods` only returns active methods (used at
 * checkout). Admin screens need to see and manage inactive methods too,
 * so they go through the separate `/admin/shipping-methods` endpoints.
 */

export type ShippingMethod = {
  id: number;
  name: string;
  description: string | null;
  cost: number;
  estimatedDaysMin: number | null;
  estimatedDaysMax: number | null;
  estimatedDelivery: string | null;
  isActive: boolean;
  sortOrder: number;
};

export const getShippingMethods = cache(async (): Promise<ShippingMethod[]> => {
  const res = await apiFetch<Resource<ShippingMethod[]>>("/shipping-methods", {
    cache: "no-store",
  });
  return res.data;
});

export const getAdminShippingMethods = cache(
  async (): Promise<ShippingMethod[]> => {
    const res = await apiFetch<Paginated<ShippingMethod>>(
      "/admin/shipping-methods?per_page=100",
      { cache: "no-store" },
    );
    return res.data;
  },
);

export const getShippingMethodById = cache(
  async (id: number): Promise<ShippingMethod | null> => {
    try {
      const res = await apiFetch<Resource<ShippingMethod>>(
        `/admin/shipping-methods/${id}`,
        { cache: "no-store" },
      );
      return res.data;
    } catch {
      return null;
    }
  },
);
