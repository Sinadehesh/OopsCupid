export type SubscaleKey = "fear_of_closeness" | "rejection_alarm" | "worthiness_wounds" | "protest_testing" | "withdrawal_exit";

export const SUBSCALE_META: Record<SubscaleKey, { icon: string; color: string; tagline: string; lowText: string; medText: string; highText: string; critText: string; realLifeExample: string }> = {
  fear_of_closeness: {
    icon: "🚪", color: "#DD1C1A", tagline: "The Closing Door",
    lowText: "Closeness doesn't set off alarms for you. You can let people in without your nervous system treating it as a threat.",
    medText: "You enjoy connection but can feel a subtle pull toward distance as things get serious. Mild, but worth watching.",
    highText: "Your brain treats emotional intimacy like a threat. The closer someone gets, the louder the exit strategy gets.",
    critText: "Closeness is your biggest trigger. Your nervous system has learned that needing someone = danger. This runs deep.",
    realLifeExample: "\"They were perfect. But the moment they said 'I really like you,' something in me just switched off.\""
  },
  rejection_alarm: {
    icon: "📡", color: "#F0C808", tagline: "The Hypervigilance System",
    lowText: "You're not running a constant threat scan. You can tolerate uncertainty without it consuming your attention.",
    medText: "You notice changes in energy or tone more than most. A slow reply can still trigger a low-level alarm.",
    highText: "Your rejection radar is set to maximum sensitivity. You're interpreting neutral signals as threats constantly.",
    critText: "You are in near-constant surveillance mode. Every shift in energy, tone, or availability is processed as a potential loss.",
    realLifeExample: "\"They replied with a period instead of an exclamation mark and I spent two hours analyzing what it meant.\""
  },
  worthiness_wounds: {
    icon: "🩹", color: "#06AED5", tagline: "The Root Wound",
    lowText: "You have a reasonably stable sense of your worth in relationships. You don't routinely question why someone chose you.",
    medText: "There's a quiet voice that sometimes doubts whether you're really wanted. It doesn't dominate, but it shapes things.",
    highText: "At your core, part of you believes you're not quite enough — and you've built your relationship behaviors around hiding that.",
    critText: "Your relationships are being run by a wound, not a choice. Until the belief 'I am not enough' is examined, every pattern feeds it.",
    realLifeExample: "\"When someone is consistently kind to me, I don't feel lucky. I feel suspicious. Like they don't know me yet.\""
  },
  protest_testing: {
    icon: "🧪", color: "#086788", tagline: "The Hidden Test",
    lowText: "You mostly ask directly when you need something instead of creating indirect tests. That's a real strength.",
    medText: "Under pressure you sometimes go quiet or get sharp — as a way to gauge response rather than ask directly.",
    highText: "Testing is your primary relationship tool. When unsafe, you create situations to see if they'll stay — instead of just asking.",
    critText: "You are almost never in direct communication during conflict. Every reaction is a test. It's exhausting for you and invisible to them.",
    realLifeExample: "\"I went cold for three days not because I was mad — I needed to see if they'd chase me.\""
  },
  withdrawal_exit: {
    icon: "🌫️", color: "#5E6E79", tagline: "The Disappearing Act",
    lowText: "You don't default to emotional disappearance. When things get hard, you generally stay present.",
    medText: "Conflict or intimacy can cause you to mentally check out or go quiet — not dramatically, but you notice it.",
    highText: "Emotional shutdown is your default protection. When things feel too real, you leave — sometimes physically, always emotionally.",
    critText: "You've mastered being present in body but gone in soul. This leaves people confused and yourself lonely.",
    realLifeExample: "\"I didn't break up with them. I just stopped being there. Until they got the message.\""
  }
};

export const ARCHETYPE_BRUTAL_TRUTH: Record<string, string> = {
  "The Chase and Test Cycle": "You want closeness desperately but you make yourself impossible to reach. The chase is the relationship.",
  "The Leave Before It Hurts Pattern": "You've never been left — because you always leave first. You call it protecting yourself. It's also keeping you alone.",
  "The Not Chosen Wound": "You stay loyal to the belief that you're not quite enough. Every good relationship becomes evidence you're waiting to lose.",
  "The Push-Pull Protector": "You're simultaneously desperate for connection and terrified of it. You push people away and then panic when they go.",
  "The Door-Closer": "The moment a relationship becomes real, you manufacture reasons to exit. Closeness feels like a trap, not a gift.",
  "The Rejection Radar": "You're running a surveillance operation on every person you date. By the time they prove you wrong, you've already half-left.",
  "The Not-Enough Spiral": "You've outsourced your value to how chosen you feel. That makes every relationship a referendum on your worth.",
  "The Tester": "You will never directly ask for what you need. You'll test, prod, and create conflict instead — and wonder why no one passes.",
  "The Slow Fade": "You don't end things. You just become less and less present until the relationship dissolves — with you innocent.",
};

