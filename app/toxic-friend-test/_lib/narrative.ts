import { TOXIC_FRIEND_QUESTIONS } from "../_data/questions";

export function generatePremiumNarrative(data: any, answers: Record<string, string>) {
  // 1. Extract Top Red Flags (Behaviors marked 3 or 4)
  const redFlags = Object.entries(answers)
    .filter(([_, val]) => val.startsWith("3") || val.startsWith("4"))
    .map(([id, _]) => {
      const q = TOXIC_FRIEND_QUESTIONS.find(x => x.id === id);
      return q ? q.text : null;
    })
    .filter(Boolean)
    .slice(0, 3); // Take top 3

  // 2. Generate Archetype Narrative
  let narrativeText = "";
  let distortionCheck = "";
  
  if (data.archetype === "The Hostile Controller") {
    narrativeText = "This friendship operates heavily on direct control and intimidation. You likely feel like you are walking on eggshells, constantly monitoring their mood to avoid an outburst or silent treatment. This dynamic systematically erodes your autonomy.";
    distortionCheck = "Are you overreacting? No. When someone occasionally acts warm, it makes the hostile moments feel confusing. But your data shows a consistent pattern of control. Healthy friendships do not require you to shrink yourself to keep the peace.";
  } else if (data.archetype === "The Social Saboteur") {
    narrativeText = "This dynamic is defined by relational aggression. The harm is indirect—gossip, exclusion, triangulation, and public/private inconsistency. This friend uses social status as a weapon to keep you off balance.";
    distortionCheck = "Are you overreacting? No. Relational aggression is specifically designed to be deniable. If you confront them, they will likely call you 'too sensitive.' Trust your data: the social punishment is real and intentional.";
  } else if (data.archetype === "The Choreographer") {
    narrativeText = "This friend relies on subtle manipulation, guilt trips, and emotional blackmail. They may play the victim to force you into the caretaker role, leaving you feeling responsible for their emotional state at the expense of your own.";
    distortionCheck = "Are you overreacting? No. Manipulation often looks like 'needing help' or 'just caring a lot.' But your results show high boundary violations. You are allowed to say no without being labeled a bad friend.";
  } else if (data.archetype === "The Chaotic Instigator") {
    narrativeText = "This friendship pulls you into a vortex of instability. Whether through risky behavior, dishonesty, or constant crises, their presence in your life feels like a liability. You are bearing the emotional and social cost of their recklessness.";
    distortionCheck = "Are you overreacting? No. It is not your job to be the stabilizing anchor for someone who repeatedly chooses chaos. Your discomfort is an accurate alarm system.";
  } else {
    narrativeText = "This relationship is deeply one-sided. You act as emotional life-support, doing the heavy lifting to maintain the connection, while receiving very little genuine support in return.";
    distortionCheck = "Are you overreacting? No. While they may not be maliciously plotting against you, the objective imbalance is genuinely draining. Your exhaustion is valid.";
  }

  // 3. Action Plan & Scripts
  let actions = [
    "Information Diet: Stop sharing sensitive vulnerabilities immediately.",
    "The 24-Hour Rule: Stop replying immediately. Wait hours before responding to non-emergencies.",
    "The Drop-the-Rope Test: Stop initiating plans for one month and see if the friendship survives."
  ];

  let scripts = [
    "When they guilt trip you: 'I cannot help with that today, but I hope you figure it out.' (Do not over-explain).",
    "When they gossip/triangulate: 'I prefer not to talk about [Name] when they are not here.'",
    "When they cross a boundary: 'I am not comfortable discussing this topic right now. Let us change the subject.'"
  ];

  return { redFlags, narrativeText, distortionCheck, actions, scripts };
}
