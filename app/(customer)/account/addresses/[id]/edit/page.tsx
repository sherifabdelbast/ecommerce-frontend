import { notFound } from "next/navigation";
import AddressForm from "../../../../../_components/AddressForm";
import { getAddressById } from "../../../../../_lib/addresses";

type RouteParams = { id: string };

// Auth-gated, user-private (CLAUDE.md → CSR) — rendered on demand, never
// prerendered into static HTML at build time.
export default async function EditAddressPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const address = await getAddressById(Number(id));
  if (!address) notFound();

  return (
    <AddressForm
      heading="Edit Address"
      subtitle="Update the details of this shipping destination."
      submitLabel="Save Changes"
      address={address}
    />
  );
}
