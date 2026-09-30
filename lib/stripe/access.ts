import crypto from "node:crypto";
import type { Sku } from "./products";
import { STRIPE_PRODUCTS } from "./products";

/**
 * ENTITLEMENTS
 *
 * After Stripe confirms a payment we mint a signed token describing what
 * the buyer is allowed to see, and store it in an httpOnly cookie. The
 * premium pages ask the server what the cookie grants, so a visitor
 * cannot unlock a paid report by editing localStorage or the DOM.
 *
 * The signing secret is separate from the Stripe keys so it can be
 * rotated independently (rotating it simply invalidates outstanding
 * access tokens; buyers can re-unlock from their receipt link).
 */

export const ACCESS_COOKIE = "oc_access";
// A year: long enough to finish every programme and come back to it.
// Browsers cap cookie lifetimes at around 400 days, so "lifetime" access
// is not something a cookie can honestly promise.
const TTL_DAYS = 365;

export interface Entitlements {
  /** Stripe Checkout Session that paid for this. */
  sid: string;
  sku: Sku;
  premiumReport: boolean;
  workbook: boolean;
  coaching: boolean;
  /** Quick tests whose written read has been bought, by slug. */
  reads?: string[];
  /** Unix seconds. */
  exp: number;
}

function secret(): string {
  const s = process.env.ACCESS_TOKEN_SECRET ?? process.env.STRIPE_SECRET_KEY;
  if (!s) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not set. Add it in the Vercel project's environment variables."
    );
  }
  return s;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

/**
 * Purchases add up. This used to mint from the new product alone, so a
 * buyer who owned the €49 bundle and then booked a call lost the bundle:
 * the new cookie replaced the old one. Everything already held is kept,
 * and a read bought on a quick test is added to the list of reads.
 */
export function mintAccessToken(
  sessionId: string,
  sku: Sku,
  existing?: Entitlements | null,
  readSlug?: string
): string {
  const grants = STRIPE_PRODUCTS[sku].grants;
  const reads = new Set(existing?.reads ?? []);
  if (grants.read && readSlug) reads.add(readSlug);
  const claims: Entitlements = {
    sid: sessionId,
    sku,
    premiumReport: grants.premiumReport || Boolean(existing?.premiumReport),
    workbook: grants.workbook || Boolean(existing?.workbook),
    coaching: grants.coaching || Boolean(existing?.coaching),
    reads: [...reads].slice(-60),
    exp: Math.floor(Date.now() / 1000) + TTL_DAYS * 24 * 60 * 60,
  };
  const body = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readAccessToken(token: string | undefined): Entitlements | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  // Fail closed, never throw: a missing signing secret must read as "no
  // access", not as a 500 on every page view.
  let expected: string;
  try {
    // Constant-time comparison below, a fast-exit string compare leaks
    // the signature one byte at a time.
    expected = sign(body);
  } catch {
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const claims = JSON.parse(Buffer.from(body, "base64url").toString()) as Entitlements;
    if (typeof claims.exp !== "number" || claims.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: TTL_DAYS * 24 * 60 * 60,
};

/** Can this visitor see the written read for a quick test? */
export function canRead(claims: Entitlements | null, slug: string): boolean {
  if (!claims) return false;
  // The €9.99 report unlocks every report on the site, reads included.
  return claims.premiumReport || Boolean(claims.reads?.includes(slug));
}
