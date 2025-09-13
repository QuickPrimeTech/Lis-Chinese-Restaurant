// @/components/menu/menu-item-card.tsx

"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { Item } from "@/types/menu";

const MenuItemCard = ({ item }: { item: Item }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            width={500}
            height={300}
          />
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-chivo font-semibold">
              {item.rating}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-cinzel font-bold text-xl text-foreground">
              {item.name}
            </h3>
            <span className="font-cinzel font-bold text-xl text-primary">
              ${item.price}
            </span>
          </div>
          <p className="text-muted-foreground font-chivo leading-relaxed mb-4">
            {item.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="font-chivo">{item.prepTime} min</span>
              </div>
              <Badge variant="secondary" className="font-chivo text-xs">
                {item.category}
              </Badge>
            </div>
          </div>
          <Button
            onClick={() => addToCart(item)}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:animate-glow" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
