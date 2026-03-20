import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, quizType, rawAnswers, profile } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const lead = await prisma.lead.upsert({
      where: { email },
      update: {
        quizType: quizType || "unknown",
        rawAnswers: rawAnswers || null,
        profileData: profile || null,
      },
      create: {
        email,
        quizType: quizType || "unknown",
        rawAnswers: rawAnswers || null,
        profileData: profile || null,
      }
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
