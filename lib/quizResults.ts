"use client";

/**
 * QUIZ RESULT PERSISTENCE
 *
 * A buyer leaves the site for Stripe and comes back to a brand-new React
 * tree. Anything held only in component state is gone by then — which is
 * how someone can pay and land on the quiz start screen. Every quiz
 * therefore writes its computed result here before offering checkout, and
 * the matching /premium route reads it back.
 *
 * localStorage is the right store for this: the result belongs to the
 * device, it is not sensitive, and it must survive a full-page redirect.
 * Entitlement is NOT kept here — that lives in a server-signed httpOnly
 * cookie, so writing to this store unlocks nothing.
 */

export const QUIZ_KEYS = {
  badGuys: "oc_bad_guys_result",
  toxicFriend: "oc_toxic_friend_result",
  friendsBad: "oc_friends_bad_result",
  gaslighting: "oc_gaslighting_result",
  sabotage: "oc_sabotage_result",
  infidelity: "infidelity_result",
  manipulation: "manipulation_result",
  toxicAttraction: "toxic_attraction_result",
  friendRole: "friend_role_result",
  attachment: "oc_saved_profile",
  attraction: "oc_attraction_result",
  attractor: "oc_attractor_result",
  attractedType: "oc_attracted_type_result",
  partnerAttachment: "oc_partner_attachment_result",
  friendUsed: "oc_friend_used_result",
} as const;

export function saveQuizResult(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or quota. The in-session report still renders; only the
    // post-checkout return trip degrades, and PremiumGate handles that.
  }
}

export function loadQuizResult<T = any>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
