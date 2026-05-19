import { notFound } from "next/navigation";
import AddressForm from "../../../../../_components/AddressForm";
import { getAddressById, getAllAddressIds } from "../../../../../_lib/addresses";

type RouteParams = { id: string };

/** Pre-render every known address. */
export function generateStaticParams(): RouteParams[] {
  return getAllAddressIds().map((id) => ({ id: String(id) }));
}

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
