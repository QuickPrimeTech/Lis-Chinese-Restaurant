"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

type EventPackage = {
  id: string | number;
  name: string;
  image: string;
  capacity: string | number;
  price: string | number;
  features: string[];
};

type EventPackagesProps = {
  eventPackages: EventPackage[];
  onSelectPackage: (id: string | number) => void;
};

export default function EventPackages({
  eventPackages,
  onSelectPackage,
}: EventPackagesProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {eventPackages.map((pkg) => (
        <Card
          key={pkg.id}
          className="group hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-sm font-chivo font-semibold text-primary">
                  {pkg.capacity}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-cinzel font-bold text-xl text-foreground">
                  {pkg.name}
                </h3>
                <span className="font-cinzel font-bold text-lg text-primary">
                  {pkg.price}
                </span>
              </div>
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
  );
}
