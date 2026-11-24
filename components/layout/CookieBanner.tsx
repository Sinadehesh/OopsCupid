"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const KEY = "oc-consent";

declare global {
  interface Window {
    ocLoadGtm?: () => void;
    gtag?: (...args: unknown[]) => void;
    /** Set by GTM_BOOT: true in Europe, where we ask before counting. */
    ocAsk?: boolean;
    /** Set by GTM_BOOT: outside Europe and no Global Privacy Control, so counting is on unless she says no. */
    ocDefault?: boolean;
  }
}

function saved(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Delete Google Analytics' own cookies (_ga, _ga_XXXX, _gid) for this site. */
function clearAnalyticsCookies() {
  try {
    const host = location.hostname;
    const base = host.replace(/^www\./, "");
    for (const part of document.cookie.split(";")) {
      const name = part.split("=")[0].trim();
      if (!/^(_ga|_ga_.+|_gid|_gat.*)$/.test(name)) continue;
      for (const domain of ["", `; domain=${host}`, `; domain=.${base}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  } catch {
    // Nothing to clear, or cookies are blocked anyway.
  }
}

/**
 * The consent question, shown on its own only in Europe, where the law
 * wants a yes before analytics cookies (see GTM_BOOT in app/layout.tsx).
 * Elsewhere, the US included, nobody sees it unless they open "Cookie
 * settings" in the footer, which is where anyone can say no. "No thanks"
 * is exactly as easy as yes, and both are remembered on this device.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const choice = saved();
    if (choice !== "granted" && choice !== "denied" && window.ocAsk) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("oc-cookie-settings", reopen);
    return () => window.removeEventListener("oc-cookie-settings", reopen);
  }, []);

  // A visit that started on a private /survey link never loaded Analytics.
  // Once she moves on to a normal page, it can, if it would have anyway.
  useEffect(() => {
    const choice = saved();
    if (choice === "granted" || (choice === null && window.ocDefault)) window.ocLoadGtm?.();
  }, [pathname]);

  const choose = (yes: boolean) => {
    try {
      localStorage.setItem(KEY, yes ? "granted" : "denied");
    } catch {
      // Storage blocked: the answer holds for this page view only.
    }
    // Anything else that waits on the answer (a creator's referral) listens for this.
    window.dispatchEvent(new CustomEvent("oc-consent", { detail: yes }));
    if (yes) {
      window.ocLoadGtm?.();
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    }
    setOpen(false);
  };

  if (!open) return null;

  const button =
    "min-h-[44px] rounded-full border-[2.5px] border-[#1A1033] bg-white px-4 text-[14px] font-black text-[#1A1033] active:translate-y-[1px]";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pointer-events-none">
      <section
        aria-label="Cookies"
        className="pointer-events-auto mx-auto max-w-md rounded-[22px] bg-white p-4 text-[#1A1033] border-[2.5px] border-[#1A1033] shadow-[4px_4px_0_#1A1033]"
      >
        <p className="text-[16px] font-black mb-1">🍪 Can we count your visit?</p>
        <p className="text-[14px] font-semibold leading-snug text-[#1A1033]/75 mb-3">
          We&apos;d like to use Google Analytics cookies to see which quizzes people enjoy. No ads, nothing sold.{" "}
          <Link href="/privacy#cookies" className="underline underline-offset-2 font-bold text-[#1A1033]">
            Privacy policy
          </Link>
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => choose(false)} className={button}>
            No thanks
          </button>
          <button type="button" onClick={() => choose(true)} className={button}>
            Yes, that&apos;s fine
          </button>
        </div>
      </section>
    </div>
  );
}

/** For the footer: opens the banner again so the choice can be changed. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("oc-cookie-settings"))} className={className}>
      Cookie settings
    </button>
  );
}
