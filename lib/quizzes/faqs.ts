import type { FaqItem } from "@/components/seo/JsonLd";

/**
 * Per-quiz FAQ content. Rendered visibly via QuizFaq AND emitted as
 * FAQPage structured data — targets "People Also Ask" long-tails around
 * each quiz keyword. Keyed by registry slug.
 */
export const quizFaqs: Record<string, FaqItem[]> = {
  "/attachment-style-quiz": [
    {
      q: "What are the four attachment styles?",
      a: "Secure (comfortable with closeness and independence), anxious (craves closeness, fears abandonment), avoidant (values independence, uncomfortable with depth), and fearful-avoidant (wants closeness but panics when it arrives). Most people are a blend with one dominant style — this quiz measures where you actually sit, not which label sounds most like you.",
    },
    {
      q: "Can my attachment style change?",
      a: "Yes. Attachment is learned, and researchers call the upgraded version 'earned security.' It changes through consistent corrective experience: safe relationships, deliberate practice with triggers, and sometimes coaching or therapy. Knowing your exact starting point is what makes the work targeted instead of generic.",
    },
    {
      q: "Why does my attachment style matter for dating?",
      a: "Because it silently picks your partners and scripts your fights. Anxious people read normal distance as rejection; avoidant people read normal closeness as pressure. Two secure people arguing is a conversation — an anxious-avoidant pair arguing is a chase. Your result explains your specific loop and what breaks it.",
    },
  ],
  "/partners-attachment-style": [
    {
      q: "How do I know if he's avoidant?",
      a: "The recurring pattern: things go well, then he pulls away right after closeness peaks. He values 'space' more than most, keeps conversations practical, goes quiet under emotional pressure, and describes exes as 'too needy.' One of these means nothing; the cluster is the signature this quiz measures.",
    },
    {
      q: "Can an avoidant partner ever commit?",
      a: "Many do — but on a different timeline and with different rules. Pressure and ultimatums trigger deactivation; consistency and low-drama communication build safety. Whether YOUR situation is 'slow but real' or 'never going to happen' depends on specific behaviors the result breaks down for you.",
    },
    {
      q: "Why does he pull away when things get good?",
      a: "For avoidant attachers, intimacy itself is the trigger: closeness activates an alarm learned long before you, and distance is how they turn the alarm off. It's rarely about you or the relationship's quality — which is exactly why taking it personally, or chasing, makes it worse.",
    },
  ],
  "/attraction-patterns": [
    {
      q: "Why do I always fall for the same type?",
      a: "Your attraction template was formed early — a mix of what love felt like at home, what you had to do to earn it, and what your nervous system labels 'exciting.' Until it's made conscious, the template runs automatically, which is why 'I have a type' usually means 'I have a pattern.'",
    },
    {
      q: "Is instant chemistry a good sign?",
      a: "Not by itself. Instant, overwhelming chemistry is often your pattern recognizing itself — familiarity misread as fate. Secure connection tends to build more slowly and feel calmer, which pattern-driven daters often misread as boring. The quiz shows you what your 'spark' is actually responding to.",
    },
    {
      q: "Can I change what I'm attracted to?",
      a: "Yes, gradually. Attraction recalibrates through awareness (naming your template), exposure (giving calm connections a real chance past date three), and nervous-system work (learning that safe doesn't mean dull). Your result maps which lever matters most for your pattern.",
    },
  ],
  "/why-do-i-pick-bad-guys": [
    {
      q: "Why do nice guys feel boring to me?",
      a: "If chaos was the emotional weather you grew up in, your nervous system tags calm as 'nothing happening' and volatility as 'aliveness.' Bad boys deliver intermittent rewards — the same mechanism slot machines use — and that unpredictability is what your brain has learned to call chemistry.",
    },
    {
      q: "Is it my fault I keep choosing badly?",
      a: "No — patterns aren't character flaws, they're old survival strategies still running. But once you can see the pattern clearly, it does become your job to interrupt it. That's the point of measuring it: you can't out-discipline a pattern you haven't mapped.",
    },
    {
      q: "How do I actually stop picking the wrong men?",
      a: "Three moves: identify your specific hook (rescuer? spark-chaser? fixer?), slow the funnel down so charm has to survive three dates of scrutiny, and pre-commit to deal-breakers in writing before the chemistry hits. Your result tells you which hook is yours.",
    },
  ],
  "/what-kind-of-person-do-i-attract": [
    {
      q: "Why do I keep attracting the same kind of person?",
      a: "People read hundreds of signals from you within minutes — how much space you take up, how quickly you accommodate, how you respond to testing behavior. Certain personality types are specifically drawn to certain signal patterns. Change the signals and the crowd changes.",
    },
    {
      q: "Do I attract narcissists specifically?",
      a: "Manipulative and narcissistic people are drawn to visible empathy, fast forgiveness, and soft boundaries — good qualities with missing armor. If your results show that combination, the fix isn't becoming cold; it's adding early screening and enforceable limits on top of the warmth.",
    },
    {
      q: "Can I attract healthier people without changing who I am?",
      a: "Yes — you change the filter, not the personality. Healthier people are drawn to clear boundaries, unhurried pacing, and someone whose life doesn't reorganize itself around a new person in week two. Those are behaviors, not traits, and they're learnable.",
    },
  ],
  "/who-is-attracted-to-me": [
    {
      q: "How can a quiz know who's attracted to me?",
      a: "It profiles the signals you broadcast — energy, availability cues, accommodation speed, conflict style — and maps them against the types most responsive to that combination. It's pattern-matching on real behavioral tendencies, not mind reading, and the point is to show you what your signals are selecting for.",
    },
    {
      q: "Why do I attract people I'm not interested in?",
      a: "Attraction asymmetry usually means your signals promise something your preferences don't want — for example, high-empathy signals pull in people seeking a caretaker. Your result identifies the mismatch so you can adjust the signal, not just keep rejecting the response.",
    },
    {
      q: "Why does nobody approach me at all?",
      a: "Usually it's approachability signaling, not attractiveness: closed body language, busy-signals, or an intimidation effect you don't realize you have. These are the most fixable signals in the whole system once they're named.",
    },
  ],
  "/are-my-friends-bad-for-me": [
    {
      q: "How do I know if my friend group is toxic?",
      a: "Track the after-effect, not the highlight reel: do you leave hangouts energized or drained, more confident or more self-critical? Healthy groups survive your wins and your boundaries. If your successes get minimized and your 'no' gets punished, the group is shaping you downward — which is what this audit measures.",
    },
    {
      q: "Should I cut off my whole friend group?",
      a: "Rarely all at once. The usual result is a sorted list: friends worth investing in, friends who get polite distance, and one or two relationships that need a real exit. The audit gives you that per-person clarity instead of an all-or-nothing decision made in frustration.",
    },
    {
      q: "Why do I feel lonely even with friends?",
      a: "Loneliness inside a friend group means the connection is roleplay: you're present as your function — the listener, the organizer, the entertainer — not as yourself. Groups that only welcome your function will always feel hollow, no matter how full the room is.",
    },
  ],
  "/are-your-friends-using-you": [
    {
      q: "What are signs a friend is using you?",
      a: "The pattern: they appear when they need something (rides, money, emotional labor, an audience) and vanish when you do; conversations orbit their life; your favors are expected while theirs are celebrated. Any friendship has uneven weeks — the audit measures whether yours has an uneven direction.",
    },
    {
      q: "Am I being used or am I just generous?",
      a: "Generosity is a choice that gets reciprocated over time, in their currency if not yours. Being used is generosity that's been converted into an expectation — where giving less triggers guilt-tripping or withdrawal. The test scores exactly that reciprocity gap.",
    },
    {
      q: "How do I stop being the group's free resource?",
      a: "Drop the availability to normal levels and watch what happens. Real friends adjust; extractive friends escalate, guilt-trip, or disappear. That response is the clearest diagnostic there is — and the result gives you scripts for each reaction.",
    },
  ],
  "/friend-group-role": [
    {
      q: "What roles exist in a friend group?",
      a: "The recurring cast: the fixer (everyone's unpaid therapist), the entertainer (mood responsible), the organizer (nothing happens without them), the peacekeeper, and the afterthought (invited last, forgotten first). Roles are fine until they become cages — the quiz measures how locked-in yours is.",
    },
    {
      q: "Why am I always the one who gives the most?",
      a: "High-givers usually earned belonging through usefulness early in life, and the group happily accepts the subsidy. The problem isn't that you give — it's that the role makes your presence conditional on the giving. The result shows how much of your belonging is role versus relationship.",
    },
    {
      q: "Can I change my role without losing my friends?",
      a: "Usually yes, but expect a testing period: groups push back when someone renegotiates their role. Friends attached to YOU adapt within weeks; friends attached to your function get loud. Both outcomes are information you need.",
    },
  ],
  "/why-do-i-sabotage-relationships": [
    {
      q: "What does relationship self-sabotage look like?",
      a: "The classics: picking fights right after closeness peaks, testing partners until they fail, finding fatal flaws the moment things get serious, ghosting first so you can't be left, and choosing unavailable people so the ending is pre-decided. Most sabotagers run one signature move — this diagnostic identifies yours.",
    },
    {
      q: "Why do I ruin things when they're going well?",
      a: "Because 'going well' is unfamiliar, and unfamiliar reads as unsafe. If love was unpredictable early on, your nervous system treats calm happiness as the quiet before the drop — so it triggers the drop itself, just to end the suspense. Controlling the ending feels safer than trusting it.",
    },
    {
      q: "Can self-sabotage actually be fixed?",
      a: "Yes — it's one of the most fixable patterns because the behavior is yours, not a partner's. The work: catch the urge in the 90 seconds before you act on it, name it to yourself (or your partner), and let the moment pass without the protective move. Repetition rewires it.",
    },
  ],
};
