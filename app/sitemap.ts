import { MetadataRoute } from "next";
import { quizRegistry } from "@/lib/quizzes/registry";
import { SYMPTOM_PAGES } from "@/lib/seo/symptoms";
import { TICK_TESTS } from "@/lib/quizzes/tickTests";
import { VERSUS_GAMES } from "@/lib/quizzes/versus";
import { CHOICE_GAMES } from "@/lib/quizzes/choiceGames";
import { LIVE_PROGRAMS } from "@/lib/programs/registry";

// FORCES NEXT.JS TO GENERATE THIS AT BUILD TIME FOR STATIC EXPORTS
export const dynamic = "force-static";

const baseUrl = "https://www.oopscupid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Hub / static pages not in the quiz registry
  const staticRoutes = [
    "",
    "/quizzes",
    "/him",
    "/me",
    "/friends",
    "/workbook",
    "/articles",
    "/coaching",
    "/articles/manipulation-science",
    "/articles/is-my-friend-toxic",
    "/privacy",
    "/terms",
    "/signs",
    "/things-he-says",
    ...TICK_TESTS.map((t) => `/${t.slug}`),
    ...VERSUS_GAMES.map((g) => `/${g.slug}`),
    "/guides",
    "/red-flag-or-green-flag",
    "/games",
    "/daily",
    "/flag-runner",
    "/love-tower",
    "/kiss-the-frogs",
    "/heart-wars",
    ...CHOICE_GAMES.map((g) => `/${g.slug}`),
    // Guide pages are paid: before buying they show only a title and a
    // hook, which Google won't rank. Kept out so it spends its visits on
    // pages that can rank. /guides itself stays.
  ];

  // No lastModified: it used to be "now" on every deploy (several a day), which
  // tells Google nothing and teaches it to ignore the field.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority:
      route === "" ? 1 : route === "/things-he-says" || TICK_TESTS.some((t) => route === `/${t.slug}`) ? 0.9 : route === "/coaching" ? 0.9 : 0.7,
  }));

  // Every quiz & article funnel comes from the registry, adding a quiz
  // there automatically adds it here.
  const registryEntries: MetadataRoute.Sitemap = quizRegistry.map((q) => ({
    url: `${baseUrl}${q.slug}`,
    changeFrequency: "weekly" as const,
    priority: q.isQuiz ? 0.9 : 0.8,
  }));

  // Long-tail symptom pages. These are the pages that can realistically
  // rank, the category keywords belong to the big health sites.
  const symptomEntries: MetadataRoute.Sitemap = SYMPTOM_PAGES.map((p) => ({
    url: `${baseUrl}/signs/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Programme overviews can explain the offer to search visitors. Individual
  // exercise sessions stay out: their metadata already marks them noindex.
  const programEntries: MetadataRoute.Sitemap = LIVE_PROGRAMS.map((p) => ({
    url: `${baseUrl}/workbook/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...registryEntries, ...symptomEntries, ...programEntries];
}
