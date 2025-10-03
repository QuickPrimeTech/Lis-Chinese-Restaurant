import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-primary relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Hungry? Let&apos;s Make It Special.
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 leading-relaxed">
            Whether you&apos;re planning a night out with friends or just
            craving some comforting Chinese food at home, we&apos;ve got you
            covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Main CTA - stands out */}
            <Button
              size="xl"
              variant={"secondary"}
              className="border-primary text-primary"
              asChild
            >
              <Link href="/reservations">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Table
              </Link>
            </Button>

            {/* Secondary CTA - subtle */}
            <Button
              size="xl"
              className="border border-primary-foreground"
              asChild
            >
              <Link href="/menu">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Order Takeaway
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
