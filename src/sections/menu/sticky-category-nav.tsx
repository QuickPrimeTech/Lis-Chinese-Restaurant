"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { X, ArrowDown, Search, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteHeader } from "@/layouts/site-header";
import { Item } from "@/types/menu";

// Types
type StickyCategoryNavProps = {
  menuItems: Record<string, Item[]>;
  setSearchTerm: (term: string) => void;
  searchTerm: string;
};
type Category = { id: string; label: string };
type Suggestion = { id: string; name: string; category: string };

// Helpers
function getCategories(menuItems: Record<string, Item[]>): Category[] {
  return Object.entries(menuItems).map(([key, items]) => ({
    id: key,
    label: items[0]?.category || key,
  }));
}

export default function StickyCategoryNav({
  menuItems,
  setSearchTerm,
  searchTerm,
}: StickyCategoryNavProps) {
  const { announcementOpen } = useSiteHeader();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ derive categories from props (no useEffect needed)
  const categories = getCategories(menuItems);

  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isMobilesearchTermOpen, setIsMobilesearchTermOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Desktop check
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Click outside & escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setSuggestions([]);
        setHighlightedIndex(-1);
        if (isMobilesearchTermOpen && !searchTerm)
          setIsMobilesearchTermOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSuggestions([]);
        setHighlightedIndex(-1);
        if (isMobilesearchTermOpen && !searchTerm)
          setIsMobilesearchTermOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobilesearchTermOpen, searchTerm]);

  // Active category tracking
  useEffect(() => {
    if (categories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" } // middle of viewport
    );

    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories.length, categories]);

  // Suggestions update
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    const results: Suggestion[] = [];
    Object.values(menuItems).forEach((items) =>
      items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            id: `food-${item.id}`,
            name: item.name,
            category: item.category,
          });
        }
      })
    );

    setSuggestions(results.slice(0, 8));
    setHighlightedIndex(-1);
  }, [searchTerm, menuItems]);

  // --- Handlers ---
  const scrollToElement = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 200, behavior: "smooth" });
    }
  }, []);

  const handleSuggestionClick = (s: Suggestion) => {
    setSearchTerm(s.name);
    scrollToElement(s.id);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev < suggestions.length - 1 ? prev + 1 : 0;
        suggestionRefs.current[next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : suggestions.length - 1;
        suggestionRefs.current[next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  const handleMobilesearchTermToggle = () => {
    setIsMobilesearchTermOpen(!isMobilesearchTermOpen);
    if (!isMobilesearchTermOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (!searchTerm) {
      setIsMobilesearchTermOpen(false);
    }
  };
  return (
    <div
      className={cn(
        "sticky z-40 bg-background/95 rounded-md backdrop-blur-md border-b border-border/50 shadow-soft",
        announcementOpen ? "top-30" : "top-20"
      )}
    >
      <div className="flex items-center p-3 gap-3 max-w-7xl mx-auto">
        {/* searchTerm */}
        <div
          ref={containerRef}
          className={cn(
            "relative md:flex-1 transition-all duration-300 ease-in-out",
            "md:min-w-[300px] max-w-md",
            !isDesktop && isMobilesearchTermOpen ? "flex-1" : "w-auto"
          )}
        >
          {!isDesktop && !isMobilesearchTermOpen && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleMobilesearchTermToggle}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {(isDesktop || isMobilesearchTermOpen) && (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {!isDesktop && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => {
                    setIsMobilesearchTermOpen(false);
                    setSearchTerm("");
                    setSuggestions([]);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Input
                ref={inputRef}
                placeholder="search delicious food..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="pl-10 text-sm bg-card/50 border-border/50 focus:border-primary focus:ring-primary/20"
              />

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-elevated">
                  <ScrollArea className="max-h-80">
                    <div className="p-2">
                      <div className="text-xs text-muted-foreground mb-2 px-2 flex items-center gap-1">
                        <ArrowDown className="h-3 w-3" />
                        Use arrow keys to navigate
                      </div>
                      {suggestions.map((s, idx) => (
                        <div
                          key={s.id}
                          ref={(el) => {
                            suggestionRefs.current[idx] = el;
                          }}
                          className={cn(
                            "px-3 py-2 text-sm cursor-pointer rounded-md transition-all",
                            idx === highlightedIndex
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted/50"
                          )}
                          onMouseDown={() => handleSuggestionClick(s)}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                        >
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs opacity-70">{s.category}</div>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories */}
        {!isMobilesearchTermOpen && (
          <ScrollArea className="flex-1 w-full min-w-0 rounded-full px-2 py-0.5 bg-foreground/10">
            {categories.length > 0 ? (
              <div className="flex space-x-2 py-1 px-1">
                {categories.map((c) => (
                  <Button
                    key={c.id}
                    size="sm"
                    variant={active === c.id ? "secondary" : "outline"}
                    onClick={() => scrollToElement(c.id)}
                    className={cn(
                      "whitespace-nowrap font-medium rounded-full px-4 py-2 text-xs sm:text-sm transition-all duration-300",
                      active === c.id &&
                        "bg-foreground/80 hover:bg-foreground/90 text-background"
                    )}
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-1 text-center">
                <div className="flex items-center justify-center p-2 rounded-full bg-primary/20">
                  <SearchX className="size-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No menu categories available yet.
                </p>
              </div>
            )}

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
