import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const updatedLead = await prisma.lead.update({
      where: { email },
      data: { coachingClaimed: true }
    });

    return NextResponse.json({ success: true, updatedLead });
  } catch (error) {
    console.error("Coaching DB Error:", error);
    return NextResponse.json({ error: "Failed to update coaching status" }, { status: 500 });
  }
}
