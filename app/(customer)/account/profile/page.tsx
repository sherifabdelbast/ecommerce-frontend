"use client";

import { LuArrowRight, LuMail, LuPhone, LuCamera, LuShieldCheck } from "react-icons/lu";
import { initials, memberSince } from "@/app/_lib/account";
import { useUser } from "@/app/_lib/auth-context";

/**
 * Account profile — CSR, auth-gated (CLAUDE.md). Editable account details
 * sourced from the AuthProvider's `/auth/me` session. Submit wires to
 * `PUT /v1/profile` (still mock-side until that mutation lands).
 */
const FIELD_CLASS =
  "w-full rounded-md border-none bg-surface-container-low px-4 py-3.5 font-body text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary";
const LABEL_CLASS =
  "mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

export default function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="px-6 py-12 sm:px-10 lg:px-16">
        <p className="font-body text-sm text-secondary">Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="px-6 py-12 sm:px-10 lg:px-16">
        <p className="font-body text-sm text-secondary">
          You are not signed in.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-12">
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl">
          Personal Information
        </h1>
        <p className="mt-3 font-body text-sm text-secondary">
          Manage your account details and curated preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form card */}
        <div className="lg:col-span-2">
          <form className="space-y-8 rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first_name" className={LABEL_CLASS}>
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  autoComplete="given-name"
                  defaultValue={user.firstName}
                  placeholder="First name"
                  className={FIELD_CLASS}
                />
              </div>
              <div>
                <label htmlFor="last_name" className={LABEL_CLASS}>
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  autoComplete="family-name"
                  defaultValue={user.lastName}
                  placeholder="Last name"
                  className={FIELD_CLASS}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={LABEL_CLASS}>
                Email Address
              </label>
              <div className="relative">
                <LuMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-secondary" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={user.email}
                  placeholder="email@example.com"
                  className={`${FIELD_CLASS} pl-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={LABEL_CLASS}>
                Phone Number
              </label>
              <div className="relative">
                <LuPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-secondary" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  defaultValue={user.phone ?? ""}
                  placeholder="+1 (000) 000-0000"
                  className={`${FIELD_CLASS} pl-11`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary px-8 py-4 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98] max-sm:w-full"
            >
              Update Profile
              <LuArrowRight className="text-base transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        {/* Side cards */}
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-container-lowest p-8 text-center shadow-ambient">
            <div className="relative">
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-primary font-headline text-3xl font-bold text-on-primary">
                {initials(user)}
              </span>
              <button
                type="button"
                aria-label="Upload profile picture"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-accent text-white transition-opacity hover:opacity-70"
              >
                <LuCamera className="text-base" />
              </button>
            </div>
            <div>
              <p className="font-headline text-lg font-bold text-primary">
                {user.firstName} {user.lastName}
              </p>
              <p className="mt-1 font-label text-[10px] uppercase tracking-widest text-secondary">
                Member since {memberSince(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-primary-container p-8 text-white">
            <LuShieldCheck className="text-2xl text-emerald-bright" />
            <h2 className="font-headline text-lg font-bold">
              Account Security
            </h2>
            <p className="font-body text-sm leading-relaxed text-white/70">
              Enhance your security with two-factor authentication and
              quarterly password rotations.
            </p>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-white/20 py-3 font-label text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
            >
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
