"use client";

import type React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { PriceBreakdown } from "./price-breakdown";

interface CartPopoverProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
}

export function CartPopover({
  children,
  open,
  onOpenChange,
  onCheckout,
}: CartPopoverProps) {
  const { items, itemCount } = useCart();
  const maxItems = 3;
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="start">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="h-4 w-4" />
            <h3 className="font-semibold">Your Cart</h3>
            <span className="text-sm text-muted-foreground">
              ({itemCount} items)
            </span>
          </div>

          <ScrollArea className="h-48">
            {items.slice(0, maxItems).map((item) => (
              <div
                key={item.id}
                className="flex border px-2 rounded-sm items-center mt-2 gap-3 py-1.5"
              >
                {item.image && (
                  <div className="relative w-10 h-10 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity}x Ksh {item.price}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {items.length > 3 && (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">
                  +{items.length - maxItems} more items
                </p>
              </div>
            )}

            <ScrollBar orientation="vertical" />
          </ScrollArea>

          <Separator className="my-3" />

          <PriceBreakdown />
          <Separator />
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Continue Shopping
            </Button>
            <Button size="sm" className="flex-1" onClick={onCheckout}>
              Checkout
              <ArrowRight />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
