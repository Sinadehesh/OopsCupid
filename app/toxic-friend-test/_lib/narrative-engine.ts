import { TOXIC_FRIEND_QUESTIONS } from "../_data/questions";

export function generatePremiumNarrative(answers: Record<string, string>, scoringData: any) {
  const { tier, archetype, mods } = scoringData;

  // 1. Extract Top 3 Red Flags
  const redFlags = Object.entries(answers)
    .map(([id, val]) => {
      const q = TOXIC_FRIEND_QUESTIONS.find(x => x.id === id);
      if (!q) return null;
      let num = q.responseType === "binary" ? (val === "Yes" ? 4 : 0) : parseInt(val.charAt(0)) || 0;
      return { question: q, score: num * q.weight };
    })
    .filter(x => x && x.score >= 3)
    .sort((a, b) => (b?.score || 0) - (a?.score || 0))
    .slice(0, 3)
    .map(x => ({
      text: x?.question.text,
      subscale: x?.question.subscale
    }));

  // 2. Generate "Are you overreacting?" Distortion Check
  let distortionCheck = "While every friendship has bumps, the data clearly shows this is more than occasional friction.";
  if (mods.aggression > 60) {
    distortionCheck = "You are not overreacting. Relational aggression (exclusion, gossip) is designed to be subtle and deniable. If you confront them, they may call you 'too sensitive.' Trust your gut: the social punishment is real.";
  } else if (mods.manipulation > 60) {
    distortionCheck = "You are not imagining it. This friend uses emotional leverage (guilt, dependency) to control you. Because it's framed as 'care' or 'closeness,' it's easy to doubt yourself, but the boundary violations are measurable.";
  } else if (tier >= 4) {
    distortionCheck = "Your experience is validated by your data. Healthy friendships do not require you to constantly monitor your behavior to avoid triggering the other person. The exhaustion you feel is a direct result of their behavior.";
  }

  // 3. Generate Action Plan & Scripts based on Dominant Archetype
  let actions = { immediate: "", medium: "", longTerm: "" };
  let scripts = [] as { title: string, text: string }[];

  if (archetype === "The Choreographer" || mods.manipulation > 50) {
    actions = {
      immediate: "Information Diet: Stop sharing sensitive personal information or insecurities right now.",
      medium: "Delay Responses: Stop answering their texts immediately. Wait 2-4 hours to break the dependency cycle.",
      longTerm: "De-escalate slowly: Highly controlling friends react badly to dramatic breakups. Gradually become 'boring' and busy."
    };
    scripts = [
      { title: "Deflecting Guilt", text: "I can't help with that right now, but I hope you get it sorted out." },
      { title: "Setting a Time Limit", text: "I only have 10 minutes to chat, then I have to run." }
    ];
  } else if (archetype === "The Social Saboteur" || mods.aggression > 50) {
    actions = {
      immediate: "Document and Detach: Note when they twist your words. Do not confront them in a group setting.",
      medium: "Diversify Friends: Reconnect with people outside of this specific friend group.",
      longTerm: "Establish an Iron Boundary: Refuse to engage in gossip about others with them."
    };
    scripts = [
      { title: "Shutting Down Gossip", text: "I'd rather not talk about [Name] while they aren't here." },
      { title: "Addressing Exclusion", text: "I noticed I was left off the invite. I'm taking a step back from this dynamic." }
    ];
  } else {
    actions = {
      immediate: "The 'Drop the Rope' Test: Stop initiating contact for 2 weeks. See if they reach out.",
      medium: "Communicate Needs: Tell them exactly what you need in a neutral moment.",
      longTerm: "Re-evaluate Investment: Shift your energy to reciprocal relationships."
    };
    scripts = [
      { title: "Testing Reciprocity", text: "I've been feeling like I initiate a lot. I'm going to step back and let you make the next plan." },
      { title: "Addressing Drain", text: "I don't have the emotional bandwidth for this topic today. Let's talk about something else." }
    ];
  }

  return { redFlags, distortionCheck, actions, scripts };
}
