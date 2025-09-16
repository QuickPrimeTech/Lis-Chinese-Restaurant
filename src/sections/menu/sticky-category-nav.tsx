"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems } from "@/data/menu-data";

const categories = Object.entries(menuItems).map(([key, items]) => ({
  id: key,
  label: items[0]?.category || key,
}));

export default function StickyCategoryNav() {
  const [active, setActive] = useState(categories[0]?.id || "");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string; category: string }[]
  >([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Detect desktop vs mobile
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // ✅ Outside click & escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
        setHighlightedIndex(-1);
        if (isMobileSearchOpen && !search) setIsMobileSearchOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSuggestions([]);
        setHighlightedIndex(-1);
        if (isMobileSearchOpen && !search) setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileSearchOpen, search]);

  // ✅ Track active category
  useEffect(() => {
    const handleScroll = () => {
      const offsets = categories
        .map((c) => {
          const el = document.getElementById(c.id);
          return el ? { id: c.id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];
      if (offsets.length === 0) return;

      const scrollY = window.scrollY + 200;
      const current = offsets.reduce((prev, curr) =>
        Math.abs(curr.top - scrollY) < Math.abs(prev.top - scrollY)
          ? curr
          : prev
      );
      if (current) setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll to food/card
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  // ✅ Update suggestions on search
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    const results: { id: string; name: string; category: string }[] = [];
    Object.values(menuItems).forEach((items) => {
      items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
        ) {
          results.push({
            id: `food-${item.id}`,
            name: item.name,
            category: item.category,
          });
        }
      });
    });
    setSuggestions(results.slice(0, 8));
    setHighlightedIndex(-1);
  }, [search]);

  // ✅ Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev < suggestions.length - 1 ? prev + 1 : 0;
        suggestionRefs.current[next]?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : suggestions.length - 1;
        suggestionRefs.current[next]?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        const selected = suggestions[highlightedIndex];
        setSearch(selected.name);
        scrollToElement(selected.id);
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }
  };

  const handleSuggestionClick = (s: {
    id: string;
    name: string;
    category: string;
  }) => {
    setSearch(s.name);
    scrollToElement(s.id);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  // ✅ Mobile toggle
  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (!search) {
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="flex items-center p-3 gap-3 max-w-7xl mx-auto">
        {/* ✅ Search always has priority space */}
        <div
          ref={containerRef}
          className={cn(
            "relative md:flex-1 transition-all duration-300 ease-in-out",
            "md:min-w-[300px] max-w-md",
            !isDesktop && isMobileSearchOpen ? "flex-1" : "w-auto"
          )}
        >
          {/* Mobile toggle button */}
          {!isDesktop && !isMobileSearchOpen && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleMobileSearchToggle}
              className="shrink-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Search input */}
          {(isDesktop || isMobileSearchOpen) && (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              {!isDesktop && isMobileSearchOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8"
                  onClick={() => {
                    setIsMobileSearchOpen(false);
                    setSearch("");
                    setSuggestions([]);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Input
                ref={inputRef}
                placeholder="Search delicious food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "pl-10 text-sm bg-card/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all",
                  !isDesktop && isMobileSearchOpen ? "pr-10" : ""
                )}
              />

              {/* ✅ Suggestions dropdown */}
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

        {/* ✅ Categories scroll, search keeps priority */}
        {!isMobileSearchOpen && (
          <ScrollArea className="flex-1 w-full min-w-0">
            <div className="flex space-x-2 py-1 px-1">
              {categories.map((c) => (
                <Button
                  key={c.id}
                  size="sm"
                  variant={active === c.id ? "secondary" : "outline"}
                  onClick={() => scrollToElement(c.id)}
                  className={`whitespace-nowrap font-medium ${
                    active === c.id &&
                    "bg-foreground/80 hover:bg-foreground/90 text-background"
                  } px-4 py-2 text-xs sm:text-sm rounded-full`}
                >
                  {c.label}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
