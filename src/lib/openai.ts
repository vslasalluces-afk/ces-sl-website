import OpenAI from "openai";
import { SITE } from "./constants";
import { TEAM_MEMBERS } from "./team-data";

// Initialize OpenAI client lazily
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

// ─── Complete CES Knowledge Base ─────────────────────────────────
// This is the single source of truth the assistant draws on.
const CES_KNOWLEDGE = `
=== CHRISTIAN EXTENSION SERVICES (CES) — COMPLETE KNOWLEDGE BASE ===

## IDENTITY
• Official name: Christian Extension Services (CES)
• Brand name: CES SL
• Tagline: "Transforming Communities. Empowering Lives."
• Type: Christian-based community development organisation
• Relationship: Development arm of the Christian Reformed Church in Sierra Leone
• Experience: More than 46 years of service (subject to CES confirmation)

## MISSION
"To build the capacity of vulnerable communities in Sierra Leone through training and working with communities for sustainable development."

## VISION
"Empowered communities in Sierra Leone, through initiating, implementing, and managing programmes for transformation."

## LOCATION & CONTACT
• Office address: 3 Mile, Kabala–Makeni Highway, Koinadugu District, Northern Province, Sierra Leone
• The office is in Kabala town, the capital of Koinadugu District, in Sierra Leone's Northern Province
• Kabala is approximately 400 km northeast of Freetown (the national capital)
• Phone & WhatsApp: ${SITE.phone}
• Email: ${SITE.email}
• Facebook: ${SITE.facebook}
• GPS coordinates: 9.59°N, 11.56°W
• Best way to reach CES quickly: WhatsApp at ${SITE.phone}

## AREAS OF OPERATION
CES works in three districts in Sierra Leone's Northern Province:
1. Koinadugu District — where the CES office is located (capital: Kabala)
2. Falaba District — created in 2017 from the northern part of Koinadugu
3. Tonkolili District — south of Koinadugu (capital: Magburaka)
These are predominantly rural areas with farming communities.

## ABOUT SIERRA LEONE
• Sierra Leone is a country on the west coast of Africa
• Capital: Freetown
• Population: approximately 8.4 million
• Languages: English (official), Krio, Temne, Mende, and many others
• The country experienced a civil war (1991–2002) and an Ebola outbreak (2014–2016)
• Agriculture is the main livelihood for most rural Sierra Leoneans

## PROGRAMME AREAS (11 categories)
1. **Community Development** — Participatory approaches, Community Initiative Projects (CIPs), local governance strengthening, collective action
2. **Education and Training** — Adult literacy classes, vocational skills training, capacity building workshops
3. **Sustainable Livelihoods** — Skills training, enterprise development, market access, climate-adaptive practices
4. **Agriculture and Food Security** — Farmer Field Schools, Trust Rice Project, improved seed distribution, post-harvest management, sustainable farming
5. **Gender Equality and GBV Prevention** — Preventing and responding to gender-based violence, community awareness, safe spaces for women and girls
6. **Women's Empowerment** — Village Savings and Loan Associations (VSLAs), financial literacy, enterprise development, women's leadership
7. **Village Savings and Loan Associations (VSLAs)** — Community savings groups where members save together and access small loans for business and family needs
8. **Farmer Field Schools** — Practical, field-based learning where farmers develop agricultural skills through hands-on experience
9. **Adult Literacy** — Reading, writing, and numeracy classes for adults who missed formal education
10. **Climate Resilience** — Helping communities adapt to changing weather patterns through sustainable practices
11. **Vulnerable Community Support** — Targeted support for the most vulnerable: orphans, elderly, people with disabilities

## KEY PROJECTS
• **Trust Rice Project** — Supporting sustainable rice production and stronger livelihoods. Implemented by field staff including Lansana Amos Janneh.
• **Community Initiative Projects (CIPs)** — Community-led development projects planned and managed by local communities
• **Village Savings and Loan Associations (VSLAs)** — Financial inclusion groups, primarily for women

## CES TEAM (${TEAM_MEMBERS.length} members)
${TEAM_MEMBERS.map((m) => `• **${m.fullName}** — ${m.jobTitle}${m.department ? ` (${m.department})` : ""}
  ${m.shortBio}${m.quote ? `\n  Quote: "${m.quote}"` : ""}`).join("\n")}

## HOW TO SUPPORT CES
1. **Donate** — One-off or recurring (monthly/quarterly/annual). Currencies: USD, GBP, EUR, SLE.
   ⚠️ Online payment is being set up. For now, contact CES directly:
   WhatsApp: ${SITE.phone} | Email: ${SITE.email}
   Website: /donate
2. **Volunteer** — Share skills in programme support, training, research, communications, M&E
   Submit enquiry at /volunteer. Note: does not guarantee placement.
3. **Partner** — Churches, NGOs, foundations, governments, corporates, academia
   Submit enquiry at /partner-with-ces
4. **Subscribe** — Newsletter for programme updates and community stories

## WEBSITE PAGES
/ — Homepage
/about — About CES, history, mission, vision, values
/programmes — All 11 programme areas
/impact-stories — Stories of community transformation
/donate — Donation information
/get-involved — Ways to support
/volunteer — Volunteer enquiry form
/partner-with-ces — Partnership enquiry form
/team — Full team profiles
/contact — Contact form, address, phone, email
/gallery — Photo gallery
/events — Upcoming events
/updates — News and announcements
/resources — Reports, policies, publications
/portal/login — Donor portal login
/portal/register — Create donor account

## IMPORTANT FACTS TO REMEMBER
• CES does NOT currently process online payments — always direct donors to WhatsApp or email
• CES was founded as part of the Christian Reformed Church in Sierra Leone
• CES works WITH communities, not FOR them — community ownership is central
• Never invent statistics, beneficiary numbers, or impact figures
• The correct phone number is ${SITE.phone}
`;

