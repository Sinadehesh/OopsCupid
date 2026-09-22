/**
 * DETERMINISTIC FALLBACK FOR THE ATTACHMENT PREMIUM REPORT
 *
 * The paid attachment report is written by OpenAI at page load. That is a
 * third-party API call standing between a buyer and the thing they have
 * already paid for: if the key is rotated, the account runs out of credit,
 * or the call simply times out, the page showed "Analysis Server Error"
 * and nothing else.
 *
 * This produces the same report shape from the scored profile alone, so a
 * failed generation degrades to a real report instead of an error screen.
 * The AI layer is an enhancement; this is the floor.
 */

export interface PremiumReportShape {
  [domain: string]: {
    threat: string;
    playbook: { immediate: string; oneWeek: string; oneMonth: string };
  };
}

type Style = "anxious" | "avoidant" | "disorganized" | "secure";

function styleOf(scores: Record<string, number> | undefined): Style {
  const anx = scores?.anxiety ?? scores?.Anxiety ?? 0;
  const avo = scores?.avoidance ?? scores?.Avoidance ?? 0;
  if (anx >= 55 && avo >= 55) return "disorganized";
  if (anx >= 55) return "anxious";
  if (avo >= 55) return "avoidant";
  return "secure";
}

const WRITING: Record<Style, Record<string, { threat: string; immediate: string; oneWeek: string; oneMonth: string }>> = {
  anxious: {
    romantic: {
      threat:
        "Your romantic pattern runs on an alarm that fires at distance. A short reply, a changed plan, a quieter evening — your system reads these as evidence that the connection is at risk, and the behaviour that follows (checking, needing it resolved tonight, reading tone into nothing) is alarm rather than neediness. The cost is that reassurance does not land: the alarm does not process argument, so the same conversation repeats without ever resolving.",
      immediate:
        "Next time the alarm fires, wait twenty minutes before you act on it. Not forever — twenty minutes. Most of what it insists is urgent has changed shape by then.",
      oneWeek:
        "Ask for one specific, small, predictable thing rather than general reassurance: a message at a known time, or a standing evening. Predictability quiets this system in a way that reassurance after the fact does not.",
      oneMonth:
        "Notice what you do in the 24 hours after a good stretch. Anxious patterns often spike right after closeness, not after conflict — and spotting that is what turns the pattern from something that happens to you into something you can see coming.",
    },
    mother: {
      threat:
        "The template here is inconsistent availability: care that arrived, but not predictably. A child cannot influence an unpredictable supply, so the adaptation is to monitor it constantly — and that monitoring is the machinery you now run in adult relationships. It was not a mistake then. It is expensive now.",
      immediate:
        "Write down one thing you learned to watch for as a child. Naming it moves it from instinct to information.",
      oneWeek:
        "Notice when you are scanning someone's mood for a change that has not happened yet. That scan is the childhood adaptation running, and noticing it is most of the work.",
      oneMonth:
        "Have one ordinary, low-stakes interaction with her that you have not pre-planned. You are testing whether the monitoring is still necessary, which is a different question from whether the relationship is good.",
    },
    father: {
      threat:
        "Where the paternal score is elevated, the usual template is approval that had to be earned rather than assumed. The adult version is performance: you are excellent at being valuable and much less practised at being unremarkable and still wanted. That works until you meet someone who has no task for you.",
      immediate:
        "Do one thing this week that produces nothing and tell someone about it anyway.",
      oneWeek:
        "Catch yourself listing your usefulness in a conversation. Say the sentence without the qualification attached and notice how it lands.",
      oneMonth:
        "Let one person see you at ordinary rather than at your best. The evidence that it does not cost you anything is the only thing that shifts this.",
    },
    work: {
      threat:
        "At work this shows up as difficulty separating feedback from rejection, and as an inability to leave things unfinished. You will be reliable and over-extended, and the people who benefit most from that are the ones least likely to notice it.",
      immediate: "Leave one thing at 90% today, on purpose, and go home.",
      oneWeek: "Say no to one request without a justification attached. 'I can't take that on' is a complete sentence.",
      oneMonth: "Ask for something — a review, a change, a clarification — before you have earned it in your own accounting. That gap is the pattern.",
    },
    general: {
      threat:
        "Across every domain your system treats distance as danger. That makes you attentive, loyal and easy to be close to, and it also means other people's moods set your baseline. The work is not becoming colder; it is building a supply of self-regard that does not depend on the room.",
      immediate: "One line each evening: something you did well that nobody else knows about.",
      oneWeek: "Notice how quickly an unanswered message becomes a question about you rather than about them.",
      oneMonth: "Keep one commitment that is purely yours, weekly, regardless of how the week is going.",
    },
  },
  avoidant: {
    romantic: {
      threat:
        "Your romantic pattern manages closeness by keeping a reserve. The trigger is intimacy rather than conflict, which is why withdrawal often follows a good week rather than a bad one — and why it reads to a partner as arbitrary. It is not arbitrary; it is regulation, and from the inside it feels like needing air.",
      immediate:
        "When you feel the pull to withdraw, name a return time out loud: 'I need the evening — let's talk tomorrow.' The horizon is what makes distance safe for both of you.",
      oneWeek:
        "Disclose one ordinary thing earlier than is comfortable. Not a confession — something small and specific. The discomfort is the point and it is smaller than expected.",
      oneMonth:
        "Track what happens in the 48 hours after closeness. If withdrawal reliably follows connection, that is the pattern, and seeing it on paper is what makes it optional.",
    },
    mother: {
      threat:
        "The template is care that came with a cost — emotional labour expected in return, or closeness that arrived with strings. The adaptation was self-sufficiency, and self-sufficiency is genuinely useful. Its price is that needing anyone now registers as exposure rather than as ordinary.",
      immediate: "Ask one person for something small this week and let them do it without reciprocating immediately.",
      oneWeek: "Notice the moment you decide to handle something alone. That decision usually happens before you have considered the alternative.",
      oneMonth: "Let one task be done badly by someone else rather than well by you. That trade is the whole skill.",
    },
    father: {
      threat:
        "An elevated paternal score here usually points to a model where competence was the currency and feeling was not discussed. The adult result is fluency about what you think and much less about what you feel — and a tendency to answer emotional questions with practical ones.",
      immediate: "Answer one 'how are you' with a feeling rather than a status update.",
      oneWeek: "Notice how often you respond to distress with a solution. Try sitting in it once instead.",
      oneMonth: "Say one thing you have never said to him, to anyone. It does not have to be to him.",
    },
    work: {
      threat:
        "At work this makes you independent and hard to manage, in both senses. You will under-communicate rather than over-commit, and colleagues will read distance as judgement more often than you expect.",
      immediate: "Send one update nobody asked for.",
      oneWeek: "Say one thing in a meeting that is uncertain rather than finished.",
      oneMonth: "Ask a colleague for help on something you could do alone. The point is the asking.",
    },
    general: {
      threat:
        "Your system manages relationships by controlling proximity. It has protected you and it costs you the thing it protects: closeness requires exactly the exposure the strategy is designed to prevent.",
      immediate: "Name the withdrawal out loud once, to one person, as it happens.",
      oneWeek: "Stay in one conversation ten minutes past the point you wanted to leave.",
      oneMonth: "Let one relationship get closer than your usual set point and watch what your system does. That reaction is the data.",
    },
  },
  disorganized: {
    romantic: {
      threat:
        "Both systems are active, which means the same person is the source of safety and the source of threat. There is no stable strategy available, so behaviour alternates — intense closeness followed by withdrawal, both genuine. This is exhausting to live with and much harder to be than it looks from outside, and it is not indecision.",
      immediate: "When the alternation starts, change nothing for 72 hours. No pursuit, no exit, no decision. The oscillation runs on action.",
      oneWeek: "Make one thing in the relationship predictable and keep it regardless of the week's weather. Predictability is worth more here than closeness.",
      oneMonth: "Write down the sequence: what happens, then what, then what. Seeing it as a cycle rather than as a series of separate crises is the shift that matters.",
    },
    mother: {
      threat:
        "This pattern usually forms where the source of comfort was also a source of alarm. The child has no workable strategy — approach and avoidance both fail — so the system learns to run both. That is why your adult relationships can feel like two people making decisions.",
      immediate: "You do not have to resolve this to function. Notice the alternation without grading yourself on it.",
      oneWeek: "Identify one situation that reliably triggers the switch. One is enough to start with.",
      oneMonth: "This is the pattern most improved by working with someone rather than alone. Not because it is severe, but because it needs an outside observer to be visible.",
    },
    father: {
      threat:
        "Where this shows on the paternal axis, the usual shape is unpredictability — warmth that could not be forecast. The adult residue is hypervigilance about mood combined with a reflex to disengage, often within the same conversation.",
      immediate: "Notice the switch as it happens. Naming it is the intervention.",
      oneWeek: "Track what precedes it. It is usually not the conversation's content.",
      oneMonth: "Build one relationship that has never had that volatility in it, and let it be boring.",
    },
    work: {
      threat:
        "At work this looks like sharp swings in engagement: deeply invested, then abruptly detached. Colleagues experience it as inconsistency and rarely name it, which means you get the consequences without the feedback.",
      immediate: "Set one routine that does not depend on how engaged you feel today.",
      oneWeek: "Notice the day the interest drops. It is usually a few days after a high point, not after a setback.",
      oneMonth: "Choose one project to stay ordinary about for a full month. The flatness is the skill being built.",
    },
    general: {
      threat:
        "Running both systems is the most demanding attachment pattern, and it is also the one most responsive to consistency from outside. It is not a character flaw and it is not permanent.",
      immediate: "Change nothing for 72 hours when the switch happens.",
      oneWeek: "One fixed, predictable thing, held regardless of mood.",
      oneMonth: "Consider talking this through with someone trained. This pattern specifically benefits from an outside observer, and that is a practical recommendation rather than a verdict.",
    },
  },
  secure: {
    romantic: {
      threat:
        "Your romantic scores sit in the secure range: you can be close without alarm and apart without withdrawing, and conflict does not put the relationship itself in question. The risk in this profile is not your own pattern — it is that you may not recognise an insecure one quickly, because you extend the benefit of the doubt your own system does not need.",
      immediate: "Notice whether your partner's difficult moments get repaired. Repair is the measure, not the argument.",
      oneWeek: "Say one thing you have been letting slide. Secure does not mean accommodating.",
      oneMonth: "Check whether you are doing more of the emotional work than you have noticed. Capable people absorb imbalance without registering it.",
    },
    mother: {
      threat:
        "The maternal template looks broadly sound: care that was available and reasonably predictable. That is the foundation the rest of your profile rests on, and it is worth knowing it is there.",
      immediate: "Nothing needs fixing here.",
      oneWeek: "If there is friction, it is likely about the present rather than the template.",
      oneMonth: "This is a resource rather than a problem. It is what makes the other domains recoverable.",
    },
    father: {
      threat:
        "The paternal scores do not indicate a significant insecure pattern. Whatever difficulty exists in that relationship appears to be about the relationship rather than about your attachment system.",
      immediate: "Nothing to act on.",
      oneWeek: "Worth separating 'we disagree' from 'something is wrong with me' — your scores suggest you already do.",
      oneMonth: "Use this as the benchmark for what the other domains are aiming at.",
    },
    work: {
      threat:
        "At work a secure pattern shows as being able to receive feedback as information and to disagree without escalation. The main risk is absorbing other people's disorganisation because you have the capacity to.",
      immediate: "Say no to one thing this week.",
      oneWeek: "Notice what you are carrying that is not yours.",
      oneMonth: "Protect the capacity. It is the thing everyone will keep asking for.",
    },
    general: {
      threat:
        "Your profile is broadly secure. That does not mean nothing is difficult — it means the difficulty is not coming from your attachment system, and looking for it there will not find it.",
      immediate: "Take the result at face value rather than looking for the hidden problem.",
      oneWeek: "If something specific prompted this quiz, it is worth examining on its own terms.",
      oneMonth: "Treat this chart as a baseline and notice movement over the next year.",
    },
  },
};

export function buildAttachmentFallback(
  attachment: Record<string, any> | undefined
): PremiumReportShape {
  const scores = (attachment?.normalizedScores ?? attachment ?? {}) as Record<string, number>;
  const style = styleOf(scores);
  const w = WRITING[style];

  const out: PremiumReportShape = {};
  for (const domain of ["general", "romantic", "mother", "father", "work"]) {
    const d = w[domain] ?? w.general;
    out[domain] = {
      threat: `<p>${d.threat}</p>`,
      playbook: { immediate: d.immediate, oneWeek: d.oneWeek, oneMonth: d.oneMonth },
    };
  }
  return out;
}
