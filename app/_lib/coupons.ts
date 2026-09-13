import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";

/**
 * Coupon data layer — backed by the Laravel API's admin endpoints.
 *
 * `status` isn't a column in the database — it's computed here from
 * `isActive` + the valid date range, since the admin UI wants a single
 * active/scheduled/expired label rather than three separate fields.
 */

export type CouponType = "percentage" | "fixed";
export type CouponStatus = "active" | "scheduled" | "expired" | "inactive";

export type Coupon = {
  id: number;
  code: string;
  description: string | null;
  type: CouponType;
  value: number;
  minPurchase: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  perUserLimit: number | null;
  validFrom: string | null;
  validTo: string | null;
  isActive: boolean;
  status: CouponStatus;
};

type RawCoupon = Omit<Coupon, "status">;

function deriveStatus(coupon: RawCoupon): CouponStatus {
  if (!coupon.isActive) return "inactive";
  const now = new Date();
  if (coupon.validFrom && new Date(coupon.validFrom) > now) return "scheduled";
  if (coupon.validTo && new Date(coupon.validTo) < now) return "expired";
  return "active";
}

function withStatus(coupon: RawCoupon): Coupon {
  return { ...coupon, status: deriveStatus(coupon) };
}

export const getCoupons = cache(async (): Promise<Coupon[]> => {
  const res = await apiFetch<Paginated<RawCoupon>>(
    "/admin/coupons?per_page=100",
    { cache: "no-store" },
  );
  return res.data.map(withStatus);
});

export const getCouponById = cache(
  async (id: number): Promise<Coupon | null> => {
    try {
      const res = await apiFetch<Resource<RawCoupon>>(`/admin/coupons/${id}`, {
        cache: "no-store",
      });
      return withStatus(res.data);
    } catch {
      return null;
    }
  },
);
