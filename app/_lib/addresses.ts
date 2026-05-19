import { cache } from "react";

/**
 * Addresses data layer.
 *
 * Currently a static mock. The live version uses the authenticated
 * endpoints GET/POST /v1/addresses, GET/PUT/DELETE /v1/addresses/{id} and
 * PATCH /v1/addresses/{id}/set-default. The `Address` type mirrors the
 * intended API shape so the swap stays local.
 */

export type Address = {
  id: number;
  /** Nickname shown as the card badge, e.g. "Primary Shipping". */
  label: string;
  recipientName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

const ADDRESSES: readonly Address[] = [
  {
    id: 1,
    label: "Primary Shipping",
    recipientName: "Julian Abernathy",
    line1: "721 Architectural Way",
    line2: "Penthouse 4B",
    city: "New York",
    state: "NY",
    postalCode: "10013",
    country: "United States",
    phone: "+1 (212) 555-0198",
    isDefault: true,
  },
  {
    id: 2,
    label: "Work Studio",
    recipientName: "ARCHITECT Office",
    line1: "900 Industrial Boulevard",
    line2: "Floor 12, Studio C",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "United States",
    phone: "+1 (512) 555-0432",
    isDefault: false,
  },
  {
    id: 3,
    label: "Summer Residence",
    recipientName: "Julian Abernathy",
    line1: "42 Shoreline Road",
    line2: "",
    city: "East Hampton",
    state: "NY",
    postalCode: "11937",
    country: "United States",
    phone: "+1 (631) 555-0821",
    isDefault: false,
  },
];

/** Address list. */
export const getAddresses = cache(async (): Promise<Address[]> => {
  return ADDRESSES.slice();
});

/** Single address by id. */
export const getAddressById = cache(
  async (id: number): Promise<Address | null> => {
    return ADDRESSES.find((a) => a.id === id) ?? null;
  },
);

/** All ids — used by `generateStaticParams` for the edit route. */
export function getAllAddressIds(): number[] {
  return ADDRESSES.map((a) => a.id);
}
