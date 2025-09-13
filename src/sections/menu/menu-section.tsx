// @/sections/menu/menu-section.tsx

import MenuItemCard from "@/components/menu/menu-item-card";
import type { Item } from "@/types/menu";

interface MenuSectionProps {
  title: string;
  description: string;
  items: Item[];
}

const MenuSection = ({ title, description, items }: MenuSectionProps) => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-muted-foreground font-chivo max-w-2xl mx-auto">
        {description}
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default MenuSection;
