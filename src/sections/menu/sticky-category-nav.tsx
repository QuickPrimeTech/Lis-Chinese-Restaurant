"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const categories = [
  { id: "appetizers", label: "Appetizers" },
  { id: "mains", label: "Main Courses" },
  { id: "desserts", label: "Desserts" },
];

export default function StickyCategoryNav() {
  const [active, setActive] = useState("appetizers");

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
      setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border flex items-center gap-2 max-sm:flex-row-reverse">
      {/* Scrollable Categories (takes remaining space) */}
      <div className="flex-1 min-w-0">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 sm:space-x-6 py-4 px-2 sm:px-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={cn(
                  "font-chivo font-semibold transition-colors hover:text-foreground whitespace-nowrap",
                  active === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          {/* Horizontal scrollbar (auto on mobile, hidden on desktop) */}
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
      </div>

      {/* Fixed Download Button (keeps its width, never pushed) */}
      <div className="flex-shrink-0 px-2">
        <Button variant="outline" className="whitespace-nowrap">
          <Download className="mr-2 h-4 w-4" />
          <span className="max-sm:hidden">Download</span> PDF Menu
        </Button>
      </div>
    </div>
  );
}
