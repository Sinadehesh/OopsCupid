"use client";

import React, { useEffect, useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import CheckoutButton from "@/components/offers/CheckoutButton";

type Status = "checking" | "granted" | "denied";

/**
 * PREMIUM GATE
 *
 * Wraps paid report content. Entitlement is decided by the SERVER from a
 * signed httpOnly cookie (/api/access) — editing localStorage or the DOM
 * does not unlock anything.
 *
 * Static-export caveat: the GitHub Pages build and the Android app ship
 * no API routes, so /api/access is unreachable there. Those builds fall
 * back to the local unlock hint. That is intentional — the app is a free
 * companion, and the website is where money changes hands.
 */
export default function PremiumGate({
  children,
  returnTo,
  title = "Your full report is ready",
  blurb = "You've seen the summary. The complete analysis — every score explained, the scripts, and your action plan — is one step away.",
}: {
  children: React.ReactNode;
  returnTo: string;
  title?: string;
  blurb?: string;
}) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/access", { cache: "no-store" });

        if (res.status === 404) {
          // No API layer (static export / packaged app).
          let local = false;
          try {
            local = localStorage.getItem("oc_unlocked") === "1";
          } catch {}
          if (!cancelled) setStatus(local ? "granted" : "denied");
          return;
        }

        const data = await res.json().catch(() => ({}));
        if (!cancelled) setStatus(data?.premiumReport ? "granted" : "denied");
      } catch {
        if (!cancelled) setStatus("denied");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#F7F4ED]">
        <Loader2 className="w-10 h-10 text-[#5A7492] animate-spin" />
        <p className="text-[#5E7183] font-bold">Loading your report…</p>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-16 bg-[#F7F4ED]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#3A556C]/10 shadow-[0_10px_40px_rgba(58,85,108,0.10)] p-8 md:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F7F4ED] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-[#E07850]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3A556C] mb-3">{title}</h1>
          <p className="text-[#5E7183] font-medium leading-relaxed mb-8">{blurb}</p>

          <CheckoutButton
            sku="premium-report"
            returnTo={returnTo}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg py-4 rounded-2xl transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-70"
          >
            Unlock for €9.99
          </CheckoutButton>

          <p className="text-xs font-bold text-[#8B93A1] mt-4">
            Secure checkout by Stripe · 7-day money-back guarantee
          </p>
          <p className="text-xs font-medium text-[#8B93A1] mt-3">
            Already paid? Open the link in your Stripe receipt on this device to restore access.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
