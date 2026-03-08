import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Required for GitHub Pages static hosting
  output: "export", 
  
  // Adds /OopsCupid to CSS and JS paths ONLY when live
  basePath: isProd ? '/OopsCupid' : '',
  assetPrefix: isProd ? '/OopsCupid' : '',
  
  // THE FIX: Forces Next.js to create /folder/index.html files
  // which prevents 404 errors on refresh/direct links in GitHub Pages
  trailingSlash: true, 
  
  images: {
    // GitHub Pages doesn't have a server to optimize images, so this is required
    unoptimized: true, 
  },
};

export default nextConfig;