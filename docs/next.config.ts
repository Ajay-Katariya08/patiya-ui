import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["patiya"],
  experimental: {
    optimizePackageImports: ["patiya", "lucide-react", "motion", "three"],
  },
};

export default nextConfig;
