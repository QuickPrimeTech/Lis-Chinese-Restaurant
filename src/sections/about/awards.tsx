// @/sections/about/awards.tsx


import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
            >
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-cinzel font-bold text-primary mb-2">
                  {award.year}
                </div>
                <h3 className="font-cinzel font-semibold text-lg text-foreground mb-2">
                  {award.award}
                </h3>
                <p className="text-muted-foreground font-chivo text-sm">
                  {award.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
