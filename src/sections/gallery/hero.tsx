// @/sections/gallery/hero.tsx

import Image from "next/image";

export default function GalleryHero() {
  return (
    <section className="relative h-96 overflow-hidden">
      <Image src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1758014074/gallery16_zahxrh.webp" alt="Gallery Hero" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
      <div className="relative z-10 flex items-center h-full text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
            Experience the elegance and artistry that defines Li&apos;s Chinese Restaurant through our visual journey
          </p>
        </div>
      </div>
    </section>
  );
}
