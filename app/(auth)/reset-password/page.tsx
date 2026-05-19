import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Define New Credentials | ARCHITECT",
  description: "Set a new password for your ARCHITECT account.",
};

type SearchParams = Record<string, string | string[] | undefined>;

/** Collapse a possibly-repeated query param to its first value. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// Reads the `?token=` reset token from the URL (CLAUDE.md). Submission wires
// to POST /v1/auth/reset-password when the auth layer lands.
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = first(params.token) ?? "";

  return (
    <main className="flex min-h-screen items-stretch">
      {/* Left — editorial architectural panel */}
      <section className="relative hidden overflow-hidden bg-primary-container lg:flex lg:w-1/2">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth/register-building.png"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-60 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-between p-16">
          <span className="font-headline text-3xl font-extrabold tracking-tighter text-surface-container-lowest">
            ARCHITECT
          </span>

          <div className="max-w-md">
            <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.2em] text-tertiary-fixed">
              Security Update
            </span>
            <h1 className="mb-6 font-headline text-5xl font-light leading-tight tracking-tight text-white">
              Define the <span className="font-bold italic">new</span> key to
              your archive.
            </h1>
            <div className="h-px w-12 bg-tertiary-fixed" />
          </div>

          <span className="font-label text-[10px] uppercase tracking-widest text-white/40">
            © 2026 ARCHITECT CURATIONS
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 -mb-32 -mr-32 h-64 w-64 rounded-tl-full bg-surface-container-lowest/5 backdrop-blur-3xl" />
      </section>

      {/* Right — new-password form */}
      <section className="flex w-full items-center justify-center bg-surface p-8 md:p-12 lg:w-1/2 lg:p-24">
        <div className="w-full max-w-md space-y-12">
          <div className="lg:hidden">
            <span className="font-headline text-2xl font-black tracking-tighter text-primary">
              ARCHITECT
            </span>
          </div>

          <header className="space-y-3">
            <h2 className="font-headline text-4xl font-semibold tracking-tight text-primary">
              Define New Credentials
            </h2>
            <p className="font-body text-sm leading-relaxed text-secondary">
              Choose a strong password to secure your curated profile — at least
              8 characters, including a symbol.
            </p>
          </header>

          <form className="space-y-8">
            {/* Reset token carried from the email link. */}
            <input type="hidden" name="token" value={token} />

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-label text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 py-4 font-body text-sm text-on-surface transition-all duration-300 placeholder:text-outline-variant focus:border-primary focus:ring-0"
                />
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="mb-2 block font-label text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  Confirm Password
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 py-4 font-body text-sm text-on-surface transition-all duration-300 placeholder:text-outline-variant focus:border-primary focus:ring-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-headline text-sm font-bold text-on-primary shadow-ambient transition-all duration-300 hover:from-primary hover:to-primary-container active:scale-[0.98]"
            >
              Update Password
              <LuArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <footer className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-secondary transition-colors hover:text-primary"
            >
              <LuArrowLeft className="text-base" />
              Back to Sign In
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}
