import { NextRequest, NextResponse } from "next/server";
import { getStripe, siteUrl } from "@/lib/stripe/server";
import { STRIPE_PRODUCTS, isSku } from "@/lib/stripe/products";

export const dynamic = "force-dynamic";

/**
 * Creates a Stripe Checkout Session and returns its hosted URL.
 *
 * The client sends only { sku, email?, returnTo? }. The price is looked
 * up server-side from STRIPE_PRODUCTS — a tampered request can change
 * WHICH product is bought, never what it costs.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sku, email, returnTo } = body ?? {};

    if (!isSku(sku)) {
      return NextResponse.json({ error: "Unknown product." }, { status: 400 });
    }

    const product = STRIPE_PRODUCTS[sku];
    const origin = siteUrl();

    // Only allow same-site return paths — an open redirect here would let
    // someone send a "you paid" link that bounces to their own domain.
    const safeReturn =
      typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//")
        ? returnTo
        : "/";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: product.priceId, quantity: 1 }],
      // Buyer identity: prefill when the quiz already collected an email.
      ...(typeof email === "string" && email.includes("@") ? { customer_email: email } : {}),
      success_url: `${origin}/unlocked?session_id={CHECKOUT_SESSION_ID}&next=${encodeURIComponent(safeReturn)}`,
      cancel_url: `${origin}${safeReturn}`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: { sku, returnTo: safeReturn },
      payment_intent_data: {
        metadata: { sku },
        description: product.name,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout could not be started." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    // Never echo the raw Stripe error to the browser — it can contain
    // account and key details.
    console.error("[checkout]", err?.message ?? err);
    const configured = Boolean(process.env.STRIPE_SECRET_KEY);
    return NextResponse.json(
      {
        error: configured
          ? "Checkout is temporarily unavailable. Please try again."
          : "Payments are not configured yet.",
      },
      { status: 500 }
    );
  }
}
