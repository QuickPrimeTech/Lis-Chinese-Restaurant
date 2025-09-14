"use client";

import StickyCategoryNav from "@/sections/menu/sticky-category-nav";
import MenuSections from "@/sections/menu/menu-sections";
import type { Item } from "@/types/menu";

interface MenuContentProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuContent({ menuItems }: MenuContentProps) {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StickyCategoryNav />
        <MenuSections menuItems={menuItems} />
      </div>
    </>
  );
}
