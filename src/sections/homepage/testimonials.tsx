import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Alexandra Mitchell",
      role: "Food Critic",
      content:
        "An absolutely extraordinary culinary experience. Every dish was a masterpiece, and the service was impeccable. This restaurant has redefined luxury dining for me.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "James Rodriguez",
      role: "Business Executive",
      content:
        "Perfect venue for important business dinners. The ambiance is sophisticated, the food exceptional, and the staff anticipates every need. Highly recommended.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Sophie Chen",
      role: "Lifestyle Blogger",
      content:
        "From the moment we walked in, we knew this would be special. The attention to detail is remarkable, and each course was better than the last. A true gem.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Marcus Thompson",
      role: "Wine Connoisseur",
      content:
        "The wine selection is outstanding, perfectly paired with innovative cuisine. The sommelier's recommendations were spot-on. An unforgettable evening.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Isabella Romano",
      role: "Celebrated Chef",
      content:
        "As a fellow chef, I'm impressed by the creativity and execution. The flavor profiles are complex yet harmonious. This is artistry on a plate.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      ));
  };

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

                    {/* Testimonial Content */}
                    <p className="text-muted-foreground font-chivo leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center">
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
      </div>
    </section>
  );
};
