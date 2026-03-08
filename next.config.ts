import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  basePath: "/OopsCupid",
  trailingSlash: true, 
  images: { unoptimized: true },
};

export default nextConfig;
