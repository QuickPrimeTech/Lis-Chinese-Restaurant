import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Wine, UtensilsCrossed, Cookie } from "lucide-react";
import Link from "next/link";
export const MenuPreview = () => {
  const menuCategories = [
    {
      icon: <Wine className="h-8 w-8" />,
      title: "Drinks Menu",
      description:
        "Curated selection of fine wines, craft cocktails, and premium spirits",
      link: "/menu#drinks",
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8" />,
      title: "Food Menu",
      description:
        "Exquisite dishes crafted with the finest ingredients and techniques",
      link: "/menu#food",
    },
    {
      icon: <Cookie className="h-8 w-8" />,
      title: "Dessert Menu",
      description: "Artisanal desserts that provide the perfect sweet finale",
      link: "/menu#desserts",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/menu-preview.jpg"
          alt="Menu preview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-6">
            Our Menu
          </h2>
          <p className="text-xl text-white/90 font-chivo max-w-3xl mx-auto">
            Discover a world of flavors carefully curated to create an
            unforgettable dining experience
          </p>
        </div>

        {/* Menu Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-background/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-background/20 transition-all duration-500 hover:scale-105"
            >
              <div className="text-primary mb-6 flex justify-center group-hover:animate-glow">
                {category.icon}
              </div>
              <h3 className="text-2xl font-cinzel font-semibold text-white mb-4">
                {category.title}
              </h3>
              <p className="text-white/80 font-chivo mb-6 leading-relaxed">
                {category.description}
              </p>
              <Button
                variant="outline"
                className="border-white/30 text-foreground hover:bg-white transition-all duration-300"
                asChild
              >
                <Link href={category.link}>View Menu</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Full Menu Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="xl"
            className="hover:shadow-glow transition-all duration-300"
          >
            <Link href="/menu"> View Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
