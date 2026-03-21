import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚨 ATTEMPTING TO UPDATE COACHING FOR:", body.email);

    if (!body.email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const updatedLead = await prisma.lead.update({
      where: { email: body.email },
      data: { coachingClaimed: true }
    });

    console.log("✅ COACHING CLAIMED:", updatedLead.email);
    return NextResponse.json({ success: true, updatedLead });
  } catch (error: any) {
    console.error("❌ COACHING DB ERROR:", error.message || error);
    return NextResponse.json({ error: "Failed to update coaching status" }, { status: 500 });
  }
}
