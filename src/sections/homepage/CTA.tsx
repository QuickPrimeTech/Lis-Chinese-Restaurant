import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20" style={{ backgroundSize: '20px 20px' }}></div>
      <div className="absolute inset-0 bg-pattern-grid opacity-10" style={{ backgroundSize: '40px 40px' }}></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary-foreground rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-primary-foreground rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-primary-foreground rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-12 h-12 border border-primary-foreground rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <Sparkles className="absolute top-1/3 right-1/4 w-8 h-8 text-primary-foreground animate-glow" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute bottom-1/3 left-1/3 w-6 h-6 text-primary-foreground animate-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Ready to Experience
              <span className="block bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Culinary Excellence?
              </span>
            </h2>
            <div className="absolute -top-4 -right-4 md:-right-8">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground animate-glow" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join us for an unforgettable culinary journey where every detail is
            crafted to perfection. Experience luxury dining at its finest.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="xl"
              variant="secondary"
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:animate-glow transition-all" />
              Book Your Table
            </Button>
            <Button
              size="xl"
              variant="outline"
            >
              <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-glow transition-all" />
              Order Takeaway
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none"></div>
    </section>
  );
};