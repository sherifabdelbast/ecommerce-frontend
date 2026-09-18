import { apiFetch, Resource } from "./api";

/**
 * Addresses data layer — backed by the Laravel API.
 *
 * `/addresses` requires auth:sanctum, so these are called client-side
 * (browser sends the session cookie automatically) — same pattern as
 * auth-context.tsx and wishlist.ts, not wrapped in React's server `cache()`.
 */

export type AddressType = "shipping" | "billing";

export type Address = {
  id: number;
  type: AddressType;
  label: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string | null;
  streetLine1: string;
  streetLine2: string | null;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  fullAddress: string;
  deliveryInstructions: string | null;
  isDefault: boolean;
  createdAt: string | null;
};

export async function getAddresses(): Promise<Address[]> {
  const res = await apiFetch<Resource<Address[]>>("/addresses");
  return res.data;
}

export async function getAddressById(id: number): Promise<Address | null> {
  try {
    const res = await apiFetch<Resource<Address>>(`/addresses/${id}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function setDefaultAddress(id: number): Promise<Address> {
  const res = await apiFetch<Resource<Address>>(
    `/addresses/${id}/set-default`,
    {
      method: "PATCH",
    },
  );
  return res.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await apiFetch(`/addresses/${id}`, { method: "DELETE" });
}
