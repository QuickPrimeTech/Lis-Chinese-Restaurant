"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import type { Item } from "@/types/menu";

const MenuItemCard = ({ item }: { item: Item }) => {
  const { addToCart, items } = useCart();
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <Card
      id={`food-${item.id}`}
      className="py-4 px-4 group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 overflow-hidden"
    >
      <CardContent className="p-0 flex items-center">
        {/* Image Section - New positioning */}
        {item.image && (
          <div className="relative size-24 lg:size-36 flex-shrink-0 rounded-sm overflow-hidden mr-6">
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
            {/* Title and Price - New combined layout */}
            <div
              className={`flex ${
                item.image && "flex-col"
              } justify-between mb-1`}
            >
              <h3 className="font-cinzel font-bold text-md md:text-lg lg:text-xl text-foreground tracking-wide">
                {item.name}
              </h3>
              <span className="font-chivo font-semibold text-lg text-foreground">
                Ksh {item.price}
              </span>
            </div>

            <p className="text-muted-foreground font-chivo text-sm leading-snug line-clamp-2 mb-3">
              {item.description}
            </p>
          </div>

          <Button
            onClick={() => addToCart(item)}
            size="sm"
            className="w-fit bg-gradient-to-r from-primary/80 to-primary hover:shadow-xl transition-all duration-300 flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add to Order
            {cartItem?.quantity && cartItem.quantity > 0 && (
              <span className="bg-white text-primary rounded-full px-2 py-0.5 text-xs font-bold">
                {cartItem.quantity}
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
