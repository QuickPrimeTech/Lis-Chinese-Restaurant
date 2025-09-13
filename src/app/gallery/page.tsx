import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const Gallery = () => {
  const interiorImages = [
    {
      id: 1,
      src: "/gallery-hero.jpg",
      title: "Main Dining Room",
      description: "Elegant dining space with sophisticated ambiance",
    },
    {
      id: 2,
      src: "/gallery-2.jpg",
      title: "Private Bar Area",
      description: "Intimate bar setting perfect for cocktails",
    },
    {
      id: 3,
      src: "/gallery-3.jpg",
      title: "Chef's Table",
      description: "Exclusive dining experience at the chef's table",
    },
    {
      id: 4,
      src: "/gallery-4.jpg",
      title: "Wine Cellar",
      description: "Temperature-controlled wine storage with rare vintages",
    },
  ];

  const foodImages = [
    {
      id: 5,
      src: "/api/placeholder/800/600",
      title: "Signature Tasting Menu",
      description: "Seven-course culinary journey",
    },
    {
      id: 6,
      src: "/api/placeholder/800/600",
      title: "Fresh Seafood",
      description: "Daily selection of premium seafood",
    },
    {
      id: 7,
      src: "/api/placeholder/800/600",
      title: "Artisanal Desserts",
      description: "House-made desserts crafted to perfection",
    },
    {
      id: 8,
      src: "/api/placeholder/800/600",
      title: "Wine Pairings",
      description: "Curated wine selections from our sommelier",
    },
  ];

  const eventImages = [
    {
      id: 9,
      src: "/api/placeholder/800/600",
      title: "Corporate Events",
      description: "Professional meetings and business dinners",
    },
    {
      id: 10,
      src: "/api/placeholder/800/600",
      title: "Wedding Celebrations",
      description: "Intimate wedding receptions and anniversaries",
    },
    {
      id: 11,
      src: "/api/placeholder/800/600",
      title: "Private Parties",
      description: "Exclusive celebrations for special occasions",
    },
    {
      id: 12,
      src: "/api/placeholder/800/600",
      title: "Holiday Events",
      description: "Festive gatherings and seasonal celebrations",
    },
  ];

  const chefImages = [
    {
      id: 13,
      src: "./gallery-1.jpg",
      title: "Executive Chef at Work",
      description: "Culinary artistry in our open kitchen",
    },
    {
      id: 14,
      src: "/api/placeholder/800/600",
      title: "Fresh Ingredients",
      description: "Sourcing the finest seasonal produce",
    },
    {
      id: 15,
      src: "/api/placeholder/800/600",
      title: "Plating Perfection",
      description: "Attention to detail in every dish",
    },
    {
      id: 16,
      src: "/api/placeholder/800/600",
      title: "Team Collaboration",
      description: "Our passionate culinary team in action",
    },
  ];

  const renderImageGrid = (images: typeof interiorImages) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image) => (
        <Card
          key={image.id}
          className="group py-0 overflow-hidden hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
        >
          <CardContent className="p-0">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative h-96 aspect-square cursor-pointer overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-cinzel font-semibold text-lg text-white mb-1">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/80 font-chivo">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-background border-border">
                <div className="relative w-full aspect-square">
                  <Image src={image.src} alt={image.title} fill />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                    <h3 className="font-cinzel font-bold text-2xl text-foreground mb-2">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground font-chivo">
                      {image.description}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" />
        <Image
          src="/gallery-hero.jpg"
          alt="li's chinese restaurant gallery image"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
              Experience the elegance and artistry that defines Li's Chinese
              Restaurant through our visual journey
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="interior" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-card border border-border">
              <TabsTrigger
                value="interior"
                className="font-chivo font-semibold"
              >
                Interior
              </TabsTrigger>
              <TabsTrigger value="cuisine" className="font-chivo font-semibold">
                Cuisine
              </TabsTrigger>
              <TabsTrigger value="events" className="font-chivo font-semibold">
                Events
              </TabsTrigger>
              <TabsTrigger value="kitchen" className="font-chivo font-semibold">
                Kitchen
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="interior" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Elegant Interiors
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                Discover our sophisticated dining spaces designed to create the
                perfect ambiance for every occasion
              </p>
            </div>
            {renderImageGrid(interiorImages)}
          </TabsContent>

          <TabsContent value="cuisine" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Culinary Artistry
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                Explore our signature dishes and artistic presentations that
                showcase culinary excellence
              </p>
            </div>
            {renderImageGrid(foodImages)}
          </TabsContent>

          <TabsContent value="events" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Memorable Events
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                See how we transform special moments into unforgettable
                experiences
              </p>
            </div>
            {renderImageGrid(eventImages)}
          </TabsContent>

          <TabsContent value="kitchen" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Behind the Scenes
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                Meet our culinary team and witness the passion behind every dish
              </p>
            </div>
            {renderImageGrid(chefImages)}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-primary max-w-2xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-cinzel font-bold text-primary-foreground mb-4">
                Ready to Experience Li's Chinese Restaurant?
              </h3>
              <p className="text-primary-foreground/90 font-chivo mb-8 text-lg">
                Book your table or plan your private event to experience the
                elegance firsthand
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
                  Plan Your Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
