import type { Week } from "../types";

/**
 * EARNED SECURITY
 * Quieting the anxious alarm in relationships.
 *
 * For whoever the attachment quiz places in the anxious or fearful range.
 * The name is a real term: "earned security" is what attachment research
 * calls it when someone who started out insecure becomes secure through
 * later experience and reflection. It is not a consolation prize. On the
 * measures that matter, earned-secure adults look like everyone else who
 * is secure.
 *
 * Partners are "they" throughout. Attachment anxiety is not specific to
 * any kind of relationship, and the exercises work the same either way.
 */

export const EARNED_SECURITY: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it",
    goal: "Understand the alarm, map what you do when it goes off, and take an honest baseline.",
    sessions: [
      {
        day: 1,
        title: "The alarm that won't switch off",
        minutes: 12,
        technique: "Attachment psychoeducation · grounding",
        intro:
          "Before changing anything, it helps to understand what is actually happening when a late reply ruins your afternoon. It is not that you are needy. It is a system doing its job too well.",
        blocks: [
          {
            id: "alarm-read",
            kind: "read",
            title: "You have an attachment system, and yours is set sensitive",
            body: [
              "Everyone has an attachment system: a very old part of the brain whose only job is to keep you close to the people you depend on. When it senses distance, it raises an alarm, and the alarm makes you want to close the gap.",
              "In some people the alarm is set sensitive. A slow reply, a flat tone, a change of plans, and it fires, flooding you with the urge to check, ask, fix or pull closer. That is what attachment anxiety is. Not a flaw in your character. A smoke detector that goes off when someone makes toast.",
              "The goal of these four weeks is not to switch the alarm off. You need it. The goal is to recalibrate it, so it goes off for fires and not for toast, and to give you something better to do when it does.",
            ],
            why: "John Bowlby described the attachment system in the 1950s and 60s. Later research by Mario Mikulincer and Phillip Shaver showed that anxiously attached adults use \"hyperactivating\" strategies: they turn the alarm up to make sure they are noticed. It works in the short term and costs a great deal in the long term.",
          },
          {
            id: "exhale",
            kind: "timer",
            title: "Turning the volume down, first",
            seconds: 75,
            cues: [
              "Breathe in through your nose for four.",
              "Breathe out through your mouth for six. The long out-breath is the part that matters.",
              "Again. In for four.",
              "Out for six, slowly, as if through a straw.",
              "Notice your shoulders. Let them drop a centimetre.",
              "One more long breath out.",
            ],
          },
          {
            id: "last-alarm",
            kind: "reflect",
            prompt: "When did the alarm last go off? Describe what set it off, as plainly as you can.",
            placeholder: "Sunday afternoon. They'd been online but hadn't answered my message from the morning…",
          },
          {
            id: "fire-or-toast",
            kind: "check",
            question: "Your partner replies to your message three hours later than usual, with \"sorry, crazy day\". What is the alarm most likely responding to?",
            options: [
              { text: "A real sign they are losing interest.", because: "It could be, but one slow reply with an explanation is weak evidence. The alarm treats it as strong evidence. That is the recalibration you are here for." },
              { text: "A change from what it expected, which it reads as distance.", correct: true, because: "Yes. The alarm reacts to change, not to meaning. Knowing that gives you a gap between feeling it and believing it." },
              { text: "Nothing. I'm just being silly.", because: "You are not being silly. The feeling is real. It is just not a reliable reading of the situation." },
            ],
          },
        ],
        takeaway: "The alarm is real. It is just not always right. Those are two different things.",
      },
      {
        day: 2,
        title: "Your protest moves",
        minutes: 13,
        technique: "Pattern mapping",
        intro:
          "When the alarm goes off, everyone has their moves: things we do to force closeness back. They usually backfire, and we usually do them anyway. Today you name yours.",
        blocks: [
          {
            id: "protest-read",
            kind: "read",
            title: "Protest behaviour",
            body: [
              "Bowlby noticed that young children separated from a parent protest: crying, searching, clinging. Adults do it too, in adult ways. Double texting. Going cold to make them notice. Checking their online status. Starting a fight so at least there is contact. Threatening to leave, hoping to be stopped.",
              "The logic is the same as the child's: get their attention, get them back. The problem is that most adult protest moves push people away, which sets the alarm off harder, which produces more protest.",
            ],
            why: "Amir Levine and Rachel Heller popularised the term protest behaviour for adults in their book Attached. Naming your own moves is the first step, because you cannot choose a different response to something you do automatically.",
          },
          {
            id: "my-moves",
            kind: "choose",
            prompt: "Which of these do you do when the alarm goes off?",
            options: [
              "Sending a second or third message",
              "Checking when they were last online",
              "Going quiet to see if they notice",
              "Picking a fight",
              "Asking \"are we okay?\"",
              "Making them jealous",
              "Threatening to leave",
              "Rereading old messages for clues",
              "Asking friends to decode their texts",
            ],
            after: {
              few: "These are your moves. You will notice them faster now, often before you have finished doing them.",
              many: "That is a lot of energy going into managing the alarm. None of these make you a bad partner. They make you someone who has been very frightened of losing people.",
            },
          },
          {
            id: "move-result",
            kind: "reflect",
            prompt: "Pick the move you use most. The last time you used it, what did you want to happen, and what actually happened?",
          },
        ],
        takeaway: "Every protest move is a way of saying \"please don't leave\". There are clearer ways to say it.",
      },
      {
        day: 3,
        title: "The waiting-for-a-reply spiral",
        minutes: 15,
        technique: "CBT · thought record",
        intro:
          "The spiral usually starts with a single thought, arrives fully formed, and feels like a fact. Today you catch one and look at it properly.",
        blocks: [
          {
            id: "spiral-read",
            kind: "read",
            title: "Automatic thoughts",
            body: [
              "Between the event (no reply) and the feeling (panic) there is almost always a thought you barely notice: \"they're losing interest\", \"I said something wrong\", \"they're with someone else\". It arrives so fast it does not feel like a thought. It feels like knowing.",
              "A thought record slows that down. You write down what happened, the thought, and then, like a fair witness, what actually supports it and what does not. You are not trying to think positively. You are trying to see the whole picture.",
            ],
            why: "Thought records come from Aaron Beck's cognitive therapy and are among the most studied tools in psychology. The act of writing the thought down, rather than just thinking it, is itself part of what loosens its grip.",
          },
          {
            id: "spiral-record",
            kind: "thoughts",
            prompt: "Take a recent time you waited for a reply and pull it apart.",
            example: {
              situation: "Messaged at 10am. By 4pm, no reply, though they'd posted on social media at 1pm.",
              thought: "They're bored of me. They'd rather do anything than talk to me.",
              evidence: "For: they posted but didn't reply. Against: they said on Friday they'd be slammed this week, they've replied every other day, and last weekend they planned something for us.",
              balanced: "They're busy and replying slowly this week. Posting a photo takes five seconds; a real reply takes attention they may not have right now.",
            },
          },
          {
            id: "spiral-feel",
            kind: "scale",
            better: "lower",
            prompt: "Having written it down, how strongly do you believe the original thought now?",
            low: "not at all",
            high: "completely",
          },
        ],
        takeaway: "A thought that arrives fast is not the same as a thought that is true.",
      },
      {
        day: 4,
        title: "The spiral in your body",
        minutes: 12,
        technique: "Interoception · distress tolerance",
        intro:
          "The alarm is not just in your head. It is in your chest and stomach and hands, and sometimes the fastest way to quieten it is through the body, not through reasoning.",
        blocks: [
          {
            id: "body-read",
            kind: "read",
            title: "Why you cannot think your way out mid-spiral",
            body: [
              "Once the alarm is fully going, the parts of your brain that plan and reason get less say. That is why telling yourself \"it's fine\" in the middle of a spiral rarely works. You have to bring the body down first.",
              "Cold water on your face, a long out-breath, or a few minutes of hard movement all tell your nervous system that there is no emergency, faster than any argument can.",
            ],
            why: "DBT includes a set of fast body-based skills for moments of intense distress. Cold water on the face triggers the dive reflex, which slows the heart rate within seconds. It is not a cure, just a way of getting enough calm back to think.",
          },
          {
            id: "where-body",
            kind: "choose",
            prompt: "Where do you feel the alarm?",
            options: [
              "Tight chest",
              "Racing heart",
              "Knot in my stomach",
              "Can't sit still",
              "Hands on the phone before I've decided",
              "Can't concentrate on anything else",
              "Jaw clenched",
              "Feeling sick",
            ],
            after: {
              few: "These are your first signals. When you notice them, that is the moment to bring the body down, before you do anything else.",
              many: "Your body is working very hard. That is exhausting, and it is also why the body-first skills will help you most.",
            },
          },
          {
            id: "body-plan",
            kind: "script",
            prompt: "Your body-first plan, for the next time.",
            template: ["When I notice {signal},", "I will {action} before I pick up my phone."],
            fields: [
              { key: "signal", label: "Your earliest signal", placeholder: "my chest going tight" },
              { key: "action", label: "One body-first thing", placeholder: "splash cold water on my face and breathe out slowly five times" },
            ],
          },
        ],
        takeaway: "Calm the body first. The thinking comes back on its own.",
      },
      {
        day: 5,
        title: "How loud is the alarm",
        minutes: 12,
        technique: "Baseline measure · self-monitoring",
        intro:
          "You cannot see change without a starting point. Today you take an honest reading of where you are, so that in four weeks you can see how far you have come.",
        blocks: [
          {
            id: "alarm-baseline",
            kind: "scale",
            better: "lower",
            prompt: "Over the last week, how loud has the alarm been, on average?",
            low: "silent",
            high: "deafening",
          },
          {
            id: "security-baseline",
            kind: "scale",
            prompt: "How secure do you feel in your relationship, or in relationships generally, right now?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "log-read",
            kind: "read",
            title: "Your alarm log",
            body: [
              "From today, whenever the alarm goes off, jot one line in your notes: when, what set it off, how loud from 0 to 10, and what you did. Nothing more.",
              "You will start to see what reliably sets it off, what time of day it is worst, and which of your moves you reach for first. That map is the most useful thing you will make this month.",
            ],
          },
          {
            id: "week1-notice",
            kind: "reflect",
            prompt: "What did you notice about your alarm this week that you had not noticed before?",
          },
        ],
        takeaway: "You have measured where you are. From here, you can see yourself move.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand it",
    goal: "See where the alarm was set, why certain people set it off hardest, and what reassurance can and cannot do.",
    sessions: [
      {
        day: 1,
        title: "Where the alarm was set",
        minutes: 15,
        technique: "Attachment origins · reflection",
        intro:
          "The sensitivity of your alarm was set early, by what closeness was like for you growing up. This session is gentle. Stop whenever you need to.",
        blocks: [
          {
            id: "origins-read",
            kind: "read",
            title: "How the setting gets set",
            body: [
              "Children whose carers were reliably available learn that closeness is safe and that they will be found if they reach out. Their alarm stays calm.",
              "Children whose carers were sometimes warm and sometimes absent, distracted or unpredictable, learn something different: that closeness can vanish without warning, and that you have to watch closely and reach hard to keep it. Their alarm is set sensitive, and it made complete sense at the time.",
              "None of this is about blame. Most carers were doing their best with what they had. It is simply where the setting came from.",
            ],
            why: "Mary Ainsworth's research in the 1970s identified these patterns in infants. Longitudinal studies since have shown they tend to carry into adult relationships, though far from inevitably. Later experience can and does change them.",
          },
          {
            id: "grew-up",
            kind: "choose",
            prompt: "Which of these feel familiar from growing up?",
            options: [
              "Love that came and went without warning",
              "A parent who was often distracted or overwhelmed",
              "Having to be good to get attention",
              "Being the one who kept the peace",
              "Moving around, or people leaving",
              "Feeling I had to read the room constantly",
              "Care that depended on their mood",
              "None of these really fit",
            ],
            after: {
              few: "Even one of these can leave a lasting sensitivity. It makes sense that your alarm learned to watch closely.",
              many: "With that much uncertainty, of course your alarm learned to stay on high alert. It was protecting you, and it still thinks it is.",
            },
          },
          {
            id: "young-me",
            kind: "reflect",
            prompt: "What did younger you need to hear about closeness, that nobody said?",
            hint: "If this is heavy today, it is fine to write one line and come back to it.",
          },
        ],
        takeaway: "Your alarm learned to be sensitive for good reasons. It can learn something new now.",
      },
      {
        day: 2,
        title: "Why hot and cold hooks you",
        minutes: 14,
        technique: "Psychoeducation · intermittent reinforcement",
        intro:
          "If you have noticed that you are most drawn to people who are hard to read, there is a reason. It is not your taste. It is your alarm.",
        blocks: [
          {
            id: "hotcold-read",
            kind: "read",
            title: "Unpredictable warmth feels like chemistry",
            body: [
              "When someone is warm one day and distant the next, your alarm never gets to settle. Every return of warmth brings a flood of relief, and relief feels a lot like love.",
              "Compare someone who is reliably warm. The alarm has nothing to react to. No highs, no lows, no relief. To a sensitive alarm, that can feel flat, even boring, which is exactly the wrong conclusion.",
              "This is why anxiously attached people so often end up with avoidant partners. The avoidant partner's pulling away keeps the alarm busy, and the alarm mistakes that for passion.",
            ],
            why: "The principle is intermittent reinforcement: unpredictable rewards produce stronger attachment than reliable ones. It is well established in learning research, and it applies to people as much as to anything else.",
          },
          {
            id: "drawn-to",
            kind: "reflect",
            prompt: "Think about the people you have been most drawn to. How predictable was their warmth?",
          },
          {
            id: "calm-check",
            kind: "check",
            question: "Someone you are seeing always replies, makes plans, and is consistently kind. You feel a bit flat about them. What is that most likely to mean?",
            options: [
              { text: "There is no chemistry, so it is not right.", because: "Maybe, but for a sensitive alarm, no anxiety often feels like no chemistry. It is worth waiting before deciding." },
              { text: "My alarm has nothing to react to, and I am reading calm as boredom.", correct: true, because: "Often, yes. Calm is unfamiliar, and unfamiliar can feel like nothing. Give it time before you trust that feeling." },
              { text: "I don't deserve someone that nice.", because: "That is a story the alarm tells, not a fact. You are allowed reliable warmth." },
            ],
          },
        ],
        takeaway: "Relief is not the same as love. Calm is not the same as boredom.",
      },
      {
        day: 3,
        title: "The stories anxiety tells",
        minutes: 14,
        technique: "CBT · cognitive distortions",
        intro:
          "The alarm has a small number of favourite stories, and it tells them again and again. Once you can recognise them, they lose a lot of their power.",
        blocks: [
          {
            id: "distortions-read",
            kind: "read",
            title: "The alarm's favourite stories",
            body: [
              "Mind reading: assuming you know what they are thinking. \"They're annoyed with me.\" Fortune telling: predicting the worst. \"This is going to end.\" Catastrophising: making the worst outcome unbearable. \"If they leave, I won't survive it.\" Personalising: assuming it is about you. \"They're quiet because of something I did.\"",
              "Each of these is a normal thing for a mind to do under threat. The trick is not to stop having them, but to recognise them as stories rather than facts.",
            ],
            why: "These thinking patterns were catalogued by Aaron Beck and later popularised by David Burns. Being able to label a thought as, say, mind reading, creates just enough distance to question it.",
          },
          {
            id: "label-sort",
            kind: "sort",
            prompt: "Which story is each thought telling?",
            buckets: ["Mind reading", "Fortune telling", "Personalising"],
            items: [
              { text: "They're bored of me.", answer: "Mind reading" },
              { text: "This will end like the last one.", answer: "Fortune telling" },
              { text: "They're quiet because I said the wrong thing.", answer: "Personalising" },
              { text: "They think I'm too much.", answer: "Mind reading" },
              { text: "They'll meet someone better.", answer: "Fortune telling" },
              { text: "Their bad mood is my fault.", answer: "Personalising" },
            ],
            after: "Notice which story you tell most. That is the one to watch for this week.",
          },
          {
            id: "my-story",
            kind: "reflect",
            prompt: "Which story does your alarm tell most often? What is the evidence it has actually been right, and how often has it been wrong?",
          },
        ],
        takeaway: "When you can name the story, you can stop mistaking it for the news.",
      },
      {
        day: 4,
        title: "When anxious meets avoidant",
        minutes: 14,
        technique: "EFT · pursue and withdraw",
        intro:
          "Many relationships get stuck in the same dance: one person reaches, the other retreats. Seeing the dance from above is the first step to stepping out of it.",
        blocks: [
          {
            id: "dance-read",
            kind: "read",
            title: "The pursue and withdraw cycle",
            body: [
              "When you feel distance, you move closer: more messages, more questions, more need to talk. If your partner handles closeness by needing space, your moving closer feels like pressure, so they step back. Their stepping back sets your alarm off harder, so you reach more. And round it goes.",
              "Neither of you is the villain. You are both trying to feel safe, in opposite ways. The cycle is the problem, not either person.",
            ],
            why: "Sue Johnson's emotionally focused therapy, one of the best-evidenced forms of couples therapy, centres on this cycle. Naming it together, as a shared enemy, often calms things more than any amount of arguing about who started it.",
          },
          {
            id: "dance-map",
            kind: "reflect",
            prompt: "Describe your dance. What do you do when you feel distance, and what does your partner do in response?",
            placeholder: "When they go quiet I ask what's wrong, then when they say nothing I ask again…",
          },
          {
            id: "dance-role",
            kind: "choose",
            prompt: "In your relationships, which of these do you tend to do?",
            options: [
              "I reach harder when they go quiet",
              "I need to talk it through right now",
              "I feel relief only when we've reconnected",
              "They say I'm too intense",
              "They go quiet or busy when things get emotional",
              "We end up in the same argument again",
            ],
          },
        ],
        takeaway: "The cycle is the enemy, not your partner, and not you.",
      },
      {
        day: 5,
        title: "What reassurance can and can't do",
        minutes: 14,
        technique: "Maintenance cycle · reassurance seeking",
        intro:
          "Asking for reassurance is completely human. The trouble is the kind of relief it gives, and how quickly it wears off.",
        blocks: [
          {
            id: "reassurance-read",
            kind: "read",
            title: "Why it never lasts",
            body: [
              "When the alarm goes off and you ask \"are we okay?\", a yes brings instant relief. But the relief teaches the alarm that asking is how to feel safe, so the next time it goes off, it wants to ask again, a little sooner.",
              "Over time you need more reassurance, more often, and it works for less time. Meanwhile, the person being asked can start to feel that nothing they do is enough, which can make them pull back, which sets off the alarm.",
              "The answer is not to never ask. It is to be able to soothe yourself first, so reassurance becomes something nice rather than something you cannot function without.",
            ],
            why: "Thomas Joiner and colleagues found that excessive reassurance seeking tends to push people away over time, and is linked to lower mood. It is a well-documented example of a strategy that helps in the moment and hurts in the long run.",
          },
          {
            id: "ask-how-often",
            kind: "reflect",
            prompt: "Roughly how often do you seek reassurance, and how long does the relief last?",
          },
          {
            id: "alarm-w2",
            kind: "scale",
            better: "lower",
            prompt: "Over this past week, how loud has the alarm been, on average?",
            low: "silent",
            high: "deafening",
            compareTo: { week: 1, day: 5, id: "alarm-baseline", label: "At the end of week 1" },
          },
        ],
        takeaway: "Reassurance is lovely. It just cannot be the only thing holding you up.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Change it",
    goal: "Practise the skills that give you a choice when the alarm goes off: delaying, asking directly, soothing yourself first.",
    sessions: [
      {
        day: 1,
        title: "Delay, don't deny",
        minutes: 13,
        technique: "Urge surfing",
        intro:
          "You do not have to fight the urge to send another message. You just have to let it pass before you decide. Urges rise, peak and fall, if you let them.",
        blocks: [
          {
            id: "surf-read",
            kind: "read",
            title: "Urges are waves",
            body: [
              "An urge feels as though it will keep building until you act on it. It does not. Left alone, most urges peak within a few minutes and then fade, like a wave.",
              "Urge surfing means noticing the urge, naming it, and riding it without acting, for a set time. Afterwards, you can still send the message if you want to. But you will be choosing, not reacting.",
            ],
            why: "Urge surfing comes from mindfulness-based relapse prevention, developed by Alan Marlatt for cravings of all kinds. The same principle works for the urge to check or send a message.",
          },
          {
            id: "surf-timer",
            kind: "timer",
            title: "Ride one wave",
            seconds: 180,
            cues: [
              "Notice the urge. Where is it in your body?",
              "Name it: \"this is the urge to check.\"",
              "Don't push it away. Just watch it, like a wave.",
              "Notice if it is getting stronger, or has peaked.",
              "Breathe out slowly. You are still here.",
              "Notice it beginning to settle.",
              "Now decide, calmly, what you actually want to do.",
            ],
          },
          {
            id: "surf-rule",
            kind: "script",
            prompt: "Your delay rule.",
            template: ["When I want to {urge},", "I will wait {minutes} minutes and do {instead} first."],
            fields: [
              { key: "urge", label: "The urge", placeholder: "send a second message" },
              { key: "minutes", label: "How long", placeholder: "twenty" },
              { key: "instead", label: "What you do meanwhile", placeholder: "go for a short walk" },
            ],
          },
        ],
        takeaway: "You never have to act on the first wave. Let it pass, then choose.",
      },
      {
        day: 2,
        title: "Asking instead of testing",
        minutes: 15,
        technique: "DBT · DEAR MAN",
        intro:
          "Protest moves are indirect ways of asking for something. Today you practise asking directly, which is more frightening and far more likely to work.",
        blocks: [
          {
            id: "ask-read",
            kind: "read",
            title: "Saying what you need, plainly",
            body: [
              "Going quiet to see if they notice is a test. \"When you're away, it would really help me if you sent one message in the evening\" is a request. The first leaves them guessing and you disappointed. The second gives them something they can actually do.",
              "DBT offers a structure for asking clearly: Describe the situation, Express how you feel, Assert what you want, Reinforce why it matters to both of you. Then stay calm, stay confident, and be willing to negotiate.",
            ],
            why: "DEAR MAN comes from Marsha Linehan's dialectical behaviour therapy. Direct requests feel riskier to an anxious alarm, but partners respond to them far better than to tests, and securely attached people ask for things this way.",
          },
          {
            id: "my-ask",
            kind: "script",
            prompt: "Turn one of your protest moves into a direct request.",
            template: ["When {situation},", "I feel {feeling}.", "It would really help me if {request}.", "It would mean {why}."],
            fields: [
              { key: "situation", label: "Describe", placeholder: "we go a whole day without talking" },
              { key: "feeling", label: "Express", placeholder: "anxious, and I start overthinking" },
              { key: "request", label: "Assert", placeholder: "you sent one message in the evening, even a short one" },
              { key: "why", label: "Reinforce", placeholder: "I'd stop checking my phone and be much more relaxed with you" },
            ],
          },
          {
            id: "ask-fear",
            kind: "reflect",
            prompt: "What scares you about asking this directly? What is the worst that could realistically happen?",
          },
        ],
        takeaway: "A direct request can be answered. A test can only be failed.",
      },
      {
        day: 3,
        title: "Soothe first, then reach out",
        minutes: 13,
        technique: "DBT · self-soothing",
        intro:
          "Reaching out from a calm place and reaching out from a spiral are completely different experiences, for you and for them. Today you build a way to get calm first.",
        blocks: [
          {
            id: "soothe-read",
            kind: "read",
            title: "Your own first responder",
            body: [
              "Securely attached people still feel anxious sometimes. The difference is that they can partly soothe themselves before they reach out, so when they do reach out, it is a connection, not a rescue.",
              "Self-soothing in DBT uses the five senses: something to look at, listen to, smell, taste and touch that brings you down. It sounds almost too simple. It works because it gives the alarm a physical signal that you are safe.",
            ],
          },
          {
            id: "soothe-kit",
            kind: "choose",
            prompt: "Build your soothing kit. What works, or might work, for you?",
            options: [
              "A particular song or playlist",
              "A hot shower or bath",
              "A walk outside",
              "A familiar smell (candle, perfume, tea)",
              "Something warm to drink",
              "A soft blanket or jumper",
              "Calling a friend about something else",
              "A comfort film or show",
              "Writing it down",
            ],
            after: {
              few: "Keep these somewhere you can see them. In a spiral you will not remember them unless they are written down.",
              many: "That is a good kit. Screenshot it, so it is there when you need it.",
            },
          },
          {
            id: "soothe-then",
            kind: "reflect",
            prompt: "Think of the last time you reached out from a spiral. If you had soothed yourself first, what might you have said differently?",
          },
        ],
        takeaway: "Reach out from calm, and the reaching becomes connection instead of rescue.",
      },
      {
        day: 4,
        title: "The reply experiment",
        minutes: 13,
        technique: "CBT · behavioural experiment",
        intro:
          "This is the week's big test. You put one of the alarm's predictions to the test, safely, and see what actually happens.",
        blocks: [
          {
            id: "exp-read",
            kind: "read",
            title: "Testing what the alarm predicts",
            body: [
              "The alarm makes confident predictions: if I don't send another message, they'll forget about me. If I don't check, something bad will happen. Because you always act on these, you never find out whether they are true.",
              "An experiment breaks that. You predict, you hold back, you watch. You are not trying to prove the alarm wrong. You are trying to find out what is true.",
            ],
          },
          {
            id: "reply-exp",
            kind: "experiment",
            task: "Once this week, when you want to send a follow-up message, don't. Wait for them to reply in their own time.",
            predictPrompt: "What do you predict will happen, and how anxious will you feel, from 0 to 10?",
            resultPrompt: "What actually happened, and how anxious did you actually feel?",
            learnPrompt: "What does this tell you about the alarm's predictions?",
          },
          {
            id: "exp-confidence",
            kind: "scale",
            prompt: "How confident do you feel that you can sit with the alarm without acting on it?",
            low: "not at all",
            high: "completely",
          },
        ],
        takeaway: "Every prediction you test is a lesson the alarm can actually learn from.",
      },
      {
        day: 5,
        title: "When calm feels boring",
        minutes: 13,
        technique: "Exposure to security",
        intro:
          "One of the strangest parts of recovering from attachment anxiety is that security can feel dull at first. Today is about learning to stay with it.",
        blocks: [
          {
            id: "boring-read",
            kind: "read",
            title: "Letting calm in",
            body: [
              "If your system is used to the highs and lows of uncertain love, steady love can feel like something is missing. The pull is to find the missing intensity: to create drama, to pick at the relationship, to be drawn back to someone unavailable.",
              "The skill is to notice that pull, name it as the old setting, and stay. Calm becomes comfortable with practice, the same way anything unfamiliar does. The flatness passes. What is underneath it is safety.",
            ],
          },
          {
            id: "calm-moments",
            kind: "reflect",
            prompt: "Describe a moment this week, with anyone, when you felt calm and safe with another person. What was it like, honestly?",
          },
          {
            id: "calm-urge",
            kind: "choose",
            prompt: "When things are calm, do you ever notice yourself:",
            options: [
              "Looking for something to worry about",
              "Picking a small fight",
              "Thinking about an ex",
              "Feeling restless or bored",
              "Testing whether they really care",
              "Waiting for it to go wrong",
            ],
            after: {
              few: "That is the old setting reaching for something familiar. Noticing it is enough to start changing it.",
              many: "Calm is very unfamiliar to your system. That is exactly why practising it matters so much.",
            },
          },
        ],
        takeaway: "Calm is not the absence of love. It is what love feels like when it is safe.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "Live it",
    goal: "Build security from the inside: your values, a kinder inner voice, a plan for bad days, and your own story told clearly.",
    sessions: [
      {
        day: 1,
        title: "What you value in love",
        minutes: 14,
        technique: "ACT · values",
        intro:
          "Anxiety tends to make every relationship decision about one question: will they stay? This session asks a different one: what kind of partner do you want to be, and to have?",
        blocks: [
          {
            id: "love-values-read",
            kind: "read",
            title: "Choosing by values, not by fear",
            body: [
              "When the alarm is running the show, you choose partners and behaviours by what reduces anxiety fastest. Values give you a steadier compass: not \"what will stop this feeling\", but \"what matters to me in a relationship\".",
              "Values are directions, not destinations. Honesty, kindness, fun, loyalty, growth. You never finish them. You just keep choosing them.",
            ],
          },
          {
            id: "love-values",
            kind: "sort",
            prompt: "Sort these by how much they matter to you in a relationship.",
            buckets: ["Essential", "Important", "Less so"],
            items: [
              { text: "Consistency" },
              { text: "Passion" },
              { text: "Honesty" },
              { text: "Fun" },
              { text: "Independence" },
              { text: "Kindness" },
              { text: "Growth" },
              { text: "Loyalty" },
              { text: "Shared humour" },
            ],
            after: "Compare your Essential column with the people you have been drawn to. Where do they match, and where do they not?",
          },
          {
            id: "values-partner",
            kind: "reflect",
            prompt: "What kind of partner do you want to be, when you are not frightened?",
          },
        ],
        takeaway: "You get to choose love by what you value, not just by what calms the alarm.",
      },
      {
        day: 2,
        title: "Becoming your own safe base",
        minutes: 14,
        technique: "Compassion-focused · the compassionate self",
        intro:
          "The deepest shift in earned security is this: some of the safety you have been looking for in other people can come from inside you.",
        blocks: [
          {
            id: "safe-base-read",
            kind: "read",
            title: "An inner secure base",
            body: [
              "Bowlby called a reliable carer a secure base: someone you can go out into the world from and come back to. Securely attached adults carry a version of that inside them, a way of talking to themselves that is steady and kind.",
              "You can build one. Compassion-focused therapy does it by practising a compassionate self: imagining the wisest, kindest, strongest version of yourself, and letting that version speak to the frightened part.",
            ],
            why: "Compassion-focused therapy was developed by Paul Gilbert. It is particularly helpful for people whose inner voice is critical or frightened, because it trains a different, soothing response to distress.",
          },
          {
            id: "compassionate-self",
            kind: "timer",
            title: "Meeting your compassionate self",
            seconds: 120,
            cues: [
              "Sit comfortably. Let your breathing slow.",
              "Imagine the wisest, kindest version of yourself.",
              "Notice their posture: calm, steady, unhurried.",
              "They know everything you have been through.",
              "Imagine them looking at the anxious part of you, with warmth.",
              "What would they say to that part?",
              "Let those words land. Stay with them.",
            ],
          },
          {
            id: "inner-words",
            kind: "reflect",
            prompt: "What did your compassionate self want to say to the anxious part of you?",
          },
        ],
        takeaway: "Some of the safety you have been searching for can come from inside.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 13,
        technique: "Relapse prevention",
        intro:
          "The alarm will go off again. That is not failure. What matters is noticing early and reaching for what works.",
        blocks: [
          {
            id: "warning-signs",
            kind: "choose",
            prompt: "Which of these are signs the old setting is taking over again?",
            options: [
              "Checking my phone more often",
              "Rereading messages",
              "Asking \"are we okay?\" more",
              "Dropping my own plans to be available",
              "Feeling flat when things are calm",
              "Being drawn to someone hard to read",
              "Stopping my alarm log",
              "Sleeping badly because of the relationship",
            ],
          },
          {
            id: "relapse-plan",
            kind: "script",
            prompt: "Your plan.",
            template: ["When I notice {sign},", "I will {soothe},", "and then I will {ask}."],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "that I'm checking my phone every few minutes" },
              { key: "soothe", label: "How you'll soothe first", placeholder: "breathe out slowly and go for a walk" },
              { key: "ask", label: "What you'll do next", placeholder: "ask directly for what I need, once" },
            ],
          },
        ],
        takeaway: "A slip is not a return to the start. Catching it is proof of how far you have come.",
      },
      {
        day: 4,
        title: "Earning security",
        minutes: 15,
        technique: "Narrative coherence",
        intro:
          "Research on earned security has found something striking: what matters most is not what happened to you, but whether you can tell the story of it clearly. Today you practise that.",
        blocks: [
          {
            id: "coherence-read",
            kind: "read",
            title: "A coherent story",
            body: [
              "Mary Main's work with the Adult Attachment Interview found that securely attached adults, including many who had difficult childhoods, can talk about their past in a way that is clear, balanced and makes sense. They can name what was hard without being overwhelmed by it or dismissing it.",
              "That kind of story is not something you are born with. It is something you build, by reflecting on what happened and what it did to you. You have been doing exactly that for three weeks.",
            ],
            why: "People who became secure through later reflection and relationships are described in the research as earned secure. On most measures, they look much like people who were secure from the start.",
          },
          {
            id: "my-story-coherent",
            kind: "reflect",
            prompt: "Tell the story of your attachment, in a few sentences: what closeness was like growing up, how it shaped your alarm, and what you understand about it now.",
            rows: 8,
          },
          {
            id: "security-w4",
            kind: "scale",
            prompt: "How secure do you feel in your relationship, or in relationships generally, right now?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "security-baseline", label: "At the end of week 1" },
          },
        ],
        takeaway: "Security is not only something you are born with. It can be earned, and you are earning it.",
      },
      {
        day: 5,
        title: "A letter to the anxious part",
        minutes: 15,
        technique: "Integration",
        intro:
          "Your alarm has been trying to protect you your whole life. In this last session, you write to it.",
        blocks: [
          {
            id: "anxious-letter",
            kind: "letter",
            to: "the anxious part of you",
            prompt: "Thank it for what it was trying to do. Tell it what you have learned. Tell it what you will do from now on when it gets frightened.",
            opening: "Dear anxious part of me,",
          },
          {
            id: "alarm-final",
            kind: "scale",
            better: "lower",
            prompt: "Over this last week, how loud has the alarm been, on average?",
            low: "silent",
            high: "deafening",
            compareTo: { week: 1, day: 5, id: "alarm-baseline", label: "At the end of week 1" },
          },
          {
            id: "keep-doing",
            kind: "reflect",
            prompt: "Of everything in these four weeks, what is the one thing you will keep doing?",
          },
        ],
        takeaway: "The alarm was never your enemy. It just needed someone to tell it you are safe now.",
      },
    ],
  },
];
