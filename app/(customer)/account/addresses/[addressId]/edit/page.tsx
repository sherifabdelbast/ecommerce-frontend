"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddressForm from "../../../../../_components/AddressForm";
import { getAddressById, type Address } from "../../../../../_lib/addresses";

export default function EditAddressPage() {
  const params = useParams<{ addressId: string }>();
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await getAddressById(Number(params.addressId));
      if (cancelled) return;
      if (!result) {
        setNotFound(true);
      } else {
        setAddress(result);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [params.addressId]);

  if (loading) {
    return (
      <p className="px-6 py-12 font-body text-sm text-secondary sm:px-10 lg:px-16">
        Loading…
      </p>
    );
  }

  if (notFound || !address) {
    return (
      <p className="px-6 py-12 font-body text-sm text-error sm:px-10 lg:px-16">
        Address not found.
      </p>
    );
  }

  return (
    <AddressForm
      heading="Edit Address"
      subtitle="Update the details of this shipping destination."
      submitLabel="Save Changes"
      address={address}
    />
  );
}
