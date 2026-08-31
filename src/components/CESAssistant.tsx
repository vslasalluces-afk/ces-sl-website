"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Bot, X, Send, User, AlertCircle, ExternalLink, FileText, ArrowRight, MessageCircle, Shield, CheckCircle, HelpCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

interface Source { title: string; page: string; label: string; relevance: number; }
interface PageRec { title: string; path: string; reason: string; }
interface Handoff { needed: boolean; reason: string; method: "whatsapp" | "email"; prefilled?: string; }
interface Confidence { level: "high" | "medium" | "low"; score: number; }

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  recommendations?: PageRec[];
  followUps?: string[];
  confidence?: Confidence;
  handoff?: Handoff | null;
  timestamp: Date;
}

// Session persistence
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("ces-chat-session");
  if (!id) { id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; sessionStorage.setItem("ces-chat-session", id); }
  return id;
}

function saveMessages(msgs: Message[]) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem("ces-chat-messages", JSON.stringify(msgs.slice(-20))); } catch {}
}

function loadMessages(): Message[] | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("ces-chat-messages");
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

const INITIAL: Message = {
  id: "welcome",
  role: "assistant",
  content: `Hi there! 👋 I'm the CES Impact Assistant.\n\nI can tell you all about CES's community development work in Sierra Leone — our programmes, team, location, how to get involved, and much more.\n\nWhat brings you here today?`,
  followUps: ["Where is CES located?", "What does CES do?", "How can I donate?"],
  confidence: { level: "high", score: 1 },
  timestamp: new Date(),
};

const ConfidenceBadge = ({ confidence }: { confidence: Confidence }) => {
  if (confidence.level === "high") return (
    <span className="inline-flex items-center gap-1 text-[10px] text-green-600"><CheckCircle className="w-3 h-3" />Confident answer</span>
  );
  if (confidence.level === "medium") return (
    <span className="inline-flex items-center gap-1 text-[10px] text-yellow-600"><HelpCircle className="w-3 h-3" />Partial match</span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-charcoal/40"><HelpCircle className="w-3 h-3" />Best effort</span>
  );
};

export default function CESAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef("");

  // Restore session
  useEffect(() => {
    sessionId.current = getSessionId();
    const saved = loadMessages();
    if (saved && saved.length > 0) setMessages(saved);
  }, []);

  // Persist on change
  useEffect(() => { saveMessages(messages); }, [messages]);

  // Scroll
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
          sessionId: sessionId.current,
        }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Sorry, please try again.",
        sources: data.sources || [],
        recommendations: data.recommendations || [],
        followUps: data.followUps || [],
        confidence: data.confidence || { level: "medium", score: 0.5 },
        handoff: data.handoff || null,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { id: (Date.now()+1).toString(), role: "assistant", content: `I'm having trouble. Please try again or WhatsApp CES at ${SITE.phone}.`, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <>
      {/* Open button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-deep-brown text-warm-white shadow-xl hover:bg-charcoal transition-all duration-300 flex items-center justify-center group ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open CES Impact Assistant"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-deep-brown text-warm-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">CES Impact Assistant</span>
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-peach-100 flex flex-col transition-all duration-300 origin-bottom-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
        style={{ height: "min(660px, calc(100vh - 6rem))" }}
        role="dialog"
        aria-label="CES Impact Assistant"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-deep-brown to-charcoal text-warm-white px-5 py-4 rounded-t-2xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-peach/20 flex items-center justify-center"><Bot className="w-5 h-5 text-peach" /></div>
            <div>
              <h2 className="font-serif font-bold text-sm">CES Impact Assistant</h2>
              <p className="text-warm-white/60 text-xs">AI-powered · Ask anything about CES</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-warm-white/10 flex items-center justify-center transition-colors" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>

        {/* Privacy */}
        {showPrivacy && (
          <div className="bg-peach-100 px-4 py-2.5 text-xs text-deep-brown border-b border-peach-200 shrink-0 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-deep-brown/70">AI assistant — don&apos;t share sensitive info.</span>
              <button onClick={() => setShowPrivacy(false)} className="text-muted-green font-medium ml-2 hover:underline">Dismiss</button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              {/* Bubble row */}
              <div className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-muted-green text-white" : "bg-peach-100 text-deep-brown"}`}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[82%] space-y-2`}>
                  <div className={`rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-muted-green text-white rounded-br-md" : "bg-cream text-charcoal rounded-bl-md"}`}>
                    <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {/* Confidence badge */}
                  {msg.role === "assistant" && msg.confidence && msg.id !== "welcome" && (
                    <div className="px-1"><ConfidenceBadge confidence={msg.confidence} /></div>
                  )}

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {msg.sources.map((s, i) => (
                        <Link key={i} href={s.page} onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-1 text-[10px] bg-white border border-peach-100 text-muted-green px-2 py-1 rounded-full hover:bg-peach-100 transition-colors">
                          <FileText className="w-2.5 h-2.5" />{s.label}
                          <span className="text-charcoal/30 ml-0.5">{s.relevance}%</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Page recommendations */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] text-charcoal/35 font-medium uppercase tracking-wider">Suggested pages</p>
                      {msg.recommendations.map((r, i) => (
                        <Link key={i} href={r.path} onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-xs bg-white border border-peach-100 rounded-lg px-2.5 py-1.5 hover:bg-peach-100 transition-colors group">
                          <ArrowRight className="w-3 h-3 text-muted-green group-hover:translate-x-0.5 transition-transform" />
                          <span className="text-deep-brown font-medium">{r.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Follow-up questions */}
                  {msg.followUps && msg.followUps.length > 0 && !isLoading && msg.id === messages[messages.length - 1]?.id && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.followUps.map((fq) => (
                        <button key={fq} onClick={() => handleSend(fq)}
                          className="text-[11px] bg-peach-100 text-deep-brown px-3 py-1.5 rounded-full hover:bg-peach-200 transition-colors text-left">
                          {fq}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Handoff */}
                  {msg.handoff?.needed && (
                    <div className="bg-muted-green/10 border border-muted-green/20 rounded-xl px-3 py-2.5">
                      <p className="text-xs text-muted-green font-medium mb-2 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />{msg.handoff.reason}</p>
                      {msg.handoff.method === "whatsapp" ? (
                        <a href={`https://wa.me/${SITE.whatsapp}${msg.handoff.prefilled ? `?text=${encodeURIComponent(msg.handoff.prefilled)}` : ""}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-muted-green text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                          <MessageCircle className="w-3 h-3" />Chat with CES on WhatsApp
                        </a>
                      ) : (
                        <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 text-xs bg-muted-green text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                          Email CES
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-peach-100 flex items-center justify-center shrink-0"><Bot className="w-3.5 h-3.5 text-deep-brown" /></div>
              <div className="bg-cream rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-charcoal/25 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-charcoal/25 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-charcoal/25 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-peach-100 shrink-0">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything about CES..."
              className="flex-1 px-4 py-2.5 bg-cream border border-peach-200 rounded-xl text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach"
              disabled={isLoading} />
            <button type="submit" disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-deep-brown text-warm-white flex items-center justify-center hover:bg-charcoal transition-colors disabled:opacity-40" aria-label="Send">
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-[9px] text-charcoal/30">AI · Responses may not always be accurate</p>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[9px] text-muted-green hover:underline flex items-center gap-0.5">
              Talk to a human <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
