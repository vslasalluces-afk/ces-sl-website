"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, Loader2, FileText, Users, BookOpen, Newspaper } from "lucide-react";

interface SearchResult {
  id: string;
  type: "programme" | "story" | "team" | "resource" | "update";
  title: string;
  description: string;
  url: string;
  category?: string;
}

interface SearchResponse {
  hits: SearchResult[];
  totalHits: number;
  query: string;
  processingTimeMs: number;
}

const TYPE_ICONS = {
  programme: BookOpen,
  story: FileText,
  team: Users,
  resource: FileText,
  update: Newspaper,
};

const TYPE_LABELS = {
  programme: "Programme",
  story: "Story",
  team: "Team",
  resource: "Resource",
  update: "Update",
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Debounced search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=10`
      );
      const data: SearchResponse = await response.json();
      setResults(data.hits);
      setSelectedIndex(0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      window.location.href = results[selectedIndex].url;
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cream border border-peach-200 rounded-lg text-charcoal/60 text-sm hover:border-peach hover:bg-peach-100 transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 bg-peach-100 rounded text-xs text-charcoal/50">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-deep-brown/50 backdrop-blur-sm flex items-start justify-center pt-[10vh]"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-peach-100 overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-peach-100">
          <Search className="w-5 h-5 text-charcoal/40" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search programmes, stories, team..."
            className="flex-1 text-charcoal placeholder:text-charcoal/40 outline-none text-lg"
            autoComplete="off"
          />
          {loading && <Loader2 className="w-5 h-5 text-peach animate-spin" />}
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-peach-100 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-charcoal/60" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto p-2">
            {results.map((result, index) => {
              const Icon = TYPE_ICONS[result.type] || FileText;
              return (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={handleClose}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                    index === selectedIndex
                      ? "bg-peach-100"
                      : "hover:bg-cream"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-peach-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-deep-brown" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-deep-brown truncate">
                        {result.title}
                      </span>
                      <span className="text-xs text-charcoal/40 bg-cream px-2 py-0.5 rounded-full shrink-0">
                        {TYPE_LABELS[result.type]}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/60 line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* No results */}
        {query.length >= 2 && !loading && results.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-charcoal/60">No results found for &quot;{query}&quot;</p>
            <p className="text-sm text-charcoal/40 mt-1">
              Try different keywords or browse our programmes
            </p>
          </div>
        )}

        {/* Initial state */}
        {query.length < 2 && (
          <div className="p-8 text-center">
            <p className="text-charcoal/40 text-sm">
              Start typing to search across CES content
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link
                href="/programmes"
                onClick={handleClose}
                className="text-xs text-muted-green hover:underline"
              >
                Programmes
              </Link>
              <Link
                href="/impact-stories"
                onClick={handleClose}
                className="text-xs text-muted-green hover:underline"
              >
                Stories
              </Link>
              <Link
                href="/team"
                onClick={handleClose}
                className="text-xs text-muted-green hover:underline"
              >
                Team
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 bg-cream border-t border-peach-100 flex items-center justify-between text-xs text-charcoal/50">
          <span>Use ↑↓ to navigate, Enter to select</span>
          <span>Press Esc to close</span>
        </div>
      </div>
    </div>
  );
}
