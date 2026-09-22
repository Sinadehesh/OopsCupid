import Stripe from "stripe";

/**
 * Server-only Stripe client. Instantiated lazily so that builds without
 * STRIPE_SECRET_KEY (CI, the static export, local dev without env) don't
 * crash at import time — the same class of bug that broke the deploy
 * pipeline with the OpenAI client.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it in the Vercel project's environment variables."
    );
  }

  cached = new Stripe(key, {
    // Pin the API version so Stripe-side upgrades can never change behaviour
    // underneath a running deployment.
    apiVersion: "2026-08-26.dahlia",
    typescript: true,
    appInfo: { name: "OopsCupid", url: "https://www.oopscupid.com" },
  });
  return cached;
}

/** True when payments are configured — lets UI degrade instead of erroring. */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Absolute site origin, used to build Stripe redirect URLs. */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.oopscupid.com")
  );
}
