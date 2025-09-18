// @/app/gallery/page.tsx

import GalleryContent from "@/sections/gallery/content";
import GalleryCTA from "@/sections/gallery/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Li's Chinese Restaurant Nairobi",
  description:
    "Take a look inside Li's Chinese Restaurant. Browse our photo gallery showcasing the cosy atmosphere, authentic Chinese meals, and memorable dining experiences in Nairobi.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <GalleryContent />
      <GalleryCTA />
    </div>
  );
}
