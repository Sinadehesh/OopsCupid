import { MetadataRoute } from 'next'

// FORCES NEXT.JS TO GENERATE THIS AT BUILD TIME FOR STATIC EXPORTS
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oopscupid.com'

  // List of all your important routes
  const routes = [
    '',
    '/quizzes',
    '/him',
    '/me',
    '/friends',
    '/articles',
    // Dating & Him Tools
    '/is-he-manipulative',
    '/is-he-gaslighting-me',
    '/is-he-cheating',
    '/dating-texting-analysis',
    '/partners-attachment-style',
    // Me & Self Reflection
    '/attachment-style-quiz',
    '/why-do-i-attract-toxic-people',
    '/attraction-patterns',
    '/why-do-i-sabotage-relationships',
    // Friendships
    '/friend-group-role',
    '/toxic-friend-test',
    '/are-my-friends-bad-for-me',
    '/are-your-friends-using-you',
    // Articles
    '/articles/manipulation-science',
    '/articles/is-my-friend-toxic',
    '/love-bombing-signs',
    '/trauma-bonding-signs',
    '/understanding-attachment-styles',
    '/signs-of-a-toxic-friend'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8, // Homepage is highest priority
  }))
}
