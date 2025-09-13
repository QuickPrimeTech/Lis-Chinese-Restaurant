// @/app/gallery/page.tsx

import GalleryHero from "@/sections/gallery/hero";
import GalleryContent from "@/sections/gallery/content";
import GalleryCTA from "@/sections/gallery/CTA";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <GalleryHero />
      <GalleryContent />
      <GalleryCTA />
    </div>
  );
}

