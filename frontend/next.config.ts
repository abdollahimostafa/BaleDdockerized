import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.medimedia.ir", "medimedia.ir"], // add both if needed
  },
};

export default nextConfig;
