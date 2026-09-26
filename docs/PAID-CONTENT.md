# What we are allowed to charge for

This is the rule the paid reports are held to. It exists because we broke it,
noticed from the inside, and want a written test rather than a memory.

## The failure this prevents

Every scoring function on this site used to compute totals and throw the
answers away. A report therefore had two facts to work from — a band and a
set of subscale numbers — and could only do one thing with them: print a
paragraph chosen by band from a shelf of pre-written paragraphs.

The paragraphs were good. That was not the problem. The problem is that two
people who answered fifty questions in opposite directions, and landed in
the same band, received word-for-word the same report. A reader notices this
in under a minute. She is not wrong to call it a leaflet with her score on
it, and she is not wrong to want her money back.

Nothing about that is fixed by better writing. Longer paragraphs make it
worse, because the effort signals that the length was the product.

## The test

**Could this page have been written before the buyer arrived?**

If the whole page could, it is not something to charge for. It may still be
excellent — publish it free and let it earn search traffic.

A paid page has to contain something that did not exist until she answered.
In practice that means one of:

- **her own words, quoted** — the statements she endorsed, with the answer
  she gave, exactly as the quiz worded it;
- **her own contradictions** — two items measuring the same thing that she
  answered at opposite ends. No score can express this and no article can
  guess it;
- **her own exceptions** — what she ruled out, so the pattern has edges she
  can recognise instead of a shape she has to squint at;
- **a response to something she wrote** — the weekly workbook review reads a
  week of her writing and answers it.

`lib/report/evidence.ts` builds the first three from a question bank plus the
raw answers. `Dossier.evidence` carries them; `components/report/premium/
YourAnswers.tsx` renders them as section 02, before any of our
interpretation, so she can check our working.

## Consequences for the code

1. **A scoring function must keep its answers.** Return them alongside the
   totals. This costs nothing and is the only reason the rest is possible.
2. **A quiz must persist them with its result.** `saveQuizResult` stores the
   whole object; `rawAnswers` travels in it.
3. **A dossier without `evidence` should not be sold.** It will render — the
   section is simply absent, which is correct for results saved before this
   existed — but a quiz whose *new* results have no evidence is a quiz whose
   paid report has nothing in it that a free article could not have.
4. **Do not interpret inside the quoted section.** The moment it starts
   explaining what each answer "reveals", it is generated paragraphs again.
   Her data first, our reading after, clearly separated.
5. **The free result must not contain the evidence section.** If the free
   page already shows it, there is no honest reason to charge.

## Consequences for the copy

Every line on a paywall has to be checkable against the report behind it. A
card that promises only "the complete analysis" asks somebody to pay for a
surprise, and a surprise is what makes a report feel like a swindle even
when it is good. The default list lives in `components/report/PremiumGate.tsx`
and each item names a section that demonstrably exists.

Specifically banned, because we have shipped all of them:

- **Invented social proof.** No testimonials, star ratings, or "join 12,000
  women" unless the people are real and consenting. Beyond the ethics, the
  EU Unfair Commercial Practices Directive and the FTC's 2024 Fake Reviews
  Rule both make this straightforwardly illegal.
- **Counts we cannot produce.** No "47 pages", no "12,000 tests taken".
- **Deadlines that are not deadlines.** A countdown that resets on reload is
  a lie the buyer can catch with F5.
- **Clinical claims.** "Research-informed" is defensible. "Clinically
  validated" is not, for any instrument on this site.

## Where it is wired

All fifteen paid reports. Ten render through `PremiumDossier`, which places
the section itself; the other five plus the toxic-attraction report are
hand-built pages that drop in `YourAnswersSection`.

A result saved on someone's device before this shipped has no answers in
it. Those reports render with the section absent rather than faked, and the
buyer sees it after retaking the quiz.

## Applying it to a new quiz

1. Give the question bank `{ id, text, category }`, or map onto that with
   `fromBattery` for the psychometric vaults in `lib/psychometrics/*`.
2. Keep `answers` in the scoring return; pass them through to the dossier.
3. `evidence: answers ? buildEvidence(QUESTIONS, answers) : undefined`.
4. Read the result yourself, in the paid view, having taken the quiz
   honestly. If you would not pay for it, do not ask anyone else to.

Step 4 is the one that actually matters. Every defect this document
describes was visible to anyone who took a quiz and looked at what came
back, and it survived for months because nobody did.
