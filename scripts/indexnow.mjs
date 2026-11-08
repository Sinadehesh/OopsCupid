/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver; Bing's index also feeds
 * ChatGPT search, DuckDuckGo and Yahoo) which pages are new or changed, so
 * they're crawled in hours instead of weeks. Google doesn't take part, and
 * its old sitemap ping is gone; it reads the sitemap on its own schedule.
 *
 *   node scripts/indexnow.mjs                 every URL in the live sitemap
 *   node scripts/indexnow.mjs /am-i-delulu    just these paths
 *
 * Run it after a deploy that adds or changes pages, not on a timer:
 * IndexNow asks for changed URLs only. The key is public by design; the
 * file at /<key>.txt proves the site is ours.
 */

const HOST = "www.oopscupid.com";
const KEY = "c143b55423bb40dad12264c6b154636a";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});

// 200 and 202 both mean accepted.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 300) {
  console.log(await res.text());
  process.exit(1);
}
