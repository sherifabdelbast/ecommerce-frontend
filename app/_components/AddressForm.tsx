import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { Address } from "../_lib/addresses";

type AddressFormProps = {
  /** Heading + submit copy differ between the new and edit routes. */
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing values when editing; omitted when creating. */
  address?: Address;
};

const FIELD_CLASS =
  "w-full rounded-sm border-none bg-surface-container-low px-4 py-3.5 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary";
const LABEL_CLASS =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/**
 * Shared address form — used by both the new-address and edit-address
 * routes. Submission wires to POST / PUT /v1/addresses later.
 */
export default function AddressForm({
  heading,
  subtitle,
  submitLabel,
  address,
}: AddressFormProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/account/addresses"
        className="mb-8 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Address Book
      </Link>

      <header className="mb-12">
        <h1 className="font-headline text-4xl font-light tracking-tighter text-primary sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-3 font-body text-sm text-secondary">{subtitle}</p>
      </header>

      <form className="space-y-8 rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
        <div>
          <label htmlFor="label" className={LABEL_CLASS}>
            Address Label
          </label>
          <input
            id="label"
            name="label"
            defaultValue={address?.label}
            placeholder="e.g. Primary Shipping, Work Studio"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="recipient_name" className={LABEL_CLASS}>
            Recipient Full Name
          </label>
          <input
            id="recipient_name"
            name="recipient_name"
            autoComplete="name"
            defaultValue={address?.recipientName}
            placeholder="Full name"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="line1" className={LABEL_CLASS}>
            Address Line 1
          </label>
          <input
            id="line1"
            name="line1"
            autoComplete="address-line1"
            defaultValue={address?.line1}
            placeholder="Street address"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="line2" className={LABEL_CLASS}>
            Address Line 2 <span className="text-outline">(optional)</span>
          </label>
          <input
            id="line2"
            name="line2"
            autoComplete="address-line2"
            defaultValue={address?.line2}
            placeholder="Unit, floor, suite"
            className={FIELD_CLASS}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className={LABEL_CLASS}>
              City
            </label>
            <input
              id="city"
              name="city"
              autoComplete="address-level2"
              defaultValue={address?.city}
              placeholder="City"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label htmlFor="state" className={LABEL_CLASS}>
              State / Region
            </label>
            <input
              id="state"
              name="state"
              autoComplete="address-level1"
              defaultValue={address?.state}
              placeholder="State"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label htmlFor="postal_code" className={LABEL_CLASS}>
              Postal Code
            </label>
            <input
              id="postal_code"
              name="postal_code"
              autoComplete="postal-code"
              defaultValue={address?.postalCode}
              placeholder="Postal code"
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className={LABEL_CLASS}>
              Country
            </label>
            <input
              id="country"
              name="country"
              autoComplete="country-name"
              defaultValue={address?.country}
              placeholder="Country"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL_CLASS}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={address?.phone}
              placeholder="+1 (000) 000-0000"
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_default"
            defaultChecked={address?.isDefault}
            className="h-4 w-4 rounded-sm text-emerald-accent focus:ring-emerald-accent"
          />
          <span className="font-body text-sm text-on-surface">
            Set as default shipping address
          </span>
        </label>

        <div className="flex gap-4 border-t border-outline-variant/20 pt-8">
          <button
            type="submit"
            className="rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary px-8 py-4 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98]"
          >
            {submitLabel}
          </button>
          <Link
            href="/account/addresses"
            className="rounded-md border border-outline-variant/30 px-8 py-4 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
