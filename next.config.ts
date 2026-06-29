import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/admin/login",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cenvyabnflzrygiengzj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.elduenovende.com',
      }
    ],
  },
};

export default nextConfig;
