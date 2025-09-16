"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { AnimatedNumberCountdownShowcase } from "@/components/animated-number";
import Link from "next/link";

export const OfferSection = () => {
  const [, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [copied, setCopied] = useState(false);

  const couponCode = "LUXURY20";

  // Calculate time left until end of month
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card border border-primary/20 rounded-2xl p-12 shadow-luxury">
            {/* Heading */}
            <h2 className="text-xl md:text-5xl font-cinzel font-bold mb-6">
              Exclusive Dining Offer
            </h2>
            <p className="text-md text-muted-foreground font-chivo mb-8 leading-relaxed">
              Experience luxury dining with 20% off your first reservation.
              Valid for parties of 4 or more.
            </p>

            {/* Coupon Code */}
            <div className="border-2 border-dashed border-primary rounded-lg p-6 mb-8 inline-block">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-cinzel font-bold text-primary">
                  {couponCode}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="text-primary hover:bg-primary/10"
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Click to copy code
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <h3 className="text-2xl font-cinzel font-semibold text-foreground mb-4">
                Offer Expires In:
              </h3>
              <AnimatedNumberCountdownShowcase />
            </div>

            {/* Book Now Button */}
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-10 py-6"
            >
              <Link href={"/reservations"}>
              Book Your Table Now
              </Link>
            </Button>

            {/* Terms */}
            <p className="text-sm text-muted-foreground mt-4 font-chivo">
              * Terms and conditions apply. Cannot be combined with other
              offers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
