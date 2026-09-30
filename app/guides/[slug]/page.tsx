import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { Sparkles, MessageCircle } from "lucide-react";
import { GUIDES, guideBySlug, type GuideSection } from "@/lib/guides/guides";
import { ACCESS_COOKIE, readAccessToken, canRead } from "@/lib/stripe/access";
import GuideUnlock from "@/components/guides/GuideUnlock";
import GuideCards from "@/components/guides/GuideCards";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import MerchCard from "@/components/shop/MerchCard";

const baseUrl = "https://www.oopscupid.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(g.title)}&q=${encodeURIComponent("A 10-minute guide")}`;
  return {
    title: `${g.title}: ${g.hook}`.slice(0, 70),
    description: g.hook,
    alternates: { canonical: `${baseUrl}/guides/${slug}` },
    openGraph: { title: g.title, description: g.hook, url: `${baseUrl}/guides/${slug}`, images: [{ url: card, width: 1200, height: 630, alt: g.title }] },
  };
}

function Section({ s }: { s: GuideSection }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-black text-slate-900 leading-snug mb-3">{s.title}</h2>
      {s.body.map((p, i) => (
        <p key={i} className="text-[17px] text-slate-700 font-medium leading-relaxed mb-3">{p}</p>
      ))}
      {s.list && (
        <ul className="space-y-2 my-4">
          {s.list.map((l) => (
            <li key={l} className="flex gap-2.5 text-[16px] text-slate-700 font-semibold leading-snug">
              <span className="text-[#E07850] font-black">•</span> {l}
            </li>
          ))}
        </ul>
      )}
      {s.compare && (
        <div className="rounded-2xl border border-slate-200 overflow-hidden my-4 text-[14px]">
          <div className="grid grid-cols-2 bg-slate-900 text-white font-black">
            <div className="p-3">{s.compare.left}</div>
            <div className="p-3 border-l border-white/10">{s.compare.right}</div>
          </div>
          {s.compare.rows.map(([l, r]) => (
            <div key={l} className="grid grid-cols-2 border-t border-slate-200 bg-white font-semibold text-slate-700">
              <div className="p-3">{l}</div>
              <div className="p-3 border-l border-slate-200">{r}</div>
            </div>
          ))}
        </div>
      )}
      {s.script && (
        <div className="rounded-2xl bg-slate-900 text-white p-5 my-4">
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#F5DD90] mb-2 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" /> Try saying
          </p>
          <p className="font-semibold leading-relaxed">{s.script}</p>
        </div>
      )}
    </section>
  );
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const claims = readAccessToken((await cookies()).get(ACCESS_COOKIE)?.value);
  const open = canRead(claims, `guides/${slug}`);
  const [first, ...rest] = g.sections;
  const others = GUIDES.filter((x) => x.slug !== slug && x.forTests.some((t) => g.forTests.includes(t))).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <article className="max-w-2xl mx-auto px-5 py-8 md:py-14">
        <Link href="/guides" className="text-sm font-bold text-slate-400">← All guides</Link>
        <div className="rounded-3xl p-6 md:p-8 mt-4 mb-8" style={{ backgroundColor: g.bg, color: g.fg }}>
          <div className="text-5xl mb-3" aria-hidden="true">{g.emoji}</div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-60 mb-1">OopsCupid guide · {g.minutes} minutes</p>
          <h1 className="text-3xl md:text-5xl font-black leading-[1.05] mb-3">{g.title}</h1>
          <p className="text-lg font-semibold leading-snug opacity-85">{g.hook}</p>
        </div>

        <Section s={first} />

        {open ? (
          <>
            {rest.map((s) => <Section key={s.title} s={s} />)}
            <div className="rounded-3xl bg-[#0E1621] text-white p-6 my-8">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F5DD90] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> The one thing to remember
              </p>
              <p className="text-xl font-black leading-snug">{g.takeaway}</p>
            </div>
            <p className="text-xs font-semibold text-slate-400 mb-8">{g.sources} This guide is general information, not therapy or advice about your specific situation.</p>
          </>
        ) : (
          <GuideUnlock slug={slug} rest={rest.map((s) => s.title)} minutes={g.minutes} />
        )}

        <GuideCards guides={others} title="You might also like" />
        <MerchCard from={`guide-${slug}`} />
        <MoreQuickTests title="Or take a 40-second test" />
      </article>
    </main>
  );
}
