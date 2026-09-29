import type { Program, ProgramOutline, Week } from "./types";
import { TRUST_YOUR_OWN_MIND } from "./content/trust-your-own-mind";
import { EARNED_SECURITY } from "./content/earned-security";
import { CHOOSING_DIFFERENTLY } from "./content/choosing-differently";
import { LETTING_PEOPLE_IN } from "./content/letting-people-in";
import { FRIENDSHIPS_THAT_GIVE_BACK } from "./content/friendships-that-give-back";
import { AFTER_THE_DOUBT } from "./content/after-the-doubt";
import { LOVING_SOMEONE_WHO_PULLS_AWAY } from "./content/loving-someone-who-pulls-away";

/**
 * EVERY PROGRAMME, AND WHICH QUIZZES FEED IT
 *
 * Fifteen quizzes, seven programmes. Several quizzes measure the same
 * underlying problem from different angles (five of them are about who
 * someone is drawn to), so one programme per underlying problem is both
 * the honest mapping and the one that can actually be written well.
 *
 * Build order is revenue order: the programme behind the paid-social
 * funnel first, then the largest search demand, then the programme five
 * quizzes feed. See docs/PROGRAMS.md.
 *
 * A programme with status "outline" is a plan. It is never listed as
 * available and never sold: the outline is the structure its content is
 * written against, nothing more.
 */

/** Outline derived from written content, so the two can never disagree. */
function outlineOf(weeks: Week[]): ProgramOutline[] {
  return weeks.map((w) => ({
    week: w.week,
    theme: w.theme,
    sessions: w.sessions.map((s) => ({ title: s.title, technique: s.technique })),
  }));
}

const o = (week: number, theme: string, sessions: [string, string][]): ProgramOutline => ({
  week,
  theme,
  sessions: sessions.map(([title, technique]) => ({ title, technique })),
});

