/**
 * SYMPTOM PAGES — the long-tail traffic engine
 *
 * The category keywords ("what is gaslighting", "signs of infidelity") are
 * owned by Healthline, Verywell Mind, Psychology Today and Cleveland
 * Clinic. A new domain does not win those, and pretending otherwise is how
 * you spend a year producing nothing.
 *
 * What those sites do NOT write is the sentence an actual person types at
 * 1am: "he says I'm too sensitive", "my friend only calls when she needs
 * something". Those queries are specific, emotionally urgent, barely
 * contested, and they convert — someone searching that phrase is already
 * in the situation the quiz measures.
 *
 * RULES for adding an entry, because thin programmatic pages get
 * de-indexed and deserve to be:
 *
 *  1. `answer` must answer the question in the first two sentences. It is
 *     what gets pulled into a featured snippet and quoted by an AI, so it
 *     has to stand alone with no page around it.
 *  2. `notAlways` is required. Every one of these behaviours has an
 *     innocent explanation, and a page that pretends otherwise is
 *     fearmongering — which readers detect and Google punishes.
 *  3. `body` carries the actual substance. If you cannot write three real
 *     paragraphs about it, it is not a page.
 *  4. One quiz per entry, chosen because it genuinely measures the thing.
 */

export interface SymptomPage {
  /** URL slug under /signs/ */
  slug: string;
  /** The search phrase, verbatim. Becomes the H1. */
  phrase: string;
  /** <title>. Keep under ~60 chars. */
  seoTitle: string;
  /** Meta description, ~150 chars. */
  description: string;
  /** Direct answer in 2-3 sentences. Snippet + AI-citation bait. */
  answer: string;
  /** 2-4 substantial paragraphs. */
  body: { heading: string; text: string }[];
  /** The honest counter-case. Required. */
  notAlways: string;
  /** 3 concrete actions. */
  whatToDo: string[];
  /** FAQPage schema + genuinely useful. */
  faq: { q: string; a: string }[];
  /** Quiz slug this funnels to, e.g. "/is-he-gaslighting-me". */
  quiz: string;
  /** Short CTA line above the quiz button. */
  quizPitch: string;
  /** Related symptom slugs for internal linking. */
  related: string[];
}

