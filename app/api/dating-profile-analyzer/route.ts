import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await request.json();
    return NextResponse.json({
        summary: "Your profile is highly curated but lacks vulnerability. The prompts are a bit cliché and might attract people looking for casual interactions rather than deeper connections.",
        themes: ["Surface-level","Aesthetic-heavy"],
        verdict: "Swap one prompt to show a quirky or genuine hobby"
    });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
}