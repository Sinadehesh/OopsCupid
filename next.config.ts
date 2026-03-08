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
};

export default nextConfig;