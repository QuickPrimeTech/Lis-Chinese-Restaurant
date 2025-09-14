"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { CartPopover } from "./cart-popover";
import { CartSheet } from "./cart-sheet";

export function CartButton() {
  const { itemCount, total } = useCart();
  const [showPopover, setShowPopover] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
      {/* Fixed Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          <CartPopover
            open={showPopover}
            onOpenChange={setShowPopover}
            onCheckout={() => {
              setShowPopover(false);
              setShowSheet(true);
            }}
          >
            <Button
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 h-16 w-16 relative group"
              onClick={() => setShowPopover(true)}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xs font-medium mt-0.5">Cart</span>
              </div>

              {/* Item count badge */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-md">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}

              {/* Total amount badge */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md">
                Ksh {total.toFixed(0)}
              </div>
            </Button>
          </CartPopover>
        </div>
      )}
      {/* Cart Sheet */}
      <CartSheet open={showSheet} onOpenChange={setShowSheet} />
    </>
  );
}
