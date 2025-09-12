import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import Image from "next/image";

interface CartSidebarProps {
  children: React.ReactNode;
}

const CartSidebar = ({ children }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();

  const handleCheckout = () => {
    // In a real app, this would integrate with payment processing
    alert("Checkout functionality would integrate with payment processing");
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] bg-card border-border">
        <SheetHeader>
          <SheetTitle className="font-cinzel text-2xl flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            Your Order
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-chivo">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground font-chivo mt-2">
                  Add some delicious items to get started
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-background rounded-lg p-4 border border-border"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-chivo font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="font-cinzel font-semibold text-primary">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-chivo font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-cinzel font-semibold text-lg">
                    Total:
                  </span>
                  <span className="font-cinzel font-bold text-2xl text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
