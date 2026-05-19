import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuBadgeCheck, LuX } from "react-icons/lu";
import RegisterForm from "@/app/_components/RegisterForm";

export const metadata: Metadata = {
  title: "Request Access | ARCHITECT",
  description: "Create your ARCHITECT account to start curating.",
};

export default function RegisterPage() {
  return (
    <>
      <main className="flex min-h-screen w-full">
        {/* Left — editorial gradient panel */}
        <section className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-primary-container to-primary p-24 lg:flex">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Image
              src="/images/auth/register-building.png"
              alt=""
              fill
              priority
              sizes="50vw"
              className="object-cover grayscale"
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="mb-12 block font-headline text-sm font-bold uppercase tracking-[0.2em] text-tertiary-fixed">
              The New Standard
            </span>
            <h1 className="mb-8 font-headline text-6xl font-extralight leading-[1.1] tracking-tighter text-surface-container-lowest">
              Architecture of <br />
              <span className="font-semibold text-tertiary-fixed">
                Digital Curations
              </span>
            </h1>
            <p className="max-w-md font-body text-lg font-light leading-relaxed text-white/75">
              Join an exclusive community dedicated to the intersection of
              modern form, functional objects, and sustainable atelier
              practices.
            </p>

            <div className="mt-16 flex items-center gap-8">
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-surface-container-lowest">
                  12k+
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
                  Global Curators
                </span>
              </div>
              <div className="h-10 w-px bg-on-primary-fixed-variant" />
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-surface-container-lowest">
                  48
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
                  Design Ateliers
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 max-w-xs rounded-xl border border-white/10 bg-surface-container-lowest/5 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-tertiary-fixed text-primary-container">
                <LuBadgeCheck className="text-lg" />
              </div>
              <div>
                <p className="font-body text-xs font-light italic leading-relaxed text-white">
                  &ldquo;The definitive platform for those who view design as a
                  spatial necessity.&rdquo;
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-white/55">
                  — ARCHITECT JOURNAL
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right — registration form */}
        <section className="flex w-full items-center justify-center bg-surface-container-lowest p-8 md:p-16 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-12">
              <h2 className="font-headline text-3xl font-black tracking-tighter text-primary">
                ARCHITECT
              </h2>
              <p className="mt-2 font-body text-sm font-light text-secondary">
                Create your account to start curating.
              </p>
            </div>

            <RegisterForm />

            <div className="mt-12 text-center">
              <p className="font-body text-sm font-light text-secondary">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="ml-1 font-bold text-primary underline-offset-4 transition-all hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>

            <div className="mt-16 border-t border-outline-variant/20 pt-8">
              <p className="mb-6 text-center font-label text-[9px] font-bold uppercase tracking-[0.3em] text-outline-variant">
                Or continue with
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center bg-surface-container-low px-6 transition-colors hover:bg-surface-container-high"
                >
                  <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">
                    Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex h-12 items-center justify-center bg-surface-container-low px-6 transition-colors hover:bg-surface-container-high"
                >
                  <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">
                    Apple
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link
        href="/"
        aria-label="Close and return home"
        className="fixed right-8 top-8 z-50 flex h-10 w-10 items-center justify-center text-secondary backdrop-blur-md transition-colors hover:text-primary lg:bg-transparent"
      >
        <LuX className="text-2xl" />
      </Link>
    </>
  );
}