export const PROGRAMS: Program[] = [
  {
    slug: "trust-your-own-mind",
    title: "Trust Your Own Mind",
    subtitle: "Recovering your judgement after manipulation and gaslighting",
    forQuizzes: ["/is-he-manipulative", "/is-he-gaslighting-me", "/things-he-says"],
    whoFor: "For you if you have started to doubt your own memory, apologise for things you did not do, or feel you cannot win a conversation with him.",
    outcomes: [
      "A written record of what actually happens, that you can trust when you are told otherwise",
      "The ability to hear the sentences that end conversations, while they are happening",
      "One calm sentence that stops a reality argument without agreeing to his version",
      "A boundary you can keep whether or not he agrees with it",
      "A plan for the days the doubt comes back",
    ],
    methods: ["CBT", "DBT interpersonal effectiveness", "schema therapy", "motivational interviewing", "ACT", "compassion-focused therapy"],
    reviewFocus: "recovering self-trust after manipulation and gaslighting in a relationship",
    accent: "#6366F1",
    status: "live",
    weeks: TRUST_YOUR_OWN_MIND,
    outline: outlineOf(TRUST_YOUR_OWN_MIND),
    safety:
      "This is a self-help programme, not therapy and not a safety plan. If you are afraid of your partner, if he has hurt you or threatened to, or if you are thinking about leaving and worried about his reaction, please talk to a specialist service. In the UK, Refuge runs a free 24-hour helpline on 0808 2000 247. If you are in immediate danger, call 999 (or 112 in the EU).",
  },
  {
    slug: "earned-security",
    title: "Earned Security",
    subtitle: "Quieting the anxious alarm in relationships",
    forQuizzes: ["/attachment-style-quiz"],
    whoFor: "For you if an unanswered message can take over your whole day, and closeness never quite feels safe enough to relax into.",
    outcomes: [
      "Knowing what sets your alarm off, and catching it before it runs",
      "Asking directly for what you need instead of testing",
      "Soothing yourself first, so reassurance is a bonus rather than a lifeline",
      "Noticing when calm reads as boring, and choosing it anyway",
    ],
    methods: ["attachment-based work", "emotionally focused therapy", "CBT", "DBT distress tolerance", "ACT"],
    reviewFocus: "anxious attachment: the protest behaviours, reassurance seeking and spiralling that come with fear of abandonment",
    accent: "#0EA5E9",
    status: "live",
    weeks: EARNED_SECURITY,
    outline: outlineOf(EARNED_SECURITY),
    safety:
      "This is a self-help programme, not therapy. If anxiety about relationships is stopping you sleeping, eating or getting through the day, or if you have thoughts of harming yourself, please speak to your GP or a mental health professional. In the UK, Samaritans are free and available day and night on 116 123.",
  },
  {
    slug: "choosing-differently",
    title: "Choosing Differently",
    subtitle: "Breaking the pull toward the wrong partners",
    forQuizzes: [
      "/why-do-i-pick-bad-guys",
      "/why-do-i-attract-toxic-people",
      "/what-kind-of-person-do-i-attract",
      "/who-is-attracted-to-me",
      "/attraction-patterns",
      "/why-do-i-keep-dating-the-same-type",
    ],
    whoFor: "For you if you keep ending up with the same kind of person, and the ones who treat you well somehow never feel like enough.",
    outcomes: [
      "A clear map of your pattern across past relationships",
      "Telling chemistry apart from compatibility, early",
      "A short list of non-negotiables you actually use",
      "A way of dating that gives calm a chance",
      "A written plan for the day the old pull comes back",
    ],
    methods: ["schema therapy", "CBT", "ACT", "behavioural experiments", "relapse prevention", "compassion-focused therapy"],
    reviewFocus: "a repeating pattern of choosing emotionally unavailable or harmful partners, and learning to choose differently",
    accent: "#F43F5E",
    status: "live",
    weeks: CHOOSING_DIFFERENTLY,
    outline: outlineOf(CHOOSING_DIFFERENTLY),
    safety:
      "This is a self-help programme, not therapy. It is about patterns in who you choose, and it never means that anyone who treated you badly was your fault. If someone you are with now frightens you, controls you or hurts you, please talk to a specialist service rather than working on it alone. In the UK, Refuge runs a free 24-hour helpline on 0808 2000 247. If you are in immediate danger, call 999 (or 112 in the EU).",
  },
  {
    slug: "letting-people-in",
    title: "Letting People In",
    subtitle: "For the part of you that pulls away when it gets close",
    forQuizzes: ["/why-do-i-sabotage-relationships"],
    whoFor: "For you if you lose interest, pick fights or find the exit just as things are getting good.",
    outcomes: [
      "Recognising the moment you start to pull away, and what triggers it",
      "Staying ten minutes longer than the urge wants you to",
      "Naming a return time instead of vanishing",
      "Letting someone help you with something small",
      "Asking the real question instead of running a test",
    ],
    methods: ["attachment-based work", "CBT", "exposure", "schema therapy", "ACT", "compassion-focused therapy"],
    reviewFocus: "avoidance and self-sabotage in close relationships: pulling away, testing people and leaving when intimacy grows",
    accent: "#0D9488",
    status: "live",
    weeks: LETTING_PEOPLE_IN,
    outline: outlineOf(LETTING_PEOPLE_IN),
    safety:
      "This is a self-help programme, not therapy. If closeness brings back memories of abuse or trauma, or you feel numb or detached for much of the time, please talk to your GP or a trauma-informed therapist. In the UK, Samaritans are free and available day and night on 116 123.",
  },
  {
    slug: "friendships-that-give-back",
    title: "Friendships That Give Back",
    subtitle: "Ending one-sided friendships and finding your people",
    forQuizzes: ["/toxic-friend-test", "/are-my-friends-bad-for-me", "/are-your-friends-using-you", "/friend-group-role", "/is-my-best-friend-toxic"],
    whoFor: "For you if you are always the one who gives, listens and organises, and you leave some friends feeling worse than when you arrived.",
    outcomes: [
      "A clear picture of who restores you and who drains you",
      "Saying no without a reason, and surviving it",
      "Asking for something back, once, to see what happens",
      "Letting a draining friendship fade, or ending it well",
    ],
    methods: ["CBT", "DBT interpersonal effectiveness", "schema therapy", "ACT", "behavioural experiments"],
    reviewFocus: "one-sided, draining or toxic friendships and the habit of people-pleasing",
    accent: "#F59E0B",
    status: "live",
    weeks: FRIENDSHIPS_THAT_GIVE_BACK,
    outline: outlineOf(FRIENDSHIPS_THAT_GIVE_BACK),
    safety:
      "This is a self-help programme, not therapy. If a friend threatens you, controls you or makes you feel unsafe, or if things are making you feel hopeless, please talk to someone you trust or to your GP. In the UK, Samaritans are free and available day and night on 116 123.",
  },
  {
    slug: "after-the-doubt",
    title: "After the Doubt",
    subtitle: "Suspicion, checking, and deciding what you will do",
    forQuizzes: ["/is-he-cheating"],
    whoFor: "For you if you cannot stop checking, cannot stop wondering, and cannot tell whether it is your gut or your fear.",
    outcomes: [
      "Separating what you have seen from what you fear",
      "Breaking the checking cycle that never brings relief",
      "Asking the direct question, well",
      "Deciding what you will do with the answer",
    ],
    methods: ["CBT", "exposure and response prevention", "DBT interpersonal effectiveness", "motivational interviewing"],
    reviewFocus: "suspected infidelity: the checking, the rumination, and deciding what to do",
    accent: "#DC2626",
    status: "live",
    weeks: AFTER_THE_DOUBT,
    safety:
      "This is a self-help programme, not therapy, and it never tells you whether your partner is or is not cheating. If you are afraid of how your partner might react to being asked, if they have hurt or threatened you, please talk to a specialist service before confronting them. In the UK, Refuge runs a free 24-hour helpline on 0808 2000 247. If you are in immediate danger, call 999 (or 112 in the EU).",
    outline: outlineOf(AFTER_THE_DOUBT),
  },
  {
    slug: "loving-someone-who-pulls-away",
    title: "Loving Someone Who Pulls Away",
    subtitle: "When your partner goes distant the closer you get",
    forQuizzes: ["/partners-attachment-style"],
    whoFor: "For you if the more you reach for him, the further he goes, and you are exhausted from chasing.",
    outcomes: [
      "Understanding his distance without taking it as rejection",
      "Stopping the chase without going cold yourself",
      "Asking for one specific thing, clearly",
      "Knowing what you need in order to stay",
    ],
    methods: ["emotionally focused therapy", "Gottman method", "DBT", "ACT", "behavioural activation", "compassion-focused therapy"],
    reviewFocus: "being in a relationship with an avoidant or withdrawing partner, and the pursue-withdraw cycle",
    accent: "#8B5CF6",
    status: "live",
    weeks: LOVING_SOMEONE_WHO_PULLS_AWAY,
    safety:
      "This is a self-help programme, not therapy. It is about a partner who withdraws, not one who controls. If your partner's distance comes with threats, intimidation, punishing silences meant to frighten you, or any harm, please talk to a specialist service. In the UK, Refuge runs a free 24-hour helpline on 0808 2000 247. If you are in immediate danger, call 999 (or 112 in the EU).",
    outline: outlineOf(LOVING_SOMEONE_WHO_PULLS_AWAY),
  },
];

export const LIVE_PROGRAMS = PROGRAMS.filter((p) => p.status === "live" && p.weeks?.length);

export function programBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

/** The programme a quiz's buyers should be offered, if one is live. */
export function programForQuiz(quizPath: string): Program | undefined {
  const path = quizPath.replace(/\/premium$/, "");
  return LIVE_PROGRAMS.find((p) => p.forQuizzes.includes(path));
}

export function sessionOf(program: Program, week: number, day: number) {
  const w = program.weeks?.find((x) => x.week === week);
  const s = w?.sessions.find((x) => x.day === day);
  return w && s ? { week: w, session: s } : null;
}

/** The session after this one, for the "next" button. */
export function nextSession(program: Program, week: number, day: number): { week: number; day: number } | null {
  const w = program.weeks?.find((x) => x.week === week);
  if (!w) return null;
  if (w.sessions.some((s) => s.day === day + 1)) return { week, day: day + 1 };
  const nw = program.weeks?.find((x) => x.week === week + 1);
  return nw ? { week: nw.week, day: nw.sessions[0].day } : null;
}
