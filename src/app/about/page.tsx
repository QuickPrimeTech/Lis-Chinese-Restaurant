import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Star, ChefHat, Utensils } from "lucide-react";
import Image from "next/image";

export default function About() {
  const awards = [
    {
      year: "2023",
      award: "Michelin Star",
      description: "Excellence in fine dining",
    },
    {
      year: "2022",
      award: "Best Restaurant Award",
      description: "City's finest dining establishment",
    },
    {
      year: "2021",
      award: "Wine Spectator Award",
      description: "Outstanding wine program",
    },
    {
      year: "2020",
      award: "Chef of the Year",
      description: "Culinary innovation and excellence",
    },
  ];

  const team = [
    {
      name: "Alexandre Dubois",
      role: "Executive Chef",
      experience: "15+ years",
      image: "/chef-portrait.jpg",
      description:
        "Trained in Paris and Tokyo, brings international expertise to Li's Chinese Restaurant",
    },
    {
      name: "Maria Santos",
      role: "Pastry Chef",
      experience: "12+ years",
      image: "/api/placeholder/300/300",
      description:
        "Award-winning pastry chef specializing in modern European desserts",
    },
    {
      name: "James Wellington",
      role: "Sommelier",
      experience: "10+ years",
      description:
        "Master sommelier with expertise in rare wines and perfect pairings",
    },
    {
      name: "Sofia Rodriguez",
      role: "Restaurant Manager",
      experience: "8+ years",
      description:
        "Ensures impeccable service and memorable dining experiences",
    },
  ];

  const values = [
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: "Culinary Excellence",
      description:
        "We source only the finest ingredients and employ time-honored techniques combined with modern innovation.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Exceptional Service",
      description:
        "Our team is dedicated to providing personalized, attentive service that exceeds expectations.",
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Artistic Presentation",
      description:
        "Every dish is a work of art, carefully crafted to delight both the palate and the eye.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Memorable Experiences",
      description:
        "We create moments that last a lifetime, celebrating life's most precious occasions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" />
        <Image
          src="/about-hero.jpg"
          alt="li's chinese about us image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
                Our Story
              </h1>
              <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
                Discover the passion, tradition, and innovation that make
                Li&apos;s Chinese Restaurant a culinary destination
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-cinzel font-bold text-foreground mb-8">
                A Legacy of Excellence
              </h2>
              <div className="space-y-6 text-lg font-chivo text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2008, Li&apos; Chinese Restaurant began as a vision
                  to create more than just a restaurant – we sought to craft an
                  experience that would redefine fine dining. What started as a
                  passion project by renowned chef Alexandre Dubois has evolved
                  into a culinary institution that celebrates the art of
                  gastronomy.
                </p>
                <p>
                  Our philosophy centers on the belief that exceptional cuisine
                  is born from the marriage of the finest ingredients, masterful
                  technique, and genuine hospitality. Every dish tells a story,
                  every wine pairing creates a memory, and every service moment
                  reflects our commitment to excellence.
                </p>
                <p>
                  Located in the heart of the city, Li&apos;s Chinese Restaurant
                  has become a destination for those who appreciate the finer
                  things in life. From intimate romantic dinners to grand
                  celebrations, we have had the privilege of being part of
                  countless special moments.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
              <div>
                <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                  15+
                </div>
                <p className="text-muted-foreground font-chivo">
                  Years of Excellence
                </p>
              </div>
              <div>
                <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                  50k+
                </div>
                <p className="text-muted-foreground font-chivo">
                  Satisfied Guests
                </p>
              </div>
              <div>
                <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                  500+
                </div>
                <p className="text-muted-foreground font-chivo">
                  Five-Star Reviews
                </p>
              </div>
              <div>
                <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                  25+
                </div>
                <p className="text-muted-foreground font-chivo">
                  Industry Awards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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

      {/* Our Team */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                    <Image
                      src={member.image ?? "/portrait.jpg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      fill
                    />
                  </div>
                  <h3 className="font-cinzel font-semibold text-xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-chivo font-medium mb-2">
                    {member.role}
                  </p>
                  {member.experience && (
                    <Badge variant="secondary" className="mb-4">
                      {member.experience}
                    </Badge>
                  )}
                  <p className="text-muted-foreground font-chivo text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-cinzel font-bold text-primary-foreground mb-6">
            Experience Our Story
          </h2>
          <p className="text-xl text-primary-foreground/90 font-chivo max-w-2xl mx-auto mb-8">
            Join us for an unforgettable culinary journey where tradition meets
            innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-primary hover:bg-background/90"
            >
              Make a Reservation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              View Our Menu
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
