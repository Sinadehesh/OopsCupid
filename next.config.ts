import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for GitHub Pages static hosting
  output: "export", 
  
  // Forces Next.js to create /folder/index.html files
  // Prevents 404 errors on refresh in GitHub Pages
  trailingSlash: true, 
  
  images: {
    // GitHub Pages doesn't have a server to optimize images
    unoptimized: true, 
  },
  
  // Notice we removed basePath and assetPrefix entirely!
  // Your .github/workflows/nextjs.yml will handle them automatically.
};

export default nextConfig;