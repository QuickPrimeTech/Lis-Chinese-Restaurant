import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/quick-prime-tech/**", // allow all images under your account
      },
    ],
  },
};

export default nextConfig;
