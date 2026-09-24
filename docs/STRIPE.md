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

## 3. Database — already done ✅

The `Purchase` table was created directly on the Neon project
**oopscupid-celeste-house** (`raspy-field-98840356`) on 2026-09-21, with
indexes named to match Prisma's conventions. Verified: the unique
constraint on `stripeSessionId` makes the webhook idempotent, so Stripe's
retries update rather than duplicate.

Nothing to run. The exact SQL is kept in `prisma/sql/001_purchase.sql` if
the table ever needs recreating (e.g. on a new branch or database).

> Note: this Neon database is shared with another application's tables.
> Only `Purchase` was added; nothing else was touched.

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

Four premium reports used to bypass that rule with hard-coded Gumroad
links (`caught-or-paranoid`, `clean-break-or-comeback`,
`cheating-truth-bundle`, `sabotage-bundle`, `attachment-workbook`,
`trauma-playbook`, `gaslighting-bundle`, `decode-his-attachment`,
`reach-him-playbook`, `attachment-truth-bundle`). Those storefront pages
do not exist, so buyers landed on a dead link after paying for the
report. The links are gone; the cards now read "In production". The
gaslighting report also advertised **€12.99** for the report and a
**€15.99** bundle — neither is a price this account charges.

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

---

## Account health check (2026-09-21)

Read from the live account `acct_1Tuq5BLxuKpAU8j4`. Payments are
**enabled** (`charges_enabled: true`, `payouts_enabled: true`) and a
BPER bank account is attached. Four things need your attention in the
Stripe Dashboard — none of them are code.

### 1. Card statements say "RESULT FEE" — fix this first

`settings.card_payments.statement_descriptor_prefix` is **`RESULT FEE`**,
and the Checkout page shows the business as "Result fee". A buyer who
sees an unrecognised name on their bank statement disputes the charge —
this is the single most common cause of avoidable chargebacks, and
Stripe counts disputes against the account.

**Fix:** Dashboard → Settings → Business → *Public details* → set the
statement descriptor prefix to `OOPSCUPID`. (The base descriptor is
already `OOPSCUPID`; only the prefix is wrong.) This cannot be changed
through the API for a Standard account.

### 2. Payouts are on a MANUAL schedule

`settings.payouts.schedule.interval: "manual"` — money accumulates in the
Stripe balance and **never reaches your bank on its own**. Set it to
daily/weekly under Settings → Payouts, or remember to pay yourself out.

### 3. Identity verification did not pass

`individual.verification.status: "unverified"`, reason
`failed_keyed_identity` ("provided identity information could not be
verified"). Documents are uploaded and nothing is `currently_due`, so
charges and payouts still work — but this can escalate into a payout
hold. Worth resolving while there is no money at stake.

### 4. `company.vat_id` is eventually due

Not blocking today. Stripe accepts `company.registration_number` as an
alternative.

### Also worth doing

- **Support email** is empty (`business_profile.support_email: null`).
  It appears on receipts and is the first thing a confused buyer uses
  instead of opening a dispute.
- **No logo or brand colour** is set, so Stripe Checkout renders
  generically. Settings → Branding; the checkout page is the least
  trusted moment in the funnel and a logo measurably helps.

### Enabled payment methods (verified)

card, Link, Klarna, Bancontact, EPS, MB WAY, Amazon Pay, Satispay,
Revolut Pay, BLIK, PIX, Samsung/Kakao/Naver Pay. Adaptive Pricing is on,
so non-euro buyers see their own currency.

---

## Premium reports (2026-09-22)

Every one of the 15 quizzes now has a `/<quiz>/premium` route. They all
render the same component, `components/report/premium/PremiumDossier.tsx`,
from a per-quiz content file that satisfies the contract in
`lib/report/dossier.ts`.

### The contract exists to stop the reports going generic

The old reports repeated themselves because the writing was keyed to the
score band: everyone in "high risk" read the same three paragraphs. The
`Dossier` type cannot be satisfied without a distinct `mechanism`, three
score tiers and a counter-move for **every** subscale the quiz measures,
so two people in the same band get different reports. When adding a
quiz, fill the content file — do not widen the type.

### The post-checkout return trip

A buyer leaves for Stripe and comes back to a fresh React tree. Anything
held only in component state is gone by then, which is how someone could
pay and land back on question one. Every quiz therefore writes its result
through `lib/quizResults.ts` before any checkout button is shown, and
rehydrates from it on mount. `CheckoutButton` returns to
`/<quiz>/premium`, not to the quiz root.

**This store holds results, never entitlement.** Access is decided by the
server-signed httpOnly cookie via `/api/access`. Editing localStorage
unlocks nothing.

### Charts

`RiskGauge`, `SubscaleRadar` and `SignalFrequency` in
`components/report/charts/`. Two quizzes score a long tail of
one-question subscales; `lib/report/composites.ts` averages those into
dimensions with enough items to be worth charting. Do not put a
single-item subscale on a chart — a precise-looking number built from one
answer is worse than no number.

---

## The workbook and the weekly review (2026-09-24)

### What was wrong

The €49 tier sold a "6-week workbook". Of its 49 pages, **48 had input
boxes and 4 called the save action** — and that action passed a `userId`
the `WorkbookEntry` table did not have, so Prisma rejected every write and
the `catch` swallowed it silently. **Two entries were stored in five
months.** Everything else anyone typed was gone on refresh.

So the product was 42 pages of static text with decorative textareas. That
does not justify €49, and no amount of better copy would have.

### What makes it worth the price now

`/api/workbook/review` reads a week of the buyer's **own writing** and
responds to it — quoting their words back, naming what shifted between
days, flagging where two entries contradict each other, and setting one
concrete task. The prompt explicitly forbids encouragement and summary,
because a model told to be supportive produces exactly the horoscope
filler that made the old workbook feel cheap.

It is gated on `workbook` entitlement, so it is what the bundle buys.

### AI provider

`lib/ai/client.ts` is provider-agnostic. DeepSeek, Moonshot (Kimi) and
OpenAI share a wire format, so the model is configuration:

| Variable | Values | Default |
|---|---|---|
| `AI_PROVIDER` | `deepseek` · `moonshot` · `openai` | `deepseek` |
| `AI_API_KEY` | key for that provider | — |
| `AI_MODEL` | override the default model | per provider |

Provider-specific keys (`DEEPSEEK_API_KEY`, `MOONSHOT_API_KEY`,
`OPENAI_API_KEY`) are also read, and `OPENAI_API_KEY` remains the final
fallback so the existing attachment report is untouched.

**Why not just OpenAI:** a review reads several hundred words and writes
several hundred back. On DeepSeek that is a fraction of a cent; on GPT-4o
it is real money per review. At €49 with unknown volume, being able to
move providers without a deploy is worth the small abstraction.

Moonshot: use `https://api.moonshot.cn/v1` instead of `.ai` for a
mainland-China account — set `AI_MODEL` if that account offers different
model names.

### Persistence

`WorkbookExercise` writes twice on purpose: localStorage synchronously (so
a closed tab never costs someone their work even offline) and the database
debounced (because the review reads across days and cannot see
localStorage). Entries are grouped by a per-device `sessionId`, so the
review works without an account — sign-in is optional.
