import OpenAI from "openai";
import { SITE } from "./constants";
import { TEAM_MEMBERS } from "./team-data";

// ─── OpenAI Client ───────────────────────────────────────────────
let client: OpenAI | null = null;
function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

// ─── Generate Real Embeddings ────────────────────────────────────
export async function generateEmbedding(text: string): Promise<number[] | null> {
  const openai = getOpenAI();
  if (!openai) return null;
  try {
    const res = await openai.embeddings.create({ model: "text-embedding-3-small", input: text.slice(0, 8000) });
    return res.data[0]?.embedding || null;
  } catch { return null; }
}

// ─── Knowledge Chunk ─────────────────────────────────────────────
interface Chunk {
  id: string;
  title: string;
  category: string;
  content: string;
  sourcePage: string;
  sourceLabel: string;
  keywords: string[];
  priority: number;
  // Pre-computed TF vector for fallback search
  termVec?: Map<string, number>;
  // Real embedding (populated at runtime if OpenAI available)
  embedding?: number[];
}

const CHUNKS: Chunk[] = [
  { id: "identity", title: "CES Identity", category: "about", content: `Christian Extension Services (CES) is a Christian-based community development organisation in Sierra Leone. CES is the development arm of the Christian Reformed Church in Sierra Leone. Brand: CES SL. Tagline: "Transforming Communities. Empowering Lives." More than 46 years of service.`, sourcePage: "/about", sourceLabel: "About CES", keywords: ["ces","christian extension services","organisation","who","what","identity","about"], priority: 10 },
  { id: "mission", title: "CES Mission", category: "about", content: `CES Mission: "To build the capacity of vulnerable communities in Sierra Leone through training and working with communities for sustainable development." The key word is "with" — CES works alongside communities, not for them.`, sourcePage: "/about", sourceLabel: "About – Mission", keywords: ["mission","purpose","goal","aim","capacity"], priority: 9 },
  { id: "vision", title: "CES Vision", category: "about", content: `CES Vision: "Empowered communities in Sierra Leone, through initiating, implementing, and managing programmes for transformation." CES envisions self-sufficient communities leading their own development.`, sourcePage: "/about", sourceLabel: "About – Vision", keywords: ["vision","future","empowered","transformation"], priority: 9 },
  { id: "location", title: "CES Office Location", category: "location", content: `CES office: 3 Mile, Kabala–Makeni Highway, Koinadugu District, Northern Province, Sierra Leone, West Africa. Kabala is the capital of Koinadugu District, ~400 km northeast of Freetown. GPS: 9.59°N, 11.56°W. The office is on the main highway connecting Kabala to Makeni.`, sourcePage: "/contact", sourceLabel: "Contact – Location", keywords: ["where","location","office","address","kabala","koinadugu","find","based","situated","map","direction","highway"], priority: 10 },
  { id: "sierra-leone", title: "About Sierra Leone", category: "location", content: `Sierra Leone is on the west coast of Africa, bordered by Guinea (north) and Liberia (southeast), with the Atlantic Ocean to the west. Capital: Freetown. Population: ~8.4 million. Languages: English (official), Krio, Temne, Mende. Agriculture is the main livelihood. The country experienced civil war (1991–2002) and Ebola (2014–2016).`, sourcePage: "/about", sourceLabel: "About – Sierra Leone", keywords: ["sierra leone","country","africa","west africa","freetown"], priority: 8 },
  { id: "areas", title: "Areas of Operation", category: "location", content: `CES works in three districts in Sierra Leone's Northern Province: 1) Koinadugu District (office in Kabala), 2) Falaba District (north of Koinadugu, created 2017), 3) Tonkolili District (capital: Magburaka). These are predominantly rural farming areas in the northern highlands.`, sourcePage: "/about", sourceLabel: "About – Areas", keywords: ["district","area","operate","koinadugu","falaba","tonkolili","region","province"], priority: 8 },
  { id: "contact", title: "Contact CES", category: "contact", content: `Contact CES: Phone & WhatsApp: ${SITE.phone} (fastest). Email: ${SITE.email}. Facebook: ${SITE.facebook}. Office: ${SITE.address}. Website contact form: /contact. CES responds within 2–3 working days.`, sourcePage: "/contact", sourceLabel: "Contact CES", keywords: ["contact","phone","email","whatsapp","call","reach","speak","talk","message","touch"], priority: 10 },
  { id: "prog-agric", title: "Agriculture & Food Security", category: "programmes", content: `Agriculture & Food Security Programme: Farmer Field Schools (hands-on learning), Trust Rice Project (sustainable rice production), improved seed distribution, sustainable farming, post-harvest management. Most families depend on farming. Field staff Lansana Amos Janneh and Sallu Marah work directly with communities.`, sourcePage: "/programmes/agriculture-food-security", sourceLabel: "Agriculture Programme", keywords: ["agriculture","farming","food","security","farmer","crops","rice","trust rice","harvest","seed","field school"], priority: 9 },
  { id: "prog-women", title: "Women's Empowerment", category: "programmes", content: `Women's Empowerment Programme: Village Savings and Loan Associations (VSLAs — community savings groups where members save together and access small loans), financial literacy, enterprise development, women's leadership. Led by Gender Officer Fatmata Kumarr who says: "Empowering women, strengthening farmers and promoting equality are key to building resilient and thriving communities."`, sourcePage: "/programmes/womens-empowerment", sourceLabel: "Women's Empowerment", keywords: ["women","empowerment","vsla","savings","loan","association","female","enterprise","financial"], priority: 9 },
  { id: "prog-gender", title: "Gender Equality & GBV Prevention", category: "programmes", content: `Gender Equality and GBV Prevention: Preventing and responding to gender-based violence, promoting equality, community awareness, creating safe spaces for women and girls. Led by Fatmata Kumarr.`, sourcePage: "/programmes/gender-equality-gbv-prevention", sourceLabel: "Gender Equality", keywords: ["gender","equality","gbv","violence","prevention","safe","protection"], priority: 8 },
  { id: "prog-community", title: "Community Development", category: "programmes", content: `Community Development: Community Initiative Projects (CIPs), participatory planning workshops, leadership training, local governance strengthening. Communities identify own needs and lead solutions.`, sourcePage: "/programmes/community-development", sourceLabel: "Community Development", keywords: ["community","development","participatory","initiative","project","cip","governance"], priority: 8 },
  { id: "prog-education", title: "Education & Training", category: "programmes", content: `Education & Training: Adult literacy classes, vocational skills training, capacity building workshops, community education initiatives.`, sourcePage: "/programmes/education-and-training", sourceLabel: "Education & Training", keywords: ["education","training","literacy","reading","writing","skills","capacity","learning"], priority: 8 },
  { id: "prog-ffs", title: "Farmer Field Schools", category: "programmes", content: `Farmer Field Schools (FFS): Practical field-based learning. Farmers meet on demonstration plots to test improved techniques, compare methods, learn pest management, soil health, water conservation. Knowledge spreads farmer-to-farmer. Programme Manager Alie Konteh Kamara oversees this.`, sourcePage: "/programmes/farmer-field-schools", sourceLabel: "Farmer Field Schools", keywords: ["farmer field school","ffs","demonstration","pest","soil","hands-on"], priority: 8 },
  { id: "prog-rice", title: "Trust Rice Project", category: "programmes", content: `Trust Rice Project: Supports sustainable rice production and food security. Rice is Sierra Leone's staple food. Improves production techniques, strengthens livelihoods. Field staff Lansana Amos Janneh contributes expertise.`, sourcePage: "/programmes/agriculture-food-security", sourceLabel: "Trust Rice Project", keywords: ["trust rice","rice","project","production","staple"], priority: 8 },
  { id: "prog-livelihoods", title: "Sustainable Livelihoods", category: "programmes", content: `Sustainable Livelihoods: Skills training, enterprise development, market access, climate-adaptive practices. Climate resilience work helps communities adapt to changing weather.`, sourcePage: "/programmes/sustainable-livelihoods", sourceLabel: "Sustainable Livelihoods", keywords: ["livelihood","sustainable","enterprise","market","climate","resilience"], priority: 7 },
  { id: "donate", title: "How to Donate", category: "support", content: `Donate to CES: One-off or recurring (monthly/quarterly/annual). Currencies: USD, GBP, EUR, SLE. Online payment being set up. For now: WhatsApp ${SITE.phone} (fastest) or email ${SITE.email}. Visit /donate. Create donor account at /portal/register.`, sourcePage: "/donate", sourceLabel: "Donate to CES", keywords: ["donate","donation","give","gift","money","support","fund","contribute","pay"], priority: 10 },
  { id: "volunteer", title: "Volunteering", category: "support", content: `Volunteer with CES: Programme support, training facilitation, research, communications, M&E. Submit enquiry at /volunteer. Does NOT guarantee placement. Must respect safeguarding policies.`, sourcePage: "/volunteer", sourceLabel: "Volunteer", keywords: ["volunteer","volunteering","help","contribute","time","skills","intern"], priority: 9 },
  { id: "partnership", title: "Partnership", category: "support", content: `CES partners with churches, NGOs, foundations, governments, corporates, academia. Joint programmes, technical support, funding, research, capacity building. Programme Manager Alie Konteh Kamara and M&E Officer Edward Kanu both previously worked with CARE International. Submit enquiry at /partner-with-ces.`, sourcePage: "/partner-with-ces", sourceLabel: "Partner with CES", keywords: ["partner","partnership","collaborate","church","ngo","foundation","organisation"], priority: 9 },
  ...TEAM_MEMBERS.map((m) => ({
    id: `team-${m.slug}`,
    title: m.fullName,
    category: "team" as const,
    content: `${m.fullName} — ${m.jobTitle}${m.department ? ` (${m.department})` : ""}. ${m.fullBio.replace(/\n\n/g, " ")}${m.quote ? ` Quote: "${m.quote}"` : ""}. Education: ${m.education.join("; ")}.`,
    sourcePage: `/team#${m.slug}`,
    sourceLabel: `${m.fullName}`,
    keywords: [m.fullName.toLowerCase(), ...m.fullName.toLowerCase().split(" "), m.jobTitle.toLowerCase(), "team", "staff"],
    priority: 7,
  })),
];

