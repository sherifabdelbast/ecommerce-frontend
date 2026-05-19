/**
 * Single HTTP client for the Laravel API.
 *
 * Every data-layer module (`products.ts`, `categories.ts`, `brands.ts`, ...)
 * goes through `apiFetch` rather than calling `fetch` directly — base URL,
 * JSON headers, and error handling live here in one place.
 *
 * Auth: public endpoints need no token. When the authenticated areas
 * (cart, account, admin) land, pass the Sanctum bearer token via the
 * `token` option below.
 */

const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL;

if (!API_ORIGIN) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set — add it to .env.local (see .env.example).",
  );
}

const BASE_URL = `${API_ORIGIN}/v1`;

/** Error thrown for any non-2xx response — carries the API's JSON body. */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as { message: unknown }).message)
        : `Request failed with status ${status}`;
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type ApiFetchOptions = RequestInit & {
  /** Sanctum bearer token for authenticated endpoints. */
  token?: string;
};

/**
 * Fetch a JSON endpoint. `endpoint` is the path after `/v1` (e.g. `/products`).
 *
 * Next.js cache options pass straight through `options` — e.g.
 * `{ next: { revalidate: 600 } }` for ISR, `{ cache: "no-store" }` for SSR.
 */
export async function apiFetch<T = unknown>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, body);
  }

  return body as T;
}
