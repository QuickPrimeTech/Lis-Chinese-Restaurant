"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GalleryGrid } from "@/sections/gallery/gallery-grid";
import { galleryData } from "@/data/gallery-data";

// Add "all" at the beginning of the filters
const filters = ["all", ...Object.keys(galleryData)];

export default function GalleryContent() {
  const [filter, setFilter] = useState("all");

  const filteredImages =
    filter === "all"
      ? Object.values(galleryData).flat()
      : galleryData[filter] || [];

  return (
    <div className="py-16">
      {/* Filter Buttons */}
      <section className="py-6 border-b sticky top-20 z-50 bg-background/70 backdrop-blur-sm mb-8">
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

      <div className="container mx-auto">
        {/* Masonry Grid */}
        <GalleryGrid images={filteredImages} />
      </div>
    </div>
  );
}
