// @/sections/contact/hero.tsx

import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Hero Section */}
      <Image
        src="/contact-hero.jpg"
        alt="Contact Hero"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
              We&apos;d love to hear from you. Reach out for reservations,
              inquiries, or just to say hello.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
