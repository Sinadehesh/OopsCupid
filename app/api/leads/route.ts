import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const quizType =
      typeof body?.quizType === "string" && body.quizType.trim()
        ? body.quizType.trim().slice(0, 100)
        : "unknown";
    const hasQuizType = typeof body?.quizType === "string" && Boolean(body.quizType.trim());
    const hasRawAnswers = Object.prototype.hasOwnProperty.call(body, "rawAnswers");
    const hasProfile = Object.prototype.hasOwnProperty.call(body, "profile");

    await prisma.lead.upsert({
      where: { email },
      update: {
        // A newsletter-only signup must not replace the subscriber's latest
        // quiz, and omitted fields must never erase previously saved data.
        ...(hasQuizType && quizType !== "newsletter" ? { quizType } : {}),
        ...(hasRawAnswers ? { rawAnswers: body.rawAnswers ?? Prisma.JsonNull } : {}),
        ...(hasProfile ? { profileData: body.profile ?? Prisma.JsonNull } : {}),
      },
      create: {
        email,
        quizType,
        ...(hasRawAnswers ? { rawAnswers: body.rawAnswers ?? Prisma.JsonNull } : {}),
        ...(hasProfile ? { profileData: body.profile ?? Prisma.JsonNull } : {}),
      },
    });

    // Do not return the Lead row: it can contain sensitive quiz answers.
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "[leads] Failed to save lead:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json({ error: "Failed to save your email. Please try again." }, { status: 500 });
  }
}
