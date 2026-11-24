/**
 * WHICH QUIZZES SHE HAS FINISHED, on her own device only.
 *
 * Powers the "4 of 72 done" meter and the choice of what comes next, so
 * one quiz leads to a different one instead of a page she's already seen.
 * Filled from trackQuizComplete (lib/track.ts), so every quiz and game
 * counts without wiring each one.
 */

const KEY = "oc-done";

export function doneSlugs(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** "flag-runner:level-3" and "/is-he-cheating" both count as their page. */
export function markDone(quiz: string) {
  const slug = quiz.replace(/^\//, "").split(":")[0];
  if (!slug) return;
  try {
    const done = doneSlugs();
    if (done.includes(slug)) return;
    localStorage.setItem(KEY, JSON.stringify([...done, slug].slice(-400)));
    window.dispatchEvent(new Event("oc-progress"));
  } catch {
    // Storage blocked: the meter just stays at zero.
  }
}
