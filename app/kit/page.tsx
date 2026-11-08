import type { Metadata } from "next";
import { KIT } from "@/lib/share/kit";
import CopyButton from "@/components/share/CopyButton";
import SaveImagesButton from "@/components/share/SaveImagesButton";
import TodayPost from "@/components/share/TodayPost";
import { stickerStatic, display } from "@/lib/ui/sticker";

export const metadata: Metadata = {
  title: "Share kit | OopsCupid",
  robots: { index: false, follow: false },
};

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
