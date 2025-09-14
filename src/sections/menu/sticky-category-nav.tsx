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

      <ScrollArea className="w-full">
        <div className="flex space-x-4 sm:space-x-6 py-4 px-2">
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
