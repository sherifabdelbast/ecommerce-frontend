"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LuArrowRight } from "react-icons/lu";
import { ApiError } from "@/app/_lib/api";
import { useUser } from "@/app/_lib/auth-context";

/**
 * Login form — submits to `POST /v1/auth/login` via the AuthProvider, which
 * sets the Sanctum session cookie and rehydrates the user. On success the
 * router pushes to `/account/profile`.
 */
export default function LoginForm() {
  const { login } = useUser();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await login({
        email: String(data.get("email") ?? ""),
        password: String(data.get("password") ?? ""),
      });
      router.push("/account/profile");
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : "Sign in failed. Try again.";
      setError(msg);
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
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
            required
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
            required
            placeholder="••••••••"
            className="w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 py-4 font-body text-sm text-on-surface transition-all duration-300 placeholder:text-outline-variant focus:border-primary focus:ring-0"
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-md bg-error-container px-4 py-3 font-body text-sm text-error"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary py-5 font-headline text-sm font-bold text-on-primary shadow-ambient transition-all duration-300 hover:from-primary hover:to-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign In to Dashboard"}
        <LuArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
