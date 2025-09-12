import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-primary/60 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white rounded-full animate-float delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-primary-foreground mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-chivo mb-12 leading-relaxed">
            Join us for an unforgettable culinary journey where every detail is
            crafted to perfection
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-primary hover:bg-background/90 transition-all duration-300 text-lg px-10 py-6 group flex items-center justify-center"
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:animate-glow" />
              Book a Table
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 text-lg px-10 py-6 group flex items-center justify-center"
            >
              <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-glow" />
              Order Now
            </Button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="text-primary-foreground/80">
              <div className="text-3xl font-cinzel font-bold text-primary-foreground mb-2">
                500+
              </div>
              <p className="font-chivo">Five-Star Reviews</p>
            </div>
            <div className="text-primary-foreground/80">
              <div className="text-3xl font-cinzel font-bold text-primary-foreground mb-2">
                15+
              </div>
              <p className="font-chivo">Years of Excellence</p>
            </div>
            <div className="text-primary-foreground/80">
              <div className="text-3xl font-cinzel font-bold text-primary-foreground mb-2">
                50k+
              </div>
              <p className="font-chivo">Satisfied Guests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
