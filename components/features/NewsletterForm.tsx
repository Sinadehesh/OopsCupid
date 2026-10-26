"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { trackEmailSubmit } from "@/lib/track";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || state === "saving") return;

    setState("saving");
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, quizType: "newsletter" }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "We couldn't add you to the list. Please try again.");
      }

      trackEmailSubmit("newsletter");
      setState("saved");
    } catch (caught) {
      setState("idle");
      setError(
        caught instanceof Error
          ? caught.message
          : "We couldn't add you to the list. Please try again."
      );
    }
  };

  if (state === "saved") {
    return (
      <div
        role="status"
        className="flex min-h-[64px] items-center justify-center gap-3 rounded-2xl bg-white/10 px-6 py-4 text-left"
      >
        <CheckCircle2 className="h-6 w-6 shrink-0 text-[#FFE68A]" />
        <p className="text-lg font-bold text-white">You&apos;re on the free update list.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          autoComplete="email"
          className="w-full bg-white text-[#1A1033] px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-[#9B7BFF]/50 text-[18px] font-medium placeholder:text-[#1A1033]/40"
          required
        />
        <button
          type="submit"
          disabled={state === "saving"}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#FF4FA3] text-white px-8 py-4 rounded-full font-extrabold text-[18px] transition-colors whitespace-nowrap shadow-lg disabled:cursor-wait disabled:opacity-70"
        >
          {state === "saving" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Joining…
            </>
          ) : (
            <>
              Subscribe Free <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
      <p className="mt-4 text-sm font-medium leading-relaxed text-white/60">
        By subscribing, you agree to the{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-white">Terms</Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</Link>.
      </p>
      {error && <p role="alert" className="mt-3 text-sm font-bold text-[#FFE68A]">{error}</p>}
    </div>
  );
}
