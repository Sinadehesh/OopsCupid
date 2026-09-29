import type { Week } from "../types";

/**
 * LETTING PEOPLE IN
 * For the part of you that pulls away when it gets close.
 *
 * For the self-sabotage quiz, which scores five things: fear of
 * closeness, the rejection alarm, worthiness wounds, protest and testing,
 * and withdrawal and exit. They look like opposites (one person runs, the
 * next picks a fight to see if they will be chased) but they do the same
 * job: they keep closeness at a distance that feels survivable. So the
 * programme covers both the exit and the test, and the belief underneath
 * them, "if they really get close, it will go wrong".
 *
 * "The person you are close to" can be a partner, someone new, a friend
 * or family. Plenty of people who take this quiz are single, and the same
 * moves show up in every kind of closeness.
 */

export const LETTING_PEOPLE_IN: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it",
    goal: "Catch the moment you pull away, map your exit moves, and take an honest baseline.",
    sessions: [
      {
        day: 1,
        title: "The moment you pull away",
        minutes: 12,
        technique: "Pattern recognition",
        intro:
          "Self-sabotage feels random from the inside. It rarely is. It usually starts at a particular moment, often just as something is going well. Today you find yours.",
        blocks: [
          {
            id: "moment-read",
            kind: "read",
            title: "It starts when it gets good",
            body: [
              "Most people who sabotage relationships are not short of feeling. They care, sometimes a great deal. And then, right when things are going well, something shifts. The warmth goes flat. They get irritable, or busy, or start noticing everything that is wrong. Or they pick a fight they did not mean to pick.",
              "That shift is not a flaw in your character. It is protection. Some part of you learned that closeness is where you get hurt, and it steps in when closeness grows. It is doing its job. It is just doing it at the wrong times.",
              "The first step is not to stop it. It is to notice exactly when it happens.",
            ],
            why: "Attachment researchers Mario Mikulincer and Phillip Shaver describe \"deactivating strategies\": ways people turn down closeness when it starts to feel like too much. They are automatic, which is why they feel like a change of heart rather than a choice.",
          },
          {
            id: "when-shift",
            kind: "choose",
            prompt: "When do you notice the shift? Pick any that fit.",
            options: [
              "After a really good date or weekend",
              "When they say something serious, like \"I love you\"",
              "When they want more time together",
              "When they're kind to me when I'm in a bad mood",
              "When plans start to involve the future",
              "When they need something from me",
              "When I realise I'm starting to need them",
              "When they meet my friends or family",
            ],
            after: {
              few: "These are your trigger points. You will start to notice them in the moment, sometimes before the shift itself.",
              many: "Closeness itself seems to be the trigger. That is common, and it is also why this can change: it is one thing reacting, not many.",
            },
          },
          {
            id: "last-shift",
            kind: "reflect",
            prompt: "Describe the last time it happened. What had just happened, right before you felt the shift?",
            hint: "Look for the small thing. It is often something good.",
            placeholder: "We'd had a lovely Sunday, they said they could see us living together, and by Monday I found them annoying...",
          },
          {
            id: "sabotage-check",
            kind: "check",
            question: "You have been seeing someone for two months and it is going well. They plan a weekend away for your birthday. You feel a sudden urge to cancel. What is most likely going on?",
            options: [
              { text: "I've realised I'm just not that into them.", because: "Possibly. But if the urge arrived right after a big sign of closeness, the timing is worth noticing before you decide." },
              { text: "The closeness jumped, and something in me is trying to turn it down.", correct: true, because: "Very likely. The urge to cancel is a reaction to the step forward, not necessarily information about the person." },
              { text: "They're moving too fast and it's a red flag.", because: "Sometimes true, and worth checking honestly. A birthday trip after two good months is not unusually fast, though, so look at what the feeling is reacting to." },
            ],
          },
        ],
        takeaway: "The pulling away starts at a moment. You can learn to see the moment.",
      },
      {
        day: 2,
        title: "Your exit moves",
        minutes: 13,
        technique: "Behaviour mapping",
        intro:
          "Everyone who keeps people at a distance has a set of moves. Some are loud, some are nearly invisible. Today you name yours.",
        blocks: [
          {
            id: "exit-read",
            kind: "read",
            title: "The quiet ways out",
            body: [
              "Some exits are obvious: ending it, ghosting, a blow-up. Most are quieter. Suddenly noticing how they chew. Replying a bit slower. Thinking about an ex who was \"the one\". Getting very busy. Keeping one part of your life walled off.",
              "Other moves look like the opposite of leaving: picking a fight to see if they will fight for you, or being at your worst to test whether they stay. They feel different, but they do the same job. They keep things at a distance that feels manageable.",
            ],
            why: "Amir Levine and Rachel Heller's book Attached lists common deactivating strategies, including focusing on small imperfections, idealising an ex (\"the phantom ex\"), and pulling away just when things are going well. Seeing them written down is often the moment people recognise their own.",
          },
          {
            id: "my-exits",
            kind: "choose",
            prompt: "Which of these do you do?",
            options: [
              "Suddenly noticing everything that's wrong with them",
              "Going quiet or slow to reply",
              "Picking a fight over something small",
              "Thinking about an ex, or someone new",
              "Getting very busy",
              "Keeping parts of my life separate",
              "Losing interest almost overnight",
              "Going numb or blank",
              "Pushing them away to see if they come back",
              "Ending it without really explaining why",
            ],
            after: {
              few: "These are your moves. From now on, catching yourself mid-move counts as progress, even if you finish it.",
              many: "That is a full toolkit, which usually means the fear underneath has been around a long time. The good news is the moves share one cause, so working on it helps all of them.",
            },
          },
          {
            id: "their-side",
            kind: "reflect",
            prompt: "Pick your most-used move. What does it look like from the other person's side?",
            hint: "Try to describe it as they would, not as you would explain it.",
          },
        ],
        takeaway: "Every exit move is a way of saying \"not this close\". There are clearer ways to say it.",
      },
      {
        day: 3,
        title: "Closeness in the body",
        minutes: 13,
        technique: "Interoception",
        intro:
          "Before the thought \"I need to get out of this\", there is usually a feeling in the body. Learning to catch that feeling gives you a few seconds of choice.",
        blocks: [
          {
            id: "window-read",
            kind: "read",
            title: "The edge of your window",
            body: [
              "Everyone has a range of feeling they can handle while staying present. When closeness pushes you past the top of that range, you may feel restless, trapped or irritable. Past the bottom, you may go numb, blank or suddenly tired.",
              "Both are your nervous system saying \"too much\". Neither means the relationship is wrong. They mean you have reached the edge of your window, and the edge can be widened with practice.",
            ],
            why: "The psychiatrist Dan Siegel called this the window of tolerance. It is widely used in trauma-informed therapy to explain why some people shut down or flare up when emotions run high, and why calming the body first is often the fastest way back.",
          },
          {
            id: "body-signals",
            kind: "choose",
            prompt: "What happens in your body when it gets too close?",
            options: [
              "Restless, need to move",
              "Trapped or claustrophobic",
              "Irritated by small things",
              "Numb or blank",
              "Suddenly tired",
              "Need to be alone right now",
              "Heart racing",
              "Feeling far away, like watching from outside",
            ],
            after: {
              few: "These are your early signals. They arrive before the exit move, which makes them the best place to intervene.",
              many: "Your body works hard around closeness. That is tiring, and it is also why the body-first tools below will help.",
            },
          },
          {
            id: "grounding",
            kind: "timer",
            title: "Back inside the window",
            seconds: 75,
            cues: [
              "Put both feet on the floor. Breathe out slowly.",
              "Name five things you can see.",
              "Four things you can hear.",
              "Three things you can feel: your clothes, the chair, the air.",
              "Two things you can smell, or would like to.",
              "One slow breath out. You are here. Nothing needs deciding right now.",
            ],
          },
          {
            id: "edge-plan",
            kind: "script",
            prompt: "Your plan for the edge.",
            template: [
              "When I notice {signal},",
              "I'll know I'm at the edge of my window,",
              "and I'll {action} instead of {exit}.",
            ],
            fields: [
              { key: "signal", label: "Your earliest body signal", placeholder: "that trapped feeling in my chest" },
              { key: "action", label: "What you'll do instead", placeholder: "do the five-four-three grounding in the bathroom" },
              { key: "exit", label: "The exit move you'll skip", placeholder: "picking a fight about the washing up" },
            ],
          },
        ],
        takeaway: "The body says \"too much\" before your mind says \"get out\". Listen to the body first.",
      },
      {
        day: 4,
        title: "The stories about needing people",
        minutes: 15,
        technique: "CBT · beliefs",
        intro:
          "Underneath the moves are a few beliefs about what happens when you let someone in. Today you catch one and test it.",
        blocks: [
          {
            id: "beliefs-read",
            kind: "read",
            title: "The rules you did not know you had",
            body: [
              "Most people who keep others at arm's length are following rules they never chose. \"Needing people is weak.\" \"If they see the real me, they'll leave.\" \"Sooner or later, everyone lets you down.\" \"I'm too much, or not enough.\"",
              "These rules made sense once. They were learned somewhere, usually early. The trouble is that they run automatically now, and they treat every new person as if they were the one who taught you the rule.",
            ],
            why: "Aaron Beck's cognitive therapy distinguishes passing thoughts from core beliefs: deeper, older assumptions that shape how we read situations. Thought records are the standard way to bring a belief into the open and check it against the evidence.",
          },
          {
            id: "my-beliefs",
            kind: "choose",
            prompt: "Which of these feel true in your gut, even if you know they're not?",
            options: [
              "Needing people is weak",
              "If they see the real me, they'll leave",
              "Everyone lets you down eventually",
              "I'm too much for people",
              "I'm not enough for people",
              "It's safer to rely on myself",
              "If I get close, I'll lose myself",
              "Love always comes with strings",
            ],
          },
          {
            id: "belief-record",
            kind: "thoughts",
            prompt: "Take a recent moment when one of these beliefs was running, and pull it apart.",
            example: {
              situation: "My friend offered to come round when I was ill. I said I was fine and didn't answer her next message.",
              thought: "If she sees me like this she'll think I'm a mess. It's easier to handle it myself.",
              evidence: "For: people have judged me before. Against: she's seen me at my worst before and stayed. She offered, which means she wanted to. I felt worse alone.",
              balanced: "Letting her come would have been uncomfortable, not dangerous. The rule protected me from something she wasn't going to do.",
            },
          },
        ],
        takeaway: "An old rule can feel like a fact. It is still only a rule, and rules can be tested.",
      },
      {
        day: 5,
        title: "Where you stand now",
        minutes: 10,
        technique: "Baseline measure",
        intro:
          "Three quick measures to close the week. You will take them again in week 4, so you can see what has moved.",
        blocks: [
          {
            id: "baseline-read",
            kind: "read",
            title: "Why measure",
            body: [
              "Change in how close you can let people get is slow and easy to miss. On a bad day it can feel as if nothing has shifted at all.",
              "An honest number now gives you something to compare against later. There are no good or bad answers.",
            ],
            why: "Structured therapies measure at the start and repeat the measure later, partly to see what is working and partly because seeing change in writing helps people keep going.",
          },
          {
            id: "urge-baseline",
            kind: "scale",
            better: "lower",
            prompt: "When someone gets close, how strong is the urge to pull away?",
            low: "none",
            high: "overwhelming",
          },
          {
            id: "stay-baseline",
            kind: "scale",
            prompt: "How able are you to stay present and open when things get close?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "worthy-baseline",
            kind: "scale",
            prompt: "How much do you feel you deserve steady, reliable love?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "week1-notice",
            kind: "reflect",
            prompt: "What did you notice about the way you pull away this week that you had not seen before?",
          },
        ],
        takeaway: "You have a starting point. Everything from here is measured against it.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand it",
    goal: "Understand where the guard came from, what it protects, and how the loop keeps itself going.",
    sessions: [
      {
        day: 1,
        title: "Why closeness feels dangerous",
        minutes: 14,
        technique: "Avoidant deactivation",
        intro:
          "Nobody is born wary of closeness. The wariness was learned, and it was learned for good reasons. Today you look at where yours came from.",
        blocks: [
          {
            id: "origins-read",
            kind: "read",
            title: "A guard built for a reason",
            body: [
              "Children need closeness, and they adapt to whatever response they get when they reach for it. If reaching out was met with warmth, closeness becomes safe. If it was met with irritation, overwhelm, unpredictability or \"stop making a fuss\", the child learns something else: turn the need down, handle it alone, do not count on anyone.",
              "That was a clever adaptation. It protected you from repeated disappointment. The problem is that it still runs in adult relationships, with people who might have met your needs perfectly well.",
              "This is not about blaming anyone. Most parents did the best they could with what they had. It is about seeing that your guard was built for a place you no longer live.",
            ],
            why: "Mary Ainsworth's research in the 1970s found that infants whose caregivers were consistently uncomfortable with their distress learned to hide it. A 1977 study by Alan Sroufe and Everett Waters found that these infants looked calm while their heart rates showed they were not. Later research traced how such early strategies carry into adult relationships.",
          },
          {
            id: "needed-someone",
            kind: "reflect",
            prompt: "Growing up, what usually happened when you were upset and needed someone?",
            hint: "A general picture is enough. You do not need to go into anything painful.",
          },
          {
            id: "what-learned",
            kind: "choose",
            prompt: "What did you learn about needing people?",
            options: [
              "Needing people is weak",
              "My feelings are too much for others",
              "It's safer to handle things alone",
              "Love comes with conditions",
              "People leave eventually",
              "If they get close, they'll see the real me",
              "I have to look after everyone else",
            ],
            after: {
              few: "These lessons made sense where you learned them. The question now is whether they still fit your life.",
              many: "You learned a lot about keeping yourself safe. That took strength. Now it is costing you more than it saves.",
            },
          },
          {
            id: "guard-check",
            kind: "check",
            question: "Why might someone who genuinely wants a relationship still feel relieved when a date is cancelled?",
            options: [
              { text: "They don't really want a relationship.", because: "Wanting closeness and fearing it often live side by side. The relief is the fear, not the whole of what they want." },
              { text: "The cancelled date removed the closeness, so the guard could relax.", correct: true, because: "Yes. The relief is real, and it is also a clue: it shows how much effort being close takes right now." },
              { text: "They're just very independent.", because: "Maybe, but independence does not usually bring relief when plans fall through. That feeling points to something working harder underneath." },
            ],
          },
        ],
        takeaway: "Your guard was built for a reason, in a place you no longer live.",
      },
      {
        day: 2,
        title: "Independence as armour",
        minutes: 13,
        technique: "Schema work",
        intro:
          "Independence is a strength. Armour is something else: independence you cannot take off, even when you want to. Today you tell them apart.",
        blocks: [
          {
            id: "armour-read",
            kind: "read",
            title: "When independence stops being a choice",
            body: [
              "Being able to look after yourself is good. Enjoying time alone is good. The question is whether you can put the independence down when someone offers to share the load.",
              "Armour looks like independence from outside. From inside, it feels like you cannot let anyone help, cannot let anyone see you struggle, and always keep one foot out of the door. It protects you from being let down, and it also keeps out the things you actually want.",
            ],
            why: "John Bowlby described \"compulsive self-reliance\": a pattern of insisting on doing everything alone, which he saw as a defence against the risk of needing someone who might not be there. Schema therapy describes related patterns around emotional deprivation and mistrust.",
          },
          {
            id: "armour-sort",
            kind: "sort",
            prompt: "Healthy independence or armour? Tap each one, then tap where it goes.",
            buckets: ["Healthy independence", "Armour"],
            items: [
              { text: "I enjoy time on my own", answer: "Healthy independence" },
              { text: "I never let anyone see me struggle", answer: "Armour" },
              { text: "I make my own decisions", answer: "Healthy independence" },
              { text: "I'd rather struggle than ask for help", answer: "Armour" },
              { text: "I have my own friends and interests", answer: "Healthy independence" },
              { text: "I feel suffocated when someone relies on me", answer: "Armour" },
              { text: "I always keep a way out", answer: "Armour" },
              { text: "I can be alone without panicking", answer: "Healthy independence" },
            ],
            after: "Healthy independence is something you can choose to set down. Armour is something you cannot take off. The aim is not to lose your independence. It is to get your choice back.",
          },
          {
            id: "armour-reflect",
            kind: "reflect",
            prompt: "What does your armour protect you from? And what does it keep out that you would actually like?",
          },
        ],
        takeaway: "You can keep your independence and still take the armour off.",
      },
      {
        day: 3,
        title: "Testing people",
        minutes: 14,
        technique: "Functional analysis",
        intro:
          "Some people pull away. Others push, to see whether the other person will hold on. Today is about the tests, and the question hidden inside each one.",
        blocks: [
          {
            id: "tests-read",
            kind: "read",
            title: "A test is a question in disguise",
            body: [
              "Picking a fight when what you wanted was reassurance. Going cold to see if they notice. Being at your worst to find out whether they stay. Each of these is a question: \"Do you really care?\" \"Will you leave?\" \"Am I too much?\"",
              "The trouble is the disguise. The other person sees the fight, the coldness, the worst of you, and responds to that. Often they pull back, and the test seems to confirm the fear it was checking.",
              "There is a second trap. People who feel unworthy sometimes feel uneasy when they are treated well, because it does not match how they see themselves. The test is a way of bringing reality back in line with the belief.",
            ],
            why: "Geraldine Downey's research on rejection sensitivity found that people who anxiously expect rejection tend to behave in ways during conflict that increase their partner's anger, making rejection more likely: a self-fulfilling prophecy. William Swann's self-verification research found that people often seek feedback that confirms how they see themselves, even when that view is negative.",
          },
          {
            id: "my-tests",
            kind: "choose",
            prompt: "Which tests have you run?",
            options: [
              "Picking a fight when I wanted reassurance",
              "Going cold to see if they notice",
              "Being at my worst to see if they stay",
              "Pushing them away to see if they come back",
              "Withholding affection to feel in control",
              "Making them jealous",
              "Saying \"maybe we should end it\" without meaning it",
              "Looking for proof that they'll let me down",
            ],
            after: {
              few: "These are your tests. Each one has a question underneath it, and the question can be asked directly.",
              many: "That is a lot of testing, and it usually means a lot of fear about being left. Asking the question straight is scarier, and it works far better.",
            },
          },
          {
            id: "test-script",
            kind: "script",
            prompt: "Decode your most common test.",
            template: [
              "When I {test},",
              "what I'm really asking is {question}.",
              "What usually happens is {result}.",
            ],
            fields: [
              { key: "test", label: "The test", placeholder: "start an argument about nothing" },
              { key: "question", label: "The real question", placeholder: "\"will you still want me when I'm difficult?\"" },
              { key: "result", label: "What usually happens", placeholder: "they get fed up, and I feel proved right" },
            ],
          },
        ],
        takeaway: "A test is a question in disguise. Ask the question instead.",
      },
      {
        day: 4,
        title: "What leaving costs you",
        minutes: 12,
        technique: "Cost ledger",
        intro:
          "Every exit brings relief. The relief is loud and immediate. The cost is quiet and arrives later. Today you add up the cost.",
        blocks: [
          {
            id: "cost-read",
            kind: "read",
            title: "Relief now, loss later",
            body: [
              "Pulling away works in the short term. The pressure drops. You can breathe. That relief is exactly what keeps the pattern going: the brain learns that leaving makes the bad feeling stop.",
              "What it does not register is the long-term price. The relationships that ended before they started. The friends who stopped asking. The version of you that never got to be known.",
            ],
            why: "In learning theory this is negative reinforcement: a behaviour that removes discomfort gets stronger, even when it causes harm later. It is the same mechanism that keeps avoidance going in anxiety problems, and why writing down the costs matters.",
          },
          {
            id: "leave-ledger",
            kind: "script",
            prompt: "Your ledger. Be specific.",
            template: [
              "Pulling away has cost me {people}.",
              "It has cost me {time}.",
              "It has made me believe {belief}.",
              "What I most want back is {back}.",
            ],
            fields: [
              { key: "people", label: "People", placeholder: "Sam, and probably Priya" },
              { key: "time", label: "Time or chances", placeholder: "three years of starting over" },
              { key: "belief", label: "What it made you believe", placeholder: "that I'm just not relationship material" },
              { key: "back", label: "What you want back", placeholder: "feeling like someone really knows me" },
            ],
          },
          {
            id: "got-away",
            kind: "reflect",
            prompt: "Is there someone you pushed away that you still think about? What would you do differently now?",
          },
        ],
        takeaway: "Leaving buys relief with something you want more.",
      },
      {
        day: 5,
        title: "What pulling away protects",
        minutes: 14,
        technique: "Formulation",
        intro:
          "This week you have looked at the triggers, the beliefs, the body, the tests and the costs. Today you put them together into one loop, so you can see where to break it.",
        blocks: [
          {
            id: "loop-read",
            kind: "read",
            title: "The loop",
            body: [
              "The pattern usually runs like this. Something happens that increases closeness. An old belief fires: \"they'll leave\", \"I'll be trapped\", \"they'll see the real me\". A feeling follows, fear or pressure or numbness. You make an exit move or run a test. You feel relief. Later, the relationship is damaged or ends, which seems to prove the belief was right all along.",
              "A loop has several places to break it. You have already started on some: noticing the trigger, calming the body, questioning the belief. Next week you practise breaking it at the move itself.",
            ],
            why: "A formulation is the map a therapist builds with a client to show how triggers, thoughts, feelings and behaviours keep each other going. Writing your own is one of the most useful things you can do in self-guided work.",
          },
          {
            id: "my-loop",
            kind: "script",
            prompt: "Write your loop.",
            template: [
              "When {trigger},",
              "I start believing {belief}.",
              "I feel {feeling}, so I {move}.",
              "For a while I feel {relief}.",
              "Later, {cost}, which seems to prove the belief all over again.",
            ],
            fields: [
              { key: "trigger", label: "The trigger", placeholder: "they say they're falling for me" },
              { key: "belief", label: "The belief", placeholder: "they don't know what I'm really like" },
              { key: "feeling", label: "The feeling", placeholder: "trapped and a bit sick" },
              { key: "move", label: "The move", placeholder: "go quiet for a few days" },
              { key: "relief", label: "The relief", placeholder: "free again" },
              { key: "cost", label: "The cost", placeholder: "they give up on me" },
            ],
          },
          {
            id: "urge-w2",
            kind: "scale",
            better: "lower",
            prompt: "When someone gets close, how strong is the urge to pull away?",
            low: "none",
            high: "overwhelming",
            compareTo: { week: 1, day: 5, id: "urge-baseline", label: "At the end of week 1" },
          },
          {
            id: "week2-notice",
            kind: "reflect",
            prompt: "What do you understand about your pulling away now that you did not two weeks ago?",
          },
        ],
        takeaway: "It is a loop, and a loop has more than one place to break it.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Change it",
    goal: "Practise staying, taking space without vanishing, receiving help, and saying one true thing.",
    sessions: [
      {
        day: 1,
        title: "Ten minutes longer",
        minutes: 13,
        technique: "Exposure · tolerance",
        intro:
          "Every time you leave when the feeling peaks, your brain learns that leaving is what made it stop. Today you teach it something new: the feeling passes on its own.",
        blocks: [
          {
            id: "stay-read",
            kind: "read",
            title: "The wave passes",
            body: [
              "The urge to get out rises, peaks and falls, like a wave. If you always act at the peak, you never find out that it would have fallen anyway.",
              "Staying a little longer than the urge wants, ten minutes, not ten hours, lets your brain collect new evidence: I stayed, it was uncomfortable, and nothing bad happened. Repeated, that evidence changes what closeness feels like.",
              "You are not forcing yourself to stay in anything that is actually wrong. You are only testing whether the feeling is a reliable guide.",
            ],
            why: "Exposure is one of the most effective techniques in psychology for fear and avoidance. The psychologist Michelle Craske's work on inhibitory learning shows that what matters is discovering that the feared outcome does not happen, which only happens if you stay long enough to find out.",
          },
          {
            id: "ride-wave",
            kind: "timer",
            title: "Riding the wave",
            seconds: 120,
            cues: [
              "Think of a recent moment you wanted to get out. Let a little of that feeling come back.",
              "Notice where it sits in your body. Just notice.",
              "Rate it silently from 0 to 10.",
              "Breathe out slowly. You don't need to do anything with it.",
              "Notice if it has changed at all. Up, down, or moved somewhere else.",
              "Rate it again. It usually drops when nothing is done to it.",
            ],
          },
          {
            id: "ten-more",
            kind: "experiment",
            task: "Next time you feel the urge to leave, end a conversation, go quiet or change the subject when someone is close, stay ten more minutes first.",
            predictPrompt: "What do you predict will happen if you stay? How strong will the urge get, from 0 to 10?",
            resultPrompt: "What actually happened? How strong did the urge get, and what happened to it?",
            learnPrompt: "What does this tell you about the urge?",
          },
        ],
        takeaway: "The urge to leave rises and falls on its own. You do not have to act at the peak.",
      },
      {
        day: 2,
        title: "Naming a return time",
        minutes: 12,
        technique: "Communication skill",
        intro:
          "Needing space is fine. Vanishing is what does the damage. Today you learn the sentence that turns one into the other.",
        blocks: [
          {
            id: "return-read",
            kind: "read",
            title: "Space, with a way back",
            body: [
              "When you go quiet without explanation, the other person fills the silence with the worst story available. By the time you come back, there is a new problem to deal with.",
              "The fix is small. Take the space, and say when you will be back. \"I need a bit of time to myself tonight. I'm not going anywhere. I'll call you tomorrow after work.\" Your need is met, and theirs is too.",
              "Then keep the promise. The return is what builds trust. Each time you come back when you said you would, the space becomes safer for both of you.",
            ],
            why: "John Gottman's research on couples found that when people are overwhelmed in conflict, a break of at least twenty minutes helps them calm down, but the break works best when both people know it is a pause and not an exit.",
          },
          {
            id: "return-script",
            kind: "script",
            prompt: "Write your sentence.",
            template: [
              "I need some space to {reason}.",
              "I'm not going anywhere.",
              "I'll {return} {when}.",
            ],
            fields: [
              { key: "reason", label: "Why, briefly", placeholder: "get my head straight after this week" },
              { key: "return", label: "How you'll come back", placeholder: "call you" },
              { key: "when", label: "When", placeholder: "tomorrow evening" },
            ],
          },
          {
            id: "return-check",
            kind: "check",
            question: "Which of these is taking space in a way that protects the relationship?",
            options: [
              { text: "Not replying for two days and then acting as if nothing happened.", because: "This is the vanishing version. They spend two days not knowing whether you have gone." },
              { text: "\"I'm wiped out, I need a quiet night. Can we talk tomorrow at lunch?\"", correct: true, because: "Yes. The need is stated, and there is a clear way back." },
              { text: "\"I just need space, I don't know how long.\"", because: "Honest, and better than silence, but without a return time it can still feel like the start of an ending." },
            ],
          },
          {
            id: "who-needs",
            kind: "reflect",
            prompt: "Who in your life most needs to hear that sentence from you, and when is the next time you are likely to need it?",
          },
        ],
        takeaway: "Take the space. Name the return. Keep the promise.",
      },
      {
        day: 3,
        title: "Letting someone help",
        minutes: 12,
        technique: "Graded exposure",
        intro:
          "For someone who handles everything alone, accepting help is its own kind of exposure. Today you build a ladder, and take the first step up it.",
        blocks: [
          {
            id: "help-read",
            kind: "read",
            title: "Receiving is a skill",
            body: [
              "Closeness grows partly through small moments of depending on each other. When you never let anyone help, you deny them the chance to show up for you, and you never get the evidence that they would.",
              "Start small. The aim is not to hand over your life. It is to let someone do one small thing for you and notice what that feels like.",
            ],
            why: "Graded exposure means facing something difficult in steps, from easiest to hardest, so each step feels possible. It is a standard technique in cognitive behavioural therapy for anything a person has learned to avoid.",
          },
          {
            id: "help-ladder",
            kind: "sort",
            prompt: "Sort these by how hard they would feel for you. There are no right answers.",
            buckets: ["Easy", "Hard", "Very hard"],
            items: [
              { text: "Ask someone to recommend a film" },
              { text: "Let someone pay for a coffee without arguing" },
              { text: "Ask for help carrying something" },
              { text: "Tell someone I've had a bad day" },
              { text: "Ask someone to come with me to an appointment" },
              { text: "Let someone look after me when I'm ill" },
              { text: "Ask for a hug" },
              { text: "Say \"I need you\" and mean it" },
            ],
          },
          {
            id: "help-plan",
            kind: "script",
            prompt: "Pick one from Easy or Hard. Not Very hard, yet.",
            template: ["This week, I'll let {person}", "help me with {thing}."],
            fields: [
              { key: "person", label: "Who", placeholder: "my sister" },
              { key: "thing", label: "What", placeholder: "moving the wardrobe, and I won't insist on doing most of it" },
            ],
          },
          {
            id: "help-after",
            kind: "reflect",
            prompt: "Afterwards, come back and write: how did it feel to receive, and how did they seem?",
          },
        ],
        takeaway: "Letting people help is not weakness. It is how closeness gets built.",
      },
      {
        day: 4,
        title: "Saying one true thing",
        minutes: 13,
        technique: "Vulnerability practice",
        intro:
          "Intimacy is not built by grand confessions. It is built by small true things, said and received well. Today you say one.",
        blocks: [
          {
            id: "true-read",
            kind: "read",
            title: "Small disclosures, received well",
            body: [
              "Closeness grows in a simple way: one person shares something a little personal, and the other responds with interest and care. Then it happens again, a little deeper. That is the whole mechanism.",
              "If you tend to keep things back, you do not need to start with your deepest secret. Start with something slightly truer than you usually say. \"I was nervous about tonight.\" \"I actually really missed you.\" \"That comment hurt a bit.\"",
            ],
            why: "Harry Reis and Phillip Shaver's intimacy process model describes closeness as built through disclosure met with responsiveness. In a 1997 study led by Arthur Aron, pairs of strangers who took turns answering gradually more personal questions for 45 minutes felt markedly closer than pairs who made small talk.",
          },
          {
            id: "true-thing",
            kind: "script",
            prompt: "Draft it.",
            template: ["Something I don't usually say:", "{truth}"],
            fields: [
              { key: "truth", label: "Your true thing", placeholder: "I get scared when things are going well, and that's why I went quiet last week" },
            ],
          },
          {
            id: "say-it",
            kind: "experiment",
            task: "Say your true thing, or one like it, to someone you are close to this week.",
            predictPrompt: "What do you predict they will do? How exposed will you feel, from 0 to 10?",
            resultPrompt: "What did they actually do? How exposed did you feel?",
            learnPrompt: "What does this tell you about letting people see you?",
          },
        ],
        takeaway: "Intimacy is small true things, said and received. Say one.",
      },
      {
        day: 5,
        title: "The closeness experiment",
        minutes: 12,
        technique: "Behavioural experiment",
        intro:
          "Your guard makes predictions about what happens if you move closer. This week's last session is a direct test of one of them.",
        blocks: [
          {
            id: "exp-read",
            kind: "read",
            title: "Test the prediction",
            body: [
              "\"If I say I missed them, I'll look desperate.\" \"If I stay the whole weekend, I'll feel trapped.\" \"If I plan something next month, I'm locked in.\" These predictions feel like facts because you have always avoided testing them.",
              "Pick one closeness move and try it once. Write down what you predict, then what happens. You may be surprised. If you are not, you have learned something real too.",
            ],
            why: "Behavioural experiments are a core technique in cognitive behavioural therapy. Testing a prediction in real life tends to shift beliefs more than arguing with them.",
          },
          {
            id: "pick-closeness",
            kind: "choose",
            prompt: "Pick the move you will try. One is enough.",
            options: [
              "Say \"I missed you\"",
              "Stay the morning instead of rushing off",
              "Plan something a month ahead",
              "Reply warmly within the hour when I'd normally delay",
              "Tell them something I like about them",
              "Share something I'm worried about",
              "Introduce them to a friend",
            ],
          },
          {
            id: "closeness-exp",
            kind: "experiment",
            task: "Do the closeness move you picked, once, this week.",
            predictPrompt: "What does your guard predict will happen? How strongly do you believe it, from 0 to 10?",
            resultPrompt: "What actually happened?",
            learnPrompt: "What does that tell you about the prediction?",
          },
          {
            id: "week3-notice",
            kind: "reflect",
            prompt: "Of everything you tried this week, what surprised you most?",
          },
        ],
        takeaway: "You do not have to believe closeness is safe. You just have to test it once.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "Live it",
    goal: "Choose closeness by what you value, make peace with the part that runs, and plan for the day it tries again.",
    sessions: [
      {
        day: 1,
        title: "What you want from closeness",
        minutes: 13,
        technique: "ACT · values",
        intro:
          "The part of you that runs has been making a lot of decisions. Today you hear from the part that wants to stay.",
        blocks: [
          {
            id: "values-read",
            kind: "read",
            title: "Want and fear, at the same time",
            body: [
              "You can want closeness and fear it at once. Most people with this pattern do. The fear has been louder, so it has been deciding.",
              "Values are a way of letting the other part speak. Not \"I should want a relationship\", but \"what matters to me about being close to people, when fear is not choosing?\"",
              "The fear will still be there. The difference is that it rides along instead of driving.",
            ],
            why: "Acceptance and Commitment Therapy, developed by Steven Hayes, focuses on acting in line with your values while making room for difficult feelings, rather than waiting for the feelings to go away first.",
          },
          {
            id: "closeness-values",
            kind: "choose",
            prompt: "What matters to you about closeness, when fear isn't choosing?",
            options: [
              "Being really known by someone",
              "Laughing with someone",
              "Being relied on",
              "Someone to come home to",
              "Being looked after sometimes",
              "Building something together",
              "Freedom within closeness",
              "Not having to be strong all the time",
            ],
          },
          {
            id: "values-script",
            kind: "script",
            prompt: "Write it with \"and\", not \"but\".",
            template: ["I want relationships where I can {value},", "and I can feel {fear} while I build them."],
            fields: [
              { key: "value", label: "What you want", placeholder: "be known, even the messy parts" },
              { key: "fear", label: "The fear that will come along", placeholder: "scared of being trapped" },
            ],
          },
        ],
        takeaway: "The fear can come along. It just doesn't get to drive.",
      },
      {
        day: 2,
        title: "Kindness to the part that runs",
        minutes: 13,
        technique: "Compassion-focused",
        intro:
          "It is easy to be angry at the part of you that pulls away. It has cost you a lot. Today you try something different: understanding it.",
        blocks: [
          {
            id: "kind-read",
            kind: "read",
            title: "The guard was trying to help",
            body: [
              "The part that runs was never trying to ruin your life. It was trying to protect you, using the only method it knew. Being harsh with it tends to make it work harder, because criticism is another kind of threat.",
              "Treating it with some kindness, the way you might speak to a scared child who hides, makes it easier to set down.",
            ],
            why: "Paul Gilbert's compassion-focused therapy is built on the idea that shame and self-criticism keep threat responses switched on, and that deliberately practising warmth toward yourself helps them settle.",
          },
          {
            id: "kind-timer",
            kind: "timer",
            title: "Meeting the part that runs",
            seconds: 90,
            cues: [
              "Sit comfortably. Breathe out slowly.",
              "Picture the part of you that pulls away. Maybe as a younger you.",
              "Notice what it is afraid of.",
              "Say to it, silently: \"I know you were trying to keep me safe.\"",
              "And: \"I've got this now. You can rest a bit.\"",
              "Stay with it for a few breaths, even if it feels strange.",
            ],
          },
          {
            id: "kind-words",
            kind: "reflect",
            prompt: "What would you say to that part of you, if you weren't annoyed with it?",
          },
        ],
        takeaway: "The part that runs was protecting you. Thank it, then choose differently.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 13,
        technique: "Relapse prevention",
        intro:
          "The urge to run will come back, probably when things are going well. Today you plan for that, while your head is clear.",
        blocks: [
          {
            id: "relapse-read",
            kind: "read",
            title: "Catch it early",
            body: [
              "Four weeks does not erase a pattern you have had for years. What it can do is make you faster at seeing it. A few days of finding fault is a lapse. Ending something good without saying why is the full pattern.",
              "The difference is a plan made in advance, and ideally someone who knows about it.",
            ],
            why: "Relapse prevention, developed by Alan Marlatt, treats setbacks as predictable rather than as failure, and uses written plans for high-risk moments so a slip does not become a slide.",
          },
          {
            id: "warning-signs",
            kind: "choose",
            prompt: "Which would be your early warning signs?",
            options: [
              "I'm finding fault with them a lot",
              "I'm replying slower on purpose",
              "I'm thinking about an ex, or someone new",
              "Plans are starting to feel like a trap",
              "I've gone numb or flat",
              "I'm suddenly very busy",
              "I'm rehearsing how I'd end it",
              "I'm testing them again",
            ],
          },
          {
            id: "relapse-plan",
            kind: "script",
            prompt: "Your plan.",
            template: [
              "If I notice {sign},",
              "I will {action},",
              "and I will say to them: {words}",
            ],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "I'm rehearsing how I'd end it" },
              { key: "action", label: "What you'll do", placeholder: "reread my loop from week 2 and do the grounding" },
              { key: "words", label: "What you'll say", placeholder: "\"I'm getting in my head a bit. It's not you. I'll be back to normal by the weekend.\"" },
            ],
          },
          {
            id: "call-out",
            kind: "reflect",
            prompt: "Who could gently point it out when you start pulling away? What would you want them to say?",
          },
        ],
        takeaway: "The urge will come back. Now you know what to do when it does.",
      },
      {
        day: 4,
        title: "Choosing to stay",
        minutes: 12,
        technique: "Commitment",
        intro:
          "Four weeks ago you measured three things. Today you measure them again, then write down what you choose from here.",
        blocks: [
          {
            id: "stay-read",
            kind: "read",
            title: "If-then, not someday",
            body: [
              "\"I'll try to be more open\" is a wish. \"When I want to disappear, I'll send the return-time message first\" is a plan. Plans survive stress far better than wishes.",
              "Before writing yours, see how far the numbers have moved.",
            ],
            why: "Peter Gollwitzer's research on implementation intentions found that simple if-then plans make people substantially more likely to follow through on what they intend.",
          },
          {
            id: "urge-final",
            kind: "scale",
            better: "lower",
            prompt: "When someone gets close, how strong is the urge to pull away?",
            low: "none",
            high: "overwhelming",
            compareTo: { week: 1, day: 5, id: "urge-baseline", label: "At the end of week 1" },
          },
          {
            id: "stay-final",
            kind: "scale",
            prompt: "How able are you to stay present and open when things get close?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "stay-baseline", label: "At the end of week 1" },
          },
          {
            id: "worthy-final",
            kind: "scale",
            prompt: "How much do you feel you deserve steady, reliable love?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "worthy-baseline", label: "At the end of week 1" },
          },
          {
            id: "commitment",
            kind: "script",
            prompt: "What you choose, from now on.",
            template: [
              "When the urge to run comes, I will {stay}.",
              "I will tell them {tell}.",
              "And I will remember {remember}.",
            ],
            fields: [
              { key: "stay", label: "What you'll do", placeholder: "stay ten more minutes and breathe out slowly" },
              { key: "tell", label: "What you'll tell them", placeholder: "when I need space, and when I'll be back" },
              { key: "remember", label: "What you'll remember", placeholder: "the urge passes, and they are not the person who taught me to run" },
            ],
          },
        ],
        takeaway: "Staying is not the absence of the urge to run. It is choosing, with the urge there.",
      },
      {
        day: 5,
        title: "A letter to your guarded self",
        minutes: 15,
        technique: "Integration",
        intro:
          "The last session. You write to the part of you that has kept people at a distance, and tell it what you have learned.",
        blocks: [
          {
            id: "letter-read",
            kind: "read",
            title: "Why a letter",
            body: [
              "Everything here is easier to know on a calm day than in the moment someone gets close. A letter in your own words reaches that moment better than any list.",
              "Keep it somewhere you can find it. Read it the next time you feel the urge to run.",
            ],
            why: "Compassion-focused therapy uses letter writing to help people speak to difficult parts of themselves with warmth, which makes those parts easier to work with rather than fight.",
          },
          {
            id: "guarded-letter",
            kind: "letter",
            to: "your guarded self",
            prompt: "Thank it for what it was protecting you from. Tell it what you have learned about closeness. Tell it what you will do from now on when it gets scared.",
            opening: "Dear guarded part of me,",
          },
          {
            id: "what-changed",
            kind: "reflect",
            prompt: "What has changed in how you see your pulling away since week 1?",
          },
        ],
        takeaway: "You can let people in and still be safe. That is the whole point.",
      },
    ],
  },
];
