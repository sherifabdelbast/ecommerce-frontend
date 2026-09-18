import { cache } from "react";
import { apiFetch, Paginated, Resource } from "./api";

/**
 * Admin users data layer — backed by the Laravel API.
 */

export type UserRole = "admin" | "customer";

export type AdminUser = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string | null;
};

export const getAdminUsers = cache(async (): Promise<AdminUser[]> => {
  const res = await apiFetch<Paginated<AdminUser>>(
    "/admin/users?per_page=100",
    { cache: "no-store" },
  );
  return res.data;
});

export const getAdminUserById = cache(
  async (id: number): Promise<AdminUser | null> => {
    try {
      const res = await apiFetch<Resource<AdminUser>>(`/admin/users/${id}`, {
        cache: "no-store",
      });
      return res.data;
    } catch {
      return null;
    }
  },
);
