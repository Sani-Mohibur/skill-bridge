import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://skill-bridge-backend-x2sb.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
