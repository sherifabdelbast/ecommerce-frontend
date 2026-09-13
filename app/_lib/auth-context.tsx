"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiFetch, ApiError, Resource } from "@/app/_lib/api";

/**
 * Auth state layer for the Sanctum SPA cookie flow.
 *
 * Hits `GET /v1/profile` on mount to rehydrate the signed-in user from the
 * session cookie. Login/register/logout all call the backend, then update
 * local state. The API returns camelCase fields directly (see the API
 * standardization notes in api.ts), so no mapping layer is needed here.
 */

export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  gender: string | null;
  birthday: string | null;
  role: "admin" | "customer";
  emailVerifiedAt: string | null;
  createdAt: string;
};

type LoginInput = { email: string; password: string };
type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  /** ISO date, YYYY-MM-DD. */
  birthday: string;
  password: string;
  passwordConfirmation: string;
};

type AuthResponse = {
  success: true;
  token: string;
  user: AuthUser;
  message?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch<Resource<AuthUser>>("/profile");
        if (!cancelled) setUser(res.data);
      } catch (err) {
        if (!(err instanceof ApiError && err.status === 401)) {
          console.error("profile fetch failed:", err);
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
    const res = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const res = await apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone,
        gender: input.gender,
        birthday: input.birthday,
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
    const res = await apiFetch<Resource<AuthUser>>("/profile");
    setUser(res.data);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUser(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <AuthProvider>");
  }
  return ctx;
}
