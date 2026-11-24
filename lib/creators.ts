/**
 * THE CREATOR PROGRAMME
 *
 * A creator posts any OopsCupid link with ?via=<their code> on the end.
 * The code is remembered on the visitor's device for VIA_DAYS (outside
 * Europe, or in Europe once she has said yes to cookies), sent with any
 * checkout, and stored on the Stripe payment, so every creator's sales can
 * be counted at /creators/stats and paid at COMMISSION each month.
 *
 * Last link wins: a visitor who arrives through a second creator's link
 * counts for the second creator.
 */

export const COMMISSION = 0.3;
export const VIA_DAYS = 30;
const KEY = "oc-via";

/** Codes are a creator's handle: letters, digits, _ and -, 2 to 30 long. */
export function cleanVia(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim().toLowerCase().replace(/^@/, "");
  return /^[a-z0-9][a-z0-9_.-]{1,29}$/.test(v) ? v : null;
}

declare global {
  interface Window {
    ocAsk?: boolean;
  }
}

/** Whether this visitor's device may keep the code (see the cookie rules in app/layout.tsx). */
export function mayRemember(): boolean {
  try {
    const c = localStorage.getItem("oc-consent");
    if (c === "denied") return false;
    if (c === "granted") return true;
  } catch {
    return false;
  }
  return !window.ocAsk;
}

export function rememberVia(code: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: code, at: Date.now() }));
  } catch {
    // Storage blocked: the sale just won't be credited.
  }
}

export function currentVia(): string | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!saved || typeof saved.at !== "number" || Date.now() - saved.at > VIA_DAYS * 86400000) return null;
    return cleanVia(saved.v);
  } catch {
    return null;
  }
}

export function forgetVia() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to forget.
  }
}
