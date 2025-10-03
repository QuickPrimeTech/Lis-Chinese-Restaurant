import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const AboutSection = () => {
  const aboutItems = [
    {
      title: "Book Your Spot",
      description:
        "Craving your favorite Chinese dish? Save your seat before it’s gone and enjoy a cozy meal with friends, family, or even just some well-deserved me-time.",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758995159/reservations.jpg",
      ctaText: "Reserve Now",
      ctaLink: "/reservations",
      reverse: false,
    },
    {
      title: "Celebrate With Us",
      description:
        "Got a birthday, anniversary, or office party coming up? Let us do the cooking while you enjoy the moment. We’ll make it special with good food and a warm atmosphere.",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758995385/private-events.jpg",
      ctaText: "Plan Your Event",
      ctaLink: "/private-events",
      reverse: true,
    },
    {
      title: "Work With Us",
      description:
        "Dreaming of a career in food? At Li’s Chinese Restaurant, you’ll cook real Chinese recipes, learn from passionate chefs, and grow your skills in a fun, supportive team. If you love good food and great people, this is the place for you.",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1759476105/careers.jpg",
      ctaText: "Apply Today",
      ctaLink: "/careers",
      reverse: false,
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {aboutItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col-reverse md:flex-row items-center md:items-stretch gap-8 mb-16 ${
              item.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <div className="md:w-1/2 flex flex-col justify-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-chivo leading-relaxed text-lg md:text-xl">
                {item.description}
              </p>
              <Button
                size="lg"
                className="md:self-start hover:shadow-glow transition-all duration-300"
                asChild
              >
                <Link href={item.ctaLink}>
                  {item.ctaText} <ArrowRight />
                </Link>
              </Button>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-96 rounded-xl overflow-hidden shadow-xl group">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