// ─── Pre-compute TF Vectors ──────────────────────────────────────
function buildVec(text: string): Map<string, number> {
  const v = new Map<string, number>();
  for (const w of text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((t) => t.length > 2)) {
    v.set(w, (v.get(w) || 0) + 1);
  }
  return v;
}
function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, mA = 0, mB = 0;
  for (const [k, v] of a) { mA += v * v; if (b.has(k)) dot += v * b.get(k)!; }
  for (const [, v] of b) mB += v * v;
  return (mA && mB) ? dot / (Math.sqrt(mA) * Math.sqrt(mB)) : 0;
}
function cosineEmb(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0, mA = 0, mB = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; mA += a[i]*a[i]; mB += b[i]*b[i]; }
  return (mA && mB) ? dot / (Math.sqrt(mA) * Math.sqrt(mB)) : 0;
}

// Initialise TF vectors
for (const c of CHUNKS) c.termVec = buildVec(c.keywords.join(" ") + " " + c.content);

// ─── Embedding Cache ─────────────────────────────────────────────
const embeddingCache = new Map<string, number[]>();

async function getQueryEmbedding(query: string): Promise<number[] | null> {
  const cached = embeddingCache.get(query);
  if (cached) return cached;
  const emb = await generateEmbedding(query);
  if (emb) { embeddingCache.set(query, emb); if (embeddingCache.size > 200) embeddingCache.delete(embeddingCache.keys().next().value!); }
  return emb;
}

