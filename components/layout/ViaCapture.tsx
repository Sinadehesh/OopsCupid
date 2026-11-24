"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cleanVia, mayRemember, rememberVia, forgetVia } from "@/lib/creators";

/**
 * Notices a creator's ?via= link and remembers who sent this visitor, so
 * a purchase can be credited to them. In Europe that waits for a yes in
 * the cookie banner; a no forgets it.
 */
export default function ViaCapture() {
  const pathname = usePathname();

  useEffect(() => {
    const code = cleanVia(new URLSearchParams(window.location.search).get("via"));
    if (!code) return;
    try {
      (window as Window & { dataLayer?: unknown[] }).dataLayer?.push({ event: "creator_visit", via: code });
    } catch {
      // Analytics must never break a page.
    }
    if (mayRemember()) rememberVia(code);
    const onChoice = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) rememberVia(code);
      else forgetVia();
    };
    window.addEventListener("oc-consent", onChoice);
    return () => window.removeEventListener("oc-consent", onChoice);
  }, [pathname]);

  return null;
}
