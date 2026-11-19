import React from "react";
import Link from "next/link";
import type { ClusterLink } from "@/lib/seo/cluster";

/**
 * Related pages in the same topic cluster, as plain server-rendered links:
 * the full test, quick quizzes, real-situation pages, the cluster's
 * articles and its workbook. Small on purpose;
 * it's a signpost, not a second page.
 */
export default function ClusterLinks({
  full,
  quick,
  signs,
  read = [],
  program = null,
  heading = "Related",
  className = "",
}: {
  full?: ClusterLink | null;
  quick: ClusterLink[];
  signs: ClusterLink[];
  read?: ClusterLink[];
  program?: ClusterLink | null;
  heading?: string;
  className?: string;
}) {
  if (!full && quick.length === 0 && signs.length === 0 && read.length === 0 && !program) return null;
  const pill =
    "inline-flex items-center rounded-full bg-white border-2 border-[#1A1033] px-3 py-1.5 text-[14px] font-bold text-[#1A1033] leading-snug hover:bg-[#FFE68A] transition-colors";
  return (
    <nav aria-label={heading} className={className}>
      <h3 className="text-lg font-black text-[#1A1033] mb-3">{heading}</h3>
      {full && (
        <p className="mb-3 text-[15px] font-semibold text-[#1A1033]/80">
          The full test:{" "}
          <Link href={full.href} className="font-black text-[#1A1033] underline underline-offset-2">
            {full.label}
          </Link>
        </p>
      )}
      {quick.length > 0 && (
        <div className="mb-3">
          <p className="text-[12px] font-black uppercase tracking-wider text-[#1A1033]/55 mb-2">Quick quizzes</p>
          <div className="flex flex-wrap gap-2">
            {quick.map((x) => (
              <Link key={x.href} href={x.href} className={pill}>{x.label}</Link>
            ))}
          </div>
        </div>
      )}
      {signs.length > 0 && (
        <div className="mb-3">
          <p className="text-[12px] font-black uppercase tracking-wider text-[#1A1033]/55 mb-2">Sound familiar?</p>
          <div className="flex flex-wrap gap-2">
            {signs.map((x) => (
              <Link key={x.href} href={x.href} className={pill}>&ldquo;{x.label}&rdquo;</Link>
            ))}
          </div>
        </div>
      )}
      {read.length > 0 && (
        <div className="mb-3">
          <p className="text-[12px] font-black uppercase tracking-wider text-[#1A1033]/55 mb-2">Read</p>
          <div className="flex flex-wrap gap-2">
            {read.map((x) => (
              <Link key={x.href} href={x.href} className={pill}>📖 {x.label}</Link>
            ))}
          </div>
        </div>
      )}
      {program && (
        <p className="mt-4 text-[15px] font-semibold text-[#1A1033]/80">
          Want to change the pattern, not just name it?{" "}
          <Link href={program.href} className="font-black text-[#1A1033] underline underline-offset-2">
            {program.label}
          </Link>
          , a 4-week workbook.
        </p>
      )}
    </nav>
  );
}
