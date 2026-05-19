import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import type { AdminUser } from "@/app/_lib/users";

type UserFormProps = {
  heading: string;
  subtitle: string;
  submitLabel: string;
  /** Existing user when editing; omitted when creating. */
  user?: AdminUser;
};

const FIELD =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-accent";
const LABEL =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Shared admin user form — backs the create and edit routes. */
export default function UserForm({
  heading,
  subtitle,
  submitLabel,
  user,
}: UserFormProps) {
  const isNew = user === undefined;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/users"
        className="mb-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        <LuArrowLeft className="text-base" />
        Users
      </Link>

      <header className="mb-8">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
          {heading}
        </h2>
        <p className="mt-1 font-body text-sm text-secondary">{subtitle}</p>
      </header>

      <form className="space-y-6 rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first_name" className={LABEL}>
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              defaultValue={user?.firstName}
              placeholder="Julian"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="last_name" className={LABEL}>
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              defaultValue={user?.lastName}
              placeholder="Abernathy"
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
            placeholder="name@studio.com"
            className={FIELD}
          />
        </div>

        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user?.phone ?? ""}
            placeholder="+1 (555) 000-0000"
            className={FIELD}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="role" className={LABEL}>
              Role
            </label>
            <select
              id="role"
              name="role"
              defaultValue={user?.role ?? "customer"}
              className={FIELD}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className={LABEL}>
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={user?.status ?? "active"}
              className={FIELD}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {isNew ? (
          <div>
            <label htmlFor="password" className={LABEL}>
              Initial Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 12 characters"
              className={FIELD}
            />
          </div>
        ) : null}

        <div className="flex gap-4 border-t border-outline-variant/20 pt-6">
          <button
            type="submit"
            className="rounded-md bg-primary px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
          >
            {submitLabel}
          </button>
          <Link
            href="/admin/users"
            className="rounded-md border border-outline-variant/30 px-8 py-3.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
