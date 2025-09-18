// @/sections/about/hero.tsx

import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" />
      <Image
        src="/team4.jpg"
        alt="Li's Chinese about us image"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
            Discover the passion, tradition, and innovation that make Li&apos;s
            Chinese Restaurant a culinary destination
          </p>
        </div>
      </div>
    </section>
  );
}
