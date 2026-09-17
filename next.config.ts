import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    // Next's image optimizer blocks proxying images whose resolved IP is
    // private/loopback (SSRF protection) — which "localhost" always is.
    // Unoptimized mode serves images as-is, which is fine for local dev
    // against a local backend. Remove this once deployed behind a real,
    // publicly resolvable domain, and restore remotePatterns below.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/images/**",
      },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },
};

export default nextConfig;
