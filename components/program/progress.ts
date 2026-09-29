"use client";

/** Which sessions she has finished, per programme, on this device. */
const key = (slug: string) => `oc_prog_done:${slug}`;

export function doneSessions(slug: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "[]");
  } catch {
    return [];
  }
}

export function markDone(slug: string, week: number, day: number) {
  try {
    const set = new Set(doneSessions(slug));
    set.add(`${week}-${day}`);
    localStorage.setItem(key(slug), JSON.stringify([...set]));
  } catch {}
}
