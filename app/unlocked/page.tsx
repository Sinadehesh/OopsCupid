"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, AlertTriangle, CalendarClock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { trackPurchase } from "@/lib/track";

/**
 * Where Stripe sends the buyer after a successful payment.
 *
 * The session_id in the URL proves nothing by itself, so this page asks
 * the server to verify it with Stripe before anything is unlocked.
 */
function UnlockedInner() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const next = params.get("next") || "/";

  const [state, setState] = useState<"verifying" | "ok" | "failed">("verifying");
  const [sku, setSku] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setState("failed");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.paid) {
          // The only event that represents money. Fired here rather than
          // on the button so it counts verified payments, not intents.
          trackPurchase(data.sku ?? "unknown");
          setSku(data.sku ?? null);
          setState("ok");
          // Local hint for instant UI; the httpOnly cookie is what the
          // server actually trusts.
          try {
            localStorage.setItem("oc_unlocked", "1");
          } catch {}
          // Give the confirmation a beat to register, then continue.
          setTimeout(() => router.replace(data.returnTo || next), 2200);
        } else {
          setState("failed");
        }
      } catch {
        setState("failed");
      }
    })();
  }, [sessionId, next, router]);

  const coaching = sku === "clarity-call" || sku === "reset-program" || sku === "ultimate-bundle";

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-[#F7F4ED]">
      <div className="max-w-lg w-full text-center">
        {state === "verifying" && (
          <>
            <Loader2 className="w-14 h-14 text-[#5A7492] animate-spin mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-[#3A556C] mb-3">Confirming your payment…</h1>
            <p className="text-[#5E7183] font-medium">This takes a second. Please don&apos;t close this page.</p>
          </>
        )}

        {state === "ok" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-11 h-11 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3A556C] mb-4">You&apos;re unlocked.</h1>
            <p className="text-[#5E7183] font-medium text-lg mb-8">
              Your receipt is on its way by email. Taking you to your report now…
            </p>

            {coaching && (
              <div className="bg-white border border-[#EC8A66]/30 rounded-2xl p-6 text-left flex gap-4 mb-8">
                <CalendarClock className="w-6 h-6 text-[#E07850] shrink-0 mt-0.5" />
                <p className="text-[#3A556C] font-medium text-sm leading-relaxed">
                  <strong className="block mb-1">Your session still needs booking.</strong>
                  We&apos;ll email your scheduling link within 24 hours. If it hasn&apos;t arrived,
                  reply to your Stripe receipt and we&apos;ll sort it immediately.
                </p>
              </div>
            )}

            <Link
              href={next}
              className="inline-flex items-center gap-2 font-bold text-[#E07850] hover:text-[#EC8A66]"
            >
              Continue now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {state === "failed" && (
          <>
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#3A556C] mb-4">We couldn&apos;t confirm that payment</h1>
            <p className="text-[#5E7183] font-medium mb-8">
              If you were charged, your access is safe — we have the record. Reply to your Stripe
              receipt and we&apos;ll unlock it by hand, usually within the hour. You have not been
              charged twice.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-bold px-8 py-4 rounded-2xl"
            >
              Back to OopsCupid
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function UnlockedPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] flex items-center justify-center bg-[#F7F4ED]">
          <Loader2 className="w-12 h-12 text-[#5A7492] animate-spin" />
        </main>
      }
    >
      <UnlockedInner />
    </Suspense>
  );
}
