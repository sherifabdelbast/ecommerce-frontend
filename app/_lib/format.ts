// Hoisted formatter — created once, reused across every call (avoids
// re-instantiating Intl.NumberFormat per render).
const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Format a whole-dollar amount, e.g. 1850 -> "$1,850". */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}
