export function generateAttachmentNarrative(
  domain: string,
  classification: string,
  isSingle: boolean,
  gender: string,
  hasChildren: boolean
): string {
  const lowerClass = classification.toLowerCase();

  if (lowerClass.includes("anxious") || lowerClass.includes("preoccupied")) {
    return "Here is the brutal truth: You are carrying the emotional weight of this relationship. You overthink their texts, panic when they pull away, and constantly feel like you care more than they do. Your nervous system is wired to fear abandonment, which subconsciously attracts partners who play games with your heart. You need to rewire this panic response immediately before it burns you out.";
  }

  if (lowerClass.includes("avoidant") || lowerClass.includes("dismissive")) {
    return "Here is the brutal truth: When things get too close or too serious, you feel trapped. You start finding flaws in your partner, and suddenly, a safe, peaceful relationship feels like 'boredom.' You are subconsciously pushing away the exact people who actually care about you because your brain confuses intimacy with a loss of independence. You need to break this sabotage loop.";
  }

  if (lowerClass.includes("fearful") || lowerClass.includes("disorganized")) {
    return "Here is the brutal truth: You are trapped in an exhausting emotional tug-of-war. You desperately crave deep love, but the second you get it, you panic and push them away. This 'hot and cold' cycle usually stems from deep, unresolved trust issues. You are living in emotional survival mode, creating chaos to protect yourself. You need a proven framework to find emotional safety.";
  }

  // Secure
  return "Here is the brutal truth: You have a Secure attachment, which is the gold standard. You are comfortable with intimacy and do not panic easily. However, your high empathy and stability make you a prime target for toxic, anxious, or avoidant partners who want to drain your emotional energy. You must learn the exact boundary scripts to protect your peace from emotional vampires.";
}

export function generateEmotionNarrative(level: string): string {
  return "Your Emotion Control score dictates how easily a partner's bad behavior can trigger you into an emotional spiral. The lower your control, the easier it is for toxic people to gaslight you and control your reactions.";
}

export function generateSelfEsteemNarrative(score: number): string {
  return "Your Self-Worth Index measures your internal armor. If this is low, you are subconsciously accepting less than you deserve, making excuses for their red flags, and staying in painful situationships way too long.";
}
