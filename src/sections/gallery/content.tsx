// @/sections/gallery/content.tsx

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryGrid } from "@/sections/gallery/gallery-grid";
import { galleryData } from "@/data/gallery-data";

export default function GalleryContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Tabs defaultValue="interior">
        <div className="flex justify-center mb-12 sticky top-20 z-50">
          <TabsList className="grid w-full max-w-2xl grid-cols-2 bg-card border border-border">
            <TabsTrigger value="foods">Foods</TabsTrigger>
            <TabsTrigger value="interior">Interior</TabsTrigger>
          </TabsList>
        </div>

 <TabsContent value="foods">
          <GalleryGrid images={galleryData.foods} />
        </TabsContent>
        <TabsContent value="interior">
          <GalleryGrid images={galleryData.interior} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
