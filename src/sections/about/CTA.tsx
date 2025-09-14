// @/sections/about/CTA.tsx

import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-cinzel font-bold text-primary-foreground mb-6">
          Experience Our Story
        </h2>
        <p className="text-xl text-primary-foreground/90 font-chivo max-w-2xl mx-auto mb-8">
          Join us for an unforgettable culinary journey where tradition meets
          innovation
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-primary hover:bg-background/90"
          >
            Make a Reservation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            View Our Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