export const LOOP_STEPS: Record<string, { trigger: string; brainStory: string; behavior: string; outcome: string }> = {
  "The Chase and Test Cycle": { trigger: "They get close or emotionally real with you", brainStory: "\"This is too much. I need to know if they'll stay if I pull back.\"", behavior: "You withdraw, go cold, or create subtle distance", outcome: "They get confused and pull back → you panic and re-engage → cycle repeats" },
  "The Leave Before It Hurts Pattern": { trigger: "The relationship starts to feel genuinely serious", brainStory: "\"Something will go wrong. I should be the one to control when it ends.\"", behavior: "You find flaws, create distance, or start checking out emotionally", outcome: "You leave or make them leave → feel relief briefly → then feel the loss" },
  "The Not Chosen Wound": { trigger: "You receive consistent affection or care", brainStory: "\"They don't really know me yet. When they do, they'll leave.\"", behavior: "You stay anxious, seek extra reassurance, or preemptively distance", outcome: "Relationship becomes exhausting → they pull back → confirms your story" },
  "The Push-Pull Protector": { trigger: "Any increase in emotional intensity — good or bad", brainStory: "\"I want this but I can't handle this.\"", behavior: "You alternate between intense closeness and sharp withdrawal", outcome: "Partner becomes destabilized → dynamic becomes chaotic → you mistake chaos for chemistry" },
  "The Door-Closer": { trigger: "A relationship becomes emotionally safe or dependable", brainStory: "\"Why am I bored? There must be something wrong with them.\"", behavior: "Nitpick, mentally compare, manufacture distance", outcome: "Leave a stable relationship → repeat with someone new → wonder why nothing lasts" },
  "The Rejection Radar": { trigger: "Any ambiguous signal — slower reply, different tone, distracted energy", brainStory: "\"Something's wrong. They're losing interest.\"", behavior: "Hyper-analyze, seek reassurance, over-function or go silent", outcome: "Create the exact anxiety you feared → relationship destabilizes" },
  "The Not-Enough Spiral": { trigger: "Feeling overlooked, under-prioritized, or not chosen", brainStory: "\"I knew it. I'm not worth consistent love.\"", behavior: "Withdraw, seek external validation, or stay in relationships that confirm the wound", outcome: "Attract or tolerate treatment that matches the belief → cycle deepens" },
  "The Tester": { trigger: "Feeling uncertain, unseen, or needing reassurance", brainStory: "\"If I just create the right situation, I'll know if they actually care.\"", behavior: "Go quiet, pick a fight, withhold warmth — and watch the response", outcome: "They fail the invisible test → you feel justified → direct communication never happens" },
  "The Slow Fade": { trigger: "Conflict, vulnerability, or deepening emotional demand", brainStory: "\"I can't deal with this right now. I'll just not.\"", behavior: "Emotional shutdown, reduced contact, physical or mental disappearance", outcome: "Relationship ends without conversation → feel guilty but relieved → pattern repeats" },
};

export const FLIP_PAIRS: Record<string, Array<{ story: string; signal: string }>> = {
  fear_of_closeness: [
    { story: "\"I just need space. It's not about them.\"", signal: "Your nervous system is treating their love like a threat. Space is the exit strategy." },
    { story: "\"I'm losing interest. Maybe they're not right for me.\"", signal: "Your brain manufactures flaws when closeness spikes. The boredom is a defense, not a truth." },
    { story: "\"I value my independence.\"", signal: "You've confused emotional unavailability with self-sufficiency. There's a difference." },
  ],
  rejection_alarm: [
    { story: "\"I just have good intuition about people.\"", signal: "Your nervous system is hypervigilant, not psychic. It scans for danger in neutral data." },
    { story: "\"They seem off today. Something's wrong.\"", signal: "You're narrating a story from their silence. They might just be tired." },
    { story: "\"I just like to stay emotionally prepared.\"", signal: "You're pre-grieving losses that haven't happened. It's exhausting and damaging the present." },
  ],
  worthiness_wounds: [
    { story: "\"I'm very self-aware.\"", signal: "Self-awareness and self-worth are different. You can see your patterns and still believe you don't deserve love." },
    { story: "\"Good relationships just haven't worked out for me.\"", signal: "You've been selecting for relationships that match how you feel about yourself — not what you need." },
    { story: "\"I don't need much reassurance.\"", signal: "You've learned to suppress the need. Suppressed needs don't disappear — they become tests and exits." },
  ],
  protest_testing: [
    { story: "\"I just needed some space. I wasn't testing them.\"", signal: "The withdrawal was designed to produce a reaction. You just won't admit it." },
    { story: "\"They should know what they did.\"", signal: "They don't. And you know they don't. The silence is a test — not a boundary." },
    { story: "\"I pick fights because I'm passionate.\"", signal: "The fight is a reassurance request in disguise. Say what you actually need." },
  ],
  withdrawal_exit: [
    { story: "\"I just shut down when I'm overwhelmed.\"", signal: "Shutting down is your armor. It feels like protection — to them it reads as abandonment." },
    { story: "\"I didn't break up with them. Things just faded.\"", signal: "You ended it. You just made them do the work of noticing." },
    { story: "\"I need time to process before I can talk.\"", signal: "Processing time is valid. Weeks of silence followed by slow ghosting is not processing — it's exiting." },
  ],
};

