"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/hero1.jpg",
      title: "Exquisite Culinary Experience",
      subtitle: "Where luxury meets exceptional taste in every bite",
    },
    {
      image: "/hero2.jpg",
      title: "Intimate Fine Dining",
      subtitle: "Perfect ambiance for your most precious moments",
    },
    {
      image: "/hero3.jpg",
      title: "Artisanal Gastronomy",
      subtitle: "Crafted by world-class chefs with passion and precision",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0} // preload first slide for performance
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-foreground mb-6 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-chivo text-muted-foreground mb-8 animate-fade-in-up delay-300">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
                  <Button size="lg" asChild>
                    <Link href="/reservations">Book a Table</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/menu">Order Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary shadow-glow"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
