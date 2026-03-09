export type ScaleDefinition = {
  id: string;
  items: string[];
  min: number;
  max: number;
  reverse?: string[];
  subscales?: Record<string, string[]>;
  valueMapping?: Record<string, number>;
};

export type ScaleResult = {
  total: number;
  mean: number;
  itemScores: Record<string, number>;
  subscaleMeans: Record<string, number>;
  subscaleTotals: Record<string, number>;
};

export function scoreScale(def: ScaleDefinition, answers: Record<string, string>): ScaleResult {
  const itemScores: Record<string, number> = {};
  let total = 0;

  def.items.forEach(itemId => {
    const rawStr = answers[itemId] ?? "";
    let raw = def.min; // Default fallback to minimum safe value

    // 1. Check custom value mapping
    if (def.valueMapping && def.valueMapping[rawStr] !== undefined) {
      raw = def.valueMapping[rawStr];
    } 
    // 2. Parse leading integers from Likert strings (e.g. "4 - Neutral" -> 4)
    else {
      raw = parseInt(rawStr.split("-")[0].trim(), 10) || 
            parseInt(rawStr.split("–")[0].trim(), 10) || def.min;
    }

    // 3. Apply reverse scoring
    if (def.reverse?.includes(itemId)) {
      raw = (def.max + def.min) - raw;
    }

    itemScores[itemId] = raw;
    total += raw;
  });

  const subscaleMeans: Record<string, number> = {};
  const subscaleTotals: Record<string, number> = {};

  if (def.subscales) {
    for (const [subscale, items] of Object.entries(def.subscales)) {
      let sum = 0;
      let validItems = 0;
      items.forEach(id => { 
        if (itemScores[id] !== undefined) {
          sum += itemScores[id]; 
          validItems++;
        }
      });
      subscaleTotals[subscale] = sum;
      subscaleMeans[subscale] = validItems > 0 ? sum / validItems : 0;
    }
  }

  return {
    total,
    mean: def.items.length > 0 ? total / def.items.length : 0,
    itemScores,
    subscaleMeans,
    subscaleTotals
  };
}
