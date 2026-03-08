import type { NextConfig } from "next";

// This checks if we are building for production (GitHub Pages) or running locally
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Required for GitHub Pages static hosting
  output: "export", 
  
  // Adds /OopsCupid to CSS and JS paths ONLY when live
  basePath: isProd ? '/OopsCupid' : '',
  assetPrefix: isProd ? '/OopsCupid' : '',
  
  images: {
    // GitHub Pages doesn't have a server to optimize images, so this is required
    unoptimized: true, 
  },
};

export default nextConfig;