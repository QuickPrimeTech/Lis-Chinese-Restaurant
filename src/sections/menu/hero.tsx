// @/sections/menu/hero.tsx

import Image from "next/image";

const MenuHero = () => (
  <section className="relative h-96 overflow-hidden">
    <Image src={"/menu-hero.jpg"} alt="Menu Hero" fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
            Our Exquisite Menu
          </h1>
          <p className="text-xl text-foreground font-chivo max-w-3xl mx-auto">
            Discover culinary masterpieces crafted with the finest ingredients and available for pickup
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default MenuHero;
