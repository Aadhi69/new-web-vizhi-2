import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Provide a rewrite so we can use cache-busting path segments like
  // `/__cache/:mtime/<file>` which map to `/ <file>` in `public/`.
  async rewrites() {
    return [
      {
        source: "/__cache/:mtime/:path*",
        destination: "/:path*",
      },
    ];
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
