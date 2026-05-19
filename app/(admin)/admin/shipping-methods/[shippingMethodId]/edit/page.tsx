import { notFound } from "next/navigation";
import ShippingMethodForm from "@/app/_components/ShippingMethodForm";
import { getShippingMethodById } from "@/app/_lib/shipping-methods";

type RouteParams = { shippingMethodId: string };

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function EditShippingMethodPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { shippingMethodId } = await params;
  const method = await getShippingMethodById(Number(shippingMethodId));
  if (!method) notFound();

  return (
    <ShippingMethodForm
      heading="Edit Shipping Method"
      subtitle={`Update the details of ${method.name}.`}
      submitLabel="Save Changes"
      method={method}
    />
  );
}
