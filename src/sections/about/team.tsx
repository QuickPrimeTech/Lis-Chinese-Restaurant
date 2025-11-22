// @/sections/about/team.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { team } from "@/data/about-data";
import Image from "next/image";

export default function AboutTeam() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cinzel font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
            The passionate professionals who bring Li&apos;s Chinese
            Restaurant&apos;s vision to life
          </p>
        </div>

        {/* ShadCN Carousel */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {team.map((member) => (
            <Card
              key={member.name}
              className="h-full text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
            >
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <Image
                    src={member.image ?? "/portrait.jpg"}
                    alt={member.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <h3 className="font-cinzel font-semibold text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-chivo font-medium mb-2">
                  {member.role}
                </p>

                <p className="text-muted-foreground font-chivo text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
