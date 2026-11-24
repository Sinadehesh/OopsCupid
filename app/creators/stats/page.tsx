import type { Metadata } from "next";
import { notFound } from "next/navigation";
import crypto from "crypto";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { prisma } from "@/lib/prisma";
import { COMMISSION, cleanVia } from "@/lib/creators";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Creator sales | OopsCupid", robots: { index: false, follow: false } };

const SITE = "https://www.oopscupid.com";
const euro = (cents: number) => `€${(cents / 100).toFixed(2)}`;

/** A creator's private link: their code, signed with CREATOR_STATS_KEY. */
function sign(secret: string, code: string) {
  return crypto.createHmac("sha256", secret).update(`creator:${code}`).digest("hex").slice(0, 24);
}
function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

interface Sale {
  via: string;
  month: string;
  net: number;
}

/** Paid checkouts carrying a creator code, last ~13 months, refunds taken off. */
async function sales(): Promise<Sale[]> {
  const stripe = getStripe();
  const since = Math.floor(Date.now() / 1000) - 400 * 86400;
  const out: Sale[] = [];
  let seen = 0;
  for await (const s of stripe.checkout.sessions.list({ limit: 100, created: { gte: since }, expand: ["data.payment_intent.latest_charge"] })) {
    if (++seen > 3000) break;
    const via = cleanVia(s.metadata?.via);
    if (!via || s.payment_status !== "paid") continue;
    const pi = s.payment_intent as Stripe.PaymentIntent | null;
    const charge = pi && typeof pi.latest_charge === "object" ? (pi.latest_charge as Stripe.Charge | null) : null;
    const net = Math.max(0, (s.amount_total ?? 0) - (charge?.amount_refunded ?? 0));
    out.push({ via, month: new Date(s.created * 1000).toISOString().slice(0, 7), net });
  }
  return out;
}

function Table({ rows }: { rows: Sale[] }) {
  const grouped = new Map<string, { via: string; month: string; count: number; net: number }>();
  for (const r of rows) {
    const k = `${r.via}|${r.month}`;
    const g = grouped.get(k) ?? { via: r.via, month: r.month, count: 0, net: 0 };
    g.count += 1;
    g.net += r.net;
    grouped.set(k, g);
  }
  const list = [...grouped.values()].sort((a, b) => b.month.localeCompare(a.month) || a.via.localeCompare(b.via));
  if (!list.length) return <p className="text-[15px] font-semibold opacity-70">No sales through a creator link yet.</p>;
  return (
    <table className="w-full text-left text-[14px]">
      <thead>
        <tr className="border-b-2 border-[#1A1033]">
          <th className="py-2">Month</th>
          <th>Creator</th>
          <th>Sales</th>
          <th>Net</th>
          <th>Commission</th>
        </tr>
      </thead>
      <tbody>
        {list.map((g) => (
          <tr key={`${g.via}${g.month}`} className="border-b border-[#1A1033]/15">
            <td className="py-2">{g.month}</td>
            <td>{g.via}</td>
            <td>{g.count}</td>
            <td>{euro(g.net)}</td>
            <td className="font-black">{euro(Math.round(g.net * COMMISSION))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * /creators/stats?key=… is the owner's view: every creator's sales by month,
 * the applications from /creators, and each creator's private link.
 * /creators/stats?c=name&s=… is that creator's own view. Both need
 * CREATOR_STATS_KEY set in Vercel; anything else is a 404.
 */
export default async function CreatorStats({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const q = await searchParams;
  const secret = process.env.CREATOR_STATS_KEY ?? "";
  const shell = (children: React.ReactNode) => (
    <main className="min-h-screen bg-[#FFF4FA] text-[#1A1033]">
      <div className="max-w-3xl mx-auto px-5 py-10">{children}</div>
    </main>
  );

  if (!secret) {
    return shell(<p className="text-[16px] font-bold">Not set up yet: add CREATOR_STATS_KEY in Vercel, then open this page with ?key= and that password.</p>);
  }

  const owner = typeof q.key === "string" && same(q.key, secret);
  const code = cleanVia(q.c);
  const creator = !owner && code && typeof q.s === "string" && same(q.s, sign(secret, code));
  if (!owner && !creator) notFound();

  let rows: Sale[] = [];
  let failed = false;
  try {
    rows = await sales();
  } catch {
    failed = true;
  }

  if (creator) {
    const mine = rows.filter((r) => r.via === code);
    return shell(
      <>
        <h1 className="text-3xl font-black mb-1">Your OopsCupid sales, {code}</h1>
        <p className="text-[15px] font-semibold opacity-70 mb-6">
          Your link: {SITE}/?via={code} · {Math.round(COMMISSION * 100)}% commission, paid monthly after the 7-day refund window.
        </p>
        {failed ? <p className="font-bold">Couldn&apos;t reach the payment provider. Try again in a minute.</p> : <Table rows={mine} />}
      </>
    );
  }

  const make = cleanVia(q.make);
  let applications: { email: string; createdAt: Date; profileData: unknown }[] = [];
  try {
    applications = await prisma.lead.findMany({
      where: { quizType: "creator" },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { email: true, createdAt: true, profileData: true },
    });
  } catch {
    // The database may be unreachable; the sales table still shows.
  }

  return shell(
    <>
      <h1 className="text-3xl font-black mb-6">Creator sales</h1>
      {failed ? <p className="font-bold mb-6">Couldn&apos;t reach Stripe. Try again in a minute.</p> : <Table rows={rows} />}

      <h2 className="text-xl font-black mt-10 mb-3">Make a creator&apos;s links</h2>
      <form className="flex gap-2 mb-3">
        <input type="hidden" name="key" value={q.key} />
        <input name="make" defaultValue={make ?? ""} placeholder="their name, e.g. sophie" className="flex-1 rounded-xl border-2 border-[#1A1033] px-3 py-2 font-bold" />
        <button className="rounded-xl bg-[#1A1033] text-white px-4 font-black">Make</button>
      </form>
      {make && (
        <div className="rounded-xl bg-white border-2 border-[#1A1033] p-3 text-[14px] break-all space-y-1">
          <p><b>Their link:</b> {SITE}/?via={make}</p>
          <p><b>Their private sales page:</b> {SITE}/creators/stats?c={make}&amp;s={sign(secret, make)}</p>
        </div>
      )}

      <h2 className="text-xl font-black mt-10 mb-3">Applications</h2>
      {applications.length === 0 ? (
        <p className="text-[15px] font-semibold opacity-70">None yet.</p>
      ) : (
        <ul className="space-y-2">
          {applications.map((a) => {
            const p = (a.profileData ?? {}) as Record<string, string>;
            return (
              <li key={a.email} className="rounded-xl bg-white border-2 border-[#1A1033]/20 p-3 text-[14px]">
                <b>{p.handle || "(no handle)"}</b> · {p.platform} · {p.followers || "?"} followers · {a.email} ·{" "}
                {a.createdAt.toISOString().slice(0, 10)}
                {p.note ? <span className="block opacity-70">{p.note}</span> : null}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
