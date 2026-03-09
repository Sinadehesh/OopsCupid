import { AttachmentClassification } from "./classification";

export function generateAttachmentNarrative(domain: string, style: AttachmentClassification, isSingle: boolean, gender: string, hasChildren: boolean): string {
  const contextMap: Record<string, string> = {
    general: "In your general approach to relationships",
    romantic: isSingle ? "In your dating life" : "In your romantic relationship",
    mother: "Reflecting on your relationship with your mother/maternal figure",
    father: "Reflecting on your relationship with your father/paternal figure",
    work: "In your professional environment and team dynamics"
  };

  const intro = contextMap[domain] || "In this area";

  switch (style) {
    case "Secure":
      return `${intro}, you show a healthy, resilient capacity for connection. You balance intimacy with independence, assuming positive intent and trusting that you are worthy of care and respect.`;
    case "Anxious-Preoccupied":
      return `${intro}, you deeply desire closeness but carry an underlying fear of abandonment or inconsistency. This often leads to hyper-vigilance, where you monitor for signs of rejection and may over-accommodate to maintain the connection.`;
    case "Avoidant-Dismissive":
      return `${intro}, you tend to prioritize self-reliance and emotional distance. You likely feel overwhelmed or suffocated if things get too close, unconsciously using boundaries or withdrawal as a survival strategy.`;
    case "Fearful-Avoidant":
      return `${intro}, you experience a complex push-pull dynamic. You crave deep connection but are simultaneously terrified of it, which can create a chaotic cycle of drawing close and then suddenly pulling away when it feels 'too real'.`;
    default:
      return `${intro}, your attachment patterns are mixed, displaying situational adaptations.`;
  }
}

export function generateSchemaNarrative(schemaName: string): string {
  const schemas: Record<string, string> = {
    "Fear of Abandonment": "A core, deeply rooted belief that others will eventually leave, become unavailable, or find someone better. This drives intense anxiety when partners pull away.",
    "Mistrust & Abuse": "A protective guard suggesting others will inevitably hurt, betray, or take advantage of you if you let them get close.",
    "Emotional Deprivation": "A chronic feeling that your core emotional needs for warmth, empathy, and understanding will never truly be met by others.",
    "Defectiveness & Shame": "An internal, hidden sense of being fundamentally flawed, bad, or unlovable if people were to see the 'real' you.",
    "Failure": "A persistent feeling of inadequacy compared to peers, often driving perfectionism or, conversely, self-sabotage and giving up.",
    "Subjugation & Self-Sacrifice": "A pattern of suppressing your own needs and emotions to prioritize others, usually driven by a fear of angering them or being rejected."
  };
  return schemas[schemaName] || "A core emotional blueprint influencing how you process relationships.";
}

export function generateEmotionNarrative(level: string): string {
  if (level.includes("High")) return "Your nervous system gets easily overwhelmed during stress or conflict. When triggered, it becomes difficult to access logic or coping strategies, often resulting in emotional flooding that directly activates your insecure attachment patterns.";
  if (level.includes("Moderate")) return "You have a baseline of emotional regulation, but you can become dysregulated under significant relational stress. Learning to pause and self-soothe during conflict will prevent your attachment fears from taking the wheel.";
  return "You show a strong capacity to process, understand, and regulate your emotions. Even during conflict, you are generally able to self-soothe without becoming entirely overwhelmed.";
}

export function generateSelfEsteemNarrative(level: string): string {
  if (level === "High") return "You hold a strong, resilient sense of your own worth. This protects you from tolerating toxic behavior, as your baseline standard for how you expect to be treated is high.";
  if (level === "Normal") return "You have a generally balanced self-view, though it may fluctuate depending on your environment or relationship status. Continuing to build internal validation will strengthen your boundaries.";
  return "You carry a harsh inner critic and often doubt your inherent worth. This is a critical vulnerability, as low self-worth often causes us to subconsciously accept poor treatment from partners because it matches our internal narrative.";
}

export function generateLoveStyleNarrative(style: string): string {
  const styles: Record<string, string> = {
    "Eros (Passionate)": "You value intense, passionate, and immediate romantic chemistry. Love for you is deeply emotional and physical.",
    "Ludus (Game-Playing)": "You view love somewhat playfully or cautiously, preferring to keep things casual, uncommitted, or keeping your options open.",
    "Storge (Friendship-Based)": "You believe the best romantic relationships grow slowly out of deep, stable, and trusting friendships.",
    "Pragma (Practical)": "You approach love practically, seeking logical compatibility in life goals, career trajectory, and background.",
    "Mania (Obsessive)": "You experience love incredibly intensely, often with extreme highs and lows, accompanied by a deep fear of losing the connection.",
    "Agape (Selfless)": "Your love is selfless and giving, often prioritizing your partner's happiness and well-being above your own."
  };
  return styles[style] || "Your approach to romantic love.";
}

export function generateDaydreamingNarrative(level: string): string {
  if (level === "High") return "You frequently retreat into vivid fantasy worlds. While creative, this can act as a maladaptive coping mechanism to escape emotional distress or unmet needs in your real-world relationships.";
  if (level === "Moderate") return "You enjoy a rich inner life and occasionally use daydreaming to self-soothe. Just monitor this to ensure it doesn't replace genuine vulnerability with real partners.";
  return "You stay primarily grounded in the present reality for your emotional processing and relationship building.";
}

export function generateParentingNarrative(style: string): string {
  if (style === "Authoritative") return "You balance warmth with clear, reasoned boundaries. This is the gold standard for raising securely attached children who feel both loved and safe.";
  if (style === "Authoritarian") return "You emphasize discipline and strict rules. While structured, high-control environments without equal emotional warmth can inadvertently foster anxious or avoidant attachment in children.";
  if (style === "Permissive") return "You are highly nurturing and warm, but may struggle to enforce consistent boundaries. Children need predictable structure to feel entirely secure.";
  return "Your parenting approach significantly shapes your children's developing attachment systems.";
}
