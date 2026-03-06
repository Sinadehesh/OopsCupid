import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await request.json();
    
    // Simple placeholder generation
    const isPositive = Math.random() > 0.5;
    const title = isPositive ? "You're Validated" : "We Need to Talk";
    const description = isPositive 
        ? "Based on your answers, your instincts are spot on. Keep setting those boundaries!"
        : "Your answers indicate some major repeating patterns. It might be time to step back and re-evaluate this dynamic.";

    return NextResponse.json({ title, description });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate result" }, { status: 500 });
  }
}