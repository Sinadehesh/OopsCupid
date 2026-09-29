import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROGRAMS, programBySlug } from "@/lib/programs/registry";
import ProgramOverview from "@/components/program/ProgramOverview";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  // The original workbook still has its own hand-built route.
  return PROGRAMS.filter((p) => p.slug !== "anxious-attachment").map((p) => ({ program: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ program: string }> }): Promise<Metadata> {
  const { program: slug } = await params;
  const p = programBySlug(slug);
  if (!p) return {};
  const url = `https://www.oopscupid.com/workbook/${p.slug}`;
  return {
    title: `${p.title}: ${p.subtitle}`,
    description: p.whoFor,
    alternates: { canonical: url },
    // An outline is a plan, not a product. Nothing to rank.
    robots: p.status === "live" ? undefined : { index: false, follow: true },
    openGraph: { title: p.title, description: p.subtitle, url, type: "website" },
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ program: string }> }) {
  const { program: slug } = await params;
  const p = programBySlug(slug);
  if (!p) notFound();
  // Strip the session content: the overview only needs the outline, and
  // shipping twenty sessions of text to the browser here is pure weight.
  const { weeks, ...lean } = p;
  return <ProgramOverview program={lean} />;
}
