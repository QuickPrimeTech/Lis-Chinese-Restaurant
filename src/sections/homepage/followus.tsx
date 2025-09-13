"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export const FollowUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const instagramPosts = [
    {
      image: "/insta-1.jpg",
      caption:
        "Artisanal gastronomy at its finest ✨ #Li's Chinese RestaurantDining #FineDining",
      likes: "2,847",
    },
    {
      image: "/insta-2.jpg",
      caption: "Crafted cocktails that tell a story 🥃 #Mixology #LuxuryDrinks",
      likes: "1,923",
    },
    {
      image: "/insta-3.jpg",
      caption: "Sweet perfection to end the perfect meal 🍰 #Dessert #Artistry",
      likes: "3,156",
    },
    {
      image: "/insta-4.jpg",
      caption:
        "Curated wine selection from around the world 🍷 #Wine #Sommelier",
      likes: "2,734",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instagramPosts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [instagramPosts.length]);

  const visiblePosts = [
    instagramPosts[currentIndex],
    instagramPosts[(currentIndex + 1) % instagramPosts.length],
    instagramPosts[(currentIndex + 2) % instagramPosts.length],
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
            Follow Our Journey
          </h2>
          <p className="text-xl text-muted-foreground font-chivo mb-8">
            Experience our culinary artistry through the lens of our guests
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Follow @Li's Chinese Restaurantdining
          </Button>
        </div>

        {/* Instagram Posts */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {visiblePosts.map((post, index) => (
            <Card
              key={`${currentIndex}-${index}`}
              className="group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:shadow-luxury animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={post.image}
                    alt={`Instagram post ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-foreground font-chivo text-sm mb-2">
                        {post.caption}
                      </p>
                      <div className="flex items-center text-primary">
                        <span className="text-xs font-chivo">
                          ❤️ {post.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {instagramPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
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
