import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  basePath: '/OopsCupid',
  assetPrefix: '/OopsCupid',
  trailingSlash: true, 
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;