"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Google OAuth landing page.
 *
 * The backend `/v1/auth/google/callback` currently returns JSON. For this
 * page to receive the session it must instead redirect the browser here as
 * `/auth/google/callback?token=<sanctum-token>` (backend change pending).
 *
 * Until the shared auth store lands, this page reads the token, stores it,
 * and forwards the user on. Token persistence is intentionally minimal here
 * and will be replaced when the auth layer is built.
 */
function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const failed = searchParams.get("error");

    if (failed || !token) {
      setError("We could not complete Google sign-in. Please try again.");
      return;
    }

    // TODO: replace with the shared auth store once it exists.
    window.localStorage.setItem("auth_token", token);
    router.replace("/account/profile");
  }, [router, searchParams]);

  return error ? (
    <>
      <p className="max-w-sm font-body text-sm leading-relaxed text-secondary">
        {error}
      </p>
      <a
        href="/login"
        className="font-label text-[11px] uppercase tracking-widest text-primary underline-offset-4 hover:underline"
      >
        Return to Sign In
      </a>
    </>
  ) : (
    <>
      <div className="spinner-mini" aria-hidden />
      <p className="font-label text-[11px] uppercase tracking-widest text-secondary">
        Completing Google sign-in
      </p>
    </>
  );
}

export default function GoogleCallbackPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-8 text-center">
      <span className="font-headline text-2xl font-black tracking-tighter text-primary">
        ARCHITECT
      </span>
      <Suspense
        fallback={
          <p className="font-label text-[11px] uppercase tracking-widest text-secondary">
            Loading
          </p>
        }
      >
        <GoogleCallback />
      </Suspense>
    </main>
  );
}
