import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://rrmydohxdqc8dyfz.public.blob.vercel-storage.com/**'),
    ],
  },
};

export default nextConfig;
