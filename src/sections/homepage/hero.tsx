"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1770274177/download_ose9zu.webp",
      lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAwICQsJCAwLCgsODQwOEh4UEhEREiUbHBYeLCcuLisnKyoxN0Y7MTRCNCorPVM+QkhKTk9OLztWXFVMW0ZNTkv/2wBDAQ0ODhIQEiQUFCRLMisyS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0v/wAARCAAXACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCBAYH/8QAKxAAAQQBAwMCBQUAAAAAAAAAAQIDBBEABRIhMVFhE6EGFCJBcTKBkbHB/8QAGAEBAAMBAAAAAAAAAAAAAAAABAECAwD/xAAeEQEAAgICAwEAAAAAAAAAAAABAAIDIRITBBExIv/aAAwDAQACEQMRAD8AXpdjSypiBFclSS4F/Qs7GwAeCs9eaPHXpeaCBEmvTGnp645ej7VeqtNhCRRCEi/01Vk+fyVUpiR8PNIQ16SfVBJSm1GhYBPfr2AHuYo+IJCm0J2tXyolXPUgiq7VX+4TsMegjOvt2v2dOM0LUAOpH2N3lGZNjt2HHU7hVpBtXPgc5mos8jRIC/l3XdwUFqBASACQLP8AB+2JZ3zUl1AREaQjcNrjYKiaSQLqzwPH5yHPY0/Z1fGH9b9TY0JCRIj06j7FPcYZS0YPaDobj8g26qyho1yomkgD9xeGLpd47hLByQinWtZS+8WtYgLLaFHYtl360jsegPtkdG0TRp6VuRXnZYBFh207fHQX74YZmguyXLIaY7l6WRpy2ULUEkgtp4pJ6UPHPvifVFq0xDRYKSyFbFOLsncR2roB/Z64YYTLQ5Sl8t+PD3qVVTpD0qE2p5ayaVuVyVpvz4B9uMMMM3xAEipqf//Z",
      title: "Delicious Chinese Food",
      subtitle:
        "Enjoy dim sum, noodles, and stir-fried favorites made fresh every day.",
    },
    {
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758994129/hero-image.jpg",
      lqip: "data:image/jpeg;base64,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",
      title: "A Place to Share",
      subtitle:
        "Perfect for family dinners, hot pot with friends, or a cozy night out.",
    },
    {
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758994706/IMG_5777_e8j5qw.jpg",
      lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAA8ACgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABAUAAwYBAv/EADEQAAIBAwMCAwcCBwAAAAAAAAECAwAEEQUSITFBBhNRFCIyYXGRoYHRFVJykrHB8P/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBAH/xAAfEQACAgIDAAMAAAAAAAAAAAAAAQIRAyESIjETQVH/2gAMAwEAAhEDEQA/ANTe69Ba253EeeeFjBz96WXOvRTWpWSZCzDGxOc1kLqbFwIo8vIx+BTknPrRVvNp9moR5d8vO5YE34OM9elDPK/oKMP0rm0S3nB2JsY9xSe80W5tSSELr6r+1aG51KyjuRCrzBjxuCAjPocNn8V5Opb5ntoNk9yqh1U5wydyvqenH7VOk70NlJVsyYifONvNSns+qXqOVe3jQjorWoBOf061KB5UvQPfCxIoNOBnKgKoJYnuO9WNoNrdgXFvftEsmGVGj3cY4GcjP2pZ4nkb2JVTOC3vVzTtVul0KSO392aAqGlXl1iw25h6YIUZ7Zp+OMafJWbJyukNB4ctrfy2ub15Qr527VhO757m/GKXiyvTrJubKGFoohsRFlXIUdgpO4/7zQkF4wfayieQ5ZWEnIXPU555+/PfnA019JuJZAISVJTcdrY6f98vpSVmcX1jQUsetuzVP4mubC0eSaKXckix+VnYASCfePUdOnfn0qUJpk0sltbC/QyG53LGsq58yEY+LIyRkjaf6vlUq/vNWnRO3CLpoo1KD2q1IA3Y5pRpE76fq0EwYou7YWHHXjB/FaiW3KEkDKnqPSld5pSyHeuPUkc/epbeNjtTWjWfwLR9STzLjT7d2fksgKE/2kUXDoOj2pWSPTrfenws4MhH0LE1jbLVNV0xQqkSRgcBhuH70RceLNYmQx20NvGf5ySSP0PH+apjlxPYhwyeAviXUJF8UmaI5eBVT3uQe+PzUpK8d60rO8RkdjlmLhsn61KX8ju0w+CraN3Y3MUWfNAKng5Gcj0oOaWMyOkR9w52g9xVErELQUrsGyDgijyLkjIPiw5UQjNdNrDIOQDnvVKsThu561apIOOxqBlR59jiXoKlXHkVKw0//9k=",
      title: "Made with Care",
      subtitle:
        "Our chefs use fresh ingredients and traditional recipes for every dish.",
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
              placeholder="blur"
              blurDataURL={slide.lqip}
              fill
              priority={index === 0} // preload first slide for performance
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="max-w-3xl relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl text-center md:text-left md:text-7xl font-cinzel font-normal md:font-semibold text-white mb-6 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl text-center md:text-left md:text-2xl font-chivo text-white/80 mb-8 animate-fade-in-up delay-300">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
                  <Button size="lg" asChild>
                    <Link href="/reservations">
                      Book a Table
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/menu">See Menu</Link>
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
