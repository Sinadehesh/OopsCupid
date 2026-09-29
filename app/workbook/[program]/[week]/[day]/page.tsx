import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LIVE_PROGRAMS, programBySlug, sessionOf, nextSession } from "@/lib/programs/registry";
import SessionView from "@/components/program/SessionView";

export const dynamic = "force-static";
export const dynamicParams = false;

const n = (seg: string, prefix: string) => {
  const m = new RegExp(`^${prefix}-(\\d+)$`).exec(seg);
  return m ? Number(m[1]) : NaN;
};

export function generateStaticParams() {
  return LIVE_PROGRAMS.flatMap((p) =>
    (p.weeks ?? []).flatMap((w) =>
      w.sessions.map((s) => ({ program: p.slug, week: `week-${w.week}`, day: `day-${s.day}` }))
    )
  );
}

export async function generateMetadata({ params }: { params: Promise<{ program: string; week: string; day: string }> }): Promise<Metadata> {
  const { program, week, day } = await params;
  const p = programBySlug(program);
  const found = p && sessionOf(p, n(week, "week"), n(day, "day"));
  if (!p || !found) return {};
  return { title: `${found.session.title} · ${p.title}`, description: found.session.intro };
}

export default async function SessionPage({ params }: { params: Promise<{ program: string; week: string; day: string }> }) {
  const { program, week, day } = await params;
  const p = programBySlug(program);
  const w = n(week, "week");
  const d = n(day, "day");
  const found = p && p.status === "live" ? sessionOf(p, w, d) : null;
  if (!p || !found) notFound();

  const weeks = p.weeks!;
  const flat = weeks.flatMap((x) => x.sessions.map((s) => ({ week: x.week, day: s.day })));
  const i = flat.findIndex((x) => x.week === w && x.day === d);

  return (
    <SessionView
      program={{ slug: p.slug, title: p.title, accent: p.accent, safety: p.safety, totalWeeks: weeks.length }}
      week={{ week: found.week.week, theme: found.week.theme }}
      session={found.session}
      next={nextSession(p, w, d)}
      prev={i > 0 ? flat[i - 1] : null}
      isLastOfWeek={found.week.sessions[found.week.sessions.length - 1].day === d}
    />
  );
}
