"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LuMapPinPlus, LuPencil, LuTrash2, LuPhone } from "react-icons/lu";
import {
  getAddresses,
  deleteAddress,
  type Address,
} from "../../../_lib/addresses";

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getAddresses();
        if (!cancelled) setAddresses(data);
      } catch {
        if (!cancelled) setError("Couldn't load your addresses.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: number) {
    const previous = addresses;
    setAddresses((current) => current.filter((a) => a.id !== id));
    try {
      await deleteAddress(id);
    } catch {
      setAddresses(previous);
    }
  }

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-12">
        <span className="mb-3 block font-label text-[10px] uppercase tracking-[0.2em] text-secondary">
          Personal Archive
        </span>
        <h1 className="font-headline text-4xl font-light tracking-tighter text-primary sm:text-5xl">
          Address Book
        </h1>
        <p className="mt-3 max-w-xl font-body text-sm text-secondary">
          Manage your shipping destinations and billing locations within your
          architectural profile. Each entry is curated for seamless checkout.
        </p>
      </header>

      {loading ? (
        <p className="font-body text-sm text-secondary">
          Loading your addresses…
        </p>
      ) : error ? (
        <p className="font-body text-sm text-error">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <Link
            href="/account/addresses/new"
            className="group flex h-80 flex-col items-center justify-center gap-3 border-2 border-dashed border-outline-variant bg-surface-container-low transition-colors hover:border-primary"
          >
            <LuMapPinPlus className="text-4xl text-outline transition-colors group-hover:text-primary" />
            <span className="font-headline text-lg font-medium text-primary">
              Add New Address
            </span>
          </Link>

          {addresses.map((address) => (
            <article
              key={address.id}
              className="group relative flex h-80 flex-col justify-between bg-surface-container-low p-10"
            >
              <div className="absolute right-8 top-8 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  href={`/account/addresses/${address.id}/edit`}
                  aria-label={`Edit ${address.label ?? address.fullName}`}
                  className="flex h-9 w-9 items-center justify-center rounded-sm bg-surface-container-highest text-secondary transition-colors hover:text-primary"
                >
                  <LuPencil className="text-sm" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(address.id)}
                  aria-label={`Delete ${address.label ?? address.fullName}`}
                  className="flex h-9 w-9 items-center justify-center rounded-sm bg-surface-container-highest text-secondary transition-colors hover:bg-error-container hover:text-error"
                >
                  <LuTrash2 className="text-sm" />
                </button>
              </div>

              <div>
                <span
                  className={`inline-block rounded-sm px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest ${
                    address.isDefault
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : "bg-surface-container-highest text-on-surface-variant"
                  }`}
                >
                  {address.label ?? address.type}
                </span>
                <h2 className="mt-4 font-headline text-2xl font-semibold text-primary">
                  {address.fullName}
                </h2>
                <div className="mt-3 space-y-1 font-body text-sm text-secondary">
                  <p>{address.streetLine1}</p>
                  {address.streetLine2 ? <p>{address.streetLine2}</p> : null}
                  <p>
                    {address.city}, {address.stateProvince} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-outline-variant/30 pt-5 font-body text-sm text-secondary">
                <LuPhone className="text-base" />
                {address.phone}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
