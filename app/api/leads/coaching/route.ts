import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚨 ATTEMPTING TO UPDATE COACHING FOR:", body.email, "QUIZ:", body.quizType);

    if (!body.email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const updatedLead = await prisma.lead.updateMany({
      where: { 
        email: body.email,
        ...(body.quizType ? { quizType: body.quizType } : {})
      },
      data: { coachingClaimed: true }
    });

    console.log("✅ COACHING CLAIMED SAVED:", body.email);
    return NextResponse.json({ success: true, count: updatedLead.count });
  } catch (error: any) {
    console.error("❌ COACHING DB ERROR:", error.message || error);
    return NextResponse.json({ error: "Failed to update coaching status" }, { status: 500 });
  }
}
