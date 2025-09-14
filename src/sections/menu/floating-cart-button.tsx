"use client";

import CartSidebar from "@/components/cart-sidebar";
import { CartButton } from "@/components/cart/cart-button";

export default function FloatingCartButton() {
  return (
    <CartSidebar>
      <CartButton />
    </CartSidebar>
  );
}
