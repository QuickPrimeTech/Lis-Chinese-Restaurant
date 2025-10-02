"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GalleryGrid } from "@/sections/gallery/gallery-grid";
import { GalleryImage } from "@/types/gallery";

interface GalleryContentProps {
  galleryItems: GalleryImage[];
}

export default function GalleryContent({ galleryItems }: GalleryContentProps) {
  const [filter, setFilter] = useState("all");

  // Build filters dynamically from categories
  const filters = useMemo(() => {
    const categories = Array.from(
      new Set(galleryItems.map((item) => item.category).filter(Boolean))
    );
    return ["all", ...categories];
  }, [galleryItems]);

  const filteredImages =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="py-16">
      {/* Filter Buttons */}
      <section className="py-6 border-b sticky top-20 z-40 bg-background/70 backdrop-blur-sm mb-8">
        <ScrollArea className="w-full container px-4 whitespace-nowrap">
          <div className="flex gap-3 px-4">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <div className="container px-4 mx-auto">
        {/* Masonry Grid */}
        <GalleryGrid images={filteredImages} />
      </div>
    </div>
  );
}
