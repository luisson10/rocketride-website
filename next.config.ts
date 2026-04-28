import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local SVG logo lives in /public; allow next/image to serve it.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
