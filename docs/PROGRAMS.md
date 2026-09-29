# Workbook programmes: structure, phases, and how each one gets built

## The line-up

Fifteen quizzes map onto seven programmes, one per underlying problem.
Several quizzes measure the same thing from different angles, so one
programme each would have meant writing the same workbook five times.

| # | Programme | Fed by | Status |
|---|---|---|---|
| 1 | **Trust Your Own Mind** · manipulation and gaslighting | is-he-manipulative, is-he-gaslighting-me, things-he-says | **Live** |
| 2 | **Earned Security** · anxious attachment | attachment-style-quiz (anxious and fearful results only) | **Live** |
| 3 | **Choosing Differently** · the pull toward the wrong partners | pick-bad-guys, attract-toxic, what-kind-of-person, who-is-attracted, attraction-patterns, keep-dating-the-same-type | **Live** |
| 4 | **Letting People In** · self-sabotage and avoidance | why-do-i-sabotage-relationships | Outline |
| 5 | **Friendships That Give Back** · one-sided friendships, people-pleasing | toxic-friend, friends-bad, friends-using, friend-group-role, is-my-best-friend-toxic | Outline |
| 6 | **After the Doubt** · suspicion, checking, trust | is-he-cheating | Outline |
| 7 | **Loving Someone Who Pulls Away** · the avoidant partner | partners-attachment-style | Outline |

Every programme's full session-by-session structure is in
`lib/programs/registry.ts` and visible on its page.

## The shape every programme follows

Four weeks, five sessions a week, ten to fifteen minutes each. The weeks
always move the same way, which is the arc of a structured CBT protocol:

1. **See it** · name the pattern, take a baseline measure
2. **Understand it** · where it comes from, what it protects, what it costs
3. **Change it** · skills, practised on the real situation, ending in a behavioural experiment
4. **Live it** · values, self-compassion, a relapse plan, a closing letter

Methods are named honestly on every programme page (CBT, DBT, ACT, schema
therapy, EFT, compassion-focused, motivational interviewing). The line is
always "draws on"; never "clinically proven". It is self-help, and says so.

Week 1 of every programme is free. The first scale in week 1 is re-measured
in weeks 2 and 4 against that baseline, so she can see her own change.

## Phases, in revenue order

**Phase 1 · done.** The engine, the catalogue, all seven structures, and
Trust Your Own Mind written in full. First because the paid-social funnel
lands on it: TikTok → /things-he-says → the manipulation report → this.

**Phase 2 · Earned Security · done.** Attachment is 63% of the search
queries reaching the site. It replaced the original 6-week workbook: the
48 hand-built pages are deleted and every old URL redirects permanently to
the programme overview. The attachment report offers it only to anxious
and fearful results; an avoidant result is not sold an anxiety programme.

**Phase 3 · Choosing Differently · done.** Six quizzes feed it, so one
programme lit up the offer on six results at once. It says plainly, more
than once, that being treated badly is never the reader's fault; the work
is on who she lets in and how fast.

Also in this phase: the free week 1 is now offered on the **free** result
of every quiz with a live programme, not only on paid reports (most
visitors never buy the report). `QuizWidget` keys the offer on the page
path, so each quiz picks up its programme the day it goes live.

**Phase 4 · Letting People In.** Completes the attachment pair with Phase 2.

**Phase 5 · Friendships That Give Back.** Four quizzes; a lower-intensity
audience that is easier to reach on social.

**Phase 6 · After the Doubt, and Loving Someone Who Pulls Away.**
Single-quiz programmes; lowest leverage, written last.

## Definition of done for a programme

A programme is not switched to `live` until all of these are true:

- All 20 sessions written against its outline, with no em dashes
- Every "why" note names a real method or researcher, and makes no claim
  that cannot be defended
- A safety note on day 1 if the subject can involve risk (abuse, self-harm)
- Every session rendered in a browser at phone width, every block used
- Baseline scale in week 1 re-measured later with `compareTo`, and
  `better: "lower"` set on any scale where less is progress
- A real week of answers run through the weekly review, and the output
  read by a person before anyone is charged for it

Flipping `status` to `live` is the only switch. It lists the programme in
the catalogue, generates its session pages, and makes `ProgramOffer`
appear on every report whose quiz is in its `forQuizzes`.

## Pricing

€49 (the `report-workbook-bundle` SKU) opens every programme, including
each new one as it opens. That makes the bundle grow in value with every
phase at no cost to existing buyers, and needs no new Stripe products.

**Worth testing once there is traffic:** a single-programme price around
€19 to €29 for paid-social buyers, who are further from a €49 decision
than someone who arrived from search. That needs a new Stripe price and a
per-programme entitlement, so it waits until there is data to justify it.

## Adding a block type

`lib/programs/types.ts` defines the block union, `components/program/Blocks.tsx`
renders it. Every block persists itself through `usePersisted`, saving as
readable text so the weekly review can respond to it. Any textarea a block
renders carries `data-oc-skip` so the older site-wide autosave does not
store it a second time.
