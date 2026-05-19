import { cache } from "react";

/**
 * Admin users data layer.
 *
 * Currently a static mock. The live version reads the admin endpoints
 * GET /v1/admin/users and GET /v1/admin/users/{user}. The exported types
 * mirror the Laravel `UserResource` shape so the swap stays local here.
 */

export type UserRole = "admin" | "customer";
export type UserStatus = "active" | "suspended";

export type AdminUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  /** ISO-formatted display string for the table. */
  joinedOn: string;
  /** Aggregate counters surfaced on the row. */
  orderCount: number;
  totalSpent: number;
};

const USERS: readonly AdminUser[] = [
  {
    id: 1,
    firstName: "Julian",
    lastName: "Abernathy",
    email: "curator@architect-atelier.com",
    phone: "+1 (555) 012-3456",
    role: "customer",
    status: "active",
    joinedOn: "October 14, 2023",
    orderCount: 3,
    totalSpent: 7280,
  },
  {
    id: 2,
    firstName: "Eloise",
    lastName: "Marchetti",
    email: "eloise@studio-marchetti.it",
    phone: "+39 02 7000 1234",
    role: "customer",
    status: "active",
    joinedOn: "March 02, 2024",
    orderCount: 5,
    totalSpent: 14_120,
  },
  {
    id: 3,
    firstName: "Henri",
    lastName: "Volk",
    email: "h.volk@volk-architecture.de",
    phone: null,
    role: "customer",
    status: "suspended",
    joinedOn: "July 21, 2024",
    orderCount: 1,
    totalSpent: 1850,
  },
  {
    id: 4,
    firstName: "Sherif",
    lastName: "Abdel",
    email: "info@batsync.com",
    phone: "+20 100 000 0000",
    role: "admin",
    status: "active",
    joinedOn: "January 09, 2023",
    orderCount: 0,
    totalSpent: 0,
  },
];

/** Index query. `cache()` dedups within a single server render. */
export const getAdminUsers = cache(async (): Promise<AdminUser[]> => {
  return USERS.slice();
});

/** Detail query — `cache()`-wrapped so metadata + page share one lookup. */
export const getAdminUserById = cache(
  async (id: number): Promise<AdminUser | null> => {
    return USERS.find((u) => u.id === id) ?? null;
  },
);
