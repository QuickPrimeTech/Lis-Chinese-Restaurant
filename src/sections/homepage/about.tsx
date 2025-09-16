import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  const aboutItems = [
    {
      title: "Reserve a Table",
      description:
        "Enjoy an exquisite dining experience in our elegant setting. Book a table and savor the flavors of our carefully curated menu.",
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758009338/gallery3_zpz3pb.jpg",
      ctaText: "Reserve Now",
      ctaLink: "/reservations",
      reverse: false,
    },
    {
      title: "Host a Private Event",
      description:
        "Celebrate your special occasions in style. Our private event spaces and tailored services ensure an unforgettable experience.",
      image: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758020425/private-event_tdby0l.jpg",
      ctaText: "Book Event",
      ctaLink: "/private-events",
      reverse: true,
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
              <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-white">
                {item.title}
              </h3>
              <p className="text-white/80 font-chivo leading-relaxed text-lg md:text-xl">
                {item.description}
              </p>
              <Button
                size="lg"
                className="md:self-start hover:shadow-glow transition-all duration-300"
                asChild
              >
                <Link href={item.ctaLink}>{item.ctaText}</Link>
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
