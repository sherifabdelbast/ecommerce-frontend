"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiFetch, ApiError, type AuthResponse } from "@/app/_lib/api";

/**
 * Auth state layer for the Sanctum SPA cookie flow.
 *
 * Hits `GET /v1/auth/me` on mount to rehydrate the signed-in user from the
 * session cookie. Login/register/logout all call the backend, then refresh
 * the user. `useUser()` is the consumer hook.
 */

export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: "admin" | "customer";
  emailVerifiedAt: string | null;
  createdAt: string;
};

type LoginInput = { email: string; password: string };
type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  passwordConfirmation: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  /** True while the initial `/auth/me` rehydrate is in flight. */
  loading: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  /** Re-fetch current user — call after a profile update. */
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial session probe — runs once on mount. A 401 here is the expected
  // path for anonymous visitors; only unexpected errors should surface.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch<AuthResponse<AuthUser>>("/auth/me");
        if (!cancelled) setUser(res.user);
      } catch (err) {
        if (!(err instanceof ApiError && err.status === 401)) {
          console.error("auth/me failed:", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const res = await apiFetch<AuthResponse<AuthUser>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const res = await apiFetch<AuthResponse<AuthUser>>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone,
        password: input.password,
        password_confirmation: input.passwordConfirmation,
      }),
    });
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    const res = await apiFetch<AuthResponse<AuthUser>>("/auth/me");
    setUser(res.user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Consumer hook — throws outside an AuthProvider so misuse is loud. */
export function useUser(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <AuthProvider>");
  }
  return ctx;
}
