import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚨 ATTEMPTING TO TRACK PREMIUM CLICK FOR:", body.email, "QUIZ:", body.quizType);

    if (!body.email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    // We filter by email AND quizType (if provided) so we only update the exact row we want
    const updatedLead = await prisma.lead.updateMany({
      where: { 
        email: body.email,
        ...(body.quizType ? { quizType: body.quizType } : {}) 
      },
      data: { premiumClicked: true }
    });

    console.log("✅ PREMIUM CLICKED SAVED:", body.email);
    return NextResponse.json({ success: true, count: updatedLead.count });
  } catch (error: any) {
    console.error("❌ PREMIUM DB ERROR:", error.message || error);
    return NextResponse.json({ error: "Failed to update premium status" }, { status: 500 });
  }
}
