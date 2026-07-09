/**
 * CI-ONLY: prepare the repo for a GitHub Pages static export.
 *
 * GitHub Pages can only serve static files — API routes and server actions
 * can never run there (they silently 404 on the live site today). But their
 * mere presence makes `next build` fail under `output: "export"`. This script
 * runs in the deploy workflow, BEFORE the build, on the ephemeral CI checkout:
 *
 *   1. deletes app/api (route handlers are unsupported in static export)
 *   2. replaces app/actions/* server actions with same-signature no-op stubs
 *      so the pages importing them still compile; callers already handle
 *      `{ success: false }` as their fallback path
 *
 * NEVER run this locally against a dirty tree — it mutates source files.
 * Local dev and any future server host (Vercel) keep full functionality.
 */
import { rmSync, writeFileSync } from "node:fs";

rmSync(new URL("../app/api", import.meta.url), { recursive: true, force: true });

const stubs = {
  "generatePremiumReport.ts": `// Static-export stub (see scripts/prepare-pages-build.mjs)
export async function generatePremiumReport(_profile: any, _demographics: any, _rawAnswers: any = {}) {
  return { success: false as const };
}
`,
  "generateManipulationReport.ts": `// Static-export stub (see scripts/prepare-pages-build.mjs)
export async function generateManipulationReport(_profile: any, _email: string) {
  return { success: false as const };
}
`,
  "saveWorkbookEntry.ts": `// Static-export stub (see scripts/prepare-pages-build.mjs)
interface WorkbookEntry {
  workbook: string;
  week: number;
  day: number;
  exerciseKey: string;
  content: Record<string, unknown>;
  sessionId?: string;
}
export async function saveWorkbookEntry(_entry: WorkbookEntry) {
  return { success: false as const };
}
`,
};

for (const [file, content] of Object.entries(stubs)) {
  writeFileSync(new URL(`../app/actions/${file}`, import.meta.url), content);
}

console.log("✓ Pages build prepared: app/api removed, server actions stubbed");
