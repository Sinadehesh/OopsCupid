import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚨 ATTEMPTING TO SAVE LEAD:", body.email);

    if (!body.email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const lead = await prisma.lead.upsert({
      where: { email: body.email },
      update: {
        quizType: body.quizType || "unknown",
        rawAnswers: body.rawAnswers || null,
        profileData: body.profile || null,
      },
      create: {
        email: body.email,
        quizType: body.quizType || "unknown",
        rawAnswers: body.rawAnswers || null,
        profileData: body.profile || null,
      }
    });

    console.log("✅ SUCCESSFULLY SAVED:", lead.email);
    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error("❌ DATABASE ERROR:", error.message || error);
    return NextResponse.json({ error: "Failed to save lead", details: error.message }, { status: 500 });
  }
}
