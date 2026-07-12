import type { CapacitorConfig } from "@capacitor/cli";

/**
 * OopsCupid Android app — bundles the static export (out/) in a WebView.
 * All quizzes score client-side, so the entire questionnaire experience
 * (including the chart-based premium reports) works fully offline.
 *
 * Build pipeline: .github/workflows/android-apk.yml
 *   1. node scripts/prepare-pages-build.mjs   (strip server-only code)
 *   2. GITHUB_PAGES=true next build           (static export → out/)
 *   3. npx cap sync android                   (copy out/ into the app)
 *   4. gradlew assembleDebug                  (produce the APK)
 */
const config: CapacitorConfig = {
  appId: "com.oopscupid.app",
  appName: "OopsCupid",
  webDir: "out",
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: "https",
  },
  backgroundColor: "#F7F4ED",
};

export default config;