// Embed all chunks at startup (lazy, one-time)
let chunksEmbedded = false;
async function embedChunksOnce() {
  if (chunksEmbedded || !getOpenAI()) return;
  chunksEmbedded = true;
  for (const c of CHUNKS) {
    if (!c.embedding) {
      const emb = await generateEmbedding(c.content.slice(0, 500));
      if (emb) c.embedding = emb;
    }
  }
}

// ─── Retrieval with Confidence Score ─────────────────────────────
interface ScoredChunk { chunk: Chunk; score: number; matchType: "semantic" | "keyword" | "hybrid"; }

async function retrieve(query: string, topK: number = 5): Promise<ScoredChunk[]> {
  const queryVec = buildVec(query);
  const queryLower = query.toLowerCase();

  // Try real embeddings
  await embedChunksOnce();
  const queryEmb = await getQueryEmbedding(query);

  const scored: ScoredChunk[] = CHUNKS.map((chunk) => {
    // TF-IDF score
    const tfScore = cosine(queryVec, chunk.termVec!);

    // Keyword exact match bonus
    let kwBoost = 0;
    for (const kw of chunk.keywords) { if (queryLower.includes(kw)) kwBoost += 0.12; }

    // Real embedding score
    let embScore = 0;
    let matchType: "keyword" | "semantic" | "hybrid" = "keyword";
    if (queryEmb && chunk.embedding) {
      embScore = cosineEmb(queryEmb, chunk.embedding);
      matchType = embScore > 0.3 ? (tfScore > 0.1 ? "hybrid" : "semantic") : "keyword";
    }

    const priority = chunk.priority * 0.015;
    const score = Math.max(embScore * 0.6, 0) + tfScore * 0.3 + kwBoost + priority;

    return { chunk, score, matchType };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter((s) => s.score > 0.04);
}

// ─── Confidence Scoring ──────────────────────────────────────────
export type Confidence = "high" | "medium" | "low";

function computeConfidence(results: ScoredChunk[], query: string): { level: Confidence; score: number } {
  if (results.length === 0) return { level: "low", score: 0.1 };
  const topScore = results[0].score;
  const hasSemantic = results.some((r) => r.matchType === "semantic" || r.matchType === "hybrid");

  if (topScore > 0.4 || (topScore > 0.25 && hasSemantic)) return { level: "high", score: Math.min(topScore * 2, 1) };
  if (topScore > 0.15) return { level: "medium", score: topScore * 2 };
  return { level: "low", score: topScore * 2 };
}

// ─── Source Attribution ──────────────────────────────────────────
export interface Source {
  title: string;
  page: string;
  label: string;
  relevance: number; // 0-100
}

function buildSources(results: ScoredChunk[]): Source[] {
  const seen = new Set<string>();
  return results.slice(0, 4).filter((r) => {
    if (seen.has(r.chunk.sourcePage)) return false;
    seen.add(r.chunk.sourcePage);
    return true;
  }).map((r) => ({
    title: r.chunk.title,
    page: r.chunk.sourcePage,
    label: r.chunk.sourceLabel,
    relevance: Math.round(Math.min(r.score * 200, 100)),
  }));
}

// ─── Page Recommendations ────────────────────────────────────────
export interface PageRec { title: string; path: string; reason: string; }

function recommendPages(query: string, results: ScoredChunk[]): PageRec[] {
  const q = query.toLowerCase();
  const recs: PageRec[] = [];
  const seen = new Set<string>();

  // From retrieval results
  for (const r of results.slice(0, 2)) {
    if (!seen.has(r.chunk.sourcePage)) {
      seen.add(r.chunk.sourcePage);
      recs.push({ title: r.chunk.sourceLabel, path: r.chunk.sourcePage, reason: `Relevant to ${r.chunk.category}` });
    }
  }

  // Contextual extras
  const extras: [RegExp, string, string, string][] = [
    [/donat|give|support|money/, "/donate", "Donate", "Make a donation"],
    [/volunteer/, "/volunteer", "Volunteer", "Submit a volunteer enquiry"],
    [/partner/, "/partner-with-ces", "Partner with CES", "Explore partnership"],
    [/team|staff|who work/, "/team", "Meet Our Team", "View team profiles"],
    [/programme|program|project|work/, "/programmes", "Our Programmes", "Explore programmes"],
    [/contact|phone|email|whatsapp/, "/contact", "Contact CES", "Get in touch"],
    [/story|stories|impact/, "/impact-stories", "Stories", "Read transformation stories"],
  ];
  for (const [regex, path, title, reason] of extras) {
    if (regex.test(q) && !seen.has(path)) { seen.add(path); recs.push({ title, path, reason }); }
  }
  return recs.slice(0, 3);
}

// ─── Follow-Up Question Generation ──────────────────────────────
function generateFollowUps(query: string, results: ScoredChunk[], context: ConvContext): string[] {
  const topCategory = results[0]?.chunk.category || "general";
  const discussed = new Set(context.topics);
  const followUps: string[] = [];

  // Category-specific follow-ups
  const catFollowUps: Record<string, string[]> = {
    about: ["What programmes does CES run?", "Who leads CES?", "Where is CES located?"],
    location: ["What districts does CES work in?", "Tell me about Sierra Leone", "How can I visit CES?"],
    programmes: ["How do Farmer Field Schools work?", "Tell me about VSLAs", "What is the Trust Rice Project?"],
    team: ["Who is the Executive Director?", "Tell me about the field staff", "What does the Gender Officer do?"],
    support: ["How can I donate?", "Can I volunteer remotely?", "What kind of partners does CES work with?"],
    contact: ["Where is CES located?", "Can I visit the office?", "What programmes does CES run?"],
  };

  const candidates = catFollowUps[topCategory] || ["Tell me more about CES", "What programmes do you run?", "How can I get involved?"];

  // Filter out topics already discussed
  for (const q of candidates) {
    const qLower = q.toLowerCase();
    let isDuplicate = false;
    for (const topic of discussed) {
      if (qLower.includes(topic)) { isDuplicate = true; break; }
    }
    if (!isDuplicate && followUps.length < 3) followUps.push(q);
  }

  // Fill with general if needed
  const general = ["What makes CES different?", "How has CES changed communities?", "Tell me something surprising about CES"];
  while (followUps.length < 2) followUps.push(general[followUps.length] || "Tell me more");

  return followUps.slice(0, 3);
}

// ─── Handoff Detection ──────────────────────────────────────────
export interface Handoff {
  needed: boolean;
  reason: string;
  method: "whatsapp" | "email";
  prefilled?: string;
}

function detectHandoff(query: string, context: ConvContext): Handoff | null {
  const q = query.toLowerCase();
  if (/\b(safeguard|abuse|child|minor|complaint|grievance|harm|unsafe|report|concern)\b/i.test(q))
    return { needed: true, reason: "Safeguarding matters should be handled by CES staff directly.", method: "whatsapp", prefilled: "Hello CES, I need to discuss a sensitive matter." };
  if (/\b(bank|transfer|wire|account number|payment detail|invoice)\b/i.test(q))
    return { needed: true, reason: "Payment details need to be arranged directly with CES.", method: "whatsapp", prefilled: "Hello CES, I need help with donation payment details." };
  if (/\b(job|hiring|vacancy|employ|recruit|apply.*position)\b/i.test(q))
    return { needed: true, reason: "Employment enquiries are best handled by CES directly.", method: "email" };
  if (/\b(media|press|journalist|interview)\b/i.test(q))
    return { needed: true, reason: "Media enquiries should go directly to CES leadership.", method: "email" };
  if (/\b(speak.*human|talk.*person|real person|speak.*someone|talk.*staff)\b/i.test(q))
    return { needed: true, reason: "Let me connect you with a CES team member.", method: "whatsapp" };
  if (context.messageCount > 8)
    return { needed: true, reason: "For a more detailed conversation, CES staff can help directly.", method: "whatsapp" };
  return null;
}

// ─── Conversation Context ────────────────────────────────────────
export interface ConvContext {
  topics: string[];
  messageCount: number;
  summary: string;
  answeredQuestions: string[];
  unansweredTopics: string[];
}

export function buildContext(history: { role: string; content: string }[]): ConvContext {
  const topics = new Set<string>();
  const answeredQuestions: string[] = [];
  const userMessages = history.filter((m) => m.role === "user");

  for (const msg of userMessages) {
    const lower = msg.content.toLowerCase();
    if (/locat|where|address|kabala|office/i.test(lower)) topics.add("location");
    if (/donat|give|money|support/i.test(lower)) topics.add("donations");
    if (/volunteer/i.test(lower)) topics.add("volunteering");
    if (/partner/i.test(lower)) topics.add("partnerships");
    if (/programme|program|work|agric|farm|women|vsla|education/i.test(lower)) topics.add("programmes");
    if (/team|staff|sarah|edward|fatmata|alie|lansana|sallu|baio/i.test(lower)) topics.add("team");
    if (/contact|phone|email|whatsapp/i.test(lower)) topics.add("contact");
    if (/mission|vision|about|history/i.test(lower)) topics.add("about");
    if (/sierra leone|africa/i.test(lower)) topics.add("geography");
    answeredQuestions.push(msg.content.slice(0, 60));
  }

  const topicsList = [...topics];
  const unanswered = ["programmes", "team", "location", "donations", "about"].filter((t) => !topics.has(t));

  return {
    topics: topicsList,
    messageCount: userMessages.length,
    summary: topicsList.length > 0
      ? `Visitor asked about: ${topicsList.join(", ")}. ${userMessages.length} messages sent.`
      : "New conversation.",
    answeredQuestions,
    unansweredTopics: unanswered,
  };
}

// ─── System Prompt Builder ───────────────────────────────────────
function systemPrompt(knowledge: string, context: ConvContext): string {
  return `You are the CES Impact Assistant — a warm, knowledgeable AI concierge for Christian Extension Services (CES), a Christian community development organisation in Sierra Leone.

PERSONALITY: Warm, friendly, specific, conversational. Like a well-informed colleague who genuinely cares. Ask follow-up questions. Never dump bullet lists without context.

RULES:
1. Use ONLY facts from KNOWLEDGE below — never invent statistics or outcomes
2. Be specific: use real names (Sarah Kanu, Fatmata Kumarr), real places (Kabala, Koinadugu), real projects (Trust Rice, VSLAs)
3. For greetings: be warm, varied, ask what brings them here
4. For location: give specific geography — Kabala, Koinadugu District, Northern Province, Sierra Leone, West Africa, 400km from Freetown
5. End with a natural follow-up question or suggestion
6. For donations: mention WhatsApp ${SITE.phone} as the current best method
7. Keep responses 2-4 paragraphs. Natural language, not robot formatting
8. If unsure: say so honestly, suggest contacting CES
9. You are an AI assistant, not a CES staff member

CONVERSATION SO FAR: ${context.summary}
${context.topics.length > 0 ? `Topics already discussed: ${context.topics.join(", ")}. Don't repeat information already covered.` : ""}
${context.unansweredTopics.length > 0 ? `Topics not yet discussed (could suggest): ${context.unansweredTopics.join(", ")}` : ""}

KNOWLEDGE:
${knowledge}`;
}

// ─── Full Response Type ──────────────────────────────────────────
export interface FullResponse {
  message: string;
  sources: Source[];
  recommendations: PageRec[];
  followUps: string[];
  confidence: { level: Confidence; score: number };
  handoff: Handoff | null;
  topics: string[];
}

// ─── Main Entry Point ────────────────────────────────────────────
export async function generateResponse(
  query: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<FullResponse> {
  const context = buildContext(history);
  const results = await retrieve(query);
  const confidence = computeConfidence(results, query);
  const sources = buildSources(results);
  const recommendations = recommendPages(query, results);
  const handoff = detectHandoff(query, context);
  const followUps = generateFollowUps(query, results, context);
  const knowledgeText = results.map((r) => `[${r.chunk.sourceLabel}]: ${r.chunk.content}`).join("\n\n");

  // Handoff takes priority
  if (handoff) {
    return {
      message: `I appreciate you reaching out about this. ${handoff.reason}\n\nThis is something CES staff should handle directly. Please reach out to them — they'll take good care of you.`,
      sources: [],
      recommendations: [],
      followUps: [],
      confidence: { level: "high", score: 1 },
      handoff,
      topics: context.topics,
    };
  }

  // Try OpenAI
  const openai = getOpenAI();
  if (openai) {
    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt(knowledgeText, context) },
        ...history.slice(-10).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user", content: query },
      ];
      const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", messages, max_tokens: 600, temperature: 0.8 });
      const msg = completion.choices[0]?.message?.content;
      if (msg) return { message: msg, sources, recommendations, followUps, confidence, handoff, topics: context.topics };
    } catch (e) { console.error("OpenAI error:", e); }
  }

  // Fallback
  const msg = fallback(query, results, context);
  return { message: msg, sources, recommendations, followUps, confidence, handoff, topics: context.topics };
}

