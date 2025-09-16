"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";

export const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Khuzaima Ali Hussain",
      role: "Local Guide",
      content:
        "Excellent place to dine for the people loving authentic Chinese food. Taste is excellent and service is nice . Also the surrounding is well decorated",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWfwS-oyQDYTar2_aFv7bQiSo4iEyv0s5COnCQ4Vb993C46yGlgQg=w54-h54-p-rp-mo-ba5-br100",
    },
    {
      name: "Hafsa Mohd",
      role: "Local Guide",
      content:
        "It’s really difficult to find a place in my road, which does amazing fresh seafood but obviously Li’s being from Mombasa understand the weight of serving seafood. This has to be handsdown one of the best places you can get seafood from My favourite is definitely the tempura prawns, I can’t really fault anything. The food is amazing. The service was one of the best, our waiter was so friendly and he kept coming to check on us because we were sat outside - which is a great change because most restaurants forget that you are outside. I’ll definitely be going back and they’re definitely needs to be more of these around Nairobi",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWka8qHsFeylM_f7GpUIl865N9PArYmfHSAW3E21MWnZbIky4ktmg=w54-h54-p-rp-mo-ba4-br100",
    },
    {
      name: "Nicholas Daniels",
      role: "Local Guide",
      content: "Reliably good food and service at reasonable prices",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLohtLmROqNZKdnaV_1ygxMEwRdKbioUxMXJ70n7uXkwHgYZQ=w54-h54-p-rp-mo-ba3-br100",
    },
    {
      name: "Adam Gache",
      role: "Local Guide",
      content: "Very nice delicious Chinese food",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUaXHOBZRcLuAy1iHuRlP-QL_BSyRwiWSWJ5F4mv3wbf0DA0mM=w54-h54-p-rp-mo-ba4-br100",
    },
    {
      name: "S Shah",
      role: "Local Guide",
      content: "Food was great although a tiny bit too salty for my liking",
      rating: 4,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWx2gvkuJFDfU_S2laoNRcoeLE4U8_n-Hy8Yx775Izj72md5zLrNQ=w54-h54-p-rp-mo-ba5-br100",
    },
  ];

  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`${
            rating > index ? "fill-yellow-500" : "stroke-yellow-500"
          } text-yellow-500`}
        />
      ));

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
            Discover why discerning diners choose us for their most memorable
            occasions
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-luxury">
                  <CardContent className="p-8">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Content with Read More */}
                    <ReadMoreText text={testimonial.content} />

                    {/* Author */}
                    <div className="flex items-center mt-6">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-cinzel font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground font-chivo">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Controls */}
          <CarouselPrevious className="text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>

        <div className="flex justify-center mt-6">
          <Button asChild size={"lg"}>
            <Link
              href="https://www.google.com/maps/place/Li's+Chinese+Restaurant/@-1.2359985,32.1927563,7z/data=!4m12!1m2!2m1!1slis+chinese+restaurant!3m8!1s0x182f1774bd49e983:0x8cc5ef01c9b23983!8m2!3d-1.2359985!4d36.8070141!9m1!1b1!15sChZsaXMgY2hpbmVzZSByZXN0YXVyYW50WhgiFmxpcyBjaGluZXNlIHJlc3RhdXJhbnSSARJjaGluZXNlX3Jlc3RhdXJhbnSqAT8QATIfEAEiG1aTtrZDiAoomJPfEp1sUsniKQhzJPssT7Sr4zIaEAIiFmxpcyBjaGluZXNlIHJlc3RhdXJhbnTgAQA!16s%2Fg%2F11pvhrdjfy?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGoogle />
              Review us on Google <ExternalLink />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

/* ----------------------
   Read More Component
---------------------- */
const ReadMoreText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-muted-foreground font-chivo leading-relaxed ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        &quot;{text}&quot;
      </p>
      {text.length > 150 && ( // only show button if long text
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-muted-foreground hover:text-foreground cursor-pointer font-medium underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};
