import { notFound } from "next/navigation";
import CouponForm from "@/app/_components/CouponForm";
import { getCouponById } from "@/app/_lib/coupons";

type RouteParams = { couponId: string };

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function EditCouponPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { couponId } = await params;
  const coupon = await getCouponById(Number(couponId));
  if (!coupon) notFound();

  return (
    <CouponForm
      heading="Edit Coupon"
      subtitle={`Update the details of ${coupon.code}.`}
      submitLabel="Save Changes"
      coupon={coupon}
    />
  );
}
