import { TOXIC_FRIEND_QUESTIONS } from "../_data/questions";

export function generatePremiumNarrative(archetype: string, tier: number, mods: any) {
  let narrative = "";
  let distortionCheck = "";
  let actionPlan = {
    immediate: [] as string[],
    medium: [] as string[],
    long: [] as string[]
  };
  let scripts = [] as { title: string; text: string }[];

  // Archetype specific text
  if (archetype === "The Choreographer" || mods.manipulation >= 60) {
    narrative = "Your friend operates as 'The Choreographer.' They use subtle leverage—like guilt, emotional blackmail, or withholding affection—to shape your behavior and keep you compliant. The toxicity is often masked as care or vulnerability.";
    distortionCheck = "You are not overreacting. Because the harm is indirect, it's easy to blame yourself. However, healthy friendships do not require you to constantly monitor your behavior to avoid triggering their passive-aggression or 'hurt' feelings.";
    actionPlan.immediate = ["Stop over-explaining your 'no'. Keep boundaries to one simple sentence.", "Recognize guilt as a manipulation tactic, not a sign you did something wrong."];
    actionPlan.medium = ["Start a 'drop-the-rope' test: stop initiating contact and see what happens.", "Decline to answer invasive questions by smoothly changing the subject."];
    actionPlan.long = ["Gradually fade out contact if the relationship does not rebalance.", "Reinvest the emotional energy into reciprocal connections."];
    scripts = [
      { title: "When they guilt-trip you for being busy", text: "I know it's disappointing we can't hang out, but I have to stick to my schedule right now. Let's catch up next week." },
      { title: "When they use the silent treatment", text: "(Say nothing. Do not chase them or apologize just to restore peace. Let them sit in their silence.)" }
    ];
  } else if (archetype === "The Social Saboteur" || mods.aggression >= 60) {
    narrative = "Your results point to 'The Social Saboteur.' This dynamic relies on relational aggression—gossip, exclusion, triangulation, and public-private inconsistency. They use social capital as a weapon to maintain power over you.";
    distortionCheck = "You are not imagining things. Relational aggression is specifically designed to be deniable. If you confront them, they will likely say it was 'just a joke' or that you are 'too sensitive.' Trust your gut: the social punishment is real.";
    actionPlan.immediate = ["Put them on an immediate 'Information Diet.' Stop sharing secrets or insecurities.", "Do not participate if they try to gossip about others to you."];
    actionPlan.medium = ["Build independent friendships outside of this specific social circle.", "Call out subtle digs in the moment by playing dumb ('What did you mean by that?')."];
    actionPlan.long = ["Accept that you cannot control the narrative they spin, only your own actions.", "Detach from the need for their social validation."];
    scripts = [
      { title: "When they make a 'joking' insult in public", text: "I don't get the joke. Can you explain why that's funny?" },
      { title: "When they try to triangulate you", text: "I'd rather not talk about [Name] when they aren't here. How was your weekend though?" }
    ];
  } else if (archetype === "The Energy Vampire" || mods.impact >= 60) {
    narrative = "This friendship operates as 'The Energy Vampire.' It is profoundly one-sided and draining. While it may not be explicitly dangerous, the reciprocity is fundamentally broken. You are acting as emotional life-support for someone who does not return the effort.";
    distortionCheck = "While you are feeling genuine frustration, the data suggests this might be an issue of poor boundaries and extreme self-centeredness rather than calculated malice. It is valid to feel exhausted, and you don't need a 'villain' to justify stepping back.";
    actionPlan.immediate = ["Stop acting as their free therapist. Set time limits on conversations.", "Wait 24 hours before responding to non-emergency crisis texts."];
    actionPlan.medium = ["Stop offering solutions; let them solve their own problems.", "Redirect the conversation to mutual interests, not just their drama."];
    actionPlan.long = ["Accept the friendship for what it is (shallow) and grieve the depth you wanted.", "Enforce strict energetic boundaries to protect your peace."];
    scripts = [
      { title: "When they start a 2-hour vent session", text: "I only have 10 minutes to chat right now, but I hope you get that sorted out!" },
      { title: "When they demand immediate emotional labor", text: "I'm not in a headspace to talk about heavy stuff today. Let's talk tomorrow." }
    ];
  } else {
    narrative = "The data indicates a complex mix of direct hostility and unpredictability. This friend likely struggles with emotional regulation, resulting in a dynamic where you feel like you are walking on eggshells.";
    distortionCheck = "It is normal to question yourself when a friend acts warm one day and hostile the next. However, intermittent reinforcement is a classic hallmark of toxic cycles. The unpredictability IS the control.";
    actionPlan.immediate = ["Do not engage when they are escalated. Walk away.", "Document incidents privately to ground yourself in reality."];
    actionPlan.medium = ["Identify your 'dealbreaker' behaviors and prepare exit strategies.", "Seek support from trusted third parties or a professional."];
    actionPlan.long = ["De-escalate the friendship. Highly toxic friends often react poorly to formal breakups; the 'fade out' method is usually safer."];
    scripts = [
      { title: "When they lash out unpredictably", text: "I'm going to step away from this conversation until things cool down. We can try again later." },
      { title: "When they demand you apologize for their behavior", text: "I understand you see it that way, but I have a different perspective on what happened." }
    ];
  }

  return { narrative, distortionCheck, actionPlan, scripts };
}

export function extractRedFlags(answers: Record<string, string>) {
  // Find highest endorsed negative behaviors
  const flags = Object.entries(answers).map(([id, val]) => {
    const q = TOXIC_FRIEND_QUESTIONS.find(x => x.id === id);
    let score = 0;
    if (q?.responseType === "binary") score = val === "Yes" ? 4 : 0;
    else score = parseInt(val.charAt(0)) || 0;
    
    return { q, score, val };
  })
  .filter(f => f.q && !f.q.module.includes("Validity") && f.score >= 3)
  .sort((a, b) => b.score * (a.q?.weight || 1) - a.score * (b.q?.weight || 1))
  .slice(0, 3);

  return flags;
}
