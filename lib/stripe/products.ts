/**
 * STRIPE PRODUCT CATALOG — the server-side source of truth.
 *
 * SECURITY: the browser only ever sends a SKU string. Amounts and price
 * IDs are resolved here, on the server, from this table. Never accept a
 * price, amount, or currency from the client — that is how checkout
 * tampering happens.
 *
 * These Price IDs are LIVE-mode objects in the "Oopscupid" Stripe
 * account (acct_1Tuq5BLxuKpAU8j4). Regenerate with
 * `stripe prices list --live` if products are ever recreated.
 */

export type Sku =
  | "premium-report"
  | "report-workbook-bundle"
  | "ultimate-bundle"
  | "clarity-call"
  | "reset-program";

export interface StripeProduct {
  sku: Sku;
  priceId: string;
  /** Display only — Stripe charges the amount attached to priceId. */
  displayPrice: string;
  name: string;
  /** What the buyer gets, and how it reaches them. */
  grants: {
    /** Unlocks the premium report for this quiz topic (or all of them). */
    premiumReport: boolean;
    /** Unlocks the in-app 6-week workbook. */
    workbook: boolean;
    /** Requires a human to send a scheduling link after purchase. */
    coaching: boolean;
  };
}

export const STRIPE_PRODUCTS: Record<Sku, StripeProduct> = {
  "premium-report": {
    sku: "premium-report",
    priceId: "price_1UI5sNLxuKpAU8j4ZpfR1jRz",
    displayPrice: "€9.99",
    name: "Premium Report Unlock",
    grants: { premiumReport: true, workbook: false, coaching: false },
  },
  "report-workbook-bundle": {
    sku: "report-workbook-bundle",
    priceId: "price_1UI5soLxuKpAU8j45s8h90pd",
    displayPrice: "€49",
    name: "Premium Report + 6-Week Workbook",
    grants: { premiumReport: true, workbook: true, coaching: false },
  },
  "ultimate-bundle": {
    sku: "ultimate-bundle",
    priceId: "price_1UI5srLxuKpAU8j4bqRDtd4F",
    displayPrice: "€59",
    name: "The Ultimate Bundle",
    grants: { premiumReport: true, workbook: true, coaching: true },
  },
  "clarity-call": {
    sku: "clarity-call",
    priceId: "price_1UI5scLxuKpAU8j4Kgz2ZjPL",
    displayPrice: "€49",
    name: "60-Minute Clarity Session",
    grants: { premiumReport: false, workbook: false, coaching: true },
  },
  "reset-program": {
    sku: "reset-program",
    priceId: "price_1UI5sfLxuKpAU8j4dIM5BeNe",
    displayPrice: "€179",
    name: "The 4-Week Pattern Reset",
    grants: { premiumReport: false, workbook: false, coaching: true },
  },
};

export function isSku(value: unknown): value is Sku {
  return typeof value === "string" && value in STRIPE_PRODUCTS;
}
