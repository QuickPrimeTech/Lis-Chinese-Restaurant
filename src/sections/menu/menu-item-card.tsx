"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import type { Item } from "@/types/menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RemoveItemDialog } from "./remove-item-dialog";

const MenuItemCard = ({ item }: { item: Item }) => {
  const { addToCart, updateQuantity, items, removeFromCart } = useCart();
  const cartItem = items.find((i) => i.id === item.id);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMinusClick = () => {
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      setIsDialogOpen(true); // show dialog instead of immediately removing
    } else {
      updateQuantity(item.id, cartItem.quantity - 1);
    }
  };

  const confirmRemove = () => {
    if (cartItem) removeFromCart(cartItem.id);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card
        id={`food-${item.id}`}
        className="py-4 px-4 relative group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 overflow-hidden"
      >
        <CardContent className="p-0 flex items-center">
          {/* Image Section */}
          {item.image && (
            <div className="relative w-24 h-24 lg:w-36 lg:h-36 flex-shrink-0 rounded-sm overflow-hidden mr-6">
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
                <span className="font-chivo font-semibold text-lg text-foreground">
                  Ksh {item.price}
                </span>
              </div>

              <p className="text-muted-foreground font-chivo text-sm leading-snug line-clamp-2 mb-3">
                {item.description}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              {/* Minus button */}
              {cartItem?.quantity && cartItem.quantity > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleMinusClick}
                  className="px-2 py-1"
                >
                  −
                </Button>
              )}

              {/* Add button */}
              <Button
                onClick={() => addToCart(item)}
                size="sm"
                className="bg-gradient-to-r from-primary/80 to-primary hover:shadow-xl transition-all duration-300 flex items-center"
              >
                <Plus className="mr-1" />
                Add to Order
              </Button>

              {/* Quantity Badge */}
              {cartItem?.quantity && cartItem.quantity > 0 && (
                <span
                  className={cn(
                    "bg-primary text-primary-foreground rounded-full px-2 aspect-square flex items-center  text-xs font-bold",
                    item.image && "absolute top-4 left-4"
                  )}
                >
                  {cartItem.quantity}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <RemoveItemDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmRemove}
        itemName={item.name}
      />
    </>
  );
};

export default MenuItemCard;
