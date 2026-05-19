"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/app/_lib/api";
import { useUser } from "@/app/_lib/auth-context";

const INPUT =
  "h-12 w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 text-sm text-on-surface transition-all placeholder:text-outline-variant focus:border-primary focus:ring-0";
const LABEL =
  "block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/**
 * Register form — posts to `POST /v1/auth/register` via the AuthProvider.
 * The Laravel side expects `first_name` / `last_name` (snake_case in the
 * request body); the provider does the case translation. On success the
 * router pushes to `/account/profile`.
 */
export default function RegisterForm() {
  const { register } = useUser();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("name") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmation = String(data.get("password_confirmation") ?? "");

    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    // Split on the first whitespace; whatever follows is the last name.
    const [firstName, ...rest] = fullName.split(/\s+/);
    const lastName = rest.join(" ") || firstName;

    setSubmitting(true);
    try {
      await register({
        firstName,
        lastName,
        email: String(data.get("email") ?? ""),
        password,
        passwordConfirmation: confirmation,
      });
      router.push("/account/profile");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.errors) setFieldErrors(err.errors);
      } else {
        setError("Registration failed. Try again.");
      }
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1.5">
        <label htmlFor="name" className={LABEL}>
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="E.g. Julian Atelier"
          className={INPUT}
        />
        {fieldErrors.first_name ? (
          <p className="text-xs text-error">{fieldErrors.first_name[0]}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className={LABEL}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@architect.com"
          className={INPUT}
        />
        {fieldErrors.email ? (
          <p className="text-xs text-error">{fieldErrors.email[0]}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="password" className={LABEL}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            className={INPUT}
          />
          {fieldErrors.password ? (
            <p className="text-xs text-error">{fieldErrors.password[0]}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password_confirmation" className={LABEL}>
            Confirm
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            className={INPUT}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-outline-variant/20 bg-surface-container-highest text-primary focus:ring-primary"
        />
        <label htmlFor="terms" className="text-xs leading-tight text-secondary">
          I agree to the{" "}
          <Link href="#" className="font-semibold text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="font-semibold text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-md bg-error-container px-4 py-3 font-body text-sm text-error"
        >
          {error}
        </p>
      ) : null}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="h-14 w-full rounded-md bg-gradient-to-b from-[#0d0d0d] to-primary font-headline text-sm font-bold uppercase tracking-widest text-on-primary shadow-ambient transition-all hover:from-primary hover:to-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Initialize Account"}
        </button>
      </div>
    </form>
  );
}
