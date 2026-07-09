import { MetadataRoute } from "next";
import { quizRegistry } from "@/lib/quizzes/registry";

// FORCES NEXT.JS TO GENERATE THIS AT BUILD TIME FOR STATIC EXPORTS
export const dynamic = "force-static";

const baseUrl = "https://oopscupid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Hub / static pages not in the quiz registry
  const staticRoutes = [
    "",
    "/quizzes",
    "/him",
    "/me",
    "/friends",
    "/articles",
    "/coaching",
    "/articles/manipulation-science",
    "/articles/is-my-friend-toxic",
    "/why-do-i-attract-toxic-people-article",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/coaching" ? 0.9 : 0.7,
  }));

  // Every quiz & article funnel comes from the registry — adding a quiz
  // there automatically adds it here.
  const registryEntries: MetadataRoute.Sitemap = quizRegistry.map((q) => ({
    url: `${baseUrl}${q.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: q.isQuiz ? 0.9 : 0.8,
  }));

  return [...staticEntries, ...registryEntries];
}
