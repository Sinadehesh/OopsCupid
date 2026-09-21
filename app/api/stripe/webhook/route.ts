import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { STRIPE_PRODUCTS, isSku } from "@/lib/stripe/products";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
// Stripe signs the RAW body — any parsing or transformation breaks
// verification, so this route must read text, never req.json().
export const runtime = "nodejs";

/**
 * Stripe webhook — the durable record of every purchase.
 *
 * The redirect back to /unlocked is best-effort (buyers close tabs, lose
 * signal, or pay on a different device). This endpoint is what Stripe
 * retries until it succeeds, so fulfilment logic belongs HERE, not in the
 * success page.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch (err: any) {
    // An unverified payload is either a misconfiguration or an attacker.
    console.error("[stripe/webhook] signature verification failed:", err?.message);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status !== "paid") break;

        const sku = session.metadata?.sku;
        const email = session.customer_details?.email ?? session.customer_email ?? null;
        const product = isSku(sku) ? STRIPE_PRODUCTS[sku] : null;

        await recordPurchase({
          sessionId: session.id,
          sku: sku ?? "unknown",
          email,
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "eur",
          needsScheduling: Boolean(product?.grants.coaching),
        });

        if (product?.grants.coaching) {
          // Coaching is human-delivered: this purchase is NOT fulfilled
          // until a scheduling link is sent. Surfaced loudly in logs so
          // it stays visible in Vercel until a mailer is wired up.
          console.warn(
            `[stripe/webhook] ACTION REQUIRED — send scheduling link for "${product.name}" to ${email ?? "(no email)"} (session ${session.id})`
          );
        }
        break;
      }

      case "charge.refunded":
      case "charge.dispute.created": {
        const charge = event.data.object as Stripe.Charge;
        console.warn(`[stripe/webhook] ${event.type} for charge ${charge.id}`);
        break;
      }

      default:
        break;
    }
  } catch (err: any) {
    // Return 500 so Stripe retries — swallowing the error would silently
    // lose the purchase record.
    console.error("[stripe/webhook] handler failed:", err?.message ?? err);
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function recordPurchase(p: {
  sessionId: string;
  sku: string;
  email: string | null;
  amountTotal: number;
  currency: string;
  needsScheduling: boolean;
}) {
  // Idempotent: Stripe delivers events at least once, so a retry must not
  // create a second row.
  await prisma.purchase.upsert({
    where: { stripeSessionId: p.sessionId },
    update: { status: "paid" },
    create: {
      stripeSessionId: p.sessionId,
      sku: p.sku,
      email: p.email,
      amountTotal: p.amountTotal,
      currency: p.currency,
      needsScheduling: p.needsScheduling,
      status: "paid",
    },
  });

  if (p.email) {
    await prisma.lead.upsert({
      where: { email: p.email },
      update: { premiumClicked: true },
      create: { email: p.email, quizType: p.sku, premiumClicked: true },
    });
  }
}
