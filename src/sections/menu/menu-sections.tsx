"use client";

import MenuSection from "@/sections/menu/menu-section";
import type { Item } from "@/types/menu";

interface MenuSectionsProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuSections({ menuItems }: MenuSectionsProps) {
  return (
    <div className="space-y-24 mt-8">
      {Object.entries(menuItems).map(([key, items]) => {
        if (items.length === 0) return null; // skip empty categories
        return (
          <section key={key} id={key}>
            <MenuSection
              title={items[0].category} // use category from item data
              items={items}
            />
          </section>
        );
      })}
    </div>
  );
}
