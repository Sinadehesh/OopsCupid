# Monetization & Offer Architecture

## How it works

Every funnel now monetizes through a **3-rung value ladder** rendered after
results, driven by two config files:

- `lib/quizzes/registry.ts` — every quiz/article, its topic, and hub.
  Adding a quiz here automatically adds it to the sitemap and the
  "Related Tests" internal-link blocks.
- `lib/offers/catalog.ts` — every product and coaching offer, keyed by
  topic. **All prices and Gumroad URLs live here — edit this one file to
  change any offer anywhere on the site.**

The ladder per topic:

| Rung | Offer | Price point | Role |
|------|-------|-------------|------|
| 1 | Playbook (PDF) | €12–19 | Tripwire — easy first yes |
| 2 | Course / Bundle | €24–29 | Core offer |
| 3 | 1:1 Clarity Session | €49 | High-margin coaching |
| 4 | 4-Week Pattern Reset | €179 | Backend, pitched on /coaching and after sessions |

The **featured rung adapts to quiz severity** (`getOfferStack`): low
scores feature the cheap playbook, moderate scores the course, high
scores the coaching session — matching willingness to pay to urgency.

## Components

- `components/offers/OfferLadder.tsx` — 3-card pricing grid, severity-aware highlight
- `components/offers/CoachingUpsell.tsx` — full-width coaching block, severity-aware copy
- `app/coaching/page.tsx` — coaching landing page (linked from header + footer)

Currently wired into: is-he-cheating (premium report), is-he-manipulative
(premium page), why-do-i-attract-toxic-people (premium report + page),
is-he-gaslighting-me (premium report), why-do-i-sabotage-relationships
(premium report). To add to another funnel, import `CoachingUpsell`
and/or `OfferLadder` and drop them after the report content.

## ⚠️ Gumroad products you must create

These URLs are referenced in `lib/offers/catalog.ts` but the products
**do not exist yet** on Gumroad. Create them (or repoint the URLs to
existing products):

| Product | Suggested price | URL slug |
|---------|-----------------|----------|
| 60-Minute Clarity Session | €49 | `oopscupid.gumroad.com/l/clarity-session` |
| The 4-Week Pattern Reset | €179 | `oopscupid.gumroad.com/l/pattern-reset` |
| Manipulation Defense Playbook | €14 | `oopscupid.gumroad.com/l/manipulation-defense` |
| Frame Control Course | €29 | `oopscupid.gumroad.com/l/frame-control` |
| Pattern Breaker Playbook | €14 | `oopscupid.gumroad.com/l/pattern-breaker` |
| Friendship Audit Kit | €12 | `oopscupid.gumroad.com/l/friendship-audit` |
| Boundaries Course | €24 | `oopscupid.gumroad.com/l/boundaries-course` |
| Red Flag Decoder | €12 | `oopscupid.gumroad.com/l/red-flag-decoder` |
| Smart Screening Course | €24 | `oopscupid.gumroad.com/l/smart-screening` |

For coaching products on Gumroad: create a product whose deliverable is
a scheduling link (Calendly/Cal.com) in the receipt. Gumroad is the
merchant of record, which is what makes selling possible without your
own payment entity.

Already-existing products referenced (verify they're live):
`caught-or-paranoid`, `cheating-truth-bundle`, `gaslighting-defense-playbook`,
`gaslighting-bundle`, `attachment-workbook`, `attachment-truth-bundle`,
`trauma-playbook`, `sabotage-bundle`.

## SEO layer

- `app/sitemap.ts` — now generated from the registry (38 URLs).
- `components/seo/JsonLd.tsx` — Quiz, FAQPage, BreadcrumbList structured
  data. Quiz schema targets "test/quiz" intent queries; FAQPage targets
  People-Also-Ask long-tails.
- `components/seo/QuizFaq.tsx` — visible FAQ + matching JSON-LD in one
  component (Google requires the marked-up text to be visible).
- `components/seo/RelatedQuizzes.tsx` — topic-based internal links on
  every enhanced page.

Enhanced so far: is-he-cheating, is-he-manipulative, is-he-gaslighting-me,
why-do-i-attract-toxic-people, toxic-friend-test (+ /coaching). Pattern
for rolling out to remaining quiz pages: add canonical + OG metadata,
`QuizJsonLd`, `BreadcrumbJsonLd`, a 3–4 item `QuizFaq`, and
`RelatedQuizzes` — see `app/is-he-cheating/page.tsx` as the template.

## Conversion notes

- The GOD MODE / Auto-complete developer buttons were removed from the
  live quiz engines (is-he-cheating, is-he-manipulative,
  why-do-i-attract-toxic-people).
- Footer dead links (`/tools/*`, `/quizzes/*`, `/about`, `/contact`)
  replaced with real high-value pages + coaching link.
- All new offer copy uses honest anchors (typical coaching rates, bundle
  vs. single pricing) and a refund guarantee instead of fake countdown
  timers — safer under EU consumer law and more credible to skeptical
  buyers.
