/**
 * Single HTTP client for the Laravel API.
 *
 * Every data-layer module (`products.ts`, `categories.ts`, …) goes through
 * `apiFetch` so base URL, headers, error envelope and Sanctum SPA cookie
 * handling live in one place.
 *
 * Auth: Sanctum SPA cookie mode (NOT Bearer). The browser holds an httpOnly
 * `laravel_session` cookie set by the API; mutations also need the
 * `XSRF-TOKEN` cookie echoed back as an `X-XSRF-TOKEN` header. `ensureCsrf()`
 * lazily hits `/sanctum/csrf-cookie` once per tab.
 */

const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL;

if (!API_ORIGIN) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set — add it to .env.local (see .env.example).",
  );
}

const BASE_URL = `${API_ORIGIN}/v1`;
const CSRF_URL = `${API_ORIGIN}/sanctum/csrf-cookie`;

/** Error thrown for any non-2xx response — carries the API's JSON body. */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  /** Field-level validation errors from 422 responses. */
  readonly errors?: Record<string, string[]>;

  constructor(status: number, body: unknown) {
    const msg =
      body && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : `Request failed with status ${status}`;
    super(msg);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
    if (body && typeof body === "object" && "errors" in body) {
      this.errors = (body as { errors?: Record<string, string[]> }).errors;
    }
  }
}

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);
let csrfPrimed = false;

/**
 * Prime the XSRF cookie. Sanctum's `/sanctum/csrf-cookie` sets the
 * `XSRF-TOKEN` cookie; subsequent mutating requests echo it back in the
 * `X-XSRF-TOKEN` header so Laravel's VerifyCsrfToken middleware passes.
 * Idempotent and lazy — called once per tab from inside `apiFetch`.
 */
async function ensureCsrf(): Promise<void> {
  if (csrfPrimed) return;
  await fetch(CSRF_URL, { credentials: "include" });
  csrfPrimed = true;
}

/** Read `XSRF-TOKEN` cookie set by Sanctum (browser-side only). */
function readXsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

type ApiFetchOptions = RequestInit & {
  /** Skip CSRF cookie priming. Use for retries inside login flow only. */
  skipCsrf?: boolean;
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
  const { headers, skipCsrf, method = "GET", ...rest } = options;
  const isMutation = MUTATING.has(method.toUpperCase());

  if (isMutation && !skipCsrf) await ensureCsrf();
  const xsrf = isMutation ? readXsrfToken() : null;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(xsrf ? { "X-XSRF-TOKEN": xsrf } : {}),
      ...headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) throw new ApiError(res.status, body);

  return body as T;
}

/** Laravel paginator envelope (camelCase meta after the unification migration). */
export type Paginated<T> = {
  success: true;
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

/** Simple resource envelope: `{ success, data }`. */
export type Resource<T> = { success: true; data: T };

/** Auth envelope: `{ success, user, message? }`. */
export type AuthResponse<U> = { success: true; user: U; message?: string };
