import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.medimedia.ir",
        port: "",
        pathname: "/**", // allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "medimedia.ir",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
