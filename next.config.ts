import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  
  // Hardcoded paths so CSS and routing always work on GitHub Pages
  basePath: "/OopsCupid",
  assetPrefix: "/OopsCupid",
  
  trailingSlash: true, 
  
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;