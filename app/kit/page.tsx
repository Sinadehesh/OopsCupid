import type { Metadata } from "next";
import { KIT } from "@/lib/share/kit";
import CopyButton from "@/components/share/CopyButton";
import SaveImagesButton from "@/components/share/SaveImagesButton";
import TodayPost from "@/components/share/TodayPost";
import IndexChecklist from "@/components/share/IndexChecklist";
import { TICK_TESTS } from "@/lib/quizzes/tickTests";
import { quizRegistry } from "@/lib/quizzes/registry";
import { SYMPTOM_PAGES } from "@/lib/seo/symptoms";
import { TYPE_QUIZZES } from "@/lib/quizzes/typeQuizzes";
import { LIVE_PROGRAMS } from "@/lib/programs/registry";
import { stickerStatic, display } from "@/lib/ui/sticker";

export const metadata: Metadata = {
  title: "Share kit | OopsCupid",
  robots: { index: false, follow: false },
};

/**
 * Pages with no Google impressions at all in the 28 days to 19 November
 * 2026 (Search Console), so most are probably not indexed yet. Pages that
 * already show in Google are left out, to save the daily quota. Most
 * valuable first: full tests with searches already waiting ("am i being
 * gaslit quiz" was landing on a game), then the silly quick quizzes, since
 * those get clicked, then tools, hubs, signs pages and workbooks.
 */
const NOT_ON_GOOGLE = [
  "/is-he-gaslighting-me", "/am-i-being-love-bombed", "/is-he-manipulative", "/is-he-cheating", "/toxic-friend-test",
  "/am-i-avoidant", "/do-i-have-attachment-issues", "/quick-attachment-style-quiz", "/why-do-i-sabotage-relationships", "/is-my-girlfriend-dumb",
  "/am-i-delulu", "/is-he-a-player", "/is-he-breadcrumbing-me", "/am-i-too-clingy", "/anxious-avoidant-trap",
  "/is-my-relationship-controlling", "/am-i-mothering-my-boyfriend", "/is-my-friend-manipulative", "/am-i-the-mom-friend", "/is-my-friend-jealous-of-me",
  "/am-i-in-limerence", "/love-styles-quiz", "/is-my-friend-mad-at-me", "/am-i-codependent", "/am-i-being-ghosted",
  "/do-i-have-commitment-issues", "/after-date-survey", "/after-hangout-survey", "/red-flags-in-a-relationship", "/is-my-boyfriend-toxic",
  "/attraction-patterns", "/who-is-attracted-to-me", "/things-he-says", "/things-he-does", "/decode-his-text",
  "/waiting-for-his-reply", "/are-my-friends-bad-for-me", "/are-your-friends-using-you", "/friend-group-role", "/is-my-best-friend-toxic",
  "/love-bombing-signs", "/relationship-red-flags", "/understanding-attachment-styles", "/toxic-friendships", "/signs/he-says-im-too-sensitive",
  "/signs/he-says-it-never-happened", "/signs/i-always-end-up-apologizing", "/signs/he-gives-me-the-silent-treatment", "/signs/i-feel-crazy-around-him", "/signs/hes-been-working-late-every-night",
  "/signs/i-push-people-away", "/signs/my-friend-gets-weird-when-good-things-happen", "/signs/i-overthink-every-text", "/workbook/trust-your-own-mind", "/workbook/earned-security",
  "/workbook/letting-people-in", "/workbook/friendships-that-give-back", "/workbook/loving-someone-who-pulls-away", "/red-flag-or-green-flag", "/heart-wars",
  "/daily", "/him", "/friends", "/signs", "/workbook", "/articles", "/guides", "/articles/manipulation-science", "/articles/is-my-friend-toxic",
];
const LABELS: Record<string, string> = {
  "/red-flags-in-a-relationship": "Red flags in a relationship: the checklist",
  "/after-date-survey": "After-date survey",
  "/after-hangout-survey": "After-hangout survey",
  "/red-flag-or-green-flag": "Red flag or green flag? (game)",
  "/heart-wars": "Heart Wars (game)",
  "/daily": "Daily quiz",
  "/him": "Hub: about him",
  "/friends": "Hub: friendships",
  "/signs": "Hub: signs",
  "/workbook": "Workbooks",
  "/articles": "Articles",
  "/guides": "Guides",
};
function indexPages() {
  const label = (path: string) =>
    LABELS[path] ??
    TICK_TESTS.find((t) => `/${t.slug}` === path)?.question ??
    TYPE_QUIZZES.find((x) => `/${x.slug}` === path)?.title ??
    SYMPTOM_PAGES.find((x) => `/signs/${x.slug}` === path)?.phrase ??
    LIVE_PROGRAMS.map((p) => (`/workbook/${p.slug}` === path ? `Workbook: ${p.title}` : null)).find(Boolean) ??
    quizRegistry.find((q) => q.slug === path)?.title ??
    path;
  return [...new Set(NOT_ON_GOOGLE)].map((path) => ({ path, label: label(path) }));
}

