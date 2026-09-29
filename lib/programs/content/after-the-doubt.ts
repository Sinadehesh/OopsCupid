import type { Week } from "../types";

/**
 * AFTER THE DOUBT
 * Suspicion, checking, and deciding what you will do.
 *
 * For the "is he cheating" quiz. The programme never tells anyone their
 * partner is or is not cheating: nobody can know that from a quiz, and
 * pretending to would be exactly the kind of cheap certainty this site is
 * trying to stop selling. What it can do is help her separate what she
 * has seen from what she fears, break the checking loop (which research
 * shows makes doubt worse, not better), ask directly, and decide what she
 * will do with the answer.
 *
 * It does not teach surveillance. Tracking, going through a phone and
 * testing traps are the checking loop, and in some places they are also
 * illegal. The partner is "your partner" or "they" in the exercises.
 */

export const AFTER_THE_DOUBT: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it",
    goal: "Separate what you have seen from what you fear, see the checking loop, and take an honest baseline.",
    sessions: [
      {
        day: 1,
        title: "What you have actually noticed",
        minutes: 14,
        technique: "Evidence log",
        intro:
          "Suspicion blurs everything together: things you saw, things you heard, things you imagined at 2am. Today you start separating them, calmly, on paper.",
        blocks: [
          {
            id: "log-read",
            kind: "read",
            title: "Write down what happened, not what it means",
            body: [
              "When you are suspicious, every detail gets filed as evidence. A late reply, a new password, a smile at their phone. After a few weeks it feels like a mountain, but when you look closely much of the mountain is the same two or three things, remembered many times.",
              "An evidence log is simple. Only what you directly saw or heard. Dates, plain facts, no interpretation. It is not a case against anyone. It is a way of getting your own head clear.",
              "Some of what you write may genuinely be worrying. Some may shrink on paper. Either way, you will know more than you do now.",
            ],
            why: "Separating observations from interpretations is a basic step in cognitive behavioural therapy. It matters here because people are poor at judging deception from behaviour in the moment: a large 2006 review by Charles Bond and Bella DePaulo found people detect lies at about 54% accuracy, barely better than chance.",
          },
          {
            id: "noticed",
            kind: "reflect",
            prompt: "List what you have actually seen or heard that worries you. Only facts, with rough dates. No interpretation yet.",
            placeholder: "Early March: started taking their phone into the bathroom.\nLate March: said they were at their brother's, brother later mentioned he hadn't seen them...",
            rows: 7,
          },
          {
            id: "changed-when",
            kind: "reflect",
            prompt: "Looking at your list, when did things seem to change? Was there a point where it began?",
          },
          {
            id: "log-check",
            kind: "check",
            question: "Which of these belongs in an evidence log?",
            options: [
              { text: "\"They're obviously hiding something.\"", because: "That is a conclusion. It may even be right, but it goes in a different column." },
              { text: "\"Changed their phone passcode in April and didn't mention it.\"", correct: true, because: "Yes. A specific, observed change with a date. You can think about what it means separately." },
              { text: "\"They seemed off with me on Tuesday.\"", because: "Close, but \"seemed off\" is a reading. What did they actually do or say?" },
            ],
          },
        ],
        takeaway: "Write what happened, not what it means. The meaning comes later, on a calmer day.",
      },
      {
        day: 2,
        title: "The checking spiral",
        minutes: 13,
        technique: "Pattern recognition",
        intro:
          "Checking feels like doing something about the doubt. Today you look honestly at what it actually does.",
        blocks: [
          {
            id: "checking-read",
            kind: "read",
            title: "Relief for ten minutes",
            body: [
              "You check their location, their followers, when they were last online, the bank statement. For a moment there is relief, or a new clue. Then the doubt comes back, often stronger, and you check again.",
              "Checking rarely settles anything. If you find nothing, the doubt says you did not look hard enough. If you find something ambiguous, the doubt has new material. Either way, the loop tightens.",
              "Naming your checking is not about shame. Almost everyone in this situation does it. It is about seeing the loop you are in.",
            ],
            why: "Research on checking in anxiety has repeatedly found that checking increases doubt rather than reducing it. In experiments by Marcel van den Hout, Merel Kindt and later Adam Radomsky, people who checked something repeatedly became less confident in their own memory of it, not more.",
          },
          {
            id: "my-checks",
            kind: "choose",
            prompt: "Which of these do you do?",
            options: [
              "Checking when they were last online",
              "Looking at who they follow or who likes their posts",
              "Checking their location",
              "Looking through their phone",
              "Going through bank or card statements",
              "Asking the same questions to catch them out",
              "Asking friends what they think, over and over",
              "Searching their name or a contact's name online",
            ],
            after: {
              few: "These are your checks. From now on, noticing the urge before you act on it counts as progress.",
              many: "That is a lot of your time and energy going into checking. It makes sense that you are exhausted. None of it is making you surer.",
            },
          },
          {
            id: "check-count",
            kind: "reflect",
            prompt: "Roughly how many times a day do you check something? How do you feel five minutes after a check?",
          },
        ],
        takeaway: "Checking buys ten minutes of relief and sells you tomorrow's doubt.",
      },
      {
        day: 3,
        title: "Suspicion in your body",
        minutes: 12,
        technique: "Interoception",
        intro:
          "Suspicion is not only thoughts. It lives in your stomach and chest and hands, and it often drives the checking before you have decided anything.",
        blocks: [
          {
            id: "body-read",
            kind: "read",
            title: "Your body on high alert",
            body: [
              "Suspecting a betrayal puts your body into threat mode. Racing heart, knot in the stomach, poor sleep, a need to do something right now. In that state the brain is built to scan for danger, which is why everything starts to look like evidence.",
              "You cannot think clearly in threat mode. Calming the body first is not avoiding the problem. It is how you get enough of your head back to deal with it.",
            ],
            why: "Researchers who study infidelity, including the psychologist Shirley Glass, observed that people who suspect or discover betrayal often show trauma-like symptoms: hypervigilance, intrusive thoughts and checking. Body-based calming skills, such as slow breathing with a long out-breath, are standard first steps for that kind of arousal.",
          },
          {
            id: "body-signals",
            kind: "choose",
            prompt: "Where do you feel it?",
            options: [
              "Knot in my stomach",
              "Racing heart",
              "Can't sleep, or wake at 3am",
              "Hands on the phone before I've decided",
              "Can't eat, or can't stop eating",
              "Tight chest",
              "Can't concentrate on anything else",
            ],
          },
          {
            id: "breath",
            kind: "timer",
            title: "Out of threat mode",
            seconds: 90,
            cues: [
              "Put the phone face down, out of reach.",
              "Breathe in through your nose for four.",
              "Out through your mouth for six. The long out-breath is what calms the body.",
              "Again. In for four, out for six.",
              "Notice your feet on the floor.",
              "Nothing needs checking in the next two minutes.",
            ],
          },
          {
            id: "calm-plan",
            kind: "script",
            prompt: "Your first move, next time it hits.",
            template: ["When I notice {signal},", "I'll {action}", "before I check anything."],
            fields: [
              { key: "signal", label: "Your earliest signal", placeholder: "my stomach dropping when their phone lights up" },
              { key: "action", label: "What you'll do first", placeholder: "put my phone in another room and do the breathing" },
            ],
          },
        ],
        takeaway: "Calm the body first. You think more clearly out of threat mode.",
      },
      {
        day: 4,
        title: "Facts, fears and stories",
        minutes: 15,
        technique: "CBT · separating",
        intro:
          "Every suspicion is a mix of three things: what happened, what you fear, and the story that joins them up. Today you pull them apart.",
        blocks: [
          {
            id: "sep-read",
            kind: "read",
            title: "Three columns",
            body: [
              "A fact: they came home an hour late and did not say why. A fear: they are seeing someone. A story: the complete film in your head, with a name, a place and a plan.",
              "The story feels most real because it is the most detailed. But detail is something your mind supplies, not something you observed. Pulling the three apart does not mean the fear is wrong. It means you can see what you actually know.",
            ],
            why: "Thought records from Aaron Beck's cognitive therapy separate the situation from the automatic thought and the evidence. In suspicion, doing this on paper is one of the few ways to stop your mind presenting a guess as a memory.",
          },
          {
            id: "sep-sort",
            kind: "sort",
            prompt: "Fact, fear or story? Tap each one, then tap where it goes.",
            buckets: ["Fact", "Fear", "Story"],
            items: [
              { text: "They got home at 11 instead of 10", answer: "Fact" },
              { text: "They're losing interest in me", answer: "Fear" },
              { text: "They were with someone from work, laughing about me", answer: "Story" },
              { text: "They deleted a message thread", answer: "Fact" },
              { text: "Something is going on", answer: "Fear" },
              { text: "They've been planning to leave since Christmas", answer: "Story" },
            ],
            after: "Only the facts are things you know. The fears are worth taking seriously as feelings. The stories are worth noticing as stories, however vivid.",
          },
          {
            id: "sep-record",
            kind: "thoughts",
            prompt: "Take your biggest worry and pull it apart.",
            example: {
              situation: "They were on their phone a lot last weekend and turned the screen away when I walked past.",
              thought: "They're messaging someone. It's happening again, like with my ex.",
              evidence: "For: they turned the screen away, they've been distant. Against: they told me on Friday a friend is going through a breakup. They left the phone on the table all evening. My ex did this, not them.",
              balanced: "Something might be going on, and I don't know what. Turning a screen away is worth asking about. It isn't proof of anything by itself.",
            },
          },
        ],
        takeaway: "Only the facts are things you know. Keep them separate from the story.",
      },
      {
        day: 5,
        title: "Where you stand now",
        minutes: 10,
        technique: "Baseline measure",
        intro:
          "Three quick measures to close the week. You will take them again in week 4.",
        blocks: [
          {
            id: "baseline-read",
            kind: "read",
            title: "Why measure",
            body: [
              "When you are consumed by doubt, it can feel as if nothing ever changes. Numbers you write now let you see, later, whether the grip has loosened, whatever the truth turns out to be.",
            ],
            why: "Structured therapies measure at the start and repeat the measure later, partly to see what is working and partly because seeing change written down helps people keep going.",
          },
          {
            id: "check-baseline",
            kind: "scale",
            better: "lower",
            prompt: "How strong is the urge to check (their phone, location, social media, statements)?",
            low: "none",
            high: "overwhelming",
          },
          {
            id: "doubt-baseline",
            kind: "scale",
            better: "lower",
            prompt: "How much of your day does the suspicion take over?",
            low: "none of it",
            high: "all of it",
          },
          {
            id: "clarity-baseline",
            kind: "scale",
            prompt: "How clear are you about what you will do next?",
            low: "no idea",
            high: "completely clear",
          },
          {
            id: "week1-notice",
            kind: "reflect",
            prompt: "What did you notice this week about your suspicion, and about yourself, that you had not seen before?",
          },
        ],
        takeaway: "You have a starting point. Whatever happens next, you will be able to see what moved.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand it",
    goal: "Understand where the suspicion comes from, why checking never settles it, and what you really need to know.",
    sessions: [
      {
        day: 1,
        title: "Where the suspicion comes from",
        minutes: 14,
        technique: "Formulation",
        intro:
          "Suspicion has two possible sources, and often both are at work: something real in this relationship, and something old in you. Today you look at both, fairly.",
        blocks: [
          {
            id: "source-read",
            kind: "read",
            title: "Now, and before",
            body: [
              "Sometimes suspicion is a response to real changes: more secrecy, less closeness, stories that do not add up. That deserves to be taken seriously.",
              "Sometimes it is amplified by the past: a parent who cheated, an ex who lied, a long history of being let down. The old hurt makes the alarm louder and faster, so ordinary things can set it off.",
              "Most people have some of both. Seeing which is which is not about deciding you are being silly. It is about knowing how much of the volume is this relationship, and how much is history.",
            ],
            why: "A formulation, the map a therapist builds with a client, looks at both present triggers and older experiences that shape how a situation is read. Attachment research also shows that people who have been betrayed before tend to be more vigilant for signs of it again.",
          },
          {
            id: "past-betrayal",
            kind: "choose",
            prompt: "Has any of this happened to you before?",
            options: [
              "A previous partner cheated",
              "A parent cheated, or I saw it happen in my family",
              "I was lied to a lot growing up",
              "A close friend betrayed me",
              "This partner has cheated before",
              "None of these",
            ],
          },
          {
            id: "source-split",
            kind: "reflect",
            prompt: "Honestly: how much of your suspicion comes from what this partner has actually done, and how much might be amplified by what happened before?",
            hint: "There is no right answer. Both can be real at once.",
          },
        ],
        takeaway: "Some of the volume is now. Some may be history. Both deserve to be heard, separately.",
      },
      {
        day: 2,
        title: "Why checking never settles it",
        minutes: 13,
        technique: "Reassurance cycle",
        intro:
          "If checking worked, you would have checked once and been done. Today you look at why it never settles the question.",
        blocks: [
          {
            id: "cycle-read",
            kind: "read",
            title: "The loop",
            body: [
              "Doubt rises. You check. For a short while you feel better, which teaches your brain that checking is what helps. Then the doubt returns, and the brain reaches for the thing that helped last time.",
              "Each check also chips at your confidence in what you already know. You looked yesterday and found nothing, but did you look properly? So you look again.",
              "The only thing that breaks this loop is not checking, and letting the doubt rise and fall on its own. That is hard, and it is next week's work.",
            ],
            why: "This is the reassurance cycle described in cognitive models of anxiety and obsessive doubt. Adam Radomsky and colleagues found in 2006 that repeated checking \"really does cause memory distrust\", to quote the title of their study.",
          },
          {
            id: "cycle-check",
            kind: "check",
            question: "You checked their phone last night and found nothing. This morning the doubt is back. What is the most accurate reading?",
            options: [
              { text: "I must have missed something.", because: "That is exactly what the loop says every time. It is the doubt talking, not new information." },
              { text: "Checking relieves doubt briefly and then feeds it. The doubt coming back is the loop, not a clue.", correct: true, because: "Yes. The return of the doubt tells you about the loop. It does not tell you about them." },
              { text: "I should check somewhere else too.", because: "More checking is the loop getting wider. It will not bring the certainty you are looking for." },
            ],
          },
          {
            id: "last-check",
            kind: "reflect",
            prompt: "Describe your last check: what set it off, what you found, and how long the relief lasted.",
          },
        ],
        takeaway: "The doubt coming back is the loop, not a clue.",
      },
      {
        day: 3,
        title: "When your gut is right",
        minutes: 14,
        technique: "Evidence weighting",
        intro:
          "Sometimes the gut is right. Sometimes it is fear. Today you learn which kinds of signs deserve more weight, and which deserve less.",
        blocks: [
          {
            id: "gut-read",
            kind: "read",
            title: "Patterns over moments",
            body: [
              "Single moments are weak evidence. A nervous face, a pause before answering, a smile at a message: people are very poor at reading guilt from demeanour, and anxious people are especially likely to see it where it is not.",
              "Stronger signs are changes in pattern that last and that you have seen directly. New, unexplained secrecy. Time that cannot be accounted for, more than once. Stories that do not match what other people say. A sustained drop in closeness, together with defensiveness when asked ordinary questions.",
              "None of these are proof. But a cluster of them, lasting months, deserves to be taken seriously, and a direct conversation.",
            ],
            why: "Reviews of lie-detection research, including Bond and DePaulo's 2006 analysis of over two hundred studies, found that people judge deception from behaviour barely better than chance. Verifiable inconsistencies over time are much more informative than how someone looks when answering.",
          },
          {
            id: "weight-sort",
            kind: "sort",
            prompt: "Stronger sign or weaker sign? Tap each one, then tap where it goes.",
            buckets: ["Stronger sign", "Weaker sign"],
            items: [
              { text: "They looked nervous when I asked about their day", answer: "Weaker sign" },
              { text: "Their account of where they were didn't match what their friend said, twice", answer: "Stronger sign" },
              { text: "They smiled at a message", answer: "Weaker sign" },
              { text: "A new password, a new phone habit and new late nights, all since March", answer: "Stronger sign" },
              { text: "They paused before answering", answer: "Weaker sign" },
              { text: "Unexplained charges on a joint account, more than once", answer: "Stronger sign" },
            ],
            after: "Weaker signs are worth noticing but not building on. Stronger signs, especially together and over time, are worth a direct conversation.",
          },
          {
            id: "my-weights",
            kind: "reflect",
            prompt: "Go back to your evidence log from day 1. Which items are stronger signs, and which are weaker?",
          },
        ],
        takeaway: "Trust patterns you have seen over time more than moments you have read into.",
      },
      {
        day: 4,
        title: "Need to know versus want to know",
        minutes: 13,
        technique: "Clarifying",
        intro:
          "When you are suspicious, you want to know everything: who, when, where, how often. Today you work out what you actually need to know to make your decision.",
        blocks: [
          {
            id: "need-read",
            kind: "read",
            title: "The questions that help you decide",
            body: [
              "The questions that burn at 2am are often about detail: exactly what was said, what they look like, where they went. Those answers rarely change what you will do, and they often become images you cannot get rid of.",
              "The questions that help are fewer. Is something going on? Is it still going on? Are you willing to be honest with me and to work on this? Those are the answers your decision rests on.",
            ],
            why: "Clarifying what matters for a decision is a core step in motivational interviewing and decision support. Couples therapists who work with infidelity often caution against chasing every detail early on, because the detail can deepen the injury without helping anyone decide.",
          },
          {
            id: "need-sort",
            kind: "sort",
            prompt: "Need to know, or want to know? There is no wrong answer, it is about what matters for you.",
            buckets: ["Need to know", "Want to know"],
            items: [
              { text: "Is something going on?" },
              { text: "What do they look like?" },
              { text: "Is it still going on?" },
              { text: "Exactly what did they say to each other?" },
              { text: "Will you be honest with me from now on?" },
              { text: "Where did they go together?" },
              { text: "Do you want to be in this relationship?" },
            ],
          },
          {
            id: "my-need",
            kind: "reflect",
            prompt: "What are the one to three things you truly need to know to decide what to do?",
          },
        ],
        takeaway: "You need a few answers to decide. The rest can wait, or may never help.",
      },
      {
        day: 5,
        title: "The cost ledger",
        minutes: 12,
        technique: "Behavioural audit",
        intro:
          "Living in suspicion has a cost, whatever the truth is. Today you count it.",
        blocks: [
          {
            id: "ledger-read",
            kind: "read",
            title: "What not knowing is costing",
            body: [
              "Months of doubt cost sleep, concentration, friendships, work and the version of yourself you like. That cost is being paid right now, whether your partner is faithful or not.",
              "Counting it is not about blaming yourself. It is about seeing that staying in limbo is also a choice, with a price, and that it may be time to do something different.",
            ],
            why: "A cost audit is a standard behavioural therapy tool. Ongoing, spread-out costs are easy to underweight compared with the immediate fear of a hard conversation, which is part of why people stay stuck in limbo.",
          },
          {
            id: "ledger",
            kind: "script",
            prompt: "Your ledger.",
            template: [
              "The suspicion has cost me {sleep}.",
              "It has cost me {life}.",
              "It has made me into someone who {self}.",
              "What I want back most is {back}.",
            ],
            fields: [
              { key: "sleep", label: "Sleep, health, focus", placeholder: "three months of waking at 3am" },
              { key: "life", label: "Life, work, friends", placeholder: "my concentration at work and seeing my friends" },
              { key: "self", label: "Who it has made you", placeholder: "checks bank statements at midnight" },
              { key: "back", label: "What you want back", placeholder: "feeling like myself" },
            ],
          },
          {
            id: "check-w2",
            kind: "scale",
            better: "lower",
            prompt: "How strong is the urge to check (their phone, location, social media, statements)?",
            low: "none",
            high: "overwhelming",
            compareTo: { week: 1, day: 5, id: "check-baseline", label: "At the end of week 1" },
          },
          {
            id: "week2-notice",
            kind: "reflect",
            prompt: "What do you understand about your suspicion now that you did not two weeks ago?",
          },
        ],
        takeaway: "Limbo has a price too. You are allowed to stop paying it.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Change it",
    goal: "Ask directly, stop the checking, and decide in advance what you will do with the answer.",
    sessions: [
      {
        day: 1,
        title: "Asking directly",
        minutes: 15,
        technique: "DBT · DEAR MAN",
        intro:
          "Checking is a way of asking without asking. Today you script the real question, so it comes out clearly rather than as an accusation or a hint.",
        blocks: [
          {
            id: "ask-read",
            kind: "read",
            title: "Say what you have seen, and ask",
            body: [
              "An accusation (\"You're cheating, aren't you?\") tends to get a denial and a fight. A hint (\"You've been busy lately...\") is easy to brush off. What works better is describing what you have seen, saying how it has made you feel, and asking a clear question.",
              "Choose a calm moment, not the middle of an argument or late at night. You cannot control what they say. You can control how clearly you ask.",
              "If you are afraid of how your partner might react to being asked, do not do this alone. Talk to a specialist service first.",
            ],
            why: "DEAR MAN comes from Marsha Linehan's Dialectical Behaviour Therapy: Describe, Express, Assert, Reinforce, stay Mindful, Appear confident, Negotiate. It is designed for asking for something important while keeping your self-respect.",
          },
          {
            id: "ask-script",
            kind: "script",
            prompt: "Script your question.",
            template: [
              "Describe: {describe}",
              "Express: {express}",
              "Ask: {ask}",
              "Why it matters: {matters}",
            ],
            fields: [
              { key: "describe", label: "What you have seen, facts only", placeholder: "Since March you've changed your passcode and you've been late most Thursdays without saying why." },
              { key: "express", label: "How it has made you feel", placeholder: "I've been feeling anxious and shut out, and I don't like who I'm becoming." },
              { key: "ask", label: "Your clear question", placeholder: "Is there something going on with someone else? I'd rather know." },
              { key: "matters", label: "Why honesty matters", placeholder: "I can deal with the truth. What I can't keep doing is guessing." },
            ],
          },
          {
            id: "ask-check",
            kind: "check",
            question: "Which opening is most likely to get an honest conversation?",
            options: [
              { text: "\"I know you're lying to me.\"", because: "It invites a defence, and it claims a certainty you may not have." },
              { text: "\"A few things have changed since March, and I'm worried. Can I ask you straight whether something's going on?\"", correct: true, because: "Yes. Specific, honest about your feelings, and a clear question." },
              { text: "\"So, who's Sam?\" and watching their face.", because: "This is a test rather than a question, and faces are poor evidence." },
            ],
          },
        ],
        takeaway: "Ask the real question, clearly, once. It works better than a hundred checks.",
      },
      {
        day: 2,
        title: "Stopping the checking",
        minutes: 13,
        technique: "Response prevention",
        intro:
          "The fastest way out of the checking loop is to stop checking and let the doubt rise and fall on its own. Today you set that up.",
        blocks: [
          {
            id: "rp-read",
            kind: "read",
            title: "Let the wave pass",
            body: [
              "When you do not check, the urge rises, peaks, and falls, often within twenty to forty minutes. Each time you let it pass, the next wave is a little smaller.",
              "Make it easier on yourself. Delete the location app. Log out of the accounts you check. Put a rule in place: no checking after 9pm, or not for a whole day. If you slip, start again. Slipping is part of it.",
            ],
            why: "Exposure and response prevention, developed from the work of Victor Meyer in the 1960s and refined by Edna Foa and others, is the best-supported treatment for compulsive checking. The response prevention part, not doing the check, is what lets the anxiety fall on its own.",
          },
          {
            id: "rp-rules",
            kind: "script",
            prompt: "Your no-checking rules.",
            template: [
              "I will stop {stop}.",
              "To make it easier, I will {easier}.",
              "When the urge comes, I will {instead}.",
            ],
            fields: [
              { key: "stop", label: "The check you'll stop", placeholder: "checking their location and last seen" },
              { key: "easier", label: "What you'll change", placeholder: "delete the location app and mute their online status" },
              { key: "instead", label: "What you'll do instead", placeholder: "do the breathing, then text my sister" },
            ],
          },
          {
            id: "urge-timer",
            kind: "timer",
            title: "Riding the urge",
            seconds: 120,
            cues: [
              "Notice the urge to check. Where is it in your body?",
              "Rate it from 0 to 10.",
              "You don't have to act on it. Just watch it.",
              "Breathe out slowly. The urge is a feeling, not an instruction.",
              "Notice if it has shifted, even a little.",
              "Rate it again. It usually drops when nothing is done.",
            ],
          },
        ],
        takeaway: "An urge to check is a feeling, not an instruction. Let it pass.",
      },
      {
        day: 3,
        title: "Getting the answer you need",
        minutes: 13,
        technique: "Communication skill",
        intro:
          "After you ask, the conversation can go several ways. Today you prepare for each, so you are not ambushed by any of them.",
        blocks: [
          {
            id: "answers-read",
            kind: "read",
            title: "Three kinds of answer",
            body: [
              "They may tell you something is going on. They may deny it in a way that feels honest and address what you raised. Or they may deny it while turning it on you: calling you crazy, paranoid, controlling, and refusing to discuss the specifics.",
              "The third kind deserves attention. Anyone can be hurt by being suspected. But a partner with nothing to hide can usually engage with specific facts, even while upset. Refusing to talk about the facts at all, and making you the problem, is a pattern worth noticing.",
            ],
            why: "Researchers such as Jennifer Freyd have described DARVO (Deny, Attack, Reverse Victim and Offender) as a common response when people are confronted about wrongdoing. It does not prove guilt on its own, but it is a way conversations get derailed from the facts.",
          },
          {
            id: "answers-sort",
            kind: "sort",
            prompt: "Which of these responses engage with the facts, and which avoid them?",
            buckets: ["Engages", "Avoids"],
            items: [
              { text: "\"I changed the passcode because of work. Here, look, I'll tell you it.\"", answer: "Engages" },
              { text: "\"You're insane. You need help.\"", answer: "Avoids" },
              { text: "\"I'm hurt you think that, but I get why the Thursdays looked weird. I've been at my mum's.\"", answer: "Engages" },
              { text: "\"After everything I do for you, you accuse me of this?\"", answer: "Avoids" },
              { text: "\"Yes. I've been talking to someone. I'm sorry.\"", answer: "Engages" },
            ],
            after: "Engaging with the facts is not the same as being innocent, and avoiding them is not the same as being guilty. But it tells you whether an honest conversation is possible.",
          },
          {
            id: "if-avoid",
            kind: "script",
            prompt: "If they avoid the facts, what will you say?",
            template: ["I hear that you're {feeling}.", "I'm still asking about {facts}."],
            fields: [
              { key: "feeling", label: "What they're feeling", placeholder: "hurt and angry" },
              { key: "facts", label: "The specific facts", placeholder: "the Thursdays and the passcode" },
            ],
          },
        ],
        takeaway: "Watch whether they engage with the facts. It tells you whether honesty is possible.",
      },
      {
        day: 4,
        title: "What you will do with it",
        minutes: 14,
        technique: "Decision planning",
        intro:
          "People often ask the question without deciding what they will do with the answer. Today you plan it in advance, while you are calm.",
        blocks: [
          {
            id: "plan-read",
            kind: "read",
            title: "Decide your next step before you need it",
            body: [
              "If they tell you something is going on, you will be in shock. That is not the moment to work out where you will sleep or who you will call. Plan it now.",
              "If they deny it and you believe them, what would you need to rebuild trust? If they deny it and you do not believe them, what then? There are no right answers, only yours.",
              "If there is any chance of sexual contact outside the relationship, a free sexual health check is sensible, whatever you decide. It is looking after yourself, not an accusation.",
            ],
            why: "Planning responses to likely scenarios in advance is a standard part of decision support and of safety planning. Decisions made in shock tend to be ones people later regret, in either direction.",
          },
          {
            id: "plan-yes",
            kind: "script",
            prompt: "If they tell you something is going on.",
            template: ["That night, I will {night}.", "I will call {person}.", "I will not decide anything big until {until}."],
            fields: [
              { key: "night", label: "That night", placeholder: "stay at my sister's" },
              { key: "person", label: "Who you'll call", placeholder: "Priya" },
              { key: "until", label: "Give yourself time", placeholder: "at least a week has passed" },
            ],
          },
          {
            id: "plan-no",
            kind: "script",
            prompt: "If they deny it.",
            template: ["If I believe them, I'll need {need} to rebuild trust.", "If I don't believe them, I will {dont}."],
            fields: [
              { key: "need", label: "What would rebuild trust", placeholder: "more openness about where they are, for a while, offered not demanded" },
              { key: "dont", label: "If you don't believe them", placeholder: "suggest couples counselling, and give it three months" },
            ],
          },
        ],
        takeaway: "Decide what you will do before you ask. Shock is a bad time to plan.",
      },
      {
        day: 5,
        title: "The no-checking experiment",
        minutes: 12,
        technique: "Behavioural experiment",
        intro:
          "This week's last session is a direct test of the loop: a set period of no checking at all.",
        blocks: [
          {
            id: "exp-read",
            kind: "read",
            title: "Test the prediction",
            body: [
              "Your doubt predicts that if you stop checking, something terrible will slip past you, or the anxiety will become unbearable. Test it. Pick a period, a day or three days, and check nothing.",
              "Write down what you predict, then what happens. Most people find the anxiety peaks early and then eases, and that nothing they needed to know was missed.",
            ],
            why: "Behavioural experiments are a core technique in cognitive behavioural therapy. Testing the prediction that checking keeps you safe is one of the most direct ways to loosen its grip.",
          },
          {
            id: "no-check-exp",
            kind: "experiment",
            task: "Choose a period, from one to three days, and do no checking of any kind.",
            predictPrompt: "What do you predict will happen? How bad will the anxiety get, from 0 to 10?",
            resultPrompt: "What actually happened? How bad did it get, and when was it worst?",
            learnPrompt: "What does this tell you about checking?",
          },
          {
            id: "week3-notice",
            kind: "reflect",
            prompt: "Of everything you tried this week, what felt most different?",
          },
        ],
        takeaway: "You can live with not knowing for a day. That is where your strength comes back.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "Live it",
    goal: "Know what trust would take, hold on to your worth whatever the truth is, and choose your next step on purpose.",
    sessions: [
      {
        day: 1,
        title: "Trust, with evidence",
        minutes: 13,
        technique: "Values",
        intro:
          "Whatever the truth turns out to be, you will need to trust someone again, or trust this person again. Today is about what trust actually rests on.",
        blocks: [
          {
            id: "trust-read",
            kind: "read",
            title: "Trust is built in small moments",
            body: [
              "Trust is not a feeling you decide to have. It is built from many small moments in which someone does what they said, turns towards you when you need them, and is open when they could have hidden.",
              "After doubt, trust does not come back because someone says \"trust me\". It comes back, if it does, through a long run of those small moments. You are allowed to need that.",
            ],
            why: "Research by John Rempel, John Holmes and Mark Zanna in 1985 described trust as built from predictability, then dependability, then faith. John Gottman's later work emphasised the small everyday moments in which partners turn towards or away from each other.",
          },
          {
            id: "trust-needs",
            kind: "choose",
            prompt: "What would help you trust again, in this or any relationship?",
            options: [
              "Doing what they say they'll do, consistently",
              "Openness offered, not demanded",
              "Being able to ask questions without a fight",
              "Honesty about the past",
              "Time",
              "Couples counselling",
              "Seeing effort, not just hearing promises",
            ],
          },
          {
            id: "trust-script",
            kind: "script",
            prompt: "Put it into words.",
            template: ["I could trust again if I saw {saw}", "for {howlong}."],
            fields: [
              { key: "saw", label: "What you'd need to see", placeholder: "honesty without me having to dig for it" },
              { key: "howlong", label: "For how long", placeholder: "at least six months" },
            ],
          },
        ],
        takeaway: "Trust is rebuilt in small moments, over time. You are allowed to need that.",
      },
      {
        day: 2,
        title: "Your worth, whatever they did",
        minutes: 13,
        technique: "Self-esteem work",
        intro:
          "Suspicion, and especially betrayal, can make you feel not enough. Today is about separating what someone else did from what you are worth.",
        blocks: [
          {
            id: "worth-read",
            kind: "read",
            title: "Their choices are about them",
            body: [
              "If a partner cheats, the most common reaction is to search yourself for the reason. Not attractive enough, not interesting enough, too much, not enough.",
              "People cheat for many reasons, and most of them are about the person who cheats: their impulses, their unhappiness, their choices. Nothing you could have been would have guaranteed otherwise. Whatever the truth in your situation, your worth was never the thing on trial.",
            ],
            why: "Research on infidelity, including large surveys summarised by the psychologist Shirley Glass, found that many people who have affairs describe their own marriages as happy. Infidelity is often driven by opportunity and the unfaithful partner's own needs, not by a lack in the other person.",
          },
          {
            id: "worth-timer",
            kind: "timer",
            title: "The friend's voice",
            seconds: 90,
            cues: [
              "Sit comfortably and breathe out slowly.",
              "Picture a close friend going through exactly what you are going through.",
              "Notice what you feel towards them. Not blame. Something protective.",
              "Say to yourself what you would say to them.",
              "Stay with it for a few breaths, even if it feels strange.",
            ],
          },
          {
            id: "worth-reflect",
            kind: "reflect",
            prompt: "What would you say to that friend? Write it to yourself.",
          },
        ],
        takeaway: "What someone else chose is about them. Your worth was never on trial.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 12,
        technique: "Relapse prevention",
        intro:
          "The checking urge will come back, especially when you are tired, lonely or reminded of something. Today you plan for that.",
        blocks: [
          {
            id: "relapse-read",
            kind: "read",
            title: "Catch it early",
            body: [
              "A single check after weeks of none is a slip, not a failure. The goal is to notice early, before one check becomes a night of them.",
            ],
            why: "Alan Marlatt's relapse prevention model treats slips as predictable and plans for them in advance, so a lapse does not become a full return to the old pattern.",
          },
          {
            id: "warning-signs",
            kind: "choose",
            prompt: "Which would be your early warning signs?",
            options: [
              "I'm checking their last seen again",
              "I'm awake at 3am running scenarios",
              "I'm reading into small things",
              "I'm asking friends to decode things again",
              "I'm tired, lonely or low",
              "Something reminded me of the past",
              "I've reinstalled an app I deleted",
            ],
          },
          {
            id: "relapse-plan",
            kind: "script",
            prompt: "Your plan.",
            template: ["If I notice {sign},", "I will {action},", "and I'll remind myself: {remind}"],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "my thumb opening their profile" },
              { key: "action", label: "What you'll do", placeholder: "put the phone in another room and do the breathing" },
              { key: "remind", label: "What you'll remember", placeholder: "checking has never once made me surer" },
            ],
          },
        ],
        takeaway: "One check is a slip. Notice it, and start again.",
      },
      {
        day: 4,
        title: "Staying or going, on purpose",
        minutes: 15,
        technique: "Motivational interviewing",
        intro:
          "Four weeks ago you measured three things. Today you measure them again, and look honestly at the decision in front of you.",
        blocks: [
          {
            id: "decide-read",
            kind: "read",
            title: "Both choices are allowed",
            body: [
              "Some people stay after doubt or betrayal and rebuild something good. Some leave and are glad they did. Neither choice makes you weak or foolish. What matters is that it is a choice, made on purpose, rather than months more of limbo.",
              "Weighing both sides honestly, including the parts you do not like admitting, is what makes a decision feel like yours.",
            ],
            why: "Motivational interviewing, developed by William Miller and Stephen Rollnick, uses a decisional balance, the honest pros and cons of each option, to help people move from being stuck to making a choice they own.",
          },
          {
            id: "check-final",
            kind: "scale",
            better: "lower",
            prompt: "How strong is the urge to check (their phone, location, social media, statements)?",
            low: "none",
            high: "overwhelming",
            compareTo: { week: 1, day: 5, id: "check-baseline", label: "At the end of week 1" },
          },
          {
            id: "doubt-final",
            kind: "scale",
            better: "lower",
            prompt: "How much of your day does the suspicion take over?",
            low: "none of it",
            high: "all of it",
            compareTo: { week: 1, day: 5, id: "doubt-baseline", label: "At the end of week 1" },
          },
          {
            id: "clarity-final",
            kind: "scale",
            prompt: "How clear are you about what you will do next?",
            low: "no idea",
            high: "completely clear",
            compareTo: { week: 1, day: 5, id: "clarity-baseline", label: "At the end of week 1" },
          },
          {
            id: "balance",
            kind: "script",
            prompt: "Your honest balance.",
            template: [
              "If I stay, I gain {staygain} and I risk {stayrisk}.",
              "If I go, I gain {gogain} and I risk {gorisk}.",
              "The next step I choose is {next}.",
            ],
            fields: [
              { key: "staygain", label: "Staying: what you gain", placeholder: "the life we built, and a chance to repair" },
              { key: "stayrisk", label: "Staying: what you risk", placeholder: "more years of doubt" },
              { key: "gogain", label: "Going: what you gain", placeholder: "peace, and feeling like myself" },
              { key: "gorisk", label: "Going: what you risk", placeholder: "losing something that could have healed" },
              { key: "next", label: "Your next step", placeholder: "book couples counselling and decide after three sessions" },
            ],
          },
        ],
        takeaway: "Staying and going are both allowed. Limbo is the only choice that chooses you.",
      },
      {
        day: 5,
        title: "A letter to yourself",
        minutes: 15,
        technique: "Integration",
        intro:
          "The last session. You write to yourself as you were on day 1, and say what you know now.",
        blocks: [
          {
            id: "letter-read",
            kind: "read",
            title: "Why a letter",
            body: [
              "A letter in your own words is something you can reread on a hard night, when the doubt or the grief comes back. Write it for that night.",
            ],
            why: "Writing to yourself with compassion is used in compassion-focused therapy to help people hold on to what they have learned when emotions run high.",
          },
          {
            id: "self-letter",
            kind: "letter",
            to: "yourself on day 1",
            prompt: "Tell yourself what you have learned about the checking, about your worth, and about what you will do from here, whatever the truth turns out to be.",
            opening: "Dear me,",
          },
          {
            id: "what-changed",
            kind: "reflect",
            prompt: "What has changed since week 1, in how you feel and in what you know?",
          },
        ],
        takeaway: "You can stand on your own two feet, whatever the truth is.",
      },
    ],
  },
];