// ─── Conversational Fallback ─────────────────────────────────────
function fallback(query: string, results: ScoredChunk[], context: ConvContext): string {
  const q = query.toLowerCase().trim();
  const isReturning = context.messageCount > 0;

  // Greetings
  if (/^(hi|hello|hey|hiya|yo|good\s*(morning|afternoon|evening|day)|greetings|howdy|what'?s\s*up)/i.test(q)) {
    if (isReturning) return `Welcome back! 😊 We were chatting about ${context.topics.join(" and ") || "CES"}. What else would you like to explore?`;
    const g = [
      `Hello! 👋 Welcome to CES. I'm the Impact Assistant, and I know quite a lot about our 46+ years of community development in Sierra Leone.\n\nWhat brings you here today? Are you curious about our programmes, thinking about supporting our work, or something else entirely?`,
      `Hi there! 😊 I'm here to help you learn about CES — our work in Sierra Leone, our team, how to get involved. I'm genuinely happy to chat.\n\nWhat would you like to know?`,
      `Good to see you! 👋 I'm the CES Impact Assistant. Feel free to ask me anything — from "Where is Sierra Leone?" to "Who is Sarah Kanu?" to "How do VSLAs work?" — I'm ready.\n\nWhat catches your interest?`,
    ];
    return g[Math.floor(Math.random() * g.length)];
  }

  // Small talk
  if (/\b(how are you|how.*doing|how.*going)\b/i.test(q)) return `I'm doing great, thanks! 😊 I always enjoy chatting about CES.\n\nWhat can I help you with? I'm good at explaining programmes, introducing team members, or helping you figure out how to get involved.`;
  if (/\b(thank|thanks|cheers|appreciate)\b/i.test(q)) return `You're welcome! 😊 If more questions come up, I'm always here. Or reach CES directly on WhatsApp at ${SITE.phone}. Take care!`;
  if (/\b(bye|goodbye|see you|take care)\b/i.test(q)) return `Goodbye! 👋 Thank you for your interest in CES — it truly matters. Come back anytime, or WhatsApp CES at ${SITE.phone}. 🙏`;

  // Use retrieved knowledge
  if (results.length > 0 && results[0].score > 0.08) {
    const top = results[0].chunk;
    const second = results.length > 1 ? results[1].chunk : null;
    let response = top.content;
    if (second && second.category === top.category) response += "\n\n" + second.content;

    const followUps: Record<string, string> = {
      about: "Would you like to know about our programmes or team?",
      location: "Want to know about the communities we work with?",
      programmes: "Which programme interests you most? I can go deeper.",
      team: "Would you like to know about other team members?",
      support: "What else can I help you with?",
      contact: "Is there something specific you'd like to discuss with CES?",
    };
    return `${response}\n\n${followUps[top.category] || "What else would you like to know?"}`;
  }

  // Default
  if (q.length < 10) return `I'd love to help! Try asking something like:\n\n• "Where is CES located?"\n• "What is the Trust Rice Project?"\n• "Who is Fatmata Kumarr?"\n• "How can I donate?"\n\nI know a lot about CES — just ask! 😊`;
  return `Interesting question! I may not have the exact answer, but I know a lot about CES — programmes, team, location, and how to get involved.\n\nCould you rephrase? Or for specific help, WhatsApp CES at ${SITE.phone}.`;
}