export const SYMPTOM_PAGES: SymptomPage[] = [
  // ── MANIPULATION / GASLIGHTING ────────────────────────────────────────
  {
    slug: "he-says-im-too-sensitive",
    phrase: "He says I'm too sensitive",
    seoTitle: "\"You're Too Sensitive\" — What It Actually Means",
    description:
      "Being told you're too sensitive can be a fair observation or a way to avoid a conversation. Here is how to tell which one you are dealing with.",
    answer:
      "\"You're too sensitive\" can be honest feedback, but it becomes a tactic when it arrives in place of an answer. The test is what happens next: someone who means it kindly will still address the thing you raised, while someone using it to escape accountability will treat your reaction as the only topic left. If you consistently end conversations discussing your sensitivity rather than the behaviour that prompted it, the phrase is doing work that has nothing to do with your feelings.",
    body: [
      {
        heading: "Why this phrase is so effective",
        text:
          "It reframes a complaint as a symptom. The moment your reaction becomes the subject, whatever caused it is off the table — and you are now defending your character rather than discussing an event. This is why it feels so disorienting: you came in with something specific and left having lost an argument about who you are. Nothing was resolved, and you cannot quite explain how the subject changed.",
      },
      {
        heading: "The difference between feedback and deflection",
        text:
          "Real feedback is specific and survives the conversation: 'you read a lot into short replies, and I think that's about your ex more than me' is a claim you can examine. Deflection is general and replaces the topic: 'you're too sensitive, you always do this' arrives exactly when accountability is on the table and never at any other time. Track the timing. If the phrase only ever appears when he has done something, it is not describing you — it is protecting him.",
      },
      {
        heading: "What it does over time",
        text:
          "Repeated often enough, you start doing the work yourself. You pre-filter what you raise, discount your own reactions before anyone else has to, and eventually stop mentioning things at all — not because they stopped happening, but because the cost of raising them is a conversation about your defects. That silence usually looks like the relationship getting easier. It is not.",
      },
    ],
    notAlways:
      "Some people genuinely do read more into things than was meant, and someone telling you so is not automatically manipulating you. The distinguishing question is not whether the observation stings — it is whether the original issue still gets addressed once it has been made. If he says you're reading too much into it AND then answers the actual question, that is a person disagreeing with you. That is allowed.",
    whatToDo: [
      "Next time it happens, say: \"We can talk about how I said it after we've finished talking about what happened.\" It does not reject his point, so there is nothing to escalate — it just puts it in a queue.",
      "Write down the last three times you heard it, with what you had raised immediately before. If the phrase only ever follows his mistakes, the pattern is in the timing rather than in your sensitivity.",
      "Tell one person outside the relationship what happened, in plain words. The gap between your account to them and your account to yourself is the most useful measurement available.",
    ],
    faq: [
      {
        q: "What if I actually am too sensitive?",
        a: "Then it will be true across your whole life, not only with one person. If friends, family and colleagues do not experience you that way and one partner consistently does, the variable is the relationship rather than your temperament.",
      },
      {
        q: "How do I bring something up without him saying this?",
        a: "You largely cannot, and trying to phrase it perfectly is the trap — it puts the burden of the conversation's outcome on your delivery. Raise it plainly and watch what happens. The response is the information you are after.",
      },
    ],
    quiz: "/is-he-gaslighting-me",
    quizPitch:
      "This phrase is one of six tactics the assessment scores. It takes about eight minutes and tells you whether it is an isolated habit or part of a pattern.",
    related: ["he-twists-my-words", "i-always-end-up-apologizing", "he-says-it-never-happened"],
  },

  {
    slug: "he-says-it-never-happened",
    phrase: "He says it never happened",
    seoTitle: "He Denies Things You Remember Clearly — What It Means",
    description:
      "When someone confidently denies an event you both witnessed, the argument stops being about the event. Here is what is actually happening and what to do.",
    answer:
      "Confident denial of something you clearly remember is the core gaslighting manoeuvre, because it cannot be disproved in the moment — there is no recording, so it becomes one word against another. Repeated, the question stops being what happened and becomes whose memory is reliable, and that contest is won by whoever is more certain rather than whoever is correct. The reliable tell is whether it clusters around his mistakes: selective amnesia is a strategy, general forgetfulness is not.",
    body: [
      {
        heading: "Why arguing the facts never works",
        text:
          "Producing evidence feels like the obvious response and it consistently fails. Partly because the evidence is rarely conclusive — you have a memory, not a transcript — and partly because the disagreement was never really about the event. Once your recall is on trial, you have already lost the ground you needed. The only way not to lose that trial is to decline it.",
      },
      {
        heading: "Forgetting versus denying",
        text:
          "Genuine forgetting is uncertain and distributed: it happens about ordinary things, and the person is open to being wrong. Denial is confident and selective: it happens about things that would require an apology, and the confidence increases with pressure. Look at whether he ever forgets in a way that costs him something. If every memory lapse conveniently lands in his favour, that is a pattern rather than a memory.",
      },
      {
        heading: "The cumulative effect",
        text:
          "Each individual instance is survivable and arguable, which is exactly why this works. What accumulates is not distress about any one event but a slow loss of confidence in your own perception — the sense of feeling 'crazy' specifically around one person and nowhere else. That specificity is the diagnostic: a genuine memory problem does not switch off when you leave the room.",
      },
    ],
    notAlways:
      "People genuinely remember the same event differently, and memory is reconstructive for everyone including you. Two honest people can hold incompatible accounts of the same evening. What separates that from a pattern is symmetry — in an honest disagreement, sometimes he is the one who turns out to be misremembering, and he is willing to consider it. If it only ever runs one direction, the asymmetry is the finding.",
    whatToDo: [
      "Keep a dated log: one line per incident, written the same day, facts only. Not to show him — showing it escalates. It exists so that in three weeks you can check your memory against a record rather than against his account.",
      "Say \"We remember it differently. I'm not going to debate it\" and stop there. It concedes nothing and offers nothing to argue with.",
      "Read the log after a fortnight, in one sitting. Most people find it stops being a record of incidents and becomes a record of their judgement being sound.",
    ],
    faq: [
      {
        q: "What if he believes what he's saying?",
        a: "Entirely possible, and it changes what you do rather than what is happening. Someone can run this pattern without a plan. Intent matters for whether the relationship can change; it has no bearing on whether your self-trust is eroding, and the log works either way.",
      },
      {
        q: "Should I record conversations?",
        a: "Usually a bad idea. It is illegal without consent in many places, it escalates badly if discovered, and it does not solve the problem — someone who denies an event will dispute the context of a recording. A dated written log serves you better and costs nothing.",
      },
    ],
    quiz: "/is-he-gaslighting-me",
    quizPitch:
      "Reality denial is one of six dimensions the assessment scores separately, so you can see whether this is the whole pattern or one part of it.",
    related: ["he-says-im-too-sensitive", "he-twists-my-words", "i-feel-crazy-around-him"],
  },

  {
    slug: "he-twists-my-words",
    phrase: "He twists my words",
    seoTitle: "He Twists My Words In Arguments — Why, And What To Do",
    description:
      "If every conversation ends with you defending something you never said, the mechanism is predictable — and so is the way out.",
    answer:
      "Word-twisting works by replacing what you said with a stronger version that is easier to reject, so you end up defending a position you never held. It is effective because correcting the misquote feels urgent, and the moment you do, the original point is gone. The way out is not better phrasing — it is refusing to defend the new version and returning, plainly, to the sentence you actually said.",
    body: [
      {
        heading: "The mechanics",
        text:
          "You say 'you were an hour late and didn't message'. It comes back as 'so I'm a terrible partner who doesn't care about you'. Now there are two conversations available — the one about the hour, and the one about whether he is a terrible partner — and only one of them is winnable by him. Almost everyone takes the bait, because letting an unfair characterisation stand feels impossible.",
      },
      {
        heading: "Why it escalates so fast",
        text:
          "The substituted version is always more extreme than the original, which means the emotional temperature rises before any facts are discussed. Within two exchanges you are reassuring him that you do not think he is a terrible partner, and the hour has been forgotten entirely. This is not an accident of communication style; it is the function.",
      },
      {
        heading: "Why 'I never said that' does not help",
        text:
          "It sounds like the right correction and it keeps you in the wrong conversation — you are now arguing about what was said rather than about what happened. The more effective move is to skip the correction entirely and simply restate the original, once, in the same words. Repetition without escalation gives the substitution nothing to work with.",
      },
    ],
    notAlways:
      "Some people genuinely hear criticism as global rejection, particularly if they grew up where criticism was global. That person is not manipulating you; they are flinching. The difference shows in what happens when you calmly restate: someone flinching can come back to the actual point once the temperature drops, while someone using the tactic will simply produce a new substitution.",
    whatToDo: [
      "Write one sentence before a difficult conversation describing what it is about. When the subject changes, return to that sentence rather than answering the new charge.",
      "Do not correct the misquote. Restate the original in the same words, once. \"You were an hour late and didn't message.\" Then stop talking.",
      "End conversations on a clock rather than at resolution: \"I'm going to stop here and pick it up tomorrow.\" Nothing that depends on wearing you down survives a time limit.",
    ],
    faq: [
      {
        q: "Am I being unclear?",
        a: "Check it cheaply: write down what you said, word for word, and show it to a friend without context. If they read it the way you meant it, clarity is not your problem. Most people in this situation are already over-explaining, which makes the substitution easier rather than harder.",
      },
      {
        q: "What if I do it too?",
        a: "Worth asking honestly, and most people do it occasionally under stress. The question is frequency and direction. Occasional and mutual is an argument style. Consistent and one-directional is a pattern.",
      },
    ],
    quiz: "/is-he-manipulative",
    quizPitch:
      "The assessment scores this alongside the other tactics it usually travels with, so you can see which one is actually driving the dynamic.",
    related: ["i-always-end-up-apologizing", "he-says-im-too-sensitive", "he-gives-me-the-silent-treatment"],
  },

  {
    slug: "i-always-end-up-apologizing",
    phrase: "I always end up apologizing",
    seoTitle: "Why Do I Always End Up Apologizing? The DARVO Pattern",
    description:
      "If conversations about his behaviour reliably end with your apology, that reversal has a name and a predictable structure.",
    answer:
      "Consistently ending up as the one apologising is the signature of DARVO — deny, attack, reverse victim and offender. It works because the reversal happens faster than you can track, and the emotional force of being accused overrides your memory of what you came in to discuss. The marker is not that you apologise, but that you cannot reconstruct how the conversation got there.",
    body: [
      {
        heading: "What DARVO actually looks like",
        text:
          "It runs in three moves, usually within a minute. Denial: it did not happen, or not like that. Attack: something about your tone, your timing, your history, your motives. Reversal: he is now the wronged party and you are the one who has caused harm. Each move is individually arguable, which is why the whole sequence rarely gets named while it is happening.",
      },
      {
        heading: "Why you apologise anyway",
        text:
          "By the end you are not apologising about the original issue — you are apologising for the distress of the last ten minutes, which is genuine. That is what makes it so hard to resist: the thing you are sorry for is real. It is simply not the thing you came in about, and the exchange has cost you the ability to raise that thing again.",
      },
      {
        heading: "The compounding cost",
        text:
          "Every completed cycle raises the price of the next attempt. You learn that bringing something up will end with you at fault, so you bring up less. The relationship gets quieter and looks better from outside. What has actually happened is that one person has stopped being able to raise anything.",
      },
    ],
    notAlways:
      "Sometimes you are wrong, and a conversation that ends with your apology is simply a conversation you lost on the merits. Healthy relationships contain plenty of those. The distinguishing feature is not any single apology — it is the ratio. If you cannot remember the last time a disagreement ended with his apology, that asymmetry is the data point, not any individual argument.",
    whatToDo: [
      "Before the conversation, write one sentence naming the topic. Keep it visible. When the subject changes, return to that sentence instead of answering the new accusation.",
      "Separate the two things out loud: \"I'm sorry this got heated. I still need to talk about Thursday.\" The apology is real and the topic survives it.",
      "Afterwards, write down what you came in about and what you left having apologised for. Seeing the gap on paper a few times is what makes the pattern visible in real time.",
    ],
    faq: [
      {
        q: "How do I stop apologising reflexively?",
        a: "Do not try to stop — try to delay. 'Let me think about that' buys the seconds the reflex needs. Most reflexive apologies happen in the first two seconds of feeling accused, and almost any pause defeats them.",
      },
      {
        q: "Is this the same as gaslighting?",
        a: "Related but distinct. Gaslighting targets your perception of events; DARVO targets the direction of accountability. They frequently occur together, which is why the assessment scores them as separate dimensions.",
      },
    ],
    quiz: "/is-he-manipulative",
    quizPitch:
      "Blame reversal is scored separately from the other tactics, so the report can tell you whether this is the mechanism or a side effect of a different one.",
    related: ["he-twists-my-words", "he-says-it-never-happened", "he-gives-me-the-silent-treatment"],
  },

  {
    slug: "he-gives-me-the-silent-treatment",
    phrase: "He gives me the silent treatment for days",
    seoTitle: "The Silent Treatment: Why It Works And How To Respond",
    description:
      "Days of silence after a disagreement is not a cooling-off period. Here is the difference, and what actually ends it.",
    answer:
      "Taking space and giving the silent treatment look identical for about an hour and diverge completely after that. Space has a stated end and does not require your distress to work; the silent treatment is open-ended and its entire mechanism is that the discomfort of not knowing makes you concede in order to end it. The test is simple — was a return point named, and does the silence lift when you apologise rather than when the time passes?",
    body: [
      {
        heading: "Why it is so disproportionately painful",
        text:
          "Social exclusion registers in the brain much like physical pain, which is why days of silence from someone you live with is genuinely difficult rather than merely annoying. This is not weakness on your part. It is also precisely why the tactic is effective: it produces real suffering while looking, from outside, like someone simply not talking.",
      },
      {
        heading: "The conditions that give it away",
        text:
          "Cooling off is specific ('I need the evening, let's talk tomorrow') and holds regardless of what you do. The silent treatment is unbounded, and it ends on a condition rather than on a clock — usually your apology, your pursuit, or your visible distress. If the silence lifts the moment you concede, the silence was the instrument.",
      },
      {
        heading: "Why chasing extends it",
        text:
          "Every message, every attempt at repair, every visible upset confirms that the method is working. This is not about him being cruel by design; the behaviour is simply reinforced by the response. The counterintuitive consequence is that the fastest way to shorten these episodes is to stop trying to end them.",
      },
    ],
    notAlways:
      "Some people genuinely shut down under conflict and cannot form sentences for a while — that is a regulation problem, not a tactic, and it is common in people who grew up where arguments were dangerous. The difference is whether they can name a return point when calm, and whether they come back on their own. A person who shuts down will often apologise for the silence afterwards. A person using it will treat it as your fault.",
    whatToDo: [
      "Say it once: \"I'm not going to chase this. I'll be here when you want to talk.\" Then genuinely stop — no follow-up messages, no repair attempts, no visible campaign.",
      "Keep your own week intact. Go to the thing, see the person, eat the meal. The silence has leverage only in proportion to how much of your life it pauses.",
      "When it ends, do not skip past it. \"That was four days. I need us to have a different way of doing this\" — said once, calmly, when things are good rather than during the next episode.",
    ],
    faq: [
      {
        q: "How long is too long?",
        a: "Hours is a cooling-off period. Days is a different thing, whatever it is called. The duration matters less than whether an end was named, but past about 24 hours with no stated return point you are no longer dealing with someone regulating themselves.",
      },
      {
        q: "Should I apologise just to end it?",
        a: "It works, which is exactly the problem — it teaches that the method is effective and guarantees the next one. If you genuinely owe an apology, give it. If you are giving it to restore contact, you are paying a ransom rather than repairing anything.",
      },
    ],
    quiz: "/is-he-manipulative",
    quizPitch:
      "Stonewalling is scored alongside the tactics it usually appears with. The report says which of them is doing the most work in your situation.",
    related: ["i-always-end-up-apologizing", "he-twists-my-words", "i-feel-crazy-around-him"],
  },

  {
    slug: "i-feel-crazy-around-him",
    phrase: "I feel crazy around him",
    seoTitle: "Feeling \"Crazy\" Around One Person — What That Means",
    description:
      "Feeling unstable with one specific person and fine with everyone else is a pattern with a cause. Here is how to read it.",
    answer:
      "Feeling unstable around one specific person while functioning normally everywhere else is diagnostically important: a genuine problem with your perception or emotional regulation does not switch off when you change rooms. That specificity points at the dynamic rather than at you. It is usually the accumulated result of having your account of events repeatedly overruled — the feeling is the damage, not the cause.",
    body: [
      {
        heading: "Why it localises to one person",
        text:
          "Self-doubt of this kind is built through repetition: raise a concern, get argued out of it, file it as a mistake you made. Do that enough times and your perception stops counting as evidence — but only in the context where the correction happened. With friends, at work, with family, your judgement still functions, which is why the contrast is so disorienting and so easy to dismiss.",
      },
      {
        heading: "What it actually costs",
        text:
          "The practical effect is that you can no longer resolve anything alone. You find yourself needing someone else to confirm that what happened happened, rehearsing conversations in advance, and spending more energy deciding whether you are allowed to feel something than deciding what to do about it. That last one is the clearest marker.",
      },
      {
        heading: "Why it recovers",
        text:
          "Self-trust is not restored by reassurance. It comes back through accumulated evidence that your perception was accurate, which is why a dated log does more than any amount of being told you are right. Within about three weeks it stops being a record of incidents and becomes a record of your own reliability — and that is the thing that has been missing.",
      },
    ],
    notAlways:
      "Anxiety, depression, ADHD, perimenopause, sleep deprivation and several medications all genuinely affect memory and emotional regulation, and it is worth ruling those out rather than assuming. The distinguishing question remains location: those affect you everywhere. If it is one relationship and one relationship only, the relationship is the variable.",
    whatToDo: [
      "Keep a dated log for two weeks — same-day, facts only, kept somewhere private. Read it in one sitting at the end. This single exercise resolves the question for most people.",
      "Tell one person outside the relationship what has been happening, in plain language, without softening it. Saying it out loud to someone with no stake is what breaks the calibration you have been using.",
      "If the log shows your account holding up and the feeling persists, that is worth taking to a GP or therapist — not because you are imagining it, but because the damage is real and treatable.",
    ],
    faq: [
      {
        q: "What if I really am the problem?",
        a: "The log settles it either way, which is why it is the first step rather than the last. Two weeks of same-day factual notes will show you whether your account holds up. Almost everyone who asks this question finds that it does.",
      },
      {
        q: "Does this mean he is doing it deliberately?",
        a: "Not necessarily, and you cannot know from inside his head. Some of these patterns are learned and run without a plan. It changes what you do about the relationship; it does not change whether the effect on you is real.",
      },
    ],
    quiz: "/is-he-gaslighting-me",
    quizPitch:
      "Self-trust erosion is scored as its own dimension, separately from his behaviour — so the report can tell you how much damage there is as well as what is causing it.",
    related: ["he-says-it-never-happened", "he-says-im-too-sensitive", "i-always-end-up-apologizing"],
  },

  // ── INFIDELITY ────────────────────────────────────────────────────────
  {
    slug: "he-takes-his-phone-everywhere",
    phrase: "He takes his phone everywhere, even the bathroom",
    seoTitle: "He Takes His Phone Everywhere — Should You Worry?",
    description:
      "Sudden phone secrecy is the most-cited infidelity sign and the most misread. What actually matters is the change, not the behaviour.",
    answer:
      "Taking a phone everywhere means almost nothing on its own — most people do it, and privacy is not evidence. What carries signal is change: a phone that used to sit face-up on the table and now travels to the bathroom represents a decision someone made, and decisions have reasons. Ask when it started rather than whether it is happening.",
    body: [
      {
        heading: "Why this sign is over-weighted",
        text:
          "It is the most-repeated item on every infidelity checklist, which means it is also the one people notice first and interpret hardest. But phone attachment is near-universal now and rising for reasons that have nothing to do with relationships. A behaviour that most of the population exhibits cannot be diagnostic by itself, no matter how many articles list it.",
      },
      {
        heading: "What actually carries information",
        text:
          "Three things, in order. First, change — the shift from one pattern to another, and roughly when it happened. Second, clustering: phone secrecy alongside schedule gaps alongside emotional withdrawal is a different finding from any one of them alone. Third, the response to being asked. A reasonable question about a change gets a reasonable answer; if it reliably produces an argument about trust instead, that reaction is more informative than the phone.",
      },
      {
        heading: "The problem with checking",
        text:
          "Going through his phone tends to be a poor move even when the suspicion turns out to be correct. If you find nothing, you are not reassured — you conclude he is being careful, and the searching escalates. If you find something, you have a crisis and a disclosure problem at the same moment. And the act itself changes the relationship in a way that is difficult to undo regardless of outcome. There are better ways to resolve this, and they start with the timeline.",
      },
    ],
    notAlways:
      "Work confidentiality, a health issue he has not mentioned, a surprise, family news that is not his to share, debt, a gift, a job application, or simply a habit that drifted — all produce the same behaviour. Phone privacy is also just normal: plenty of people in entirely faithful relationships would not hand over an unlocked phone, and that is not a red flag, it is a boundary.",
    whatToDo: [
      "Write down when the change started and what else was happening that month. A cause almost always sits somewhere near the start date, and it is often not the one you fear.",
      "Ask once, directly and without accusation: \"You've been keeping your phone close lately — is something going on?\" What matters is the shape of the answer, not its content.",
      "Do not search the phone. Whatever you find or fail to find, the searching makes the next weeks worse and resolves nothing you could not establish another way.",
    ],
    faq: [
      {
        q: "Is refusing to share passwords a red flag?",
        a: "No. Password privacy is a normal boundary and plenty of healthy couples maintain it. What is worth noticing is a change in policy that arrives without explanation, particularly alongside other changes.",
      },
      {
        q: "He says I'm being paranoid. Am I?",
        a: "Possibly, and it is worth asking seriously. But note the move itself: if raising a concern reliably becomes a conversation about your character rather than about the concern, that pattern is worth examining separately from the phone.",
      },
    ],
    quiz: "/is-he-cheating",
    quizPitch:
      "The assessment scores four behavioural vectors separately — digital, schedule, emotional and defensive — so a single spike is reported as a single spike rather than as a verdict.",
    related: ["hes-been-working-late-every-night", "he-accused-me-of-cheating", "he-feels-distant-but-says-nothing-is-wrong"],
  },

  {
    slug: "hes-been-working-late-every-night",
    phrase: "He's been working late every night",
    seoTitle: "He's Always Working Late — How To Read It",
    description:
      "A schedule that suddenly expands is worth understanding rather than worrying about. Here is what distinguishes a busy period from a cover.",
    answer:
      "Working late is only meaningful when the schedule stops being checkable. A genuine busy period comes with specifics — a deadline, named colleagues, a project you have heard of before — and it ends. A cover tends to be vague in a particular way: plenty of detail about the fact of being busy, very little that could be confirmed, and no visible endpoint.",
    body: [
      {
        heading: "Specific versus vague",
        text:
          "Listen for verifiability rather than plausibility. 'The Henderson thing has to ship Thursday and Priya and I are stuck on the data' is checkable and will resolve on Thursday. 'Work is mad at the moment' has been true for six weeks and refers to nothing in particular. Both can be honest, but only one of them can be wrong in a way you would ever find out about.",
      },
      {
        heading: "The corroboration question",
        text:
          "Real work produces traces that are not testimony: tiredness that matches the hours, complaints about specific people, a calendar, money if it is paid. If the late nights leave no trace anywhere else in his life — no exhaustion, no grumbling, no financial change, no mention from anyone else — that absence is worth noticing. Not as proof, but as a gap.",
      },
      {
        heading: "What usually turns out to be happening",
        text:
          "In most cases, exactly what he said. Sometimes something else that is not an affair — a job search, a problem at work he is ashamed of, debt, a health appointment, avoiding home for reasons unrelated to anyone else. The last of those is worth taking seriously, because 'he is avoiding the house' and 'he is seeing someone' produce identical schedules and require completely different responses.",
      },
    ],
    notAlways:
      "Some jobs genuinely do this, seasonally and brutally, and someone under real pressure will be both absent and bad at explaining why. Avoidance of home is also common and is not infidelity — it can mean depression, dread of a conversation, or a relationship that has become tiring for reasons neither of you has named. Those need addressing, but they are a different problem with a different solution.",
    whatToDo: [
      "Ask something specific and forward-looking: \"When does this project actually finish?\" A real deadline produces a date. Note whether the date arrives and what happens when it does.",
      "Track it for two weeks rather than reasoning about it. Nights, stated reason, and how he was when he got in. Patterns are visible in a fortnight of notes and invisible in memory.",
      "Consider the other explanations before the worst one. 'Are you avoiding being here?' is a harder question to ask and more often the right one.",
    ],
    faq: [
      {
        q: "Should I turn up at his office?",
        a: "No. If he is there you have damaged something for no gain, and if he is not you have a confrontation in a car park with no preparation. The timeline gives you the same information without the ambush.",
      },
      {
        q: "He gets angry when I ask. What does that mean?",
        a: "Sometimes guilt, often exhaustion, and quite often the accumulated weight of having been asked before. What is worth watching is whether the anger replaces the answer or merely accompanies it.",
      },
    ],
    quiz: "/is-he-cheating",
    quizPitch:
      "Schedule irregularity is one of four vectors scored separately, so you can see whether this is isolated or part of a cluster.",
    related: ["he-takes-his-phone-everywhere", "he-feels-distant-but-says-nothing-is-wrong", "he-accused-me-of-cheating"],
  },

  {
    slug: "he-accused-me-of-cheating",
    phrase: "He accused me of cheating out of nowhere",
    seoTitle: "He Accused Me Of Cheating — What It Usually Means",
    description:
      "An accusation that arrives from nowhere has a small number of likely causes. Projection is one, and it is not the only one.",
    answer:
      "A sudden, evidence-free accusation usually comes from one of three places: his own guilt, his own insecurity, or something he genuinely misread. Projection is real and well documented, but it is over-diagnosed on the internet — most unfounded accusations come from anxiety rather than from a guilty conscience. What separates them is what he does next.",
    body: [
      {
        heading: "The three usual causes",
        text:
          "Guilt-driven accusation tends to be specific, confident and oddly detailed — someone who is doing something often imagines the mechanics vividly. Anxiety-driven accusation is vaguer, more apologetic afterwards, and recurs in different forms. Misreading is one-off, resolves with information, and does not come back. These are genuinely different and they require different responses.",
      },
      {
        heading: "Why the aftermath matters more than the accusation",
        text:
          "Everyone has an ugly moment. What is informative is the following week: does he accept the answer and drop it, or does the suspicion simply relocate to someone else? Anxiety accepts reassurance temporarily and returns. Guilt frequently escalates into monitoring. A misread apologises and is genuinely finished.",
      },
      {
        heading: "The thing to avoid",
        text:
          "Over-proving. Handing over your phone, cancelling plans, accounting for hours — it feels like the fastest route to peace and it establishes a standard you will be held to indefinitely. Answer once, clearly. If one clear answer is not enough, the problem is not the amount of evidence available.",
      },
    ],
    notAlways:
      "Sometimes an accusation is a badly expressed version of something real — he noticed you pulling away, or something changed and he reached for the worst explanation. That is worth hearing even when the specific charge is wrong. And occasionally people are simply having a terrible week and say something they do not mean.",
    whatToDo: [
      "Answer once, plainly, and do not elaborate. \"No, I'm not. Where's this coming from?\" The second half is the useful part.",
      "Watch the next fortnight rather than the next hour. Whether it recurs, and in what form, tells you which of the three causes you are dealing with.",
      "Do not start over-proving. One clear answer is the whole of your obligation; a standard set now is a standard you will be living with in a year.",
    ],
    faq: [
      {
        q: "Does accusing mean he's cheating?",
        a: "Not reliably. Projection is real but the internet treats it as a rule, and most unfounded accusations trace to insecurity rather than guilt. Look at the accompanying pattern rather than at the accusation alone.",
      },
      {
        q: "How do I prove I'm not?",
        a: "You largely cannot, and attempting to is the trap — absence of evidence is not provable, so the demand can always be renewed. Answer once and then treat further demands as information about him rather than as tasks for you.",
      },
    ],
    quiz: "/is-he-cheating",
    quizPitch:
      "The assessment includes his defensive and accusatory behaviour as a scored vector, not just the classic signs, because that vector is frequently the most informative one.",
    related: ["he-takes-his-phone-everywhere", "he-gives-me-the-silent-treatment", "hes-been-working-late-every-night"],
  },

  {
    slug: "he-feels-distant-but-says-nothing-is-wrong",
    phrase: "He feels distant but says nothing is wrong",
    seoTitle: "He's Distant But Says Nothing's Wrong — Reading The Gap",
    description:
      "When someone is clearly elsewhere and insists everything is fine, the gap itself is the information. Here is how to use it.",
    answer:
      "Emotional withdrawal paired with a denial that anything has changed is the single most commonly reported relationship symptom, and it has more causes than infidelity — depression, work stress, avoidance of a conversation he dreads, or the slow drift that ends relationships without anyone deciding. The useful move is not to identify the cause but to date the change, because the cause almost always sits near the start.",
    body: [
      {
        heading: "Why 'nothing's wrong' is usually not a lie",
        text:
          "Most people saying it mean something closer to 'I cannot name this yet' or 'naming it would start a conversation I do not have the energy for'. Treating it as a deliberate deception usually makes the withdrawal worse, because it adds an accusation to whatever was already there. The sentence is more often a symptom than a cover story.",
      },
      {
        heading: "Dating the change",
        text:
          "Write down roughly when it started and what else happened that month — a job change, a death, a health scare, a birthday he found difficult, a conversation that went badly. In the large majority of cases something is sitting there. That exercise is worth more than a month of interpreting his behaviour, and it is the one step most people skip.",
      },
      {
        heading: "The distinction that matters",
        text:
          "Distance that includes you is different from distance that is only about you. Someone depressed or overloaded tends to be withdrawn from everything — friends, hobbies, work, food, sleep. Someone withdrawing from the relationship specifically is often still animated elsewhere. That contrast, observed over a couple of weeks, narrows the possibilities faster than any conversation.",
      },
    ],
    notAlways:
      "Depression presents almost exactly like this and is far more common than infidelity. So does burnout, grief, and undiagnosed physical illness. Jumping to the relationship as the cause is both the most frightening option and, statistically, not the most likely one.",
    whatToDo: [
      "Date the change and list what else happened that month. Do this before any conversation.",
      "Observe whether the withdrawal is general or specific to you. Two weeks of noticing tells you more than asking does.",
      "Ask a question that is not about the relationship: \"You've seemed somewhere else for a couple of months. Are you okay?\" It is harder to deflect than \"is something wrong with us\", and it is more often the right question.",
    ],
    faq: [
      {
        q: "Should I keep asking?",
        a: "Not repeatedly in the same form — that reliably produces a firmer denial. Ask differently, and space it out. Changing the question is more productive than increasing the frequency.",
      },
      {
        q: "How long before I worry?",
        a: "A few weeks is a bad patch. A few months with no identifiable cause is worth treating as a real change rather than a mood, whatever the cause turns out to be.",
      },
    ],
    quiz: "/is-he-cheating",
    quizPitch:
      "Emotional withdrawal is scored as its own vector, and the report explicitly reports a low score on the other three as a low score — which is the finding most people actually need.",
    related: ["hes-been-working-late-every-night", "he-takes-his-phone-everywhere", "he-gives-me-the-silent-treatment"],
  },

  // ── ATTACHMENT / SELF ─────────────────────────────────────────────────
  {
    slug: "i-get-bored-when-someone-is-nice-to-me",
    phrase: "I get bored when someone is nice to me",
    seoTitle: "Why Nice People Feel Boring — The Real Reason",
    description:
      "Losing interest in someone exactly when they become reliable is a recognised pattern with a physiological explanation, not a preference.",
    answer:
      "Losing interest in someone the moment they become consistent is not a verdict on them — it is withdrawal. Your body cannot distinguish attraction from threat, because both run on the same adrenaline, so an unpredictable person produces the racing heart you have learned to call chemistry and a steady one produces nothing. The flat feeling peaks around the second week and passes, which is precisely when most people end it.",
    body: [
      {
        heading: "Why calm registers as nothing",
        text:
          "If your early template involved unpredictability, your nervous system learned to read 'familiar' rather than 'good' — and familiarity is the only signal it tracks reliably. It carries no quality judgement at all. A kind, available person is genuinely not producing the physiological state you are scanning for, so your system reports an absence. That report feels like a fact about them.",
      },
      {
        heading: "Why it is strongest at week two",
        text:
          "The pattern has a shape. Weeks one to two are fine because novelty supplies its own charge. Around week two or three the novelty drops and the absence of anxiety becomes noticeable — and it arrives as boredom, not as relief. That timing is the tell: a genuine incompatibility does not schedule itself so precisely.",
      },
      {
        heading: "What changes it",
        text:
          "Not insight. You can understand this completely and feel exactly the same, because it does not live in the part of the mind that responds to argument. What works is repeated exposure past the withdrawal point — staying present with a steady person for longer than three dates, several times. The recalibration takes roughly two to three months, and almost everyone quits in week two because they mistake the withdrawal for proof they were right.",
      },
    ],
    notAlways:
      "Sometimes you are simply not attracted to someone, and that is allowed. Kindness is not a reason to date a person you do not want. The distinguishing question is the pattern: if this has happened with several kind people and never with a chaotic one, the variable is not them.",
    whatToDo: [
      "When the flat feeling arrives, name it out loud as withdrawal and change nothing for 72 hours. No conversation, no pulling back, no reopening old ground.",
      "Score how settled you feel an hour after the third date, out of ten. Below six is a flag rather than a thrill. Give anyone scoring seven or above four more weeks before judging chemistry.",
      "Write down what you actually enjoyed about the last three chaotic relationships. Most people find the list is short and the entries are about intensity rather than about the person.",
    ],
    faq: [
      {
        q: "Am I just settling if I push through it?",
        a: "No — settling is choosing someone you do not like. This is staying long enough to find out whether you like them, past a two-week window in which your judgement is unreliable by design.",
      },
      {
        q: "How long does it take to change?",
        a: "The behaviour changes in weeks. The feeling takes two to three months of repeated exposure. The gap between those two is why this is hard rather than complicated.",
      },
    ],
    quiz: "/attraction-patterns",
    quizPitch:
      "The assessment scores intensity preference against stability preference — the ratio between those two explains more about your dating history than any other number on the chart.",
    related: ["i-panic-when-he-doesnt-text-back", "i-keep-dating-the-same-type", "i-push-people-away"],
  },

  {
    slug: "i-panic-when-he-doesnt-text-back",
    phrase: "I panic when he doesn't text back",
    seoTitle: "Why An Unanswered Text Feels Like An Emergency",
    description:
      "If a delayed reply reorganises your whole day, that is an attachment alarm doing its job badly. Here is how it works and how to quiet it.",
    answer:
      "Panic at an unanswered message is an attachment alarm calibrated in childhood for a situation that no longer exists. It fires on signals of distance and — crucially — it does not process reassurance, which is why being told everything is fine helps for about twenty minutes. What quiets it is predictability, not reassurance, and the difference is the whole of the solution.",
    body: [
      {
        heading: "Why reassurance does not stick",
        text:
          "The alarm is not an argument, so it cannot be answered with one. Ask for reassurance and you will get it, feel better briefly, and find the alarm has rearmed by evening. This is also why the same conversation repeats: both of you are treating a regulation problem as an information problem.",
      },
      {
        heading: "What actually lowers the baseline",
        text:
          "Predictability. One small, reliable, known-in-advance point of contact does more than an hour of being told you are loved, because the system runs on prediction rather than on content. A message at a known time, a standing evening — something that does not move. The specificity is what works; generosity is not the active ingredient.",
      },
      {
        heading: "The cost of acting on it",
        text:
          "Acting on the alarm — double texting, checking, opening the conversation about the conversation — reliably makes the next episode worse, because it teaches the system that the feeling is an emergency requiring action. Twenty minutes of not acting is a genuinely effective intervention, and it is much harder than it sounds.",
      },
    ],
    notAlways:
      "Sometimes the panic is accurate. If someone is genuinely inconsistent — warm then absent, on no discernible schedule — your alarm is reading a real signal rather than misfiring, and the problem is not your attachment style. Intermittent contact produces this response in almost everyone, which is worth knowing before you conclude the fault is yours.",
    whatToDo: [
      "Wait twenty minutes before acting on the feeling. Not forever — twenty minutes. Most of what it insists is urgent has changed shape by then.",
      "Ask for one specific predictable thing instead of general reassurance. \"Text me when you get in\" beats \"do you still like me\" by a wide margin.",
      "Keep a one-line daily note of something you did well that he does not know about. It rebuilds the internal supply that his attention is currently the sole distributor of.",
    ],
    faq: [
      {
        q: "Is this anxious attachment?",
        a: "It is the most recognisable feature of it, though the label matters less than the mechanism. What is worth knowing is that this is a learned response rather than a personality trait, and learned responses are the changeable kind.",
      },
      {
        q: "How do I ask without seeming needy?",
        a: "Ask for something specific and small. Specific requests read as practical; general reassurance-seeking reads as the thing you are worried about. \"Can you text when you're leaving\" is logistics. \"Do you still want this\" is not.",
      },
    ],
    quiz: "/attachment-style-quiz",
    quizPitch:
      "The full assessment scores your attachment separately across five domains, including both childhood axes — because the same alarm often behaves completely differently at work than it does at home.",
    related: ["i-get-bored-when-someone-is-nice-to-me", "i-push-people-away", "i-overthink-every-text"],
  },

  {
    slug: "i-push-people-away",
    phrase: "I push people away when I start to care",
    seoTitle: "Why You Pull Away When It Starts Going Well",
    description:
      "Withdrawing right after things get close is a regulation strategy, not self-sabotage. Knowing which it is changes what you do.",
    answer:
      "Pulling away exactly when something starts working is avoidant regulation: closeness, not conflict, is the trigger. That is why the withdrawal so often follows a good week rather than a bad one, and why it reads as arbitrary to the other person. It is not a decision about them — it is a nervous system managing exposure.",
    body: [
      {
        heading: "The trigger is closeness, not problems",
        text:
          "This is the part that surprises people. Look at the last three times you withdrew and what happened in the 48 hours before — most people find a good conversation, a plan being made, something said out loud. Closeness raises exposure, exposure raises the need for distance, and the distance arrives without ever presenting itself as a response to anything.",
      },
      {
        heading: "Why it looks like losing interest",
        text:
          "From inside it presents as doubt: suddenly noticing irritating things, feeling uncertain, finding reasons. Those reasons are generated after the withdrawal, not before it — the mind supplies an explanation for a state the body has already entered. Acting on them is how people end relationships they wanted.",
      },
      {
        heading: "What works better than forcing yourself to stay",
        text:
          "Announcing a return point rather than disappearing. 'I go quiet sometimes, it is not about you, I'll be back by Sunday' converts an alarming absence into a known one — which is tolerable for the other person and takes most of the pressure off you. The strategy exists to relieve pressure; a horizon does that without requiring you to override it.",
      },
    ],
    notAlways:
      "Sometimes the doubt is real and the relationship is genuinely wrong, and avoidant patterns get over-applied as a reason to ignore your own judgement. The distinguishing feature is timing: doubt that consistently arrives after closeness and never after conflict is the pattern. Doubt that has been present the whole way through is information.",
    whatToDo: [
      "Track the 48 hours before the last three withdrawals. If closeness precedes them, you have your answer and it is not about the people.",
      "Name a return point instead of vanishing. \"I need a few days, I'll message Sunday\" — and then actually message on Sunday.",
      "Do not make decisions during the withdrawal. The reasons available to you in that window are generated by the state, not by the situation.",
    ],
    faq: [
      {
        q: "Is this fear of commitment?",
        a: "That phrase describes the outcome rather than the mechanism, which is why it is not very useful. What is happening is closer to regulation: closeness raises arousal, distance lowers it. Knowing the trigger gives you something to work with; a label does not.",
      },
      {
        q: "Can I change this?",
        a: "The behaviour, yes, and reasonably quickly — naming a return point is a change you can make this week. The underlying reflex shifts slowly and mostly through repeated experience of closeness that did not cost anything.",
      },
    ],
    quiz: "/attachment-style-quiz",
    quizPitch:
      "Avoidance is scored separately from anxiety, because a great many people run both and the combination behaves differently from either one alone.",
    related: ["i-get-bored-when-someone-is-nice-to-me", "i-panic-when-he-doesnt-text-back", "i-keep-dating-the-same-type"],
  },

  {
    slug: "i-keep-dating-the-same-type",
    phrase: "I keep dating the same type of person",
    seoTitle: "Why You Keep Picking The Same Type — And How It Breaks",
    description:
      "Repeating the same relationship with different people is a selection pattern. It runs on a filter you can identify and adjust.",
    answer:
      "Dating the same person repeatedly is a selection problem, not bad luck, and it usually runs on a filter applied in the first three interactions. Whatever that filter screens for — intensity, potential, a project, unavailability — gets applied before you have any real information, so the outcome is set long before the relationship reveals itself. Identifying the filter is most of the work.",
    body: [
      {
        heading: "Selection and retention are separate failures",
        text:
          "Two different things go wrong and they need different fixes. Selection decides who gets through the door, and it runs on a fast, pre-verbal read. Retention decides how long they stay after you know better, and it runs on what you will tolerate. Resolving to 'be pickier' addresses only the first, which is why it has not worked — the people you would have screened out were mostly screened in during week one, before there was anything to be picky about.",
      },
      {
        heading: "Why the filter is invisible",
        text:
          "It does not present as a preference. It presents as chemistry — a feeling of recognition, of things being easy, of someone being different from the others. That sense of recognition is the filter reporting a match against a template, and the template is about familiarity rather than quality. This is why the same type keeps feeling like an exception.",
      },
      {
        heading: "The intervention that actually moves it",
        text:
          "Screen on something that is not a feeling, and screen before chemistry rather than after. Three criteria about behaviour — how he handles being wrong, what he does when you are ill, whether his friendships last — applied in the first month. It is unromantic and it works, because it introduces evidence into a process that currently runs entirely on state.",
      },
    ],
    notAlways:
      "Having a type is normal and is not itself a problem — plenty of people are consistently drawn to the same qualities and have perfectly good relationships. This only becomes worth addressing when the outcomes repeat as well as the type. Same type, different endings, is a preference. Same type, same ending, is a pattern.",
    whatToDo: [
      "Write down your last three significant attractions: what drew you in week one, how fast it moved, and how it ended. Three is enough for the pattern to appear.",
      "Write three screening criteria that have nothing to do with how someone makes you feel, and apply them before chemistry rather than after.",
      "Notice the feeling of recognition. \"This one is different\" arriving in week one is the filter reporting a match, not an observation about the person.",
    ],
    faq: [
      {
        q: "Does this mean I'm attracted to bad people?",
        a: "No. It means your filter weights traits that are attractive early and poorly correlated with how things go later — confidence, intensity, unpredictability. Plenty of people with those traits are perfectly decent. The filter simply is not measuring for that.",
      },
      {
        q: "Can what I'm attracted to change?",
        a: "The choices change in weeks once you screen differently. The attraction itself shifts over months of repeated exposure. You do not have to wait for the feeling to change before you change the behaviour.",
      },
    ],
    quiz: "/why-do-i-pick-bad-guys",
    quizPitch:
      "The assessment scores ten separate dimensions and tells you which two are actually driving your results, because working on all ten at once is how people give up.",
    related: ["i-get-bored-when-someone-is-nice-to-me", "i-push-people-away", "i-panic-when-he-doesnt-text-back"],
  },

  // ── FRIENDSHIP ────────────────────────────────────────────────────────
  {
    slug: "my-friend-only-calls-when-she-needs-something",
    phrase: "My friend only calls when she needs something",
    seoTitle: "My Friend Only Contacts Me When She Needs Something",
    description:
      "Contact that tracks what you can provide rather than what is happening in your life is a specific pattern. Here is how to confirm it.",
    answer:
      "A friendship where contact correlates with your usefulness rather than with your life is transactional, and it is usually visible in the message history rather than in your memory. The test costs nothing: stop initiating for two weeks and note who gets in touch and what they open with. Memory is generous about this; the log is not.",
    body: [
      {
        heading: "Why it takes years to notice",
        text:
          "Each individual request is reasonable. Nobody does anything egregious, there is no incident, and the friendship has history that makes the arithmetic feel unkind. Friendships also have no review points — no anniversaries, no check-ins, nothing that ever requires either person to look at the arrangement — so the imbalance accrues in a category with no audit function.",
      },
      {
        heading: "The test that settles it",
        text:
          "Two weeks of not initiating, with no announcement and no explanation. You are not punishing anyone; you are gathering information you do not currently have. Note who surfaces, and whether they open with a request or a question about you. Most people find the result is a mix of one pleasant surprise and one confirmation, and both are worth having.",
      },
      {
        heading: "The distinction that decides what to do",
        text:
          "Someone using you behaves differently with other people — you get the version that takes. Someone who simply needs a lot behaves the same way with everyone and is going through something with an end to it. Two questions separate them: do they know what is currently going on in your life, and can you name what it would look like for this period to be over? Two noes point at the first.",
      },
    ],
    notAlways:
      "People in genuine crisis contact you when they need something because that is what a crisis is, and supporting someone through one is a good thing to do. New parents, people caring for someone ill, people in the middle of a breakdown — all produce this pattern temporarily. The question is whether it has an end and whether they have ever asked about you.",
    whatToDo: [
      "Read back the last ten messages they initiated and note what each was about. Ten minutes, and it usually settles a question you have carried for months.",
      "Stop initiating for two weeks. Say nothing about it. Note who reaches out with something that is not a request.",
      "Say no to one low-stakes ask, with no reason given. The reaction is the entire dataset.",
    ],
    faq: [
      {
        q: "Should I confront them?",
        a: "Usually not. Conversations that open with a diagnosis put people on the defensive and rarely change behaviour, particularly when the behaviour was never deliberate. Changing your own inputs works better and costs less.",
      },
      {
        q: "What if they're genuinely struggling?",
        a: "Then help — and the cost to you is still real. Those are separate questions. The useful one is whether you can describe what it would look like for this period to be over. If not, it is an arrangement rather than a crisis.",
      },
    ],
    quiz: "/are-your-friends-using-you",
    quizPitch:
      "The assessment scores twelve dimensions with nine questions each, so it can tell you whether the issue is the volume of asking or the absence of reciprocity — which need opposite responses.",
    related: ["im-always-the-one-texting-first", "i-feel-drained-after-seeing-my-friend", "my-friend-gets-weird-when-good-things-happen"],
  },

  {
    slug: "im-always-the-one-texting-first",
    phrase: "I'm always the one texting first",
    seoTitle: "Always The One Who Texts First? What It Actually Means",
    description:
      "Doing all the initiating is real information about a friendship — but not always the information people assume.",
    answer:
      "Being the one who always initiates means the friendship is being maintained by one person, which is worth knowing but is not automatically a verdict on how much they value you. Some people genuinely never initiate with anyone and are delighted every time you do. The distinguishing question is not who texts first — it is what happens when you stop.",
    body: [
      {
        heading: "Why the imbalance persists",
        text:
          "The person doing the initiating keeps the friendship from visibly failing, which removes the only signal that would prompt the other person to step up. You are, in effect, funding the evidence that nothing is wrong. Nothing about this requires anyone to be thoughtless — the system simply has no feedback in it.",
      },
      {
        heading: "The two kinds of non-initiator",
        text:
          "One is delighted to hear from you, responsive, warm, present when you arrive — they are just not someone who starts things, with anyone, ever. The other is lukewarm on arrival and the friendship only exists because you keep it alive. Those feel identical from the initiating side and are completely different, and only the stopping test separates them.",
      },
      {
        heading: "What the test actually tells you",
        text:
          "Stop for a month and one of three things happens. They get in touch — you were wrong about the friendship. They do not, but they are thrilled when you eventually do — they are a non-initiator and the friendship is real. Nothing happens and nothing ever does — you have your answer, and it cost you a month rather than another five years.",
      },
    ],
    notAlways:
      "Plenty of good people never initiate anything. ADHD, depression, chronic overwhelm and simple temperament all produce it, and none of them mean the friendship is one-sided in any way that matters. A person can value you enormously and still never be the one who texts first.",
    whatToDo: [
      "Stop initiating with one specific person for a month. Not a punishment, not announced — an experiment with a real result.",
      "When you do next make contact, notice the first thirty seconds of their response. Warmth on arrival is the thing to watch, not who made the arrival happen.",
      "Sort your circle into 'keep as is', 'keep at a different frequency', and 'let fade'. Most names belong in the middle column, which is the useful finding.",
    ],
    faq: [
      {
        q: "Isn't this petty scorekeeping?",
        a: "Counting every message would be. Noticing that you have maintained a friendship single-handedly for three years is not — it is noticing where your time goes, which you are entitled to do.",
      },
      {
        q: "What if they're just busy?",
        a: "Busy is real and it is also the most available explanation, which is why it survives so long. Busy people who value you typically surface eventually, unprompted. If a year passes with no unprompted contact, busy is not the variable.",
      },
    ],
    quiz: "/are-my-friends-bad-for-me",
    quizPitch:
      "One-sided effort is scored as its own dimension, separately from whether the friendship is actually harmful — which are different findings with different answers.",
    related: ["my-friend-only-calls-when-she-needs-something", "i-feel-drained-after-seeing-my-friend", "my-friend-makes-jokes-at-my-expense"],
  },

  {
    slug: "i-feel-drained-after-seeing-my-friend",
    phrase: "I feel drained after seeing my friend",
    seoTitle: "Why You Feel Exhausted After Seeing A Friend",
    description:
      "Consistently leaving a friendship with less than you arrived with is measurable — and the measurement is more reliable than the memory.",
    answer:
      "Feeling depleted after seeing someone is not about how much they are going through; it is about whether the exchange runs in both directions. A friend having a terrible year is not draining. A friend who processes at you, week after week, without ever asking about your life, is — and the difference is participation, not volume.",
    body: [
      {
        heading: "Why you can predict it and still go",
        text:
          "The clearest marker is that you already know, before you leave the house, that you will be tired afterwards. That prediction is accurate and you go anyway, usually out of history or obligation. Noticing that you are predicting it is more diagnostic than anything that happens during the evening.",
      },
      {
        heading: "Measuring it instead of remembering it",
        text:
          "Memory smooths this out and smooths it in their favour, because the good moments are vivid and the flatness afterwards is not. Score the next five interactions out of ten for how you felt an hour later, written down the same evening. Patterns appear inside a fortnight and they are frequently not where you expected.",
      },
      {
        heading: "The fix is usually format, not ending",
        text:
          "Almost nobody in this situation should end the friendship, and almost everybody should change its shape. Shorter, less often, different setting, a stated time limit at the start rather than at the end. 'I've got about an hour' said on arrival reads as logistics; said at minute fifty it reads as rejection. Same limit, completely different reception.",
      },
    ],
    notAlways:
      "Introversion makes almost all socialising tiring, and that is not about any particular person. Depression flattens everything. And a friend in genuine crisis is temporarily expensive in a way that is entirely reasonable. The signal to look for is specificity — drained after this person, fine after others — and duration.",
    whatToDo: [
      "Rate the next five interactions out of ten an hour afterwards, written down the same evening. Do not rely on memory for this.",
      "Cap one recurring thing at the start: \"I've got about an hour.\" Stated up front it is logistics.",
      "Next time they process at you, say one true sentence about your own week first. What happens to it in the following minute tells you what kind of arrangement this is.",
    ],
    faq: [
      {
        q: "Am I a bad friend for feeling this?",
        a: "No. Noticing a cost is not a moral failure, and the alternative — continuing until you resent them and disappear without explanation — is considerably worse for both of you.",
      },
      {
        q: "How do I reduce contact without hurting them?",
        a: "Gradually and without an announcement. A 20% reduction held for a month resets the baseline with far less fallout than one conversation, and it is much easier to sustain.",
      },
    ],
    quiz: "/are-my-friends-bad-for-me",
    quizPitch:
      "Emotional drain is scored separately from the ten other dimensions, so the report can tell you whether it is the cause or a symptom of something else in the circle.",
    related: ["my-friend-only-calls-when-she-needs-something", "im-always-the-one-texting-first", "my-friend-gets-weird-when-good-things-happen"],
  },

  {
    slug: "my-friend-gets-weird-when-good-things-happen",
    phrase: "My friend gets weird when good things happen to me",
    seoTitle: "When Friends Can't Be Happy For You — Reading It Right",
    description:
      "Good news that reliably lands badly is a recognisable pattern, and there is one test that resolves it in three seconds.",
    answer:
      "Competitive undertow in friendship is almost always indirect — a joke, a qualification, a change of subject — because open competition would breach the friendship's terms. That deniability is the mechanism, not a side effect, and it is why you end up doubting your read rather than theirs. The test is the first three seconds of the reaction: the first response is honest and everything after it is management.",
    body: [
      {
        heading: "Why it is so hard to name",
        text:
          "There is no incident to point at. A joke, a hesitation, an immediately redirected conversation — each one is individually deniable and collectively unmistakable. Raising it makes you sound like you are demanding applause, which is exactly why it almost never gets raised and can run for years.",
      },
      {
        heading: "The clearest sign is in you, not them",
        text:
          "If you have started pre-editing what you share with this person — downplaying, delaying, mentioning it to others first — you have already adapted to the response rather than addressed it. That adaptation is more reliable evidence than any individual reaction, because you made it unconsciously and for a reason.",
      },
      {
        heading: "What is usually underneath",
        text:
          "Rarely malice. Usually their own situation in the same domain — work, money, relationships, appearance — which is why it tends to be specific rather than general. Someone struggling in one area often cannot meet good news there and can meet it everywhere else. Noticing which domain it clusters in tells you a great deal, and it sometimes changes how you feel about it.",
      },
    ],
    notAlways:
      "Some people are simply undemonstrative and their flat response to your news is their flat response to everything. Others are having a genuinely terrible time and have nothing spare. Check whether the muted reaction is specific to your good news or is just how they are — it is a meaningful difference and easy to confirm.",
    whatToDo: [
      "Tell one genuinely good piece of news, unhedged and without pre-apologising, and watch the first three seconds. The first reaction is the honest one.",
      "Notice whether you are pre-editing. If you are, that adaptation is your answer and it was made before you consciously decided anything.",
      "Do not join in minimising your own news. \"I'm actually really pleased about it\" accuses no one and declines the invitation.",
    ],
    faq: [
      {
        q: "Should I stop telling them things?",
        a: "That is what usually happens by default, and it quietly ends the friendship without anyone deciding to. Worth choosing deliberately instead: either accept a narrower friendship that does not include this, or test it once directly.",
      },
      {
        q: "Is this jealousy or am I being self-centred?",
        a: "Reasonable question, and the pre-editing test answers it without needing to know their motives. If you have changed your behaviour to manage their reaction, something real prompted that — whatever it is called.",
      },
    ],
    quiz: "/are-my-friends-bad-for-me",
    quizPitch:
      "Jealousy and undermining is scored as its own dimension, alongside public-versus-private loyalty — the two usually travel together and the report shows which is stronger.",
    related: ["i-feel-drained-after-seeing-my-friend", "my-friend-makes-jokes-at-my-expense", "my-friend-only-calls-when-she-needs-something"],
  },

  {
    slug: "my-friend-makes-jokes-at-my-expense",
    phrase: "My friend makes jokes at my expense",
    seoTitle: "Jokes At Your Expense: Banter Or Something Else",
    description:
      "There is a reliable line between banter and a joke that is doing work. Two questions find it.",
    answer:
      "Banter is reciprocal and about things neither of you is sensitive about. A joke that is doing work goes one direction, targets something you have actually been hurt by, and has a defence pre-installed — \"I'm only joking\" arrives if you react. Two questions separate them: does it ever run the other way, and does it stop when you say it stings?",
    body: [
      {
        heading: "The 'only joking' defence",
        text:
          "The phrase is doing something specific: it retroactively reclassifies the remark and makes your reaction the problem. That is why it is so effective and so hard to push back on. Note that it only ever appears after a reaction — nobody says it when the joke lands well, which tells you what it is for.",
      },
      {
        heading: "Direction and target",
        text:
          "Real banter is symmetrical and lands on things neither party is raw about. The other kind is one-directional and lands precisely on the thing you are sensitive about — which requires knowing what that is, which requires the friendship. That is what makes it sting more than a stranger's insult ever could.",
      },
      {
        heading: "The group dimension",
        text:
          "This frequently runs in front of an audience, and the audience is the point: it establishes a position in the group at your expense, and it is much harder to object to publicly than privately. If the jokes only happen with others present and never one-to-one, that pattern is the finding.",
      },
    ],
    notAlways:
      "Some friendship cultures run almost entirely on mutual mockery and both people love it. That is genuine and it is not what this describes. The distinguishing features are symmetry and responsiveness — if you can dish it out equally and either of you can call time when it lands wrong, it is banter.",
    whatToDo: [
      "Say it once, plainly, without heat: \"That one actually lands badly for me.\" What happens next is the whole test.",
      "Note whether it happens one-to-one or only with an audience. If only in groups, the audience is the function.",
      "Prioritise one-to-one contact with the same people for a month. Most people find the individual friendship is considerably better than the group version.",
    ],
    faq: [
      {
        q: "Am I being too sensitive?",
        a: "The test is not your sensitivity, it is their response. Someone who did not mean it adjusts when told. Someone who did will tell you that you are too sensitive — which answers the question you were asking.",
      },
      {
        q: "What if the whole group does it?",
        a: "Then it is a group norm rather than one person's habit, and it needs a different response. Groups have properties no individual member has, and a circle can make you smaller than any one person in it would.",
      },
    ],
    quiz: "/toxic-friend-test",
    quizPitch:
      "Relational aggression — harm routed through other people — is scored separately, because it is the mechanism that is hardest to name and easiest to dismiss.",
    related: ["my-friend-gets-weird-when-good-things-happen", "i-feel-drained-after-seeing-my-friend", "im-always-the-one-texting-first"],
  },

  {
    slug: "i-overthink-every-text",
    phrase: "I overthink every text I send",
    seoTitle: "Overthinking Every Text — Where It Comes From",
    description:
      "Drafting, deleting and re-reading messages before sending is a recognisable pattern with a specific cause and a workable fix.",
    answer:
      "Rewriting messages before sending is usually not a communication problem — it is an attempt to control someone else's reaction in advance. The underlying belief is that the right wording will prevent a bad response, which is only worth believing if bad responses have been frequent and unpredictable. The fix is not better drafting; it is testing whether the wording ever actually mattered.",
    body: [
      {
        heading: "What the drafting is for",
        text:
          "Each rewrite is an attempt to pre-empt a reaction. That makes sense as a strategy only where reactions have been volatile — with a consistent person, wording barely moves the outcome. So the habit is often carrying information about a past relationship or a childhood, applied to a present one that does not require it.",
      },
      {
        heading: "Why it gets worse rather than better",
        text:
          "Every time a carefully drafted message lands well, the drafting gets credit. It functions as a superstition: the care feels causal, so the care increases. Meanwhile the messages take longer, the anxiety before sending grows, and the evidence that would disconfirm it is never gathered.",
      },
      {
        heading: "The experiment",
        text:
          "Send five messages as first drafts, to people who are safe. No rewriting, no re-reading, send. Note what happens. Almost nobody finds the outcomes differ, and that is the only evidence that actually shifts the habit — being told it does not matter does nothing.",
      },
    ],
    notAlways:
      "Some contexts genuinely do require careful wording — work, conflict, anything with consequences — and being thoughtful there is a skill rather than a symptom. The pattern worth addressing is when it applies to ordinary messages to people who have never reacted badly.",
    whatToDo: [
      "Send five low-stakes messages as first drafts. No editing. Note the outcomes. This is the only thing that changes the belief.",
      "Notice who you draft for. If it is one specific person, the habit is about them rather than about you.",
      "Set a one-rewrite limit on ordinary messages. Not zero — one. Achievable beats ideal.",
    ],
    faq: [
      {
        q: "Is this anxiety?",
        a: "It is a recognisable feature of anxious attachment and also appears with general anxiety. The mechanism matters more than the label: you are trying to control a response in advance, and the fix is evidence rather than reassurance.",
      },
      {
        q: "What if I do send something wrong?",
        a: "You will, occasionally, and it will be far less consequential than the drafting assumes. That is the finding the experiment produces, and it is the one that actually helps.",
      },
    ],
    quiz: "/attachment-style-quiz",
    quizPitch:
      "This behaviour sits on the anxiety axis, which the assessment scores separately across five domains — including work, where it often shows up more clearly than at home.",
    related: ["i-panic-when-he-doesnt-text-back", "i-push-people-away", "i-feel-crazy-around-him"],
  },

  // ── PROVEN-DEMAND PAGES ───────────────────────────────────────────────
  // Added from Search Console query data rather than guesswork: each of
  // these is a phrase the site already receives impressions for, in the
  // "attract" cluster where it averages position 43 against attachment's
  // 87. Winnable ground, and under-exploited at 10% of impressions.
  {
    slug: "why-do-i-attract-the-wrong-guys",
    phrase: "Why do I attract the wrong guys?",
    seoTitle: "Why Do I Attract The Wrong Guys? The Actual Mechanism",
    description:
      "It is not luck and it is not your worth. Attracting the same kind of man repeatedly runs on a filter applied in the first three conversations.",
    answer:
      "Attracting the wrong men repeatedly is a filtering problem, not a luck problem, and the filter runs in the first three interactions — long before you know anything real about someone. What it screens for is familiarity rather than quality, which is why the wrong person reliably feels like recognition and the right one feels like nothing. Identifying what your filter selects for is most of the work.",
    body: [
      {
        heading: "Why the wrong ones feel right",
        text:
          "The sense of instant recognition — that this one is different, that it is easy, that there is something there — is your nervous system reporting a match against a template. Templates are built from what was familiar early, and familiarity carries no quality judgement whatsoever. So the feeling is real, it is just not evidence about the person.",
      },
      {
        heading: "Two failures, not one",
        text:
          "Selection decides who gets through the door; retention decides how long they stay after you know better. They fail for different reasons and need different fixes. Deciding to 'be pickier' only addresses the first — and by the time you are being picky, the filter already let them in during week one, when there was nothing to be picky about.",
      },
      {
        heading: "What men who take advantage actually do",
        text:
          "Very little that is strategic. They make a small request early — a moved boundary, a cancelled plan, a late reply with no explanation — and read the response. Someone who enforces is expensive and gets dropped in a fortnight. Someone who accommodates is cheap and gets kept. Nothing in that requires you to be naive; it only requires your second no to be softer than your first.",
      },
    ],
    notAlways:
      "Sometimes it genuinely is a run of bad luck, particularly if the sample is small. Three relationships is a pattern; two is a coincidence. And having a type is normal — it only becomes worth addressing when the endings repeat as reliably as the type does.",
    whatToDo: [
      "Write down your last three significant attractions: what drew you in week one, how fast it moved, and how it ended. The pace usually predicts the ending better than the person does.",
      "Write three screening criteria that have nothing to do with how someone makes you feel — how he handles being wrong, what he does when you are ill, whether his friendships last. Apply them before chemistry, not after.",
      "When you feel instant certainty about someone, note the date and decide nothing for three weeks. Certainty in week one is a statement about you, not about him.",
    ],
    faq: [
      {
        q: "Is this saying it's my fault?",
        a: "No. What someone chooses to do is entirely their responsibility. Your filter is simply the part of the system you can change, which is a statement about leverage rather than blame.",
      },
      {
        q: "How long does it take to change?",
        a: "The choices change within weeks once you screen differently. The feeling — that steady people are boring — takes two to three months of repeated exposure. Most people quit in week two, which is exactly when the discomfort peaks.",
      },
    ],
    quiz: "/why-do-i-pick-bad-guys",
    quizPitch:
      "The assessment scores ten dimensions separately and names the two actually driving your results — because working on all ten at once is how people give up.",
    related: ["i-keep-dating-the-same-type", "i-get-bored-when-someone-is-nice-to-me", "what-kind-of-person-am-i-attracting"],
  },

  {
    slug: "what-kind-of-person-am-i-attracting",
    phrase: "What kind of person am I attracting?",
    seoTitle: "What Kind Of Person Am I Attracting? How To Tell",
    description:
      "The people who approach you are responding to signals you send in the first few minutes. Here is how to read which ones you are sending.",
    answer:
      "The kind of person you attract is set largely by three or four signals readable in the first few interactions — availability, distance, volatility and steadiness — long before anyone knows you. Those signals are not flaws: every one of them is attractive to good people too. The problem is that they are equally legible to someone looking for an easy arrangement, and legible far earlier than character is.",
    body: [
      {
        heading: "What people actually read",
        text:
          "Response speed, agreement rate, how quickly you rearrange things, how much emotional weather you show, and how reliable you appear in small commitments. That is most of it. None of it requires anyone to be perceptive — these signals are loud, and they are visible in week one.",
      },
      {
        heading: "Why the same signal attracts opposite people",
        text:
          "Warmth and availability read as relief to someone decent and as an opportunity to someone looking for low cost. The signal is identical; only the reader differs. This is why 'just be less nice' fails as advice — it loses you the first group faster than the second, because decent people are the ones who respond to warmth and stop when it disappears.",
      },
      {
        heading: "The thing that actually filters",
        text:
          "Friction a good match does not notice and a bad one will not tolerate. One evening a week that does not move for anyone new. A two-week delay before anything hard to undo. One small early disagreement about something genuinely unimportant. Each costs a reasonable person nothing and costs someone counting on accommodation quite a lot.",
      },
    ],
    notAlways:
      "Plenty of people attract exactly the right people and simply have not met many of them yet. Volume and composition are different problems: if your issue is that nobody approaches you at all, nothing on this page applies — that is a reach problem, not a filter problem.",
    whatToDo: [
      "Look at the last three people who pursued you: how fast each moved in the first fortnight, what they wanted early, and how it ended. Three is enough for a pattern.",
      "Add one fixed commitment a week that does not move for anyone new. Invisible to someone reasonable, immediately irritating to someone who needs you fully available.",
      "Disagree once, early, about something that does not matter — and watch the next thirty seconds rather than whether they agree.",
    ],
    faq: [
      {
        q: "Should I change what I signal?",
        a: "Mostly not. Every signal here is attractive to people worth attracting, and muting it costs you those people first. Add friction rather than subtracting warmth.",
      },
      {
        q: "Why do I attract people I would never choose?",
        a: "Because attraction to you and selection by you run on different timescales. They are reading signals in minutes; you are assessing character over months. The gap is where the mismatch lives.",
      },
    ],
    quiz: "/who-is-attracted-to-me",
    quizPitch:
      "Seven signals scored separately, so you can see which one is loudest — and the ratio between availability and edge, which does more than any single number.",
    related: ["why-do-i-attract-the-wrong-guys", "i-keep-dating-the-same-type", "i-push-people-away"],
  },

  {
    slug: "am-i-sabotaging-my-relationship",
    phrase: "Am I sabotaging my relationship?",
    seoTitle: "Am I Sabotaging My Relationship? How To Tell The Difference",
    description:
      "There is a real difference between sabotaging something good and correctly noticing something wrong. Timing tells you which.",
    answer:
      "Self-sabotage and accurate judgement feel identical from inside, and the thing that separates them is timing. Doubt that arrives reliably after closeness — a good weekend, a plan made, something said out loud — is sabotage. Doubt that has been present since the beginning, and is about specific behaviour rather than a general feeling, is information.",
    body: [
      {
        heading: "Why the reasons always sound good",
        text:
          "The withdrawal comes first and the reasons are generated afterwards to explain a state you are already in. That is why they feel so convincing and why they are suddenly so easy to list. Acting on reasons produced this way is how people end relationships they wanted.",
      },
      {
        heading: "The pattern has a schedule",
        text:
          "Look at the 48 hours before the last three times you pulled back. Most people find something good sitting there — not a problem. Closeness raises exposure, exposure produces the need for distance, and the distance never presents itself as a response to anything.",
      },
      {
        heading: "What it is actually protecting you from",
        text:
          "Usually an outcome that already happened, to a younger version of you, in a situation you could not control. The alarm is not irrational; it is out of date. This matters because you cannot argue an alarm out of existence, but you can decline to act on it for three days, which is all it usually takes.",
      },
    ],
    notAlways:
      "Sometimes the relationship is genuinely wrong, and 'self-sabotage' gets used as a reason to override your own judgement — which is its own trap. The distinguishing test is whether the doubt is about a specific repeated behaviour you could name to a friend, or a general feeling that arrived after things went well.",
    whatToDo: [
      "Track the 48 hours before your last three withdrawals. If closeness precedes them, you have your answer.",
      "When the urge arrives, change nothing for 72 hours. No conversation, no distance, no decision. It passes, and it takes the reasons with it.",
      "Write down the specific behaviour you would name to a friend. If you cannot fill the line, the doubt is about you rather than about them.",
    ],
    faq: [
      {
        q: "How do I stop doing it?",
        a: "Not by feeling differently — that comes last. Name the pattern out loud when it starts, and refuse to make any decision inside the first 72 hours. That single rule defuses most of it.",
      },
      {
        q: "What if I've already ended something good?",
        a: "Common, and worth being honest about rather than reframing. Whether to reach out is a separate question from whether the pattern was real; the pattern being real does not oblige you to undo anything.",
      },
    ],
    quiz: "/why-do-i-sabotage-relationships",
    quizPitch:
      "The assessment separates the trigger from the behaviour, which is the distinction that decides whether this is a pattern or an accurate read.",
    related: ["i-push-people-away", "i-get-bored-when-someone-is-nice-to-me", "i-keep-dating-the-same-type"],
  },
];
