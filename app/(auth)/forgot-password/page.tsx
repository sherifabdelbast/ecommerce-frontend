import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Recover Access | ARCHITECT",
  description: "Reset the password for your ARCHITECT account.",
};

// Static: no data needed (CLAUDE.md). Submission wires to
// POST /v1/auth/forgot-password when the auth layer lands.
export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-stretch">
      {/* Left — editorial architectural panel */}
      <section className="relative hidden overflow-hidden bg-primary-container lg:flex lg:w-1/2">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth/login-interior.png"
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
              Security Protocol
            </span>
            <h1 className="mb-6 font-headline text-5xl font-light leading-tight tracking-tight text-white">
              A secure link, sent <span className="font-bold italic">only</span>{" "}
              to you.
            </h1>
            <div className="h-px w-12 bg-tertiary-fixed" />
          </div>

          <span className="font-label text-[10px] uppercase tracking-widest text-white/40">
            © 2026 ARCHITECT CURATIONS
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 -mb-32 -mr-32 h-64 w-64 rounded-tl-full bg-surface-container-lowest/5 backdrop-blur-3xl" />
      </section>

      {/* Right — recovery form */}
      <section className="flex w-full items-center justify-center bg-surface p-8 md:p-12 lg:w-1/2 lg:p-24">
        <div className="w-full max-w-md space-y-12">
          <div className="lg:hidden">
            <span className="font-headline text-2xl font-black tracking-tighter text-primary">
              ARCHITECT
            </span>
          </div>

          <header className="space-y-3">
            <h2 className="font-headline text-4xl font-semibold tracking-tight text-primary">
              Recover Access
            </h2>
            <p className="font-body text-sm leading-relaxed text-secondary">
              Enter the email associated with your atelier account. We will send
              a secure link to reset your password.
            </p>
          </header>

          <form className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-label text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@studio.com"
                className="w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 py-4 font-body text-sm text-on-surface transition-all duration-300 placeholder:text-outline-variant focus:border-primary focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-headline text-sm font-bold text-on-primary shadow-ambient transition-all duration-300 hover:from-primary hover:to-primary-container active:scale-[0.98]"
            >
              Send Reset Link
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