// ─── Conversation-Aware System Prompt ────────────────────────────
const SYSTEM_PROMPT = `You are the CES Impact Assistant — a warm, knowledgeable, and genuinely helpful AI concierge for Christian Extension Services (CES), a Christian community development organisation in Sierra Leone.

PERSONALITY:
• Warm, welcoming, and conversational — like a friendly, well-informed colleague
• Use the visitor's name if they share it
• Show genuine interest in what the visitor wants to know
• Be specific and detailed, not generic — use real facts from the knowledge base
• Vary your responses — never give the same reply to different questions
• Ask thoughtful follow-up questions to keep the conversation going
• Use natural language, not bullet-point dumps (unless listing things)

CONVERSATION RULES:
1. GREETINGS: Be warm and personal. Vary your greetings. Ask what brings them here. Don't just list your capabilities — have a conversation.
2. LOCATION QUESTIONS: Give specific geographic details — Kabala town, Koinadugu District, Northern Province, Sierra Leone, West Africa. Mention the office is on the Kabala–Makeni Highway. Mention Sierra Leone is on the west coast of Africa. Give context about the area.
3. FOLLOW-UP: Always end with a natural follow-up question or suggestion. Don't just dump information and stop.
4. SHORT ANSWERS: For simple questions, give short specific answers. Don't over-explain.
5. CONTEXT: Pay attention to what the visitor already asked. Don't repeat yourself. Build on the conversation.
6. LINKS: When mentioning a page, use the path (e.g., "you can read more at /about" or "visit /programmes").
7. CONTACT: When relevant, mention WhatsApp (${SITE.phone}) as the fastest way to reach CES.

THINGS YOU MUST NOT DO:
• Don't invent facts, statistics, donor names, or impact numbers
• Don't promise funding, placements, or outcomes
• Don't give medical, legal, or safeguarding advice
• Don't ask for sensitive personal information
• Don't claim to be a CES staff member — you're an AI assistant
• If you don't know something specific, say so honestly and suggest contacting CES

KNOWLEDGE BASE:
${CES_KNOWLEDGE}`;

// ─── Smart Response Generation ───────────────────────────────────
export async function generateRAGResponse(
  query: string,
  conversationHistory: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  // Try OpenAI first
  const openai = getOpenAI();
  if (openai) {
    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory.slice(-8).map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user", content: query },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 500,
        temperature: 0.8,
      });

      const response = completion.choices[0]?.message?.content;
      if (response) return response;
    } catch (error) {
      console.error("OpenAI API error:", error);
    }
  }

  // ─── Intelligent Fallback (no API key) ─────────────────────────
  return generateSmartFallback(query, conversationHistory);
}

// ─── Smart Fallback Engine ───────────────────────────────────────
// Much more conversational and context-aware than the old intent system

