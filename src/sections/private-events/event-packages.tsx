import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const privateEventsHero =
  "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758109094/private-event.jpg";

const eventPackages = [
  {
    id: "intimate",
    name: "Intimate Gathering",
    capacity: "8-12 guests",
    features: [
      "Private dining room",
      "4-course tasting menu",
      "Wine pairing selection",
      "Dedicated server",
      "Custom table settings",
    ],
    image: privateEventsHero,
  },
  {
    id: "celebration",
    name: "Celebration Package",
    capacity: "13-30 guests",
    features: [
      "Semi-private dining area",
      "Customizable menu options",
      "Full bar service",
      "Event coordinator",
      "Floral arrangements",
      "Audio/visual setup",
    ],
    image: privateEventsHero,
  },
  {
    id: "corporate",
    name: "Corporate Experience",
    capacity: "20-50 guests",
    features: [
      "Exclusive restaurant buyout",
      "Multi-course dining experience",
      "Premium bar package",
      "Professional event planning",
      "Custom branding options",
      "Photography service",
    ],
    image: privateEventsHero,
  },
];

const EventPackages = ({
  onSelectPackage,
}: {
  onSelectPackage: (id: string) => void;
}) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-cinzel font-bold text-foreground mb-6">
          Curated Event Experiences
        </h2>
        <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
          From intimate celebrations to grand corporate events, we create
          bespoke experiences
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {eventPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className="py-0 pb-6 overflow-hidden group hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-chivo font-semibold text-primary">
                    {pkg.capacity}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-cinzel font-bold text-xl text-foreground mb-4">
                  {pkg.name}
                </h3>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-muted-foreground font-chivo"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => onSelectPackage(pkg.id)}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Inquire About This Package
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventPackages;
