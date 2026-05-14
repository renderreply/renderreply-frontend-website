import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  allowedDevOrigins: ["172.20.10.3"],
  async rewrites() {
    return [
      {
        source: '/api/auth/signup',
        destination: `${BACKEND_URL}/api/auth/signup`,
      },
      {
        source: '/api/auth/login',
        destination: `${BACKEND_URL}/api/auth/login`,
      },
      {
        // Proxy all /api/* EXCEPT the NextAuth core routes
        source: '/api/:path((?!auth).*)',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "renderreply",
  project: "renderreply-frontend",
});
