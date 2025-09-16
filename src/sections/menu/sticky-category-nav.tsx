"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

  // Track active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = categories
        .map((c) => {
          const el = document.getElementById(c.id);
          return el ? { id: c.id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

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

  // Scroll to section/card
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  // Update suggestions when search changes
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
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
            id: `food-${item.id}`, // 👈 give each card this id in your grid
            name: item.name,
            category: item.category,
          });
        }
      });
    });
    setSuggestions(results.slice(0, 6)); // show max 6 suggestions
  }, [search]);

  // Handle Enter press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      scrollToElement(suggestions[0].id);
      setSuggestions([]);
      setSearch("");
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border flex flex-col gap-2 p-2 sm:flex-row sm:items-center">
      {/* Search input */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 text-sm"
        />
        {suggestions.length > 0 && (
          <ScrollArea className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((s) => (
              <div
                key={s.id}
                className="px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                onClick={() => {
                  scrollToElement(s.id);
                  setSuggestions([]);
                  setSearch("");
                }}
              >
                <span className="font-semibold">{s.name}</span>{" "}
                <span className="text-muted-foreground">({s.category})</span>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>

      {/* Category buttons */}
      <ScrollArea className="w-full sm:flex-1">
        <div className="flex space-x-2 sm:space-x-4 py-2 px-1">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              onClick={() => scrollToElement(cat.id)}
              className={cn(
                "font-semibold transition-colors hover:text-foreground whitespace-nowrap rounded-full px-4 py-1",
                active === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
