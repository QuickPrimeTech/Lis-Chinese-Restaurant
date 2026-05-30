// @/sections/about/awards.tsx
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import { awards } from "@/data/about-data";

export default function AboutAwards() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cinzel font-bold text-foreground mb-6">
            Awards & Recognition
          </h2>
          <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
            Industry recognition for our commitment to culinary excellence
          </p>
        </div>
        <Carousel>
          <CarouselContent>
            {awards.map((award) => (
              <CarouselItem
                key={award.image}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="relative aspect-3/4 overflow-hidden text-center py-0 transition-all duration-300 border-border hover:border-primary/50">
                  <Image
                    src={award.image}
                    alt={award.description}
                    fill
                    sizes="(min-width: 768px) 50vw, (min-width: 1024) 25vw, 80vw"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
