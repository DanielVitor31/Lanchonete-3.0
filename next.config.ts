import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tcbwhkdbktgzelgtyzgv.supabase.co" },
    ],
  },
};

export default nextConfig;
