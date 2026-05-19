import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuLandmark } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export const metadata: Metadata = {
  title: "Sign In | ARCHITECT",
  description: "Access your curated collection and architectural archives.",
};

export default function LoginPage() {
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
              Archive Selection 01
            </span>
            <h1 className="mb-6 font-headline text-5xl font-light leading-tight tracking-tight text-white">
              Curating the <span className="font-bold italic">Unspoken</span>{" "}
              essence of space.
            </h1>
            <div className="h-px w-12 bg-tertiary-fixed" />
          </div>

          <span className="font-label text-[10px] uppercase tracking-widest text-white/40">
            © 2026 ARCHITECT CURATIONS
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 -mb-32 -mr-32 h-64 w-64 rounded-tl-full bg-surface-container-lowest/5 backdrop-blur-3xl" />
      </section>

      {/* Right — login form */}
      <section className="flex w-full items-center justify-center bg-surface p-8 md:p-12 lg:w-1/2 lg:p-24">
        <div className="w-full max-w-md space-y-12">
          <div className="lg:hidden">
            <span className="font-headline text-2xl font-black tracking-tighter text-primary">
              ARCHITECT
            </span>
          </div>

          <header className="space-y-3">
            <h2 className="font-headline text-4xl font-semibold tracking-tight text-primary">
              Welcome Back
            </h2>
            <p className="font-body text-sm leading-relaxed text-secondary">
              Access your curated collection and architectural archives.
            </p>
          </header>

          <form className="space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-label text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  Professional Email
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

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block font-label text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-label text-[10px] uppercase tracking-widest text-on-tertiary-container transition-colors hover:text-on-tertiary-fixed-variant"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 py-4 font-body text-sm text-on-surface transition-all duration-300 placeholder:text-outline-variant focus:border-primary focus:ring-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-headline text-sm font-bold text-on-primary shadow-ambient transition-all duration-300 hover:from-primary hover:to-primary-container active:scale-[0.98]"
            >
              Sign In to Dashboard
              <LuArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-grow bg-surface-variant" />
            <span className="px-2 font-label text-[10px] uppercase tracking-widest text-outline">
              Or continue with
            </span>
            <div className="h-px flex-grow bg-surface-variant" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-md border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 transition-colors hover:bg-surface-container-high"
            >
              <LuLandmark className="text-lg text-on-surface-variant" />
              <span className="font-label text-[11px] font-semibold uppercase tracking-tight text-primary">
                Enterprise
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-md border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 transition-colors hover:bg-surface-container-high"
            >
              <FcGoogle className="text-lg" />
              <span className="font-label text-[11px] font-semibold uppercase tracking-tight text-primary">
                Google
              </span>
            </button>
          </div>

          <footer className="text-center">
            <p className="font-body text-sm text-secondary">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary underline-offset-4 transition-all hover:underline hover:decoration-tertiary-fixed hover:decoration-2"
              >
                Create account
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
