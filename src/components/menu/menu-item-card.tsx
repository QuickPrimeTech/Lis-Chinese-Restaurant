// @/components/menu/menu-item-card.tsx
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
    <Card className="py-3 px-2 group hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50 overflow-hidden">
      <CardContent className="p-0 flex">
        {/* Image Section */}
        <div>
          <div className="relative w-40 h-40 flex-shrink-0 rounded-sm overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={160}
              height={160}
            />
          </div>
          <span className="font-cinzel font-bold text-lg text-primary">
            ${item.price}
          </span>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-4 flex-1">
          <div>
            <h3 className="font-cinzel font-bold text-lg text-foreground">
              {item.name}
            </h3>
            <p className="text-muted-foreground font-chivo text-sm leading-snug line-clamp-2 mb-3">
              {item.description}
            </p>
          </div>

          <Button
            onClick={() => {
              addToCart(item);
            }}
            size="sm"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 flex items-center"
          >
            <Plus className="mr-1 h-4 w-4 group-hover:animate-glow" />
            Add
            {cartItem?.quantity && cartItem.quantity > 0 && (
              <span className="ml-1 bg-white text-primary rounded-full px-2 py-0.5 text-xs font-bold">
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
