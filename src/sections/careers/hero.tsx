import { ChefHat, Users, Star } from "lucide-react";
import { FaHeart } from "react-icons/fa";

export function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-background py-24 px-4">
      <div className="absolute inset-0 bg-[url('/elegant-chinese-restaurant-interior-with-warm-ligh.jpg')] bg-cover bg-center opacity-5" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <ChefHat className="w-4 h-4" />
          Now Hiring
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Join Our Culinary Family
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 leading-relaxed">
          At Li&apos;s Chinese Restaurant Nairobi, we&apos;re more than a team –
          we&apos;re a family passionate about bringing authentic Chinese
          flavors to our community.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Inclusive Culture */}
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Inclusive Culture</h3>
            <p className="text-sm text-muted-foreground text-center">
              A welcoming environment where every team member is valued and
              respected
            </p>
          </div>

          {/* Growth Opportunities */}
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaHeart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-sm text-muted-foreground text-center">
              Continuous learning and career advancement in the culinary arts
            </p>
          </div>

          {/* Excellence Driven */}
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Excellence Driven</h3>
            <p className="text-sm text-muted-foreground text-center">
              Committed to delivering exceptional dining experiences every day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
