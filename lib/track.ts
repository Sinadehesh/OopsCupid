"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * FUNNEL EVENTS
 *
 * The site had no measurement at all, so nobody could say whether the
 * problem was traffic, the quiz being too long, the paywall, or checkout.
 * These six events answer that question:
 *
 *   quiz_start     → quiz_question_50pct → quiz_complete
 *   → email_submit → paywall_view → checkout_click → purchase
 *
 * Every step is a place people leave. Naming them is what turns "nobody
 * buys" into "73% drop at question 30, the quiz is too long".
 *
 * Keep the property values low-cardinality (a slug, a band name) — Vercel
 * groups by value, so free-text kills the report.
 */

type Props = Record<string, string | number | boolean | null>;

function send(event: string, props?: Props) {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break a page. Especially not a paid one.
  }
}

/** Someone landed on a quiz and started answering. */
export const trackQuizStart = (quiz: string) => send("quiz_start", { quiz });

/** Halfway. The single most useful drop-off marker for long quizzes. */
export const trackQuizHalfway = (quiz: string, questions: number) =>
  send("quiz_halfway", { quiz, questions });

/** Answers finished — before any email gate. */
export const trackQuizComplete = (quiz: string, questions: number) =>
  send("quiz_complete", { quiz, questions });

/** Email captured. The gap between complete and this is the gate's cost. */
export const trackEmailSubmit = (quiz: string) => send("email_submit", { quiz });

/** The free result rendered. */
export const trackResultView = (quiz: string, band: string) =>
  send("result_view", { quiz, band });

/** The paywall was actually seen (not just present in the DOM). */
export const trackPaywallView = (quiz: string, band: string) =>
  send("paywall_view", { quiz, band });

/** They pressed the button. Everything after this is Stripe's problem. */
export const trackCheckoutClick = (quiz: string, sku: string) =>
  send("checkout_click", { quiz, sku });

/** Verified paid, fired once on /unlocked. */
export const trackPurchase = (sku: string) => send("purchase", { sku });

/** A share sheet was opened or a result link copied — the viral loop. */
export const trackShare = (quiz: string, method: string) =>
  send("share", { quiz, method });
