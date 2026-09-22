# Growth playbook

What was built, what it is for, and what to do with it.

## The situation this addresses

Measured, not estimated:

- **4 quiz completions in five months.** Two were the owner's own email,
  one was a junk test (`fgt@fg`), one was a genuine stranger. Zero in the
  64 days before this was written.
- **No analytics of any kind** had ever been installed — no Vercel, no GA,
  nothing in `layout.tsx`. Traffic was not low; it was unmeasured.
- Payments went live days before. Zero purchases.

The product was never the constraint. The site converts a visitor; it has
almost no visitors. Everything below exists to change that one number.

## The arithmetic to keep in mind

At €9.99 with a realistic 2% quiz-to-purchase rate:

| Monthly revenue | Sales | Quiz completions | Visitors |
|---|---|---|---|
| €100 | 10 | 500 | 2,500–5,000 |
| €500 | 50 | 2,500 | 12,500–25,000 |
| €1,000 | 100 | 5,000 | 25,000–50,000 |

Two consequences follow, and both are structural:

**Paid acquisition does not work at this price.** You can afford about
€0.20 a visitor; relationship-niche CPCs run €0.30–1.50. Do not spend
money on ads at €9.99 — the unit economics are inverted before you start.

**The higher tiers are where the money actually is.** €49 bundle and €179
reset program need 20 and 6 customers respectively to match €1,000. That
is a completely different marketing problem, and an easier one.

## What was built

### 1. Measurement — `lib/track.ts`

Seven events covering every point where people leave: `quiz_start`,
`quiz_halfway`, `quiz_complete`, `email_submit`, `paywall_view`,
`checkout_click`, `purchase`.

The two comparisons that matter:

- **`quiz_complete` ÷ `quiz_start`** — if this is under ~40%, the quizzes
  are too long. Several are 50–120 questions, which is a lot to ask of a
  stranger. Cutting one to 15 questions and comparing is the highest-value
  experiment available.
- **`checkout_click` ÷ `paywall_view`** — this separates "nobody wants it"
  from "the price is wrong". Without it both look identical, which is why
  guessing at the price is usually wasted effort.

### 2. Distribution — `/api/og` + `ResultShare`

A quiz's only free channel is people posting their own result. Three
things make that happen and the old share button had none of them:

- The link previews as a designed card carrying their archetype
- The text is about them ("I got The Intensity Chaser"), not about us
- Saving the image is one tap, because most sharing is a screenshot

The shared link points at the **quiz**, not the result — the recipient has
to land somewhere they can take it themselves or there is no loop.

### 3. Search — `/signs/*`

20 long-tail pages, ~750 words each, statically generated with Article +
FAQPage schema.

The category keywords belong to Healthline, Verywell Mind, Psychology
Today and Cleveland Clinic. A new domain does not take those. What those
sites do not write is the sentence someone types at 1am — "he says I'm too
sensitive", "my friend only calls when she needs something". Specific,
urgent, barely contested, and the searcher is already in the situation the
quiz measures.

Each page answers the question properly in the first paragraph (snippet
and AI-citation bait), includes a required honest counter-case, and links
to exactly one quiz.

**Adding more:** the rules are in `lib/seo/symptoms.ts`. The one that
matters — if you cannot write three real paragraphs about it, it is not a
page. Thin programmatic content gets de-indexed and deserves to be.

### 4. Video — `docs/growth/VIDEO-SCRIPTS.md`

Fifteen ready-to-film scripts, one per quiz, plus the reply-video habit
and a realistic expectation of what the first thirty days look like.

This is the channel that can actually work: no budget, no domain
authority, no audience required.

### 5. Making the €49 tier real

The bundle advertised a 6-week workbook while all 42 days of it sat
publicly readable. Week 1 is now the free sample; weeks 2–6 are what the
bundle buys. `FREE_WEEKS` in `WorkbookGate` reverts it in one line.

## What to do, in order

**This week**

1. Verify the site in Google Search Console. It may not be a ranking
   problem — it may not be indexed at all, and you cannot tell from here.
2. Submit `sitemap.xml`. It now includes all 20 symptom pages.
3. Fix the Stripe statement descriptor (`RESULT FEE` → `OOPSCUPID`),
   add a support email, upload a logo. Do this before the first sale, not
   after the first chargeback.
4. Set `CRON_SECRET` in Vercel so the 24-hour answer purge actually runs —
   the privacy claim on the homepage depends on it.

**Next 30 days**

5. One video a day from the scripts. Same script, different hooks, three
   times across two weeks.
6. Watch `quiz_complete ÷ quiz_start`. If it is under 40%, shorten a quiz
   to 15 questions and compare. This is likely the single biggest
   conversion lever on the site.
7. Add 10 more symptom pages if any of the first 20 get impressions.
   Search Console tells you which.

**When there is traffic**

8. Then, and only then, tune the paywall. Price tests on zero traffic
   produce noise.
9. Consider whether €9.99 is the right shape at all. One-time consumer
   purchases are the hardest model there is — every euro needs a new
   stranger. The coaching tiers need your time but need 20× fewer people.

## What not to do

- **Do not buy ads at €9.99.** The maths does not work, and it will not
  start working at higher volume.
- **Do not chase the category keywords.** "What is gaslighting" is not
  available to you. The long tail is.
- **Do not build more quizzes.** There are 15 and they now work. The
  constraint is distribution, and a sixteenth quiz is not distribution.
- **Do not optimise the funnel on zero traffic.** Everything looks broken
  at n=4 and nothing is statistically real until roughly n=1,000.
