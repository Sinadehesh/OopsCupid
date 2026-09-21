# Stripe Payments

Live products exist in the **Oopscupid** Stripe account
(`acct_1Tuq5BLxuKpAU8j4`). The code is wired; what remains is the
environment configuration below.

## 1. Environment variables (Vercel → Settings → Environment Variables)

| Variable | Where to get it | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → **Secret key** (`sk_live_…`) | Production only. Never commit it; never paste it into chat. |
| `STRIPE_WEBHOOK_SECRET` | Created in step 2 (`whsec_…`) | Without it the webhook rejects everything. |
| `ACCESS_TOKEN_SECRET` | Any long random string — `openssl rand -base64 32` | Signs entitlement cookies. Rotating it logs everyone out of paid reports. |
| `NEXT_PUBLIC_SITE_URL` | `https://oopscupid.com` | Used to build Stripe redirect URLs. |

## 2. Create the webhook endpoint

Stripe → Developers → Webhooks → **Add endpoint**

- URL: `https://oopscupid.com/api/stripe/webhook`
- Events: `checkout.session.completed`, `charge.refunded`, `charge.dispute.created`
- Copy the signing secret into `STRIPE_WEBHOOK_SECRET`, then redeploy.

## 3. Run the database migration

The `Purchase` model is new:

```bash
npx prisma migrate deploy      # or: npx prisma db push
```

## 4. Test before announcing

Use a **test-mode** key first (`sk_test_…` + a test webhook secret) and
card `4242 4242 4242 4242`, any future expiry, any CVC. Walk the full
path: quiz → free result → Unlock → Stripe → `/unlocked` → report
renders. Then open the report in a private window and confirm it is
**locked** — that proves the gate works.

## What is sold

| SKU | Price | Deliverable | Fulfilment |
|---|---|---|---|
| `premium-report` | €9.99 | Full in-app report | Automatic (entitlement cookie) |
| `report-workbook-bundle` | €49 | Report + 6-week in-app workbook | Automatic |
| `ultimate-bundle` | €59 | Both + 60-min session | **Manual**: send scheduling link |
| `clarity-call` | €49 | 60-min 1:1 session | **Manual**: send scheduling link |
| `reset-program` | €179 | 4 × 1:1 sessions | **Manual**: send scheduling link |

### Coaching purchases need a human

Nothing schedules sessions automatically yet. Every coaching purchase is
recorded with `needsScheduling = true` and logged loudly in Vercel as
`ACTION REQUIRED — send scheduling link`. Find outstanding ones with:

```sql
SELECT "email", "sku", "createdAt" FROM "Purchase"
WHERE "needsScheduling" = true ORDER BY "createdAt" DESC;
```

Wire a Calendly/Cal.com link into the webhook (or a Stripe receipt
email) to automate this.

### Products deliberately NOT sold

The 16 topic playbooks and courses in `lib/offers/catalog.ts` (the
`ladders` table) have **no Stripe SKU** because the PDFs do not exist.
Their buttons render as "Coming soon" instead of taking money for
something that cannot be delivered. Create the PDF, add a Stripe
product, then add its `sku` and price ID to `lib/stripe/products.ts`.

## How the money path works

1. `CheckoutButton` posts **only a SKU** to `/api/checkout`.
2. The server resolves SKU → Stripe Price (`lib/stripe/products.ts`).
   Amounts never come from the browser, so checkout cannot be tampered with.
3. Stripe hosts the card form — no card data touches this site (PCI SAQ-A).
4. On success Stripe redirects to `/unlocked`, which calls
   `/api/checkout/verify`. That endpoint asks Stripe whether the session
   was really paid, then sets a signed **httpOnly** entitlement cookie.
5. `PremiumGate` asks `/api/access` what the cookie grants. Editing
   localStorage or the DOM unlocks nothing.
6. `/api/stripe/webhook` is the durable record — it writes the `Purchase`
   row and is retried by Stripe until it succeeds, so a buyer who closes
   the tab is still recorded.

## Known limits

- **Static builds have no gate.** The GitHub Pages export and the Android
  app ship without API routes; `PremiumGate` falls back to a local flag
  and `CheckoutButton` sends buyers to the website. The web app is the
  revenue path.
- **Refunds are manual.** `charge.refunded` is logged but does not revoke
  an entitlement cookie before it expires (90 days).
- **No customer login.** Access lives in a per-device cookie. A buyer who
  switches devices must re-open their receipt link. Add accounts
  (NextAuth is already installed) if this becomes a support burden.
