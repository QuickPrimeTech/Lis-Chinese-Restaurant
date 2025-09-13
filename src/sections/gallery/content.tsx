// @/sections/gallery/content.tsx

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryGrid } from "@/sections/gallery/gallery-grid";
import { galleryData } from "@/data/gallery-data";

export default function GalleryContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Tabs defaultValue="interior">
        <div className="flex justify-center mb-12">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-card border border-border">
            <TabsTrigger value="interior">Interior</TabsTrigger>
            <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="interior">
          <SectionHeading
            title="Elegant Interiors"
            description="Discover our sophisticated dining spaces designed to create the perfect ambiance for every occasion"
          />
          <GalleryGrid images={galleryData.interior} />
        </TabsContent>

        <TabsContent value="cuisine">
          <SectionHeading
            title="Culinary Artistry"
            description="Explore our signature dishes and artistic presentations that showcase culinary excellence"
          />
          <GalleryGrid images={galleryData.cuisine} />
        </TabsContent>

        <TabsContent value="events">
          <SectionHeading
            title="Memorable Events"
            description="See how we transform special moments into unforgettable experiences"
          />
          <GalleryGrid images={galleryData.events} />
        </TabsContent>

        <TabsContent value="kitchen">
          <SectionHeading
            title="Behind the Scenes"
            description="Meet our culinary team and witness the passion behind every dish"
          />
          <GalleryGrid images={galleryData.kitchen} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-cinzel font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">{description}</p>
    </div>
  );
}
