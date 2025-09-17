// @/sections/reservations/hero.tsx

import Image from "next/image";

export const HeroSection = () => (
  <section className="relative h-96 overflow-hidden">
    <Image
      src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1758109786/reserve-hero.jpg"
      fill
      alt="li's chinese restaurant reservation image"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
          Reserve Your Table
        </h1>
        <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
          Secure your seat at Li&apos;s Chinese Restaurant for an unforgettable
          dining experience
        </p>
      </div>
    </div>
  </section>
);
