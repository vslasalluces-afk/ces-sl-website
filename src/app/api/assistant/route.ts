import { NextRequest, NextResponse } from "next/server";
import { generateResponse } from "@/lib/ai-engine";

const rateLimits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = rateLimits.get(ip);
  if (!rec || now > rec.reset) { rateLimits.set(ip, { count: 1, reset: now + 60000 }); return true; }
  if (rec.count >= 30) return false;
  rec.count++;
  return true;
}

function isSafe(msg: string): boolean {
  return ![/ignore (previous |all )?instructions/i, /pretend (to be|you are)/i, /you are now/i, /system prompt/i, /reveal your/i].some((p) => p.test(msg));
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    const { message, history = [], sessionId } = await request.json();
    if (!message || typeof message !== "string" || message.trim().length < 1)
      return NextResponse.json({ error: "Message required" }, { status: 400 });

    const sanitized = message.trim().slice(0, 1000);
    if (!isSafe(sanitized)) return NextResponse.json({
      response: "I'm here to help with questions about CES. What would you like to know?",
      sources: [], recommendations: [], followUps: [], confidence: { level: "high", score: 1 }, handoff: null, topics: [],
    });

    const convHistory = (history as Array<{ role: string; content: string }>)
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12)
      .map((m) => ({ role: m.role as "user" | "assistant", content: (m.content || "").slice(0, 800) }));

    const result = await generateResponse(sanitized, convHistory);

    return NextResponse.json({
      response: result.message,
      sources: result.sources,
      recommendations: result.recommendations,
      followUps: result.followUps,
      confidence: result.confidence,
      handoff: result.handoff,
      topics: result.topics,
    });
  } catch (error) {
    console.error("Assistant error:", error);
    return NextResponse.json({
      response: "I'm having a moment — please try again or reach CES on WhatsApp at +232 78 703694.",
      sources: [], recommendations: [], followUps: [], confidence: { level: "low", score: 0 }, handoff: null, topics: [],
    });
  }
}