/**
 * The posting kit: today's post picked automatically, with every step
 * spelled out for someone who has never posted, then every quiz's
 * slideshow, pin and caption. Not linked from the site and kept out of
 * search.
 */
export default function KitPage() {
  const today = KIT.map((k) => ({ slug: k.slug, title: k.title, emoji: k.emoji, bg: k.bg, slides: k.slides.length, caption: k.tiktok }));

  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 text-[#1A1033]">
        <h1 className="text-[40px] md:text-5xl leading-[1] mb-3" style={display}>Share kit 📣</h1>
        <p className="text-[16px] font-bold text-[#1A1033]/70 mb-6">
          One post a day, about two minutes. Open this page on your phone and follow the steps.
        </p>

        <TodayPost entries={today} />

        <details className={`rounded-[22px] bg-white p-5 mb-4 ${stickerStatic}`}>
          <summary className="text-lg cursor-pointer" style={display}>🔎 Google: get your missing pages found (2 minutes a day)</summary>
          <p className="mt-3 text-[14px] font-semibold text-[#1A1033]/70">
            These pages got no Google views at all in the last 28 days (checked 19 November), most valuable first. Pages already on Google are left out, so no request is wasted.
          </p>
          <IndexChecklist pages={indexPages()} />
        </details>

        <details className={`rounded-[22px] bg-white p-5 mb-4 ${stickerStatic}`}>
          <summary className="text-lg cursor-pointer" style={display}>🎵 First time on TikTok? Set up once (5 minutes)</summary>
          <ol className="list-decimal pl-5 mt-3 space-y-2 text-[15px] font-semibold leading-snug">
            <li>Download TikTok from the App Store or Google Play and sign up with your email.</li>
            <li>Tap <b>Profile</b> (bottom right), then <b>Edit profile</b>.</li>
            <li>Name: <b>OopsCupid</b>. Username: something like <b>oopscupid</b> or <b>oopscupid.quiz</b>.</li>
            <li>
              Bio: <b>Free relationship quizzes 💘 oopscupid.com</b>
              <span className="ml-2 inline-block align-middle"><CopyButton text="Free relationship quizzes 💘 oopscupid.com" /></span>
            </li>
            <li>Keep it a normal (personal) account: business accounts can&apos;t use most popular songs.</li>
            <li>TikTok only allows a clickable link in your bio after 1,000 followers, so the slides show oopscupid.com instead.</li>
          </ol>
        </details>

        <details className={`rounded-[22px] bg-white p-5 mb-4 ${stickerStatic}`}>
          <summary className="text-lg cursor-pointer" style={display}>📌 Pinterest: all pins in one go (once, 10 minutes, on a laptop)</summary>
          <ol className="list-decimal pl-5 mt-3 space-y-2 text-[15px] font-semibold leading-snug">
            <li>On a computer, go to <b>business.pinterest.com</b> and make a free business account.</li>
            <li>Click your profile picture, then the <b>+</b>, then <b>Board</b>. Name it exactly <b>Relationship Quizzes</b> and click Create.</li>
            <li>Download the pins file with the button below.</li>
            <li>Click <b>Create</b> at the top, then <b>Create Pin</b>, then <b>Bulk create Pins</b> (or &quot;Upload .csv&quot;), and choose the file.</li>
            <li>That&apos;s it. They post three a day for two weeks, each linking straight to its quiz.</li>
          </ol>
          <a href="/kit/pinterest.csv" className="mt-3 inline-flex rounded-full bg-[#FF4FA3] text-white px-4 py-2 text-[14px] font-black">
            ⬇️ Download the pins file ({KIT.length} pins)
          </a>
          <p className="mt-3 text-[13px] font-bold text-[#1A1033]/60">
            No computer? In the Pinterest app tap <b>+</b>, then <b>Pin</b>, pick a pin image you saved from below, paste the quiz link, and publish. One a day.
          </p>
        </details>

        <details className={`rounded-[22px] bg-white p-5 mb-4 ${stickerStatic}`}>
          <summary className="text-lg cursor-pointer" style={display}>📅 Post a month in one sitting (free, on a laptop)</summary>
          <ol className="list-decimal pl-5 mt-3 space-y-2 text-[15px] font-semibold leading-snug">
            <li><b>Instagram:</b> go to business.facebook.com (Meta Business Suite, free) and connect your Instagram. Click <b>Create post</b>, add one quiz&apos;s Instagram-size slides, paste the caption, turn on <b>Schedule</b> and pick a day. Repeat for each quiz: one a day, weeks ahead.</li>
            <li><b>Pinterest:</b> upload the pins file above once. It schedules every pin for you.</li>
            <li><b>TikTok:</b> post the photo slideshows from your phone (2 minutes each), because TikTok&apos;s own scheduler is made for videos. Free scheduling apps such as Metricool say they can auto-post TikTok photo posts; check their current free limits when you sign up.</li>
          </ol>
        </details>

        <h2 className="text-2xl mt-10 mb-4" style={display}>All quizzes</h2>
        <div className="space-y-6">
          {KIT.map((k) => {
            const slides = k.slides.map((_, n) => `/slides/${k.slug}/${n + 1}.png`);
            return (
              <section key={k.slug} className={`rounded-[24px] p-4 ${stickerStatic}`} style={{ backgroundColor: k.bg }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl leading-tight" style={display}>{k.emoji} {k.title}</h3>
                  <a href={k.url} className="text-[12px] font-black underline shrink-0">open quiz</a>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 [scrollbar-width:none]">
                  {slides.map((u, n) => (
                    <a key={u} href={u} target="_blank" rel="noopener" className="shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={u} alt={`Slide ${n + 1}`} loading="lazy" width={90} height={160} className="w-[90px] h-[160px] rounded-xl border-2 border-[#1A1033] bg-white object-cover" />
                    </a>
                  ))}
                  <a href={`/pins/${k.slug}.png`} target="_blank" rel="noopener" className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/pins/${k.slug}.png`} alt="Pinterest pin" loading="lazy" width={107} height={160} className="w-[107px] h-[160px] rounded-xl border-2 border-[#1A1033] bg-white object-cover" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <SaveImagesButton urls={slides} name={k.slug} label="Save slides" />
                  <SaveImagesButton urls={[`/pins/${k.slug}.png`]} name={`${k.slug}-pin`} label="Save pin" className="!bg-white !text-[#1A1033]" />
                  <SaveImagesButton urls={slides.map((u) => `${u}?size=feed`)} name={`${k.slug}-ig`} label="Save for Instagram" className="!bg-white !text-[#1A1033]" />
                </div>

                <div className="mt-3 rounded-2xl bg-white/80 p-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-[11px] font-black uppercase tracking-wider opacity-60">Caption</p>
                    <CopyButton text={k.tiktok} />
                  </div>
                  <p className="text-[14px] font-semibold leading-snug break-words">{k.tiktok}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 rounded-2xl bg-white/80 p-3">
                  <p className="text-[13px] font-semibold break-all">{k.url}</p>
                  <CopyButton text={k.url} label="Copy link" />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
