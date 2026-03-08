import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  
  // basePath natively handles routing AND CSS/asset paths in Next.js 14+
  basePath: "/OopsCupid",
  
  trailingSlash: true, 
  
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;