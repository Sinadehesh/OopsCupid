import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await request.json();
    return NextResponse.json({
        summary: "Based on the provided texts, there is a strong pattern of intermittent reinforcement. They are likely keeping you as an option without committing to plans.",
        themes: ["Avoidance","Breadcrumbing"],
        verdict: "Stop initiating and match their energy."
    });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
}