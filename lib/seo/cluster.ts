import { TICK_TESTS } from "@/lib/quizzes/tickTests";
import { TYPE_QUIZZES } from "@/lib/quizzes/typeQuizzes";
import { SYMPTOM_PAGES } from "@/lib/seo/symptoms";
import { quizRegistry } from "@/lib/quizzes/registry";
import { programForQuiz } from "@/lib/programs/registry";

/**
 * TOPIC CLUSTERS: which pages belong together, for internal links that are
 * in the server HTML.
 *
 * Every quick quiz names the full test it leads into, and every /signs
 * page names the full test it funnels to, so a full test plus its quick
 * quizzes plus its signs pages is a topic cluster. Linking them to each
 * other tells Google what each page is about and gives it a path to pages
 * it has discovered but not crawled yet. The quick quizzes' own links to
 * other quizzes only appear after a result, which a crawler never reaches.
 */

export interface ClusterLink {
  href: string;
  label: string;
}

/**
 * Articles and hubs that belong to a test's cluster without being a test.
 * Every quiz in the cluster links to them, which is how a hub that only
 * the menu pointed at gets found and crawled.
 */
const ARTICLES: { href: string; test: string; label: string }[] = [
  { href: "/understanding-attachment-styles", test: "/attachment-style-quiz", label: "Attachment styles, explained" },
  { href: "/red-flags-in-a-relationship", test: "/is-he-manipulative", label: "The red flags checklist" },
  { href: "/relationship-red-flags", test: "/is-he-manipulative", label: "Relationship red flags" },
  { href: "/love-bombing-signs", test: "/is-he-manipulative", label: "Love bombing signs" },
  { href: "/articles/manipulation-science", test: "/is-he-manipulative", label: "How manipulation works" },
  { href: "/toxic-friendships", test: "/toxic-friend-test", label: "Toxic friendships: every test and sign" },
  { href: "/articles/is-my-friend-toxic", test: "/toxic-friend-test", label: "Subtle signs of a toxic friend" },
];
const ARTICLE_TO_TEST: Record<string, string> = Object.fromEntries(ARTICLES.map((a) => [a.href, a.test]));

function readIn(full: string, except?: string): ClusterLink[] {
  return ARTICLES.filter((a) => a.test === full && a.href !== except).map((a) => ({ href: a.href, label: a.label }));
}

/** The workbook written for this cluster's problem, if one is live. */
function programIn(full: string): ClusterLink | null {
  const p = programForQuiz(full);
  return p ? { href: `/workbook/${p.slug}`, label: p.title } : null;
}

function quickIn(full: string): ClusterLink[] {
  return [
    ...TYPE_QUIZZES.filter((x) => x.own.href === full).map((x) => ({ href: `/${x.slug}`, label: `${x.emoji} ${x.short}` })),
    ...TICK_TESTS.filter((t) => t.full.href === full).map((t) => ({ href: `/${t.slug}`, label: `${t.emoji} ${t.short}` })),
  ];
}

function signsIn(full: string): ClusterLink[] {
  return SYMPTOM_PAGES.filter((p) => p.quiz === full).map((p) => ({ href: `/signs/${p.slug}`, label: p.phrase }));
}

function fullLink(full: string): ClusterLink | null {
  const q = quizRegistry.find((x) => x.slug === full);
  if (!q) return null;
  const size = q.questionCount ? ` (${q.questionCount} questions, free)` : " (free)";
  return { href: q.slug, label: `${q.title}${size}` };
}

/** The next `n` after `at`, wrapping, so every page in a cluster gets linked. */
function around<T>(xs: T[], at: number, n: number): T[] {
  if (xs.length <= n) return xs;
  return Array.from({ length: n }, (_, k) => xs[(at + 1 + k) % xs.length]);
}

/** For a quick quiz: its full test, a few sibling quizzes, a few signs pages, the cluster's reading and its workbook. */
export function clusterForQuick(slug: string, full: string) {
  const quick = quickIn(full);
  const at = Math.max(0, quick.findIndex((x) => x.href === `/${slug}`));
  const signs = signsIn(full);
  return {
    full: fullLink(full),
    quick: around(quick.filter((x) => x.href !== `/${slug}`), at - 1, 4),
    signs: around(signs, at - 1, 3),
    read: readIn(full),
    program: programIn(full),
  };
}

/** For a full test or an article in its cluster: every quick quiz, signs page and article, and the workbook. */
export function clusterForPage(slug: string) {
  const full = ARTICLE_TO_TEST[slug] ?? slug;
  return {
    full: full !== slug ? fullLink(full) : null,
    quick: quickIn(full),
    signs: signsIn(full).filter((x) => x.href !== slug),
    read: readIn(full, slug),
    program: programIn(slug) ?? programIn(full),
  };
}

/** For a /signs page: the quick versions of the test it funnels to. */
export function quickForSign(signSlug: string, full: string): ClusterLink[] {
  const quick = quickIn(full);
  const i = SYMPTOM_PAGES.findIndex((p) => p.slug === signSlug);
  return around(quick, Math.max(0, i) - 1, 3);
}
