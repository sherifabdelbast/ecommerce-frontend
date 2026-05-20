"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/app/_lib/api";
import { useUser } from "@/app/_lib/auth-context";

const INPUT =
  "h-12 w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-4 text-sm text-on-surface transition-all placeholder:text-outline-variant focus:border-primary focus:ring-0";
const INPUT_ERROR =
  "h-12 w-full rounded-md border border-error bg-surface-container-highest px-4 text-sm text-on-surface transition-all placeholder:text-outline-variant focus:border-error focus:ring-0";
const LABEL =
  "block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant";

/** Field-level error helper — picks the first message from a Laravel 422. */
function fieldError(errs: Record<string, string[]>, name: string): string | null {
  const list = errs[name];
  return list && list.length > 0 ? list[0] : null;
}

/**
 * Register form — posts to `POST /v1/auth/register` via the AuthProvider.
 * Backend (Laravel) requires `first_name`, `last_name`, `email`, `phone`,
 * `gender`, `birthday`, `password`, `password_confirmation`. The provider
 * does the case translation from camelCase props.
 */
export default function RegisterForm() {
  const { register } = useUser();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTopError(null);
    setErrors({});

    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("name") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmation = String(data.get("password_confirmation") ?? "");

    if (password !== confirmation) {
      setErrors({ password_confirmation: ["Passwords do not match."] });
      setTopError("Passwords do not match.");
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
        phone: String(data.get("phone") ?? ""),
        gender: String(data.get("gender") ?? ""),
        birthday: String(data.get("birthday") ?? ""),
        password,
        passwordConfirmation: confirmation,
      });
      router.push("/account/profile");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errors && Object.keys(err.errors).length > 0) {
          setErrors(err.errors);
          setTopError("Please fix the highlighted fields below.");
        } else {
          setTopError(err.message);
        }
      } else {
        setTopError("Registration failed. Please try again.");
      }
      setSubmitting(false);
    }
  }

  const errName = fieldError(errors, "first_name") ?? fieldError(errors, "last_name");
  const errEmail = fieldError(errors, "email");
  const errPhone = fieldError(errors, "phone");
  const errGender = fieldError(errors, "gender");
  const errBirthday = fieldError(errors, "birthday");
  const errPassword = fieldError(errors, "password");
  const errConfirm = fieldError(errors, "password_confirmation");

  // Any backend errors we don't render next to a field — surface them too,
  // so nothing slips through silently.
  const knownKeys = new Set([
    "first_name",
    "last_name",
    "email",
    "phone",
    "gender",
    "birthday",
    "password",
    "password_confirmation",
  ]);
  const otherErrors = Object.entries(errors).filter(([k]) => !knownKeys.has(k));

  return (
    <form
      method="POST"
      className="space-y-6"
      onSubmit={handleSubmit}
      noValidate
    >
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
          className={errName ? INPUT_ERROR : INPUT}
          aria-invalid={errName ? "true" : undefined}
        />
        {errName ? <p className="text-xs text-error">{errName}</p> : null}
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
          className={errEmail ? INPUT_ERROR : INPUT}
          aria-invalid={errEmail ? "true" : undefined}
        />
        {errEmail ? <p className="text-xs text-error">{errEmail}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className={LABEL}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="+1 (555) 000-0000"
          className={errPhone ? INPUT_ERROR : INPUT}
          aria-invalid={errPhone ? "true" : undefined}
        />
        {errPhone ? <p className="text-xs text-error">{errPhone}</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="gender" className={LABEL}>
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            defaultValue=""
            className={errGender ? INPUT_ERROR : INPUT}
            aria-invalid={errGender ? "true" : undefined}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errGender ? <p className="text-xs text-error">{errGender}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="birthday" className={LABEL}>
            Birthday
          </label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            required
            className={errBirthday ? INPUT_ERROR : INPUT}
            aria-invalid={errBirthday ? "true" : undefined}
          />
          {errBirthday ? (
            <p className="text-xs text-error">{errBirthday}</p>
          ) : null}
        </div>
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
            className={errPassword ? INPUT_ERROR : INPUT}
            aria-invalid={errPassword ? "true" : undefined}
          />
          {errPassword ? (
            <p className="text-xs text-error">{errPassword}</p>
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
            className={errConfirm ? INPUT_ERROR : INPUT}
            aria-invalid={errConfirm ? "true" : undefined}
          />
          {errConfirm ? (
            <p className="text-xs text-error">{errConfirm}</p>
          ) : null}
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

      {topError ? (
        <div
          role="alert"
          className="rounded-md bg-error-container px-4 py-3 font-body text-sm text-error"
        >
          <p className="font-semibold">{topError}</p>
          {otherErrors.length > 0 ? (
            <ul className="mt-2 list-disc pl-5 text-xs">
              {otherErrors.flatMap(([key, msgs]) =>
                msgs.map((m, i) => <li key={`${key}-${i}`}>{m}</li>),
              )}
            </ul>
          ) : null}
        </div>
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
