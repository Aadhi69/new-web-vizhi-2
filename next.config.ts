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
};

export default nextConfig;