export const REWIRING_STEPS: Record<SubscaleKey, Array<{ title: string; description: string; microAction: string }>> = {
  fear_of_closeness: [
    { title: "Name the shutdown before it happens", description: "When closeness starts to feel uncomfortable, label it out loud — to yourself first, then to them. 'I'm feeling the urge to pull back right now' is the first break in the loop.", microAction: "The next time you feel the urge to pull away, write down exactly what triggered it before you act." },
    { title: "Stay 10 minutes longer than feels comfortable", description: "Not hours. Not forever. Just slightly past the point where your brain says 'this is too much.' You're retraining the threshold, not flipping a switch.", microAction: "In one moment of closeness discomfort, do nothing for 10 minutes. Observe what actually happens." },
    { title: "Distinguish safety from boredom", description: "Your brain labels 'reliable partner' as 'low stimulation.' Stability is not the same as dead. Ask: is this boring, or is this just not anxious?", microAction: "Write 3 things that are genuinely good about someone stable in your life." },
  ],
  rejection_alarm: [
    { title: "Create a 20-minute rule for threat stories", description: "When the alarm fires, you're not allowed to act on the interpretation for 20 minutes. Most rejection alarm stories dissolve in under 15 minutes with no input.", microAction: "Set a timer. Don't text, don't analyze, don't spiral. Just wait." },
    { title: "Ask directly instead of reading signals", description: "'Are we okay?' is terrifying. It's also 10 seconds of discomfort versus 6 hours of surveillance. Direct questions are the antidote to hypervigilance.", microAction: "Ask one direct question instead of interpreting one ambiguous signal this week." },
    { title: "Track false alarms, not confirmed fears", description: "Every time your rejection alarm fired and was wrong — write it down. You likely have far more false alarms than confirmed rejections.", microAction: "Keep a 3-day log. Every alarm, mark what actually happened." },
  ],
  worthiness_wounds: [
    { title: "Stop outsourcing your value to their behavior", description: "You've been treating how people treat you as evidence of what you're worth. Their behavior reflects their patterns — not your value.", microAction: "When you feel unvalued, write: 'This is about their behavior. Not my worth.'" },
    { title: "Practice receiving without deflecting", description: "When someone is kind or consistent — resist the urge to find the catch, minimize it, or feel suspicious. Let it land. Just for a moment.", microAction: "When something good happens in a relationship, don't shrink it. Say 'thank you' and mean it." },
    { title: "Trace the wound to its origin", description: "At some point you learned you were 'too much' or 'not enough.' That was someone else's limitation — often an early attachment figure. It was about them, not a fact about you.", microAction: "Write one sentence about where you first learned you might not be enough." },
  ],
  protest_testing: [
    { title: "Convert tests into direct requests", description: "'Go cold and see if they notice' → 'I need to know you still care about me.' The second is harder and 100x more effective. Start with: 'I need' or 'I'm scared that.'", microAction: "Write out the last test you ran and rewrite it as one direct honest sentence." },
    { title: "Sit with unresolved anxiety for 30 minutes", description: "The urge to test usually peaks and drops. If you can tolerate the anxiety for 30 minutes without acting, the need often passes — and you didn't create new damage.", microAction: "Once, when you feel the urge to test — wait 30 minutes and write what you actually need." },
    { title: "Say the real thing in low-stakes moments first", description: "Practicing direct communication in calm moments makes it available in crisis. 'I liked when you did that' is easier than 'I need you to show me you care' mid-fight.", microAction: "Say one honest, direct positive thing to someone close to you this week." },
  ],
  withdrawal_exit: [
    { title: "Name the shutdown while it's happening", description: "The moment you feel yourself going blank, say it out loud. 'I'm shutting down right now. I'm not gone, I just need five minutes.' This single sentence breaks the loop.", microAction: "Practice saying 'I'm shutting down' to yourself in the mirror until it doesn't feel dramatic." },
    { title: "24-hour rule before going silent", description: "Before you ghost, slow-fade, or go absent — wait 24 hours and then say one sentence about what you're feeling. Even a bad sentence. Even a text.", microAction: "Write out one thing you withdrew from that you never explained — and the sentence you could have said." },
    { title: "Distinguish overwhelm from disinterest", description: "Your nervous system reads emotional intensity as 'too much' and activates shutdown. Overwhelm is temporary. Don't make permanent decisions from it.", microAction: "Next time you want to leave or go silent, ask: 'Am I overwhelmed or am I genuinely done?'" },
  ],
};
