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
            // The original anxious-attachment workbook: forty-eight hand-built
            // pages, replaced by the Earned Security programme. Its sessions
            // do not map one to one (six weeks of seven days became four of
            // five), so every old URL lands on the programme overview rather
            // than on a guessed session.
            { source: "/workbook/anxious-attachment", destination: "/workbook/earned-security", permanent: true },
            { source: "/workbook/anxious-attachment/:path*", destination: "/workbook/earned-security", permanent: true },
          ];
        },

        /**
         * Keep paid pages out of the index.
         *
         * Every premium report and every gated workbook day renders its
         * content in the browser after an entitlement check, so what a
         * crawler receives is the header and footer around a loading
         * spinner: the same ~490 words, fifty-five times. That is what
         * Search Console files under "crawled, currently not indexed", and
         * near-identical thin pages at that scale are a site-wide quality
         * signal that drags down the pages meant to rank.
         *
         * `follow` stays on so links out of these pages still count. Done
         * as a header rather than per-page metadata because the pages are
         * client components, and because a pattern here covers every paid
         * page added later without anyone having to remember.
         */
        async headers() {
          const noindex = [{ key: "X-Robots-Tag", value: "noindex, follow" }];
          return [
            { source: "/:quiz/premium", headers: noindex },
            { source: "/workbook/:book/week-:n(2|3|4|5|6)", headers: noindex },
            { source: "/workbook/:book/week-:n(2|3|4|5|6)/:day", headers: noindex },
            { source: "/unlocked", headers: noindex },
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
