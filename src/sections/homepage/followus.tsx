"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Link from "next/link";
export const FollowUs = () => {
  const instagramPosts = [
    {
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758009338/gallery3_zpz3pb.jpg",
    },
    {
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758009025/gallery2_yjwxyh.jpg",
    },
    {
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758009618/gallery5_how7kw.jpg",
    },
    {
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758009796/gallery6_ntq2o5.jpg",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      const nextIndex = (current + 1) % instagramPosts.length;
      api.scrollTo(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [api, current, instagramPosts.length]);

  // Sync state with carousel slides
  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect); // For responsiveness

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
            Follow Our Journey
          </h2>
          <p className="text-xl text-muted-foreground font-chivo mb-8">
            Experience our culinary artistry through the lens of our guests
          </p>
          <Button
            asChild
            size="lg"
              
            >
              <Link href="https://www.instagram.com/lischineserestaurant"
              target="_blank"
              rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" />
              Follow @lischineserestaurant
            </Link>
          </Button>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full max-w-6xl mx-auto relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {instagramPosts.map((post, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="py-0 group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:shadow-luxury">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-square">
                      <Image
                        src={post.image}
                        alt={`Instagram post ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Dots */}
        <div className="flex md:hidden justify-center mt-8 space-x-2">
          {instagramPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
