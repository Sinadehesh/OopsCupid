/** @type {import('next').NextConfig} */

// GITHUB_PAGES=true is set by the deploy workflow: Pages can only serve
// static files, so CI builds use a full static export (scripts/
// prepare-pages-build.mjs strips the server-only code first). Local dev
// and server hosts (e.g. Vercel) keep API routes and server actions.
const isPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isPagesBuild
    ? {
        output: "export",
        images: { unoptimized: true },
        // directory-style URLs so static hosts and the Capacitor WebView
        // resolve /quiz-name/ to /quiz-name/index.html
        trailingSlash: true,
      }
    : {}),
};
export default nextConfig;
