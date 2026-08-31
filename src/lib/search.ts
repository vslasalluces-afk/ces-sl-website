// Search functionality for CES website
// Can be connected to Meilisearch, Algolia, or use local search

import { Meilisearch } from "meilisearch";

// Meilisearch client
const meilisearch = process.env.MEILISEARCH_URL
  ? new Meilisearch({
      host: process.env.MEILISEARCH_URL,
      apiKey: process.env.MEILISEARCH_API_KEY,
    })
  : null;

// Index names
export const INDEXES = {
  PROGRAMMES: "programmes",
  STORIES: "stories",
  TEAM: "team",
  RESOURCES: "resources",
  UPDATES: "updates",
  ALL: "all_content",
} as const;

// Search result types
export interface SearchResult {
  id: string;
  type: "programme" | "story" | "team" | "resource" | "update";
  title: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  date?: string;
}

export interface SearchResponse {
  hits: SearchResult[];
  totalHits: number;
  query: string;
  processingTimeMs: number;
}

// Initialize indexes (run once on deployment)
export async function initializeSearchIndexes(): Promise<void> {
  if (!meilisearch) {
    console.warn("Meilisearch not configured - search will use fallback");
    return;
  }

  try {
    // Create or update indexes
    await meilisearch.createIndex(INDEXES.ALL, { primaryKey: "id" });

    // Configure searchable attributes
    const index = meilisearch.index(INDEXES.ALL);
    await index.updateSearchableAttributes([
      "title",
      "description",
      "content",
      "category",
      "tags",
    ]);

    // Configure filterable attributes
    await index.updateFilterableAttributes(["type", "category", "date"]);

    // Configure ranking rules
    await index.updateRankingRules([
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness",
    ]);

    console.log("Search indexes initialized");
  } catch (error) {
    console.error("Search index initialization error:", error);
  }
}

// Index a document
export async function indexDocument(doc: SearchResult): Promise<void> {
  if (!meilisearch) return;

  try {
    const index = meilisearch.index(INDEXES.ALL);
    await index.addDocuments([doc]);
  } catch (error) {
    console.error("Document indexing error:", error);
  }
}

// Index multiple documents
export async function indexDocuments(docs: SearchResult[]): Promise<void> {
  if (!meilisearch) return;

  try {
    const index = meilisearch.index(INDEXES.ALL);
    await index.addDocuments(docs);
  } catch (error) {
    console.error("Bulk indexing error:", error);
  }
}

// Remove a document from index
export async function removeDocument(id: string): Promise<void> {
  if (!meilisearch) return;

  try {
    const index = meilisearch.index(INDEXES.ALL);
    await index.deleteDocument(id);
  } catch (error) {
    console.error("Document removal error:", error);
  }
}

// Search with Meilisearch
async function searchMeilisearch(
  query: string,
  options: {
    type?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<SearchResponse> {
  if (!meilisearch) {
    throw new Error("Meilisearch not configured");
  }

  const index = meilisearch.index(INDEXES.ALL);
  const { type, limit = 20, offset = 0 } = options;

  const filter = type ? `type = "${type}"` : undefined;

  const result = await index.search(query, {
    limit,
    offset,
    filter,
    attributesToHighlight: ["title", "description"],
  });

  return {
    hits: result.hits as SearchResult[],
    totalHits: result.estimatedTotalHits || 0,
    query,
    processingTimeMs: result.processingTimeMs,
  };
}

// Fallback local search (used when Meilisearch is not configured)
function searchLocal(
  query: string,
  options: {
    type?: string;
    limit?: number;
  } = {}
): SearchResponse {
  const { type, limit = 20 } = options;
  const lowerQuery = query.toLowerCase();
  const startTime = Date.now();

  // Static content to search
  const content: SearchResult[] = [
    {
      id: "prog-agriculture",
      type: "programme",
      title: "Agriculture and Food Security",
      description:
        "Supporting farming households through Farmer Field Schools, sustainable practices, Trust Rice Project and food security initiatives.",
      url: "/programmes/agriculture-food-security",
      category: "Agriculture",
    },
    {
      id: "prog-womens",
      type: "programme",
      title: "Women's Empowerment",
      description:
        "Village Savings and Loan Associations, enterprise development, financial literacy and economic empowerment for women.",
      url: "/programmes/womens-empowerment",
      category: "Women's Empowerment",
    },
    {
      id: "prog-gender",
      type: "programme",
      title: "Gender Equality and GBV Prevention",
      description:
        "Promoting gender equality, preventing gender-based violence, and creating safe, inclusive communities.",
      url: "/programmes/gender-equality-gbv-prevention",
      category: "Gender",
    },
    {
      id: "prog-community",
      type: "programme",
      title: "Community Development",
      description:
        "Participatory development approaches, Community Initiative Projects, and collective action.",
      url: "/programmes/community-development",
      category: "Community",
    },
    {
      id: "prog-education",
      type: "programme",
      title: "Education and Training",
      description:
        "Adult literacy, vocational training, capacity building workshops, and community education.",
      url: "/programmes/education-and-training",
      category: "Education",
    },
    {
      id: "team-sarah",
      type: "team",
      title: "Sarah Kanu - Executive Director",
      description:
        "Executive Director with MSc in International Banking and Finance, providing overall leadership for CES.",
      url: "/team#sarah-kanu",
    },
    {
      id: "team-alie",
      type: "team",
      title: "Alie Konteh Kamara - Programme Manager",
      description:
        "Programme Manager overseeing agricultural and community development work.",
      url: "/team#alie-konteh-kamara",
    },
    {
      id: "story-vsla",
      type: "story",
      title: "Empowering Women Through Village Savings",
      description:
        "VSLAs have helped women in Koinadugu District build economic independence.",
      url: "/impact-stories/empowering-women-through-vsla",
      category: "Women's Empowerment",
    },
    {
      id: "story-ffs",
      type: "story",
      title: "Farmer Field Schools Transforming Agriculture",
      description:
        "Field-based learning helping farming households adopt sustainable practices.",
      url: "/impact-stories/farmer-field-schools-transforming-agriculture",
      category: "Agriculture",
    },
  ];

  // Filter and score results
  const scored = content
    .filter((item) => {
      if (type && item.type !== type) return false;
      const searchText = `${item.title} ${item.description} ${item.category || ""}`.toLowerCase();
      return searchText.includes(lowerQuery);
    })
    .map((item) => {
      const searchText = `${item.title} ${item.description}`.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(lowerQuery) ? 2 : 0;
      const descMatch = item.description.toLowerCase().includes(lowerQuery) ? 1 : 0;
      return { ...item, score: titleMatch + descMatch };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return {
    hits: scored,
    totalHits: scored.length,
    query,
    processingTimeMs: Date.now() - startTime,
  };
}

// Main search function
export async function search(
  query: string,
  options: {
    type?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<SearchResponse> {
  if (!query || query.trim().length < 2) {
    return {
      hits: [],
      totalHits: 0,
      query,
      processingTimeMs: 0,
    };
  }

  // Try Meilisearch first, fall back to local search
  if (meilisearch) {
    try {
      return await searchMeilisearch(query, options);
    } catch (error) {
      console.error("Meilisearch error, falling back to local search:", error);
    }
  }

  return searchLocal(query, options);
}
