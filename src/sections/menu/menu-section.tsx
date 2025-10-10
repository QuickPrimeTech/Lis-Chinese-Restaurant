// @/sections/menu/menu-section.tsx

import MenuItemCard from "@/sections/menu/menu-item-card";
import { Separator } from "@/components/ui/separator";
import type { Item } from "@/types/menu";

interface MenuSectionProps {
  title: string;
  items: Item[];
}

const MenuSection = ({ title, items }: MenuSectionProps) => (
  <section
    className="space-y-8"
    aria-labelledby={`section-${title}`}
    id={title}
    role="region"
  >
    <div className="space-y-2 mb-8">
      <Separator className="bg-primary" />
      <div className="text-center">
        <h2
          className="text-3xl font-cinzel font-bold text-red-400 text mb-4"
          id={`section-${title}`}
        >
          {title}
        </h2>
      </div>
      <Separator className="bg-primary" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);

export default MenuSection;
