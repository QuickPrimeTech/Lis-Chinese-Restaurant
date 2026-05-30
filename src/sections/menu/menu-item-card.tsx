"use client";
import Image from "@/components/ui/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "@/types/menu";

const MenuItemCard = ({ item }: { item: Item }) => {
  return (
    <>
      <Card
        id={`food-${item.id}`}
        className="py-4 px-4 relative group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 overflow-hidden"
      >
        <CardContent className="p-0 flex items-center">
          {item.image && (
            <div className="relative w-24 h-24 lg:w-36 lg:h-36 shrink-0 rounded-sm overflow-hidden mr-6">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                width={144}
                height={144}
              />
            </div>
          )}

          {/* Content Section */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              {/* Title and Price */}
              <div
                className={`flex ${
                  item.image ? "flex-col" : "flex-row"
                } justify-between mb-1`}
              >
                <h3 className="font-cinzel font-bold text-md md:text-lg lg:text-xl text-foreground tracking-wide">
                  {item.name}
                </h3>
                <span className="font-chivo font-semibold text-lg text-foreground whitespace-nowrap">
                  Ksh {item.price}
                </span>
              </div>

              <p className="text-muted-foreground font-chivo text-sm leading-snug line-clamp-2 mb-3">
                {item.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MenuItemCard;
