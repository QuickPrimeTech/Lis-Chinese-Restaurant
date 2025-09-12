"use client";

import Image from "next/image";
import CartSidebar from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Plus, Star, Clock } from "lucide-react";
import { useCart } from "@/components/cart-provider";

const Menu = () => {
  const { addToCart, getTotalItems } = useCart();

  const menuItems = {
    appetizers: [
      {
        id: "app1",
        name: "Seared Foie Gras",
        description:
          "Pan-seared foie gras with cherry gastrique and brioche toast",
        price: 32,
        image: "/appetizer.jpg",
        category: "Appetizers",
        rating: 4.9,
        prepTime: 15,
      },
      {
        id: "app2",
        name: "Oysters Rockefeller",
        description:
          "Fresh Blue Point oysters with spinach, herbs, and hollandaise",
        price: 28,
        image: "/appetizer.jpg",
        category: "Appetizers",
        rating: 4.8,
        prepTime: 12,
      },
      {
        id: "app3",
        name: "Wagyu Beef Tartare",
        description: "Hand-cut wagyu with quail egg, capers, and truffle oil",
        price: 38,
        image: "/appetizer.jpg",
        category: "Appetizers",
        rating: 5.0,
        prepTime: 10,
      },
    ],
    mains: [
      {
        id: "main1",
        name: "Dry-Aged Ribeye",
        description:
          "32oz dry-aged ribeye with roasted bone marrow and seasonal vegetables",
        price: 95,
        image: "/main-course.jpg",
        category: "Main Courses",
        rating: 4.9,
        prepTime: 25,
      },
      {
        id: "main2",
        name: "Lobster Thermidor",
        description: "Whole Maine lobster with cognac cream sauce and gruyere",
        price: 68,
        image: "/main-course.jpg",
        category: "Main Courses",
        rating: 4.8,
        prepTime: 30,
      },
      {
        id: "main3",
        name: "Duck Confit",
        description:
          "Slow-cooked duck leg with cherry reduction and potato gratin",
        price: 52,
        image: "/main-course.jpg",
        category: "Main Courses",
        rating: 4.7,
        prepTime: 22,
      },
    ],
    desserts: [
      {
        id: "des1",
        name: "Chocolate Soufflé",
        description: "Dark chocolate soufflé with vanilla bean ice cream",
        price: 18,
        image: "/dessert.jpg",
        category: "Desserts",
        rating: 4.9,
        prepTime: 20,
      },
      {
        id: "des2",
        name: "Crème Brûlée Trio",
        description:
          "Classic vanilla, lavender honey, and espresso crème brûlée",
        price: 16,
        image: "/dessert.jpg",
        category: "Desserts",
        rating: 4.8,
        prepTime: 8,
      },
      {
        id: "des3",
        name: "Tarte Tatin",
        description: "Upside-down apple tart with calvados ice cream",
        price: 14,
        image: "/dessert.jpg",
        category: "Desserts",
        rating: 4.7,
        prepTime: 15,
      },
    ],
  };

  const renderMenuItem = (item: any) => (
    <Card
      key={item.id}
      className="group hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            width={500}
            height={300}
          />
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-chivo font-semibold">
              {item.rating}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-cinzel font-bold text-xl text-foreground">
              {item.name}
            </h3>
            <span className="font-cinzel font-bold text-xl text-primary">
              ${item.price}
            </span>
          </div>
          <p className="text-muted-foreground font-chivo leading-relaxed mb-4">
            {item.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="font-chivo">{item.prepTime} min</span>
              </div>
              <Badge variant="secondary" className="font-chivo text-xs">
                {item.category}
              </Badge>
            </div>
          </div>
          <Button
            onClick={() => addToCart(item)}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:animate-glow" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={"/menu-hero.jpg"}
          alt="Menu Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
                Our Exquisite Menu
              </h1>
              <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
                Discover culinary masterpieces crafted with the finest
                ingredients and available for pickup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Button - Fixed */}
      <CartSidebar>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-40 bg-gradient-primary hover:shadow-glow transition-all duration-300 shadow-luxury"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Cart ({getTotalItems()})
        </Button>
      </CartSidebar>

      {/* Menu Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="appetizers" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border border-border">
              <TabsTrigger
                value="appetizers"
                className="font-chivo font-semibold"
              >
                Appetizers
              </TabsTrigger>
              <TabsTrigger value="mains" className="font-chivo font-semibold">
                Main Courses
              </TabsTrigger>
              <TabsTrigger
                value="desserts"
                className="font-chivo font-semibold"
              >
                Desserts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appetizers" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Appetizers
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                Begin your culinary journey with our carefully curated selection
                of starters
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.appetizers.map(renderMenuItem)}
            </div>
          </TabsContent>

          <TabsContent value="mains" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Main Courses
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                Experience our signature dishes crafted to perfection
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.mains.map(renderMenuItem)}
            </div>
          </TabsContent>

          <TabsContent value="desserts" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                Desserts
              </h2>
              <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
                End your meal on a sweet note with our artisanal desserts
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.desserts.map(renderMenuItem)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;
