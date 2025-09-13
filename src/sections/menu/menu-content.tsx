// @/sections/menu/menu-content.tsx


"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import CartSidebar from "@/components/cart-sidebar";
import MenuSection from "@/sections/menu/menu-section";
import { useCart } from "@/components/cart-provider";
import type { Item } from "@/types/menu";

interface MenuContentProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuContent({ menuItems }: MenuContentProps) {
  const { getTotalItems } = useCart();

  return (
    <>
      {/* Cart Sidebar */}
      <CartSidebar>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-40 bg-gradient-primary hover:shadow-glow transition-all duration-300 shadow-luxury"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Cart ({getTotalItems()})
        </Button>
      </CartSidebar>

      {/* Menu Tabs + Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="appetizers" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border border-border">
              <TabsTrigger value="appetizers" className="font-chivo font-semibold">
                Appetizers
              </TabsTrigger>
              <TabsTrigger value="mains" className="font-chivo font-semibold">
                Main Courses
              </TabsTrigger>
              <TabsTrigger value="desserts" className="font-chivo font-semibold">
                Desserts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appetizers">
            <MenuSection
              title="Appetizers"
              description="Begin your culinary journey with our carefully curated selection of starters"
              items={menuItems.appetizers}
            />
          </TabsContent>

          <TabsContent value="mains">
            <MenuSection
              title="Main Courses"
              description="Experience our signature dishes crafted to perfection"
              items={menuItems.mains}
            />
          </TabsContent>

          <TabsContent value="desserts">
            <MenuSection
              title="Desserts"
              description="End your meal on a sweet note with our artisanal desserts"
              items={menuItems.desserts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
