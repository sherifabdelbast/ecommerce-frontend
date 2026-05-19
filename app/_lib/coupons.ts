import { cache } from "react";

/**
 * Coupons data layer.
 *
 * Mock today. Live version reads admin endpoints GET /v1/admin/coupons and
 * GET /v1/admin/coupons/{coupon}. Types mirror the planned `CouponResource`
 * so the swap stays local here.
 */

export type CouponType = "percentage" | "fixed";
export type CouponStatus = "active" | "scheduled" | "expired";

export type Coupon = {
  id: number;
  code: string;
  description: string;
  type: CouponType;
  /** Percentage points for `percentage`, USD amount for `fixed`. */
  value: number;
  /** Minimum cart subtotal in USD; null = no minimum. */
  minSubtotal: number | null;
  /** Total redemption cap; null = unlimited. */
  usageLimit: number | null;
  usageCount: number;
  startsOn: string;
  endsOn: string;
  status: CouponStatus;
};

const COUPONS: readonly Coupon[] = [
  {
    id: 1,
    code: "WELCOME15",
    description: "First-order discount for new collectors.",
    type: "percentage",
    value: 15,
    minSubtotal: 500,
    usageLimit: null,
    usageCount: 482,
    startsOn: "January 01, 2026",
    endsOn: "December 31, 2026",
    status: "active",
  },
  {
    id: 2,
    code: "ATELIER100",
    description: "$100 off Atelier limited editions.",
    type: "fixed",
    value: 100,
    minSubtotal: 1500,
    usageLimit: 200,
    usageCount: 47,
    startsOn: "April 01, 2026",
    endsOn: "July 31, 2026",
    status: "active",
  },
  {
    id: 3,
    code: "SUMMER25",
    description: "Seasonal 25% on Collections series.",
    type: "percentage",
    value: 25,
    minSubtotal: null,
    usageLimit: 1000,
    usageCount: 0,
    startsOn: "June 15, 2026",
    endsOn: "September 15, 2026",
    status: "scheduled",
  },
  {
    id: 4,
    code: "ARCHIVES10",
    description: "Archive members appreciation.",
    type: "percentage",
    value: 10,
    minSubtotal: null,
    usageLimit: 500,
    usageCount: 500,
    startsOn: "October 01, 2025",
    endsOn: "March 31, 2026",
    status: "expired",
  },
];

export const getCoupons = cache(async (): Promise<Coupon[]> => {
  return COUPONS.slice();
});

export const getCouponById = cache(
  async (id: number): Promise<Coupon | null> => {
    return COUPONS.find((c) => c.id === id) ?? null;
  },
);
