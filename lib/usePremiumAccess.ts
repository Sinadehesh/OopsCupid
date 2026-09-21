"use client";

import { useEffect, useState } from "react";

export type AccessState = "checking" | "granted" | "denied";

/**
 * Client hook for paid-report access.
 *
 * Asks the SERVER (/api/access) what the signed httpOnly entitlement
 * cookie grants. The browser cannot forge it, so premium content can be
 * rendered inline without handing it to everyone.
 *
 * Static builds (GitHub Pages export / the Android app) ship no API
 * routes; there we fall back to the local unlock hint written by
 * /unlocked after a real payment.
 */
export function usePremiumAccess(): { state: AccessState; granted: boolean } {
  const [state, setState] = useState<AccessState>("checking");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/access", { cache: "no-store" });

        if (res.status === 404) {
          let local = false;
          try {
            local = localStorage.getItem("oc_unlocked") === "1";
          } catch {}
          if (!cancelled) setState(local ? "granted" : "denied");
          return;
        }

        const data = await res.json().catch(() => ({}));
        if (!cancelled) setState(data?.premiumReport ? "granted" : "denied");
      } catch {
        // Fail closed.
        if (!cancelled) setState("denied");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { state, granted: state === "granted" };
}
