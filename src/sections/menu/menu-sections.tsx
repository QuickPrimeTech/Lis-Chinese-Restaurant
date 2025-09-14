"use client";

import MenuSection from "@/sections/menu/menu-section";
import type { Item } from "@/types/menu";

interface MenuSectionsProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuSections({ menuItems }: MenuSectionsProps) {
  return (
    <div className="space-y-24 mt-8">
      <section id="appetizers">
        <MenuSection
          title="Appetizers"
          description="Begin your culinary journey with our carefully curated selection of starters"
          items={menuItems.appetizers}
        />
      </section>

      <section id="mains">
        <MenuSection
          title="Main Courses"
          description="Experience our signature dishes crafted to perfection"
          items={menuItems.mains}
        />
      </section>

      <section id="desserts">
        <MenuSection
          title="Desserts"
          description="End your meal on a sweet note with our artisanal desserts"
          items={menuItems.desserts}
        />
      </section>
    </div>
  );
}
