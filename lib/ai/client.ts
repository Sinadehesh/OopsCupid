import OpenAI from "openai";

/**
 * AI PROVIDER
 *
 * DeepSeek, Moonshot (Kimi) and OpenAI all speak the same wire format, so
 * one client serves all three and the model is an environment variable
 * rather than a code change.
 *
 * Why this matters here: the workbook review reads what somebody wrote
 * about their own relationships, then writes several hundred words back.
 * On OpenAI that is real money per review; on DeepSeek it is a fraction
 * of a cent. At a €49 price point with an unknown number of buyers, being
 * able to move providers without a deploy is worth the small abstraction.
 *
 *   AI_PROVIDER = deepseek | moonshot | openai      (default: deepseek)
 *   AI_API_KEY  = the key for that provider
 *   AI_MODEL    = optional override
 *
 * OPENAI_API_KEY is still read as a fallback so the existing attachment
 * report keeps working untouched.
 */

type Provider = "deepseek" | "moonshot" | "openai";

const PROVIDERS: Record<Provider, { baseURL?: string; model: string; keyEnv: string }> = {
  deepseek: {
    baseURL: "https://api.deepseek.com",
    model: "deepseek-chat",
    keyEnv: "DEEPSEEK_API_KEY",
  },
  moonshot: {
    // Kimi. Use api.moonshot.cn for a mainland-China account.
    baseURL: "https://api.moonshot.ai/v1",
    model: "kimi-k2-0905-preview",
    keyEnv: "MOONSHOT_API_KEY",
  },
  openai: {
    baseURL: undefined, // SDK default
    model: "gpt-4o",
    keyEnv: "OPENAI_API_KEY",
  },
};

function provider(): Provider {
  const p = (process.env.AI_PROVIDER ?? "deepseek").toLowerCase();
  return (p in PROVIDERS ? p : "deepseek") as Provider;
}

export function aiModel(): string {
  return process.env.AI_MODEL ?? PROVIDERS[provider()].model;
}

export function aiProviderName(): string {
  return provider();
}

/** True when a usable key is configured — callers degrade rather than throw. */
export function aiConfigured(): boolean {
  const cfg = PROVIDERS[provider()];
  return Boolean(process.env.AI_API_KEY || process.env[cfg.keyEnv] || process.env.OPENAI_API_KEY);
}

/**
 * Built per request, never at module scope: a module-level client throws at
 * import time when the key is missing, which took down every build on this
 * project once already.
 */
export function getAI(): OpenAI {
  const cfg = PROVIDERS[provider()];
  const apiKey =
    process.env.AI_API_KEY ?? process.env[cfg.keyEnv] ?? process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      `No API key for AI_PROVIDER="${provider()}". Set AI_API_KEY or ${cfg.keyEnv}.`
    );
  }

  return new OpenAI({ apiKey, baseURL: cfg.baseURL });
}
