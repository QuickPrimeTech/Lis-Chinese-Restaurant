"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import CartSidebar from "@/components/cart-sidebar";
import { useCart } from "@/components/cart-provider";

export default function FloatingCartButton() {
  const { getTotalItems } = useCart();

  return (
    <CartSidebar>
      <Button
        size="lg"
        className="flex-col h-14 w-14 rounded-full items-center fixed bottom-6 left-6 z-40 bg-gradient-primary hover:shadow-glow transition-all duration-300 shadow-luxury"
      >
        <ShoppingBag className="size-" />
        {getTotalItems() > 0 && getTotalItems()}
      </Button>
    </CartSidebar>
  );
}
