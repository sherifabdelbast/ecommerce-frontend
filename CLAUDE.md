@AGENTS.md

# this is the structure of the final app that should be

app/
├── (public)/
│ ├── page.tsx # / - Home
│ ├── products/
│ │ ├── page.tsx # /products - Listing (SSR/ISR)
│ │ └── [slug]/
│ │ └── page.tsx # /products/[slug] - Detail (SSR/ISR)
│ ├── categories/
│ │ └── [slug]/
│ │ └── page.tsx # /categories/[slug]
│ └── brands/
│ └── [slug]/
│ └── page.tsx # /brands/[slug]
│
├── (auth)/
│ ├── login/page.tsx
│ ├── register/page.tsx
│ ├── forgot-password/page.tsx
│ └── reset-password/page.tsx # reads ?token= from searchParams
│
├── auth/
│ └── google/callback/page.tsx # handles OAuth redirect from /v1/auth/google/callback
│
├── (customer)/
│ ├── cart/page.tsx
│ ├── checkout/
│ │ ├── page.tsx
│ │ └── success/page.tsx
│ └── account/
│ ├── profile/page.tsx
│ ├── orders/
│ │ ├── page.tsx
│ │ └── [orderNumber]/page.tsx
│ ├── addresses/
│ │ ├── page.tsx
│ │ ├── new/page.tsx
│ │ └── [id]/edit/page.tsx
│ └── wishlist/page.tsx
│
└── (admin)/
└── admin/
├── page.tsx # Dashboard
├── products/
│ ├── page.tsx
│ ├── new/page.tsx
│ └── [id]/edit/page.tsx
├── categories/
│ ├── page.tsx
│ ├── new/page.tsx
│ └── [id]/edit/page.tsx
├── brands/
│ ├── page.tsx
│ ├── new/page.tsx
│ └── [id]/edit/page.tsx
├── orders/
│ ├── page.tsx
│ └── [id]/page.tsx
├── users/
│ ├── page.tsx
│ ├── new/page.tsx
│ └── [id]/edit/page.tsx
├── coupons/
│ ├── page.tsx
│ ├── new/page.tsx
│ └── [id]/edit/page.tsx
├── shipping-methods/
│ ├── page.tsx
│ ├── new/page.tsx
│ └── [id]/edit/page.tsx
├── reviews/page.tsx
└── payments/[id]/page.tsx

# rendering strategies per route

/ Home ISR (revalidate: 3600) SEO + featured products change occasionally
/products SSR Filters/search in URL must be server-rendered for SEO
/products/[slug] ISR (revalidate: 600) Product data changes, but SEO critical
/categories/[slug] ISR Same as products
/brands/[slug] ISR Same
/login, /register Static No data needed
/forgot-password, /reset-password Static No data needed
/cart CSR ("use client") Auth-gated, real-time cart state
/checkout CSR Auth-gated, multi-step form
/account/** CSR Auth-gated, user-specific data
/admin/** CSR Auth + role-gated, no SEO needed

# key layout considerations

// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/v1'

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
const token = // get from cookie or localStorage

const res = await fetch(`${BASE_URL}${endpoint}`, {
...options,
headers: {
'Content-Type': 'application/json',
...(token && { Authorization: `Bearer ${token}` }),
...options.headers,
},
})

if (!res.ok) {
const error = await res.json()
throw error
}

return res.json()
}

Then use it everywhere:

// Server Component (SSR/ISR)
const products = await apiFetch('/products', { next: { revalidate: 600 } })

// Client Component (CSR)
const cart = await apiFetch('/cart')

// POST
await apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) })
The next: { revalidate: 600 } option is Next.js-specific to fetch — you don't get that with Axios, so using native fetch actually gives you more control over caching per request.
