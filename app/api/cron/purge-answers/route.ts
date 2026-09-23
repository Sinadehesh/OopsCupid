import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * 24-HOUR ANSWER PURGE
 *
 * The site tells visitors — on the homepage, in the locked-insight card
 * and at checkout — that "your answers are permanently deleted from our
 * system in 24 hours". Nothing was enforcing that: Lead.rawAnswers and
 * Lead.profileData were written once and kept forever.
 *
 * This makes the promise true. It nulls the two columns that contain
 * quiz content on Lead rows older than 24 hours and keeps the row itself
 * (email, quizType, timestamps) so the mailing list and the purchase
 * history still work — which is what the claim actually covers.
 *
 * Scheduled daily by vercel.json (03:00 UTC). Hobby plans allow one run
 * per day — an hourly expression makes Vercel REJECT THE WHOLE BUILD with
 * cron_jobs_limits_reached, which silently stops every deploy. Do not
 * shorten this without checking the plan. Protected by CRON_SECRET: Vercel sends
 * it as a Bearer token, and without the variable set the route refuses
 * rather than allowing anyone to trigger a mass update.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("[cron/purge-answers] CRON_SECRET is not set");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    const { count } = await prisma.lead.updateMany({
      where: {
        createdAt: { lt: cutoff },
        OR: [
          { rawAnswers: { not: Prisma.DbNull } },
          { profileData: { not: Prisma.DbNull } },
        ],
      },
      // Prisma treats `undefined` as "leave unchanged" and plain `null`
      // as ambiguous on Json columns. DbNull is the actual SQL NULL.
      data: { rawAnswers: Prisma.DbNull, profileData: Prisma.DbNull },
    });

    console.log(`[cron/purge-answers] cleared answer data on ${count} lead(s) older than ${cutoff.toISOString()}`);
    return NextResponse.json({ purged: count, cutoff: cutoff.toISOString() });
  } catch (err: any) {
    console.error("[cron/purge-answers] failed:", err?.message ?? err);
    return NextResponse.json({ error: "Purge failed." }, { status: 500 });
  }
}
