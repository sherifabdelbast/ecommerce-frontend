/**
 * Account display helpers. The actual user object lives in `auth-context`
 * (sourced from `GET /v1/auth/me`); this module is just for shared formatters.
 */

/** Two-letter initials for the avatar fallback. */
export function initials(user: { firstName: string; lastName: string }): string {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
}

/** "Member since October 2023" from an ISO `createdAt`. */
export function memberSince(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
