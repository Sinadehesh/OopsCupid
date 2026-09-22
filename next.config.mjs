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

  /**
   * Dead URLs Google is still crawling. Search Console reported these as
   * 404s, which wastes crawl budget on a site that has very little to
   * spare — every wasted fetch is one not spent on a page that matters.
   *
   * Static export has no redirect support, so these are skipped there;
   * the Pages build is a companion, not the canonical host.
   */
  ...(isPagesBuild
    ? {}
    : {
        async redirects() {
          return [
            // Old nested quiz path; the quizzes live at the root.
            { source: "/quizzes/toxic-friend-test", destination: "/toxic-friend-test", permanent: true },
            { source: "/quizzes/:slug", destination: "/:slug", permanent: true },
            // The text-analysis tool was removed when the site became
            // quizzes-only. It had inbound links, so send them somewhere real.
            { source: "/tools/chat-analyzer", destination: "/quizzes", permanent: true },
            { source: "/tools/:path*", destination: "/quizzes", permanent: true },
          ];
        },
      }),
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
