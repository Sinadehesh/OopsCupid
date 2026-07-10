/**
 * CENTRAL QUIZ REGISTRY
 *
 * Single source of truth for every funnel on the site. Powers:
 *  - sitemap.ts (SEO)
 *  - RelatedQuizzes internal linking (SEO)
 *  - Offer ladder mapping (monetization) via `topic`
 *  - Structured data (Quiz JSON-LD)
 *
 * Adding a new quiz = add one entry here and it is automatically
 * included in the sitemap, related-quiz blocks, and offer routing.
 */

export type QuizTopic =
  | "infidelity"
  | "manipulation"
  | "gaslighting"
  | "attachment"
  | "attraction-patterns"
  | "self-sabotage"
  | "toxic-friends"
  | "red-flags";

export interface QuizEntry {
  slug: string; // route, e.g. "/is-he-cheating"
  title: string; // display + link anchor text
  seoTitle: string; // for JSON-LD name
  description: string;
  topic: QuizTopic;
  hub: "him" | "me" | "friends";
  questionCount?: number;
  minutes?: number; // completion estimate shown in rich results
  isQuiz: boolean; // false = article / info page
}

export const quizRegistry: QuizEntry[] = [
  // ── HIM: partner behavior ────────────────────────────────────────────────
  {
    slug: "/is-he-cheating",
    title: "Is He Cheating? Test",
    seoTitle: "Is He Cheating On Me? Behavioral Diagnostic Test",
    description:
      "A 3-minute behavioral diagnostic that analyzes his phone habits, schedule changes, and emotional distance to tell you if your gut is right.",
    topic: "infidelity",
    hub: "him",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/is-he-manipulative",
    title: "Is He Manipulative? Test",
    seoTitle: "Is He Manipulative? Manipulation Tactics Test",
    description:
      "Identify the exact manipulation tactics being used on you — guilt trips, DARVO, love bombing — and get scripts to shut them down.",
    topic: "manipulation",
    hub: "him",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/is-he-gaslighting-me",
    title: "Is He Gaslighting Me? Test",
    seoTitle: "Is He Gaslighting Me? Reality-Check Test",
    description:
      "Stop asking yourself if you're crazy. This test maps his statements against the clinical gaslighting playbook and gives you a clear answer.",
    topic: "gaslighting",
    hub: "him",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/partners-attachment-style",
    title: "His Attachment Style Quiz",
    seoTitle: "What Is My Partner's Attachment Style? Quiz",
    description:
      "Decode whether he is avoidant, anxious, or secure — and what that means for how he handles conflict, distance, and commitment.",
    topic: "attachment",
    hub: "him",
    questionCount: 20,
    minutes: 4,
    isQuiz: true,
  },

  // ── ME: own patterns ─────────────────────────────────────────────────────
  {
    slug: "/attachment-style-quiz",
    title: "Attachment Style Quiz",
    seoTitle: "What Is My Attachment Style? Free Quiz",
    description:
      "Find out if you're anxious, avoidant, fearful-avoidant, or secure — and how your style silently picks your partners for you.",
    topic: "attachment",
    hub: "me",
    questionCount: 20,
    minutes: 4,
    isQuiz: true,
  },
  {
    slug: "/why-do-i-attract-toxic-people",
    title: "Why Do I Attract Toxic People? Quiz",
    seoTitle: "Why Do I Attract Toxic People? Pattern Diagnostic",
    description:
      "Map the childhood loops and boundary gaps that make you a magnet for toxic partners — and learn how to break the cycle.",
    topic: "attraction-patterns",
    hub: "me",
    questionCount: 25,
    minutes: 4,
    isQuiz: true,
  },
  {
    slug: "/why-do-i-sabotage-relationships",
    title: "Why Do I Sabotage Relationships? Quiz",
    seoTitle: "Why Do I Self-Sabotage Relationships? Diagnostic",
    description:
      "Identify your exact sabotage pattern — pushing away, testing, picking fights — and where it was installed.",
    topic: "self-sabotage",
    hub: "me",
    questionCount: 20,
    minutes: 4,
    isQuiz: true,
  },
  {
    slug: "/attraction-patterns",
    title: "Attraction Patterns Quiz",
    seoTitle: "What's My Attraction Pattern? Dating Type Quiz",
    description:
      "Discover the hidden template deciding who you fall for, and why the same 'type' keeps finding you.",
    topic: "attraction-patterns",
    hub: "me",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/why-do-i-pick-bad-guys",
    title: "Why Do I Pick Bad Guys? Quiz",
    seoTitle: "Why Do I Keep Picking Bad Guys? Pattern Quiz",
    description:
      "A pattern diagnostic that reveals why 'nice' feels boring and chaos feels like chemistry.",
    topic: "attraction-patterns",
    hub: "me",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/why-do-i-keep-dating-the-same-type",
    title: "Why Do I Date The Same Type?",
    seoTitle: "Why Do I Keep Dating The Same Type? Explained",
    description:
      "The psychology of repetition compulsion in dating — and the quiz that maps your version of it.",
    topic: "attraction-patterns",
    hub: "me",
    isQuiz: false,
  },
  {
    slug: "/what-kind-of-person-do-i-attract",
    title: "What Kind of Person Do I Attract?",
    seoTitle: "What Kind of Person Do I Attract? Quiz",
    description:
      "Find out the personality type your energy pulls in — and whether that's working for you or against you.",
    topic: "attraction-patterns",
    hub: "me",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/who-is-attracted-to-me",
    title: "Who Is Attracted To Me? Quiz",
    seoTitle: "Who Is Attracted To Me? Attraction Profile Quiz",
    description:
      "Map your attraction profile: who notices you, who pursues you, and why.",
    topic: "attraction-patterns",
    hub: "me",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },

  // ── FRIENDS ──────────────────────────────────────────────────────────────
  {
    slug: "/toxic-friend-test",
    title: "Toxic Friend Test",
    seoTitle: "Is My Friend Toxic? Free Toxic Friend Test",
    description:
      "Score your friendship across control, competition, and energy drain to find out if it's toxic or just going through a rough patch.",
    topic: "toxic-friends",
    hub: "friends",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/are-my-friends-bad-for-me",
    title: "Are My Friends Bad For Me? Quiz",
    seoTitle: "Are My Friends Bad For Me? Friend Group Audit",
    description:
      "Audit your whole friend group's effect on your confidence, habits, and stress levels.",
    topic: "toxic-friends",
    hub: "friends",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/are-your-friends-using-you",
    title: "Are Your Friends Using You? Quiz",
    seoTitle: "Are My Friends Using Me? One-Sided Friendship Test",
    description:
      "Measure the give-take balance in your friendships and find out if you're a friend or a free resource.",
    topic: "toxic-friends",
    hub: "friends",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/friend-group-role",
    title: "Friend Group Role Quiz",
    seoTitle: "What's My Role In The Friend Group? Quiz",
    description:
      "Find out which role you've been cast in — the fixer, the entertainer, the afterthought — and whether it's costing you.",
    topic: "toxic-friends",
    hub: "friends",
    questionCount: 20,
    minutes: 3,
    isQuiz: true,
  },
  {
    slug: "/is-my-best-friend-toxic",
    title: "Is My Best Friend Toxic?",
    seoTitle: "Is My Best Friend Toxic? Signs & Test",
    description:
      "The specific signs that separate a difficult best friend from a toxic one.",
    topic: "toxic-friends",
    hub: "friends",
    isQuiz: false,
  },

  // ── ARTICLES / INFO PAGES (internal-link targets) ────────────────────────
  {
    slug: "/gaslighting-signs",
    title: "Gaslighting Signs",
    seoTitle: "Gaslighting Signs: How To Recognize It",
    description: "The complete list of gaslighting phrases and behaviors.",
    topic: "gaslighting",
    hub: "him",
    isQuiz: false,
  },
  {
    slug: "/love-bombing-signs",
    title: "Love Bombing Signs",
    seoTitle: "Love Bombing Signs: Too Much Too Fast",
    description: "How to tell intense romance from a manipulation on-ramp.",
    topic: "manipulation",
    hub: "him",
    isQuiz: false,
  },
  {
    slug: "/trauma-bonding-signs",
    title: "Trauma Bonding Signs",
    seoTitle: "Trauma Bonding Signs: Why You Can't Leave",
    description: "Why the worst relationships are the hardest to walk away from.",
    topic: "manipulation",
    hub: "him",
    isQuiz: false,
  },
  {
    slug: "/relationship-red-flags",
    title: "Relationship Red Flags",
    seoTitle: "Relationship Red Flags: The Complete Guide",
    description: "Every red flag, ranked by how dangerous it actually is.",
    topic: "red-flags",
    hub: "him",
    isQuiz: false,
  },
  {
    slug: "/red-flags-in-a-relationship",
    title: "Red Flags In A Relationship",
    seoTitle: "Red Flags In A Relationship — Checklist",
    description: "A practical checklist of relationship red flags.",
    topic: "red-flags",
    hub: "him",
    isQuiz: false,
  },
  {
    slug: "/understanding-attachment-styles",
    title: "Understanding Attachment Styles",
    seoTitle: "Attachment Styles Explained: Anxious, Avoidant, Secure",
    description: "The plain-language guide to attachment theory in dating.",
    topic: "attachment",
    hub: "me",
    isQuiz: false,
  },
  {
    slug: "/signs-of-a-toxic-friend",
    title: "Signs of a Toxic Friend",
    seoTitle: "Signs of a Toxic Friend: What To Look For",
    description: "The behaviors that separate toxic friends from flawed ones.",
    topic: "toxic-friends",
    hub: "friends",
    isQuiz: false,
  },
  {
    slug: "/toxic-friendships",
    title: "Toxic Friendships Hub",
    seoTitle: "Toxic Friendships: Tests, Signs & What To Do",
    description: "Every toxic-friendship test and guide in one place.",
    topic: "toxic-friends",
    hub: "friends",
    isQuiz: false,
  },
];

/** Quizzes only (for sitemap priority & related-quiz blocks). */
export const allQuizzes = quizRegistry.filter((q) => q.isQuiz);

/** Related content for internal linking: same topic first, then same hub. */
export function getRelated(slug: string, count = 4): QuizEntry[] {
  const current = quizRegistry.find((q) => q.slug === slug);
  if (!current) return allQuizzes.slice(0, count);
  const sameTopic = quizRegistry.filter(
    (q) => q.slug !== slug && q.topic === current.topic
  );
  const sameHub = quizRegistry.filter(
    (q) =>
      q.slug !== slug && q.topic !== current.topic && q.hub === current.hub
  );
  return [...sameTopic, ...sameHub].slice(0, count);
}
