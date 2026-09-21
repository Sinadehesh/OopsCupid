"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Sku } from "@/lib/stripe/products";

/**
 * The single entry point to payment across the whole site.
 *
 * Posts only a SKU to /api/checkout and follows the hosted Stripe
 * Checkout URL it returns — no card data ever touches our pages, which
 * keeps the site in the lightest PCI scope (SAQ-A).
 */
export default function CheckoutButton({
  sku,
  children,
  className = "",
  email,
  returnTo,
  onUnavailable,
  beforeCheckout,
}: {
  sku: Sku;
  children: React.ReactNode;
  className?: string;
  /** Prefills Stripe Checkout when the quiz already captured an email. */
  email?: string;
  /** Where to send the buyer back to after paying (same-site path). */
  returnTo?: string;
  onUnavailable?: (message: string) => void;
  /**
   * Runs before redirecting to Stripe. Use it to persist quiz state so
   * the report survives the round-trip through Checkout.
   */
  beforeCheckout?: () => void | Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    setLoading(true);
    setError(null);
    try {
      await beforeCheckout?.();
      const path =
        returnTo ??
        (typeof window !== "undefined" ? window.location.pathname : "/");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, email, returnTo: path }),
      });

      // The static export (GitHub Pages / the Android app) has no API
      // routes — send those visitors to the website to complete payment.
      if (res.status === 404) {
        window.location.href = `https://oopscupid.com${path}`;
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        const message = data?.error ?? "Checkout is unavailable right now.";
        setError(message);
        onUnavailable?.(message);
        return;
      }

      window.location.href = data.url;
    } catch {
      const message = "Could not reach checkout. Please try again.";
      setError(message);
      onUnavailable?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={start} disabled={loading} className={className} aria-busy={loading}>
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Opening secure checkout…
          </>
        ) : (
          <>
            {children} <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm font-bold text-rose-600 text-center">
          {error}
        </p>
      )}
    </>
  );
}
