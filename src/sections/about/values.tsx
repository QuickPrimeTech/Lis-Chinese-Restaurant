// @/sections/about/values.tsx

import { Card, CardContent } from "@/components/ui/card";
import { values } from "@/data/about-data";

export default function AboutValues() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cinzel font-bold text-foreground mb-6">
            Our Values
          </h2>
          <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
            The principles that guide everything we do at Li&apos;s Chinese
            Restaurant
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
            >
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-primary">{value.icon}</div>
                </div>
                <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-chivo leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
