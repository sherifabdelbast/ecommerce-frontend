/**
 * Account data layer.
 *
 * Currently a static mock. The live version reads GET /v1/profile (an
 * authenticated endpoint) — the `AccountUser` type mirrors that response so
 * the swap stays local. Used by the account sidebar and the profile page.
 */

export type AccountUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  /** Display-only membership label. */
  tier: string;
  memberSince: string;
};

/** Mock signed-in user — replace with the authenticated `/profile` fetch. */
export const MOCK_USER: AccountUser = {
  firstName: "Julian",
  lastName: "Abernathy",
  email: "curator@architect-atelier.com",
  phone: "+1 (555) 012-3456",
  username: "j.arch_atelier",
  tier: "Platinum Member",
  memberSince: "October 2023",
};

/** Two-letter initials for the avatar fallback. */
export function initials(user: AccountUser): string {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
}
