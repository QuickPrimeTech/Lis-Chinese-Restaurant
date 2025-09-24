import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-provider";
import Image from "next/image";
import { PriceBreakdown } from "./price-breakdown";

export const OrderSummary = () => {
  const { items } = useCart();

  return (
    <div className="bg-card rounded-xl p-4 space-y-3 shadow-luxury">
      <h4 className="font-semibold text-foreground">Order Summary</h4>

      <ScrollArea className="h-40 pr-2">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 bg-background rounded-lg border border-border"
            >
              {item.image && (
                <div className="relative w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    fill
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity}x Ksh {item.price}
                </p>
              </div>

              <p className="text-sm font-semibold whitespace-nowrap">
                Ksh {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <PriceBreakdown />
    </div>
  );
};
