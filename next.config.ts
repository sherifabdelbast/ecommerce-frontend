import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake icon imports so `react-icons/lu` does not pull the whole set
  // (vercel bundle-barrel-imports).
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    // API content images. Local dev: admin uploads land on Laravel storage;
    // the seeders use picsum.photos / via.placeholder.com placeholders.
    // Swap/trim this for the real S3/CDN host in production.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/storage/**" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },
};

export default nextConfig;