function generateSmartFallback(
  query: string,
  history: { role: "user" | "assistant"; content: string }[]
): string {
  const q = query.toLowerCase().trim();
  const isFirstMessage = history.length <= 1;
  const lastBotMessage = history.filter((m) => m.role === "assistant").pop()?.content || "";

  // ─── Greetings ─────────────────────────────────────────────────
  if (/^(hi|hello|hey|hiya|yo|good\s*(morning|afternoon|evening|day)|greetings|howdy|what'?s\s*up)/i.test(q)) {
    const greetings = [
      `Hello! 👋 Welcome to CES — great to have you here. I'm the CES Impact Assistant, and I'd love to help you learn about our community development work in Sierra Leone.\n\nWhat brings you here today? Are you curious about our programmes, thinking about supporting our work, or just getting to know CES?`,
      `Hi there! 😊 Thanks for stopping by. I'm the CES Impact Assistant — think of me as a friendly guide to everything CES does in Sierra Leone.\n\nAre you interested in learning about our work, or is there something specific I can help you with?`,
      `Good to see you! 👋 I'm the CES Impact Assistant. CES has been transforming communities in Sierra Leone for over 46 years, and I'm here to tell you all about it.\n\nWhat would you like to know? I can talk about our programmes, our team, how to get involved — whatever interests you most.`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // ─── Location / Where questions ────────────────────────────────
  if (/\b(where|location|locat|find you|based|address|office|situated|direction|map)\b/i.test(q)) {
    if (/sierra leone|country|africa/i.test(q)) {
      return `Sierra Leone is a beautiful country on the **west coast of Africa**, bordered by Guinea to the north and Liberia to the southeast. The capital is Freetown, right on the Atlantic coast.\n\nCES is based in **Kabala**, which is the capital of Koinadugu District in the Northern Province — about 400 km northeast of Freetown. It's a rural, mountainous area where most people depend on farming.\n\nOur office is at **3 Mile, Kabala–Makeni Highway**. You can find us on Google Maps or reach us on WhatsApp at ${SITE.phone}.\n\nWould you like to know more about the communities we work with in this area?`;
    }

    return `CES is based in **Kabala town**, Koinadugu District, in the **Northern Province of Sierra Leone**, West Africa. Our office is located at **3 Mile, on the Kabala–Makeni Highway**.\n\nWe work across three districts:\n• **Koinadugu** — where our office is\n• **Falaba** — just north of Koinadugu\n• **Tonkolili** — further south\n\nThese are rural, farming communities in the northern highlands of Sierra Leone. You can find us on Google Maps at coordinates 9.59°N, 11.56°W, or reach us on WhatsApp at ${SITE.phone}.\n\nIs there anything specific about the area you'd like to know?`;
  }

  // ─── About CES ─────────────────────────────────────────────────
  if (/\b(what is ces|who is ces|what does ces|tell me about ces|about ces|what do you do|about your org)/i.test(q)) {
    return `CES — **Christian Extension Services** — is a community development organisation that's been working in Sierra Leone for **over 46 years**. We're the development arm of the Christian Reformed Church in Sierra Leone.\n\nWhat makes CES different is that we work **alongside** communities, not for them. Everything we do is built on the idea that communities should lead their own development. Our focus areas include:\n\n🌾 Sustainable agriculture and food security\n👩 Women's empowerment through savings groups (VSLAs)\n📚 Education, literacy, and training\n⚖️ Gender equality and GBV prevention\n🏘️ Community-led development projects\n\nWe're based in Kabala, Koinadugu District, and work across three districts in northern Sierra Leone.\n\nWhat aspect of our work interests you most? I can go deeper on any of these.`;
  }

  // ─── Mission / Vision ──────────────────────────────────────────
  if (/\b(mission|vision|purpose|goal|why|values|believe)\b/i.test(q)) {
    return `At the heart of everything CES does are our mission and vision:\n\n**Our Mission:**\n"${SITE.mission}"\n\n**Our Vision:**\n"${SITE.vision}"\n\nThe key word is **"with"** — CES doesn't do development *for* communities, we do it *with* them. We believe communities have the knowledge and capability to lead their own transformation when given the right support and training.\n\nThis philosophy of partnership and empowerment has guided CES for over 46 years.\n\nWould you like to know about our specific programmes or how this plays out in practice?`;
  }

  // ─── Programmes ────────────────────────────────────────────────
  if (/\b(programme|program|project|what.*do|activit|service|work.*in|your work|our work|tell.*work|about.*work)\b/i.test(q)) {
    if (/agric|farm|food|rice|crop|harvest/i.test(q)) {
      return `Our **Agriculture and Food Security** programme is one of our largest. Here's what it includes:\n\n🌾 **Farmer Field Schools** — Hands-on learning where farmers develop skills in sustainable agriculture right in the field, not a classroom\n🍚 **Trust Rice Project** — Supporting sustainable rice production and food security\n🌱 **Improved seed distribution** — Getting better crop varieties to farming households\n📦 **Post-harvest management** — Reducing food loss after harvest\n\nMost families in our operational area depend on farming, so improving agriculture directly improves lives. Our field staff like Lansana Amos Janneh and Sallu Marah work directly with farming communities.\n\nWould you like to know about our other programmes, or how Farmer Field Schools actually work?`;
    }

    if (/women|gender|vsla|saving|loan|empower/i.test(q)) {
      return `Women's empowerment is central to CES's work. We run two closely related programmes:\n\n👩 **Women's Empowerment** — Village Savings and Loan Associations (VSLAs), enterprise development, financial literacy, and women's leadership training\n\n⚖️ **Gender Equality & GBV Prevention** — Community awareness, prevention of gender-based violence, and creating safe spaces\n\n**VSLAs** are particularly powerful — women in a group save together regularly, and can then take small loans to invest in businesses or family needs. It builds financial independence and community solidarity at the same time.\n\nOur Gender Officer, **Fatmata Kumarr**, leads this work. She says: *"Empowering women, strengthening farmers and promoting equality are key to building resilient and thriving communities."*\n\nWant to learn more about how VSLAs work, or our other programmes?`;
    }

    return `CES runs **11 integrated programme areas**. Here are the main ones:\n\n🌾 **Agriculture & Food Security** — Farmer Field Schools, Trust Rice Project\n👩 **Women's Empowerment** — VSLAs, enterprise development\n⚖️ **Gender Equality** — GBV prevention and response\n🏘️ **Community Development** — Community Initiative Projects\n📚 **Education & Training** — Adult literacy, skills development\n🌱 **Sustainable Livelihoods** — Enterprise support, climate adaptation\n\nEach programme is designed to work together — for example, women in VSLAs often also participate in Farmer Field Schools, and adult literacy helps people manage their savings better.\n\nYou can explore all programmes at /programmes. Which one interests you most? I can tell you much more about any of them.`;
  }

  // ─── Team ──────────────────────────────────────────────────────
  if (/\b(team|staff|who works|people|director|leader|sarah|edward|fatmata|sallu|alie|lansana|baio)\b/i.test(q)) {
    // Check for specific person
    const personMatch = TEAM_MEMBERS.find((m) =>
      q.includes(m.fullName.toLowerCase()) ||
      q.includes(m.fullName.split(" ")[0].toLowerCase())
    );

    if (personMatch) {
      return `**${personMatch.fullName}** is our ${personMatch.jobTitle}${personMatch.department ? ` in ${personMatch.department}` : ""}.\n\n${personMatch.fullBio.split("\n\n")[0]}\n\n${personMatch.quote ? `*"${personMatch.quote}"*\n\n` : ""}You can read their full profile at /team#${personMatch.slug}. Would you like to know about other team members?`;
    }

    const leadership = TEAM_MEMBERS.slice(0, 4)
      .map((m) => `• **${m.fullName}** — ${m.jobTitle}`)
      .join("\n");

    return `CES has a dedicated team of ${TEAM_MEMBERS.length} professionals. Our leadership includes:\n\n${leadership}\n\nPlus our field team who work directly with communities: **Fatmata Kumarr** (Gender Officer), **Sallu Marah**, **Baio Bockarie Mansaray**, and **Lansana Amos Janneh** (Field Staff).\n\nOur Executive Director, Sarah Kanu, often says: *"If you go alone, you go fast, but if you want to go far, go together."* That philosophy runs through everything CES does.\n\nYou can read full profiles at /team. Would you like to know more about any team member in particular?`;
  }

  // ─── Donations ─────────────────────────────────────────────────
  if (/\b(donat\w*|give|gift|money|fund|support.*financ|contribut\w*|pay|how.*help)\b/i.test(q)) {
    return `Thank you for wanting to support CES! 💛 Every contribution directly helps communities in Sierra Leone.\n\n**How to donate:**\nRight now, the best way is to contact CES directly:\n📱 **WhatsApp:** ${SITE.phone} (fastest)\n✉️ **Email:** ${SITE.email}\n\nWe accept one-off gifts or recurring donations (monthly, quarterly, annual) in USD, GBP, EUR, or SLE.\n\nOnline payment is being set up — once it's ready, you'll be able to donate through the website at /donate.\n\nYou can also create a donor account at /portal/register to track your giving.\n\nWould you like to know how your donation would be used, or is there a specific programme you'd like to support?`;
  }

  // ─── Volunteering ──────────────────────────────────────────────
  if (/\b(volunteer\w*|intern|help.*out|contribute.*time|work.*with.*ces)\b/i.test(q)) {
    return `We'd love to hear from you! CES welcomes volunteers who bring relevant skills and a genuine commitment to community development.\n\n**What volunteers might do:**\n• Support programme delivery in the field\n• Help with training and facilitation\n• Contribute research or communications skills\n• Support monitoring, evaluation, and learning\n\n**How to apply:**\nFill out the enquiry form at /volunteer with your skills and availability.\n\n⚠️ Important: Submitting an enquiry doesn't guarantee a placement — CES will review your application and reach out if there's a good fit. All volunteers must respect CES's safeguarding policies.\n\nFor quick questions, WhatsApp CES at ${SITE.phone}.\n\nWhat skills or experience would you bring? That might help me suggest where you'd fit best.`;
  }

  // ─── Partnership ───────────────────────────────────────────────
  if (/\b(partner\w*|collaborat\w*|work.*together|organisat|organizat|church|foundation|ngo)\b/i.test(q)) {
    return `CES actively seeks partnerships with organisations that share our commitment to sustainable development.\n\n**We partner with:**\n🏛️ Churches and faith-based organisations\n🌍 NGOs and civil society groups\n💰 Foundations and donor organisations\n🏢 Government and public institutions\n🎓 Research and academic bodies\n\n**Partnership could involve:**\n• Joint programme design and implementation\n• Technical expertise and capacity building\n• Funding and resource mobilisation\n• Research collaboration\n\nBefore joining CES, both our Programme Manager Alie Konteh Kamara and our M&E Officer Edward Kanu worked with **CARE International** — so CES has strong experience working with international partners.\n\nYou can submit a partnership enquiry at /partner-with-ces, or reach out directly on WhatsApp at ${SITE.phone}.\n\nWhat kind of partnership are you thinking about?`;
  }

  // ─── Contact ───────────────────────────────────────────────────
  if (/\b(contact|reach|phone|email|whatsapp|call|write|message|get.*touch|speak.*to)\b/i.test(q)) {
    return `Here's how to reach CES:\n\n📱 **WhatsApp:** ${SITE.phone} — this is usually the fastest way\n📞 **Phone:** ${SITE.phone}\n✉️ **Email:** ${SITE.email}\n📍 **Office:** 3 Mile, Kabala–Makeni Highway, Koinadugu District, Sierra Leone\n🌐 **Facebook:** CES on Facebook\n\nYou can also use the contact form on our website at /contact.\n\nCES typically responds within 2–3 working days. For urgent matters, WhatsApp is your best bet.\n\nIs there something specific you'd like to discuss with the team? I might be able to help right here.`;
  }

  // ─── Thanks ────────────────────────────────────────────────────
  if (/\b(thank|thanks|cheers|appreciate|grateful|helpful)\b/i.test(q)) {
    const replies = [
      `You're very welcome! 😊 It's been great chatting with you. If you think of anything else later, I'm always here. And remember, you can reach the CES team directly on WhatsApp at ${SITE.phone}. Have a wonderful day!`,
      `My pleasure! If you'd like to stay updated on CES's work, you can subscribe to our newsletter on the homepage. And if any other questions come up, just come back and ask. Take care! 🙏`,
      `Glad I could help! Remember, whether it's donating, volunteering, or just learning more — every bit of engagement with CES makes a difference for communities in Sierra Leone. Don't hesitate to reach out again! 😊`,
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  // ─── Farewell ──────────────────────────────────────────────────
  if (/\b(bye|goodbye|see you|take care|gotta go|leaving)\b/i.test(q)) {
    return `Goodbye! 👋 It was lovely chatting with you. Remember, you can always come back if you have more questions, or reach CES directly on WhatsApp at ${SITE.phone}.\n\nThank you for your interest in CES's work — it truly makes a difference. Take care! 🙏`;
  }

  // ─── How are you / small talk ──────────────────────────────────
  if (/\b(how are you|how.*doing|how.*going|what.*up)\b/i.test(q)) {
    return `I'm doing great, thanks for asking! 😊 I'm always happy when someone takes an interest in CES.\n\nIs there something I can help you with today? Whether it's learning about our programmes in Sierra Leone, finding out how to support our work, or just satisfying your curiosity — I'm here for it!`;
  }

  // ─── What can you do / capabilities ────────────────────────────
  if (/\b(what can you|help me|what.*you.*do|capabilities|features)\b/i.test(q)) {
    return `Great question! Here's what I can help you with:\n\n🏢 **About CES** — Our history, mission, vision, and values\n📋 **Programmes** — Detailed info on all 11 programme areas\n👥 **Team** — Who works at CES and their backgrounds\n📍 **Location** — Where we're based and where we work\n💛 **Donations** — How to support CES financially\n🤝 **Volunteering** — How to get involved\n🏛️ **Partnerships** — How organisations can collaborate with CES\n📞 **Contact** — How to reach the CES team\n\nI know a lot about CES — try asking me anything specific! For example, "Tell me about the Trust Rice Project" or "Who is Sarah Kanu?"`;
  }

  // ─── Specific topic queries ────────────────────────────────────
  if (/\b(trust rice|rice project)\b/i.test(q)) {
    return `The **Trust Rice Project** is one of CES's key agricultural initiatives. It supports sustainable rice production to strengthen food security and livelihoods in farming communities.\n\nRice is a staple food in Sierra Leone, so improving rice production has a direct impact on family nutrition and income. Our field staff, including **Lansana Amos Janneh**, contribute agricultural expertise to the project.\n\nThe Trust Rice Project works alongside our Farmer Field Schools, where farmers learn sustainable techniques through hands-on practice rather than classroom teaching.\n\nWould you like to know more about our other agricultural work, or about how Farmer Field Schools operate?`;
  }

  if (/\b(farmer field school|ffs)\b/i.test(q)) {
    return `**Farmer Field Schools (FFS)** are one of CES's most effective programmes. Here's how they work:\n\nInstead of lecturing farmers in a classroom, FFS takes learning to the field. A group of farmers meets regularly on a demonstration plot where they:\n• Test improved farming techniques hands-on\n• Compare traditional vs. new methods side by side\n• Learn about pest management, soil health, and water conservation\n• Develop problem-solving skills they can apply to their own farms\n\nOur Programme Manager, **Alie Konteh Kamara**, oversees this work — he has extensive experience from CARE International in sustainable agriculture and farmer training.\n\nThe beauty of FFS is that knowledge spreads farmer-to-farmer, so the impact extends far beyond the original group.\n\nWant to know about our other programmes, or how you could support this work?`;
  }

  // ─── Default: Conversational catch-all ─────────────────────────
  // Instead of a generic list, try to be helpful based on what they said
  if (q.length < 10) {
    return `I'd love to help! Could you tell me a bit more about what you're looking for? For example:\n\n• "Where is CES located?"\n• "Tell me about your agriculture programmes"\n• "How can I donate?"\n• "Who is the Executive Director?"\n\nOr just ask me anything about CES — I know quite a lot about our 46+ years of community development work in Sierra Leone! 😊`;
  }

  return `That's an interesting question! While I may not have the specific answer you're looking for, I can tell you a lot about CES's work in Sierra Leone.\n\nI'm most knowledgeable about:\n• Our **programmes** — agriculture, women's empowerment, education, community development\n• Our **team** — the ${TEAM_MEMBERS.length} professionals working across three districts\n• Our **location** — Kabala, Koinadugu District, Northern Province\n• How to **support** CES — donations, volunteering, partnerships\n\nIf your question is about something specific that I can't answer, I'd recommend contacting CES directly on WhatsApp at ${SITE.phone} — they'll be happy to help.\n\nCould you try rephrasing your question, or ask me about one of the topics above?`;
}

// Generate embeddings (for future vector search)
export async function generateEmbedding(text: string): Promise<number[] | null> {
  const openai = getOpenAI();
  if (!openai) return null;

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0]?.embedding || null;
  } catch (error) {
    console.error("Embedding generation error:", error);
    return null;
  }
}
