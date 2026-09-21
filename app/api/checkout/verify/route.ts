import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";
import { isSku } from "@/lib/stripe/products";
import { ACCESS_COOKIE, ACCESS_COOKIE_OPTIONS, mintAccessToken } from "@/lib/stripe/access";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Called by /unlocked after Stripe redirects the buyer back.
 *
 * Verifies with Stripe that the session was actually paid (the session_id
 * in the URL proves nothing on its own), then sets the signed entitlement
 * cookie. This is the only place access is granted from a redirect.
 */
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json().catch(() => ({}));
    if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ paid: false, error: "Invalid session." }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false, error: "Payment not completed." }, { status: 402 });
    }

    const sku = session.metadata?.sku;
    if (!isSku(sku)) {
      return NextResponse.json({ paid: false, error: "Unknown product." }, { status: 400 });
    }

    // Best-effort lead update. Never block the buyer's unlock on the
    // database being reachable — the webhook is the durable record.
    try {
      const email = session.customer_details?.email ?? session.customer_email;
      if (email) {
        await prisma.lead.upsert({
          where: { email },
          update: { premiumClicked: true },
          create: { email, quizType: sku, premiumClicked: true },
        });
      }
    } catch (e) {
      console.error("[checkout/verify] lead upsert failed", e);
    }

    const res = NextResponse.json({
      paid: true,
      sku,
      returnTo: session.metadata?.returnTo ?? "/",
    });
    res.cookies.set(ACCESS_COOKIE, mintAccessToken(sessionId, sku), ACCESS_COOKIE_OPTIONS);
    return res;
  } catch (err: any) {
    console.error("[checkout/verify]", err?.message ?? err);
    return NextResponse.json({ paid: false, error: "Could not verify payment." }, { status: 500 });
  }
}
