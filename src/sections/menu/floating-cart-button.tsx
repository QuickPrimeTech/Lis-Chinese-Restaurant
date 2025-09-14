"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import CartSidebar from "@/components/cart-sidebar";
import { useCart } from "@/contexts/cart-provider";
import { CartButton } from "@/components/cart/cart-button";

export default function FloatingCartButton() {
  const { total, itemCount } = useCart();

  return (
    <CartSidebar>
      <CartButton />
    </CartSidebar>
  );
}
